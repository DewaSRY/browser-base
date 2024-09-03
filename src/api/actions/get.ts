import Collection from "@/api/collection";
import { documentId } from "@/types";

export default async function get<T>(
  parent: Collection<T>
): Promise<documentId<T>[]>;
export default async function get<T>(
  parent: Collection<T>
): Promise<documentId<T>>;
export default async function get<T>(parent: T) {
  if (parent instanceof Collection) {
    if (parent._filter) {
      // if have filter
      if (parent._filter.id) {
        return await getByKey(parent);
      }
      return getByFilter(parent);
    } else {
      // if there is no filter
      return await getAll<T>(parent);
    }
  }
}

async function getAll<T>(collection: Collection<T>): Promise<documentId<T>[]> {
  const { lf } = collection;
  let collections: documentId<T>[] = [];
  return lf
    .iterate<T, void>((value, key) => {
      collections.push({
        ...value,
        _id: key,
      });
    })
    .then(() => collections);
}

async function getByKey<T>(collection: Collection<T>) {
  const { lf, _filter } = collection;
  return await lf.getItem(_filter?.id as string);
}

async function getByFilter<T>(collection: Collection<T>) {
  const { _filter } = collection;
  let star;
  let end;
  if (_filter) {
    star = _filter?.skip * _filter?.limit;
    end = star + _filter?.limit;
  }

  let collections = await getAll<T>(collection);

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

  if (star && end && star > 0 && end > 0) {
    return collections.slice(star, end);
  }
  return collections;
}
