import Collection from "@/api/selector/collection";

import { documentId } from "@/types";

export default async function get<T>(
  parent: Collection<T>
): Promise<documentId<T>[]>;
export default async function get<T>(parent: T) {
  if (parent instanceof Collection) {
    if (parent._filter) {
      if (parent._filter.id) {
        return await getByKey(parent);
      }
      // if have filter
      return getByFilter(parent);
    } else {
      // if there is no filter
      return await getAll<T>(parent);
    }
  }
}

async function getAll<T>(collection: Collection<T>): Promise<documentId<T>[]> {
  const { lf, _browserBase } = collection;
  let collections: documentId<T>[] = [];
  return lf
    .iterate<T, void>((value, key) => {
      collections.push({
        ...value,
        _id: key,
      });
    })
    .then(() => {
      _browserBase._logger.log(`you get data '${collections.length}' length`);
      return collections;
    });
}

async function getByKey<T>(
  collection: Collection<T>
): Promise<documentId<T>[] | null> {
  const { lf, _filter, _browserBase } = collection;
  return lf.getItem<T>(_filter?.id as string).then((data) => {
    if (!data) {
      _browserBase._logger.warn(`data with id '${_filter?.id}' not found`);
      return null;
    }
    const getData = {
      ...data,
      _id: _filter?.id,
    };
    _browserBase._logger.log(`data get `, getData);
    collection._resetFilter();
    return [getData] as documentId<T>[];
  });
}

async function getByFilter<T>(collection: Collection<T>) {
  const { _filter, lf, _browserBase } = collection;

  let collections: documentId<T>[] = [];
  return lf
    .iterate<T, void>((value, key) => {
      collections.push({
        ...value,
        _id: key,
      });
    })
    .then(() => {
      let star;
      let end;
      if (_filter) {
        // 0 5
        star = _filter?.skip;
        end = star + _filter?.limit;
      }

      if (_filter?.orderBy && _filter?.orderBy.toString().length > 0) {
        collections = collections.sort((a, b) =>
          String(a[_filter?.orderBy as keyof T]).localeCompare(
            String(b[_filter?.orderBy as keyof T])
          )
        );
      }

      if (_filter?.order === "desc") {
        collections = collections.reverse();
      }

      if (star || end) {
        _browserBase._logger.log(`getting data on range ${star} - ${end}`);
        return collections.slice(star, end);
      }
      collection._resetFilter();
      return collections;
    });
}
