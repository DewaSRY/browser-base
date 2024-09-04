import Collection from "@/api/collection";
import Logger from "@/utils/logger";

//action
import fkDelete from "./api/actions/delete";
/**
 * BrowserBase
 */
export default class BrowserBase {
  private _collectioMap: Map<string, Collection<unknown>> = new Map();
  public _deleteCollectionQueue = { queue: [] as string[], running: false };

  public config = { debug: false };
  public _logger: Logger = new Logger(this);
  constructor(public dbName: string) {}
  /**
   * collection use to create or get collection on the database.
   * make sure you pass an interface when use this method for type sefty
   * `
   * interface User{name: string; age: number};
   *
   * const db= new BroserBase("db");
   *
   * db.collection<User>("userdata").get()`
   * @param collectionName
   * @returns
   */
  public collection<T>(collectionName: string) {
    let collection = this._collectioMap.get(collectionName);
    if (!collection) {
      collection = new Collection(this, collectionName);
      this._collectioMap.set(collectionName, collection);
    }
    return collection as Collection<T>;
  }
  /**
   * delete will delete the database
   * @returns
   */
  public async delete() {
    return await fkDelete(this);
  }
  /**
   * setconfig will swithc configuration for debug mode
   * by default browserbase is on debug mode, so it will log every
   * action you done on browserbase.
   *
   *
   * pass false on the `setConfig` so it will not activate the logging
   * @param isDbug
   */
  public setConfig(isDbug: boolean) {
    this.config.debug = isDbug;
  }
}

export * from "./types";
