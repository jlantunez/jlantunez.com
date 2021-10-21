module.exports = function newlineToBr(string, asParagraphs = true) {
  const result = string.replace(/\r?\n/g, '<br />').split('<br /><br />');

  if (asParagraphs) {
    return result.reduce((acc, current) => `${acc}<p>${current}</p>`, '');
  }

  return result;
};
