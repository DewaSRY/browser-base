/**
 *
 */
import localForage from "localforage";
import { documentId } from "./types";
import BrowserBase from "./browser-base";
import Document from "./document";
/**
 * Collection
 */
export default class Collection<T> {
  public lf: LocalForage;
  constructor(
    private readonly browserBase: BrowserBase,
    private readonly collectionName: string
  ) {
    this.lf = localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: browserBase.dbName,
      storeName: collectionName,
    });
  }

  public delete() {
    const { browserBase, collectionName, deleteFromQueue } = this;
    browserBase._deleteCollectionQueue.queue.push(collectionName);
    if (browserBase._deleteCollectionQueue.running === false) {
      browserBase._deleteCollectionQueue.running = true;
      deleteFromQueue();
    }
  }
  private deleteFromQueue() {
    if (this.browserBase._deleteCollectionQueue.queue.length) {
      let collectionToDelete = this.browserBase._deleteCollectionQueue.queue[0];
      this.browserBase._deleteCollectionQueue.queue.shift();
      this.lf
        .dropInstance({
          name: this.browserBase.dbName,
          storeName: collectionToDelete,
        })
        .then(() => {
          this.deleteFromQueue();
        });
    } else {
      this.browserBase._deleteCollectionQueue.running = false;
    }
  }

  public doc(docSelectionCriteria: Partial<T>): Document<T> {
    return new Document<T>(this, docSelectionCriteria);
  }
  public all() {
    let collection: documentId<T>[] = [];
    return this.lf
      .iterate<T, void>((value, key) => {
        collection.push({
          ...value,
          _id: key,
        });
      })
      .then(() => collection);
  }
  public async orderby(property: keyof T, order: "desc" | "asc" = "desc") {
    return await this.all().then((collection) => {
      let allCol = collection.sort((a, b) =>
        String(a[property]).localeCompare(String(b[property]))
      );
      if (order == "desc") {
        allCol = allCol.reverse();
      }
      return allCol;
    });
  }
  public add(data: T, key?: string): Promise<documentId<T>> {
    return new Promise((resolve, _reject) => {
      if (!key) {
        key = crypto.randomUUID();
      }
      return this.lf
        .setItem(key, data)
        .then(() => resolve({ ...data, _id: key as string }))
        .catch((_err) => {});
    });
  }
  public async get(key: string) {
    return await this.lf.getItem(key).then((doc) => doc);
  }
}
