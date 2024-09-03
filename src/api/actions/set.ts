import Collection from "@/api/collection";
// import BrowserBase from "@/browser-base";

export default function set<T>(collection: Collection<T>, object: Partial<T>) {
  const { _filter, lf } = collection;
  if (!_filter) return;
  let prevobject: T | null = null;
  lf.iterate<T, void>((velue, key) => {
    if (key === _filter.id) {
      prevobject = velue;
    }
  });
  if (prevobject) {
    lf.setItem<T>(_filter.id, {
      ...(prevobject as T),
      object,
    });
  }
}
