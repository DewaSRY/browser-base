import Collection from "./collection";
import Logger from "./utils/logger";
/**
 * BrowserBase
 */
export default class BrowserBase {
  private _collectioMap: Map<string, Collection<unknown>> = new Map();
  public _deleteCollectionQueue = { queue: [] as string[], running: false };
  public config = { debug: false };
  public _logger: Logger = new Logger(this);
  constructor(public dbName: string) {}

  public collection<T>(collectionName: string) {
    let collection = this._collectioMap.get(collectionName);
    if (!collection) {
      collection = new Collection(this, collectionName);
      this._collectioMap.set(collectionName, collection);
    }
    return collection as Collection<T>;
  }

  public delete() {
    indexedDB.deleteDatabase(this.dbName);
  }

  public setConfig(isDbug: boolean) {
    this.config.debug = isDbug;
  }
}

export * from "./types";
