// /**
//  *
//  */
// import localForage from "localforage";
// import BrowserBase from "@/browser-base";
// import { CollectionFilter } from "@/types";

// //Filter
// import ftLimit from "@/api/api-utils/limit";
// import ftOrderBy from "@/api/api-utils/orderBy";
// import ftSkip from "@/api/api-utils/skip";
// import fkById from "./byId";

// //action
// import ftAdd from "@/api/actions/add";
// import fkDelete from "@/api/actions/delete";
// import fkSet from "@/api/actions/set";
// import fkGet from "@/api/actions/get";

// // import Document from "@/api/selector/doc";
// /**
//  * Collection
//  */
// export default class Collection<T> {
//   public lf: LocalForage;
//   public _filter: null | CollectionFilter<T> = null;

//   constructor(
//     public readonly _browserBase: BrowserBase,
//     public readonly collectionName: string
//   ) {
//     this.lf = localForage.createInstance({
//       driver: localForage.INDEXEDDB,
//       name: _browserBase.dbName,
//       storeName: collectionName,
//     });
//   }

//   public _resetFilter() {
//     if (this._filter) {
//       this._filter = null;
//     }
//   }
//   /**
//    * order by wil sort your data base on data property you pass
//    * @param property property of interface you pass on collection
//    * @param order "desc" | "asc" // default "asc"
//    * @returns
//    */
//   public orderBy(property: keyof T, order: "desc" | "asc" = "asc") {
//     ftOrderBy(this, property, order);
//     return this as Collection<T>;
//   }
//   /**
//    * limit will limted data get query
//    * @param limit
//    * @returns
//    */
//   public limit(limit: number) {
//     ftLimit(this, limit);
//     return this as Collection<T>;
//   }
//   /**
//    * Skip will skiped data you r query
//    * @param skip
//    * @returns
//    */
//   public skip(skip: number) {
//     ftSkip(this, skip);
//     return this as Collection<T>;
//   }
//   /**
//    * by id will specify an action, which min some follow up action only apply for certent data
//    *
//    * `await db.collection<User>("user").by("<uuid>").get() // will return the data match id `
//    *
//    * `await db.collection<User>("user").by("<uuid>").set({name: "new bane"}) // will update the data match id `
//    *
//    * `await db.collection<User>("user").by("<uuid>").delete() // will delete the data match id `
//    * @param id
//    * @returns
//    */
//   public byId(id: string) {
//     fkById(this, id);
//     return this;
//   }
//   /**
//    * add will adding data to the collection
//    * @param data
//    * @param key
//    * @returns
//    */
//   public async add(data: T, key?: string) {
//     return await ftAdd(this, data, key);
//   }
//   /**
//    * delete without specify the data id will delete the collection
//    *
//    * `await db.collection<User>("user").delete() //wil delete the collection`
//    * @returns
//    */
//   public delete() {
//     return fkDelete<typeof this, T>(this);
//   }
//   /**
//    * set will update data match the id.
//    *
//    * if you not passing id before call it. it will throw an error
//    * @param object
//    * @returns
//    */
//   public async set(object: Partial<T>) {
//     return await fkSet<T>(this, object);
//   }
//   /**
//    * get use to query data
//    *
//    * `await db.collection<User>("user").get() // will return get all data on collection `
//    *
//    * `await db.collection<User>("user").by("<uuid>").get() // will return data match the id `
//    *
//    * `await db.collection<User>("user").limit(10).skip(5).get() // return data index 6 to 15 `
//    *
//    *
//    * `await db.collection<User>("user").orderBy("age").get() // retunr data will order by age `
//    *
//    * @returns Promise<documentId<T>[]>
//    */
//   public async get() {
//     return await fkGet(this);
//   }
// }
