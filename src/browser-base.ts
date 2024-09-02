import Collection from "./collection";

export class BrowserBase {
  private collectioMap: Map<string, Collection<unknown>> = new Map();
  public deleteCollectionQueue = { queue: [] as string[], running: false };
  public config = { debug: false };

  constructor(public dbName: string) {}
  public collection<T>(collectionName: string) {
    let collection = this.collectioMap.get(collectionName);
    if (!collection) {
      collection = new Collection(this, collectionName);
      this.collectioMap.set(collectionName, collection);
    }
    return collection as Collection<T>;
  }

  public delete() {
    indexedDB.deleteDatabase(this.dbName);
  }
}
