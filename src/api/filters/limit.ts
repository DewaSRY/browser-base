import Collection from "@/api/selector/collection";

export default function limit<T>(collection: Collection<T>, number: number) {
  collection._filter.limit = number;
}
