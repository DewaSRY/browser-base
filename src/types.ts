// export interface documentId {
//   _id: string;
// }

export type documentId<T> = T & {
  _id: string;
};
