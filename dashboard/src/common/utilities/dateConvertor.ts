import moment from 'jalali-moment';

export const georgianToJalali = (date: string, format = 'YYYY-MM-DDTHH:mm:ssZ') => {
  moment.locale('fa');
  const res = moment.from(date, 'en', format).format('jYYYY/jMM/jDD');
  return res;
};

export const jalaliToGeorgian = (date: string, format = 'YYYY/MM/DD') => {
  moment.locale('en');
  const res = moment.from(date, 'fa', format).format('YYYY-MM-DD');
  return res;
};
