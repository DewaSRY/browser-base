import Collection from "@/api/collection";

export default function skip<T>(collection: Collection<T>, skip: number) {
  if (!collection._filter) {
    collection._filter = {
      limit: 0,
      skip: 0,
      orderBy: "",
      order: "",
      id: "",
    };
  }

  collection._filter = {
    ...collection._filter,
    skip,
  };
}
