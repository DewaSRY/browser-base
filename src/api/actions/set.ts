import Collection from "@/api/selector/collection";

import { documentId } from "@/types";

/**
 * use to set new object
 * @param collection
 * @param object
 * @returns
 */

export default function set<T>(
  collection: Collection<T>,
  object: Partial<T>
): Promise<documentId<T>>;
export default function set<T>(collection: Collection<T>, object: Partial<T>) {
  const { _filter, lf, _browserBase } = collection;
  return new Promise((resolve, reject) => {
    if (!_filter) {
      reject(
        _browserBase._logger.error("pelase add filter before run set method")
      );
    } else {
      let prevobject: T | null = null;
      lf.iterate<T, void>((velue, key) => {
        if (key === _filter.id) {
          prevobject = velue;
        }
      }).then(() => {
        if (!prevobject) {
          reject(
            _browserBase._logger.error(
              `object with id '${_filter.id}' not found`
            )
          );
        } else {
          let newObject = {
            ...prevobject,
            ...object,
            _id: _filter.id,
          };
          let { _id, ...updatedata } = newObject;
          lf.setItem<T>(_filter.id, updatedata as T);
          _browserBase._logger.log("success update ", newObject as Object);
          collection._resetFilter();
          resolve(newObject);
        }
      });
    }
  });
}
