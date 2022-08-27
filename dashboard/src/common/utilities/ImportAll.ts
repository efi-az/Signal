export function importAll(r: any): any {
  const cache: any = {};
  for (const key in r) {
    cache[key] = r[key].default
  }
  return cache;
}
