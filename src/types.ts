/**
 * documentId is decorator for interface you pass on collection
 */
export type documentId<T> = T & {
  _id: string;
};

export type CollectionFilter<T> = {
  limit: number;
  skip: number;
  orderBy: keyof T | "";
  order: "desc" | "asc" | "";
  id: string;
};
