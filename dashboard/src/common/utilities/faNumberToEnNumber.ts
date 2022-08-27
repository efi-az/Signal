const numbers: any = {
  '۰': 0,
  '۱': 1,
  '۲': 2,
  '۳': 3,
  '۴': 4,
  '۵': 5,
  '۶': 6,
  '۷': 7,
  '۸': 8,
  '۹': 9
};

export const faNumberToEnNumber = (value?: string): string => {
  if (!value) return '';

  return value
    .toString()
    .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (char) => numbers[char] as string);
};
