import ById from "@/api/selector/by-id";

import { documentId } from "@/types";

/**
 * use to set new object
 * @param collection
 * @param object
 * @returns
 */

export default async function set<T>(
  byId: ById<T>,
  object: Partial<T>
): Promise<documentId<T> | null> {
  const { collection, id } = byId;
  const { lf, _browserBase } = collection;
  let prevobject: T | null = null;
  prevobject = await lf.getItem(id);
  if (!prevobject) {
    _browserBase._logger.error(`object with id '${id}' not found`);
    return null;
  }
  let newObject = {
    ...prevobject,
    ...object,
    _id: id,
  };
  let { _id, ...updatedata } = newObject;
  lf.setItem<T>(id, updatedata as T);
  _browserBase._logger.log("success update ", newObject as Object);
  collection._resetFilter();
  return newObject as documentId<T>;
}
