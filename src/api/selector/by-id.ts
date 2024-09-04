import Collection from "@/api/selector/collection";

//action
import fkDelete from "@/api/actions/delete";
import fkSet from "@/api/actions/set";
import fkGet from "@/api/actions/get";

export default class ById<T> {
  constructor(public collection: Collection<T>, public id: string) {}

  /**
   * delete without specify the data id will delete the collection
   *
   * `await db.collection<User>("user").byId("<uuid>").delete() //wil delete the collection`
   * @returns
   */
  public async delete() {
    return await fkDelete<typeof this, T>(this);
  }
  /**
   * set will update data match the id.
   *
   * if you not passing id before call it. it will throw an error
   * @param object
   * @returns
   */
  public async set(object: Partial<T>) {
    return await fkSet<T>(this, object);
  }
  /**
   * get use to query data
   * `await db.collection<User>("user").byId("<uuid>").get() // will return data match the id `
   * @returns Promise<documentId<T>[]>
   */
  public async get() {
    return await fkGet(this);
  }
}
