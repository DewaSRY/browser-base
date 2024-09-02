import Collection from "./collection";
import isSubSet from "./utils/isSubset";
import { documentId } from "./types";
export default class Document<T> {
  constructor(
    private collection: Collection<T>,
    private docSelectionCriteria: Partial<T>
  ) {}

  public async set(newDocument: Partial<T>) {
    const { lf } = this.collection;
    let docsToSets: documentId<T>[] = [];
    return lf
      .iterate((value, key) => {
        let data = JSON.parse(value as string) as T;
        if (isSubSet(data, this.docSelectionCriteria)) {
          docsToSets.push({ ...data, _id: key });
        }
      })
      .then(() => {
        docsToSets.forEach((doctToSet) => {
          lf.setItem(
            doctToSet._id,
            JSON.stringify({ ...doctToSet, ...newDocument })
          );
        });
      });
  }

  public async delete() {
    const { lf } = this.collection;
    let docsToSets: string[] = [];
    return lf
      .iterate((value, key) => {
        let data = JSON.parse(value as string) as T;
        if (isSubSet(data, this.docSelectionCriteria)) {
          docsToSets.push(key);
        }
      })
      .then(() => {
        docsToSets.forEach((key) => {
          lf.removeItem(key);
        });
      });
  }
}
