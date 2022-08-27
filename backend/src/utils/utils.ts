const randomstring = require('randomstring')

export const generateRandomString = (length: number) => {
  return randomstring.generate({
    length: length,
    charset: 'alphabetic'
  });
}
