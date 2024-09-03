import Collection from "@/api/collection";

export default function byId<T>(collection: Collection<T>, id: string) {
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
    id,
  };
}
