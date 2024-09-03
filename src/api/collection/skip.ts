import Collection from "@/api/collection";

export default function skip<T>(collection: Collection<T>, number: number) {
  collection._filter.skip = number;
}
