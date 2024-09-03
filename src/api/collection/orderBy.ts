import Collection from "@/api/collection";

export default function orderBy<T>(
  collection: Collection<T>,
  orderBy: keyof T,
  order: "desc" | "asc" = "asc"
) {
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
      orderBy,
      order,
    };
  }
}