import Collection from "@/api/collection";
import { documentId } from "@/types";
/**
 *
 * @param collection
 * @param data
 * @param key
 * @returns
 */
export default async function add<T>(
  collection: Collection<T>,
  data: T,
  key?: string
): Promise<documentId<T>> {
  const { lf } = collection;
  return new Promise((resolve, _reject) => {
    if (!key) {
      key = crypto.randomUUID();
    }
    return lf
      .setItem(key, data)
      .then(() => resolve({ ...data, _id: key as string }))
      .catch((_err) => {});
  });
}
