import Collection from "@/api/selector/collection";

import { documentId } from "@/types";
/**
 * this is add factory use to adding data to index db
 * @param collection
 * @param data
 * @param key
 * @returns Promise<T>
 */
export default async function add<T>(
  collection: Collection<T>,
  data: T,
  key?: string
): Promise<documentId<T>> {
  const { lf, _browserBase, collectionName } = collection;
  if (!key) {
    key = crypto.randomUUID();
  }
  return new Promise(async (resolve, _reject) => {
    return await lf
      .setItem(key, data)
      .then((value) => {
        _browserBase._logger.log(`adding to  ${collectionName} `, {
          ...value,
          key,
        } as Object);
        return resolve({ ...value, _id: key as string });
      })
      .catch((_err) => {
        _browserBase._logger.error(
          `failed to add to  ${collectionName} `,
          data as Object
        );
      });
  });
}
