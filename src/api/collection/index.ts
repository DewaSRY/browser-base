/**
 *
 */
import localForage from "localforage";
import { documentId } from "@/types";
import BrowserBase from "@/browser-base";

import { CollectionFilter } from "@/types";

//Filter
import ftLimit from "./limit";
import ftOrderBy from "./orderBy";
import ftSkip from "./skip";

//action
import ftAdd from "@/api/actions/add";

// import Document from "@/api/selector/doc";
/**
 * Collection
 */
export default class Collection<T> {
  public lf: LocalForage;
  public _filter: null | CollectionFilter<T> = null;

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

  //   public doc(docSelectionCriteria: Partial<T>): Document<T> {
  //     return new Document<T>(this, docSelectionCriteria);
  //   }
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

  public orderBy(property: keyof T, order: "desc" | "asc" = "desc") {
    ftOrderBy(this, property, order);
    return this as Collection<T>;
  }
  public limit(limit: number) {
    ftLimit(this, limit);
    return this as Collection<T>;
  }
  public skip(skip: number) {
    ftSkip(this, skip);
    return this as Collection<T>;
  }

  public async add(data: T, key?: string) {
    return await ftAdd(this, data, key);
  }
  public async get(key: string) {
    return await this.lf.getItem(key).then((doc) => doc);
  }
}
