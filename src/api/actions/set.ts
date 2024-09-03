import Collection from "@/api/collection";

/**
 * use to set new object
 * @param collection
 * @param object
 * @returns
 */
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
            _browserBase._logger.error(`object with id ${_filter.id} not found`)
          );
          return;
        }

        let newObject = {
          ...prevobject,
          ...object,
        };
        lf.setItem<T>(_filter.id, newObject as T);
        _browserBase._logger.log("success update ", newObject as Object);
        resolve(prevobject);
      });
    }
  });
}
