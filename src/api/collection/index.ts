/**
 *
 */
import localForage from "localforage";
import BrowserBase from "@/browser-base";

import { CollectionFilter } from "@/types";

//Filter
import ftLimit from "./limit";
import ftOrderBy from "./orderBy";
import ftSkip from "./skip";
import fkById from "./byId";

//action
import ftAdd from "@/api/actions/add";
import fkDelete from "@/api/actions/delete";
import fkSet from "@/api/actions/set";
import fkGet from "@/api/actions/get";

// import Document from "@/api/selector/doc";
/**
 * Collection
 */
export default class Collection<T> {
  public lf: LocalForage;
  public _filter: null | CollectionFilter<T> = null;

  constructor(
    public readonly _browserBase: BrowserBase,
    public readonly collectionName: string
  ) {
    this.lf = localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: _browserBase.dbName,
      storeName: collectionName,
    });
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
  public byId(id: string) {
    fkById(this, id);
    return this as Collection<T>;
  }

  public async add(data: T, key?: string) {
    return await ftAdd(this, data, key);
  }

  public delete() {
    if (!this._filter) return;
    fkDelete<typeof this, T>(this);
  }

  public set(object: Partial<T>) {
    if (!this._filter) return;
    fkSet<T>(this, object);
  }
  public async get() {
    return await fkGet(this);
  }
}
