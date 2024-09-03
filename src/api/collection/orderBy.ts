import Collection from "@/api/collection";

export default function orderBy<T>(
  collection: Collection<T>,
  peroperty: keyof T,
  order?: "desc" | "asc"
) {
  collection._filter.orderBy = peroperty;
  if (order) {
    collection._filter.order = order;
  }
}
