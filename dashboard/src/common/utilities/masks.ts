export const numbersMask = /[^0-9۱۲۳۴۵۶۷۸۹۰]/g;
export const timeMask = /[^0-9۱۲۳۴۵۶۷۸۹۰:]/g;
export const farsiCharactersMask = /[^ؤئيإأآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]/g;
export const seriMask =
  /[^ؤئيإأآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\/0-9۱۲۳۴۵۶۷۸۹۰]/g;

export const numbersOnly = (str: string): string =>
  str.replace(numbersMask, '');
export const timeOnly = (str: string): string => str.replace(timeMask, '');
export const farsiCharactersOnly = (str: string): string =>
  str.replace(farsiCharactersMask, '');
export const seriOnly = (str: string): string => str.replace(seriMask, '');
