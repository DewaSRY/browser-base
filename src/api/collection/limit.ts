import Collection from "@/api/collection";

export default function limit<T>(collection: Collection<T>, limit: number) {
  if (!collection._filter) {
    collection._filter = {
      limit: 0,
      skip: 0,
      orderBy: "",
      order: "",
      id: "",
    };
  } else {
    collection._filter = {
      ...collection._filter,
      limit,
    };
  }
}
