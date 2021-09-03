const DEFAULT_LANGUAGE = 'es';

function resolve(path, obj) {
  const properties = path.split('.');
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

module.exports = function i18n(object, property, language) {
  const defaultValue = resolve(property, object[DEFAULT_LANGUAGE]);

  if (language === DEFAULT_LANGUAGE) {
    return defaultValue;
  }

  const translatedString = resolve(property, object[language]);

  return translatedString || defaultValue;
};
