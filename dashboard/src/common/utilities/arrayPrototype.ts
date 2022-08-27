import { faNumberToEnNumber } from './faNumberToEnNumber';

Array.prototype.search = function (
  filterData: any,
  exactKeys: string[] = []
): any[] {
  const exactKeysSet = new Set(exactKeys);
  return this.filter((item) => {
    let isValid = true;
    for (const key in filterData) {
      if (!filterData[key] && filterData[key] !== false) continue;
      const searchingValue = faNumberToEnNumber(
        filterData[key]?.toString()
      ).toLowerCase();
      const lowerCaseItem = item[key].toString().toLowerCase();

      if (searchingValue && item) {
        isValid = exactKeysSet.has(key)
          ? lowerCaseItem === searchingValue
          : lowerCaseItem.includes(searchingValue);
        if (!isValid) break;
      }
    }

    return isValid;
  });
};

Array.prototype.paginate = function (page = 1, perPage = 10): any[] {
  return this.slice((page - 1) * perPage, page * perPage);
};

Array.prototype.addOrder = function (): any[] {
  return this.map((item, index): any => ({ order: index + 1, ...item }));
};
