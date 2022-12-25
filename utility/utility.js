export function $() {
  const self = {
    oneDay: 24 * 60 * 60 * 1000, // hours*minutes*seconds*milliseconds
    string: {
      capitalize: function (string) {
        return string.charAt(0).toUpperCase().concat(string.slice(1));
      },
      camelCaseToString: function (string) {
        return string.split(/(?=[A-Z])/).join(" ");
      },
    },
    array: {
      compact: function (value) {
        return Array.isArray(value) ? value.filter(Boolean) : [];
      },
    },
    object: {
      isUndefined: function (value) {
        return value === undefined;
      },
      isNullOrUndefined: function (value) {
        return value == null;
      },
      isObjectType: function (value) {
        return typeof value === "object";
      },
      isObject: function (value) {
        return (
          !self.isNullOrUndefined(value) &&
          !Array.isArray(value) &&
          self.isObjectType(value) &&
          !self.isDateObject(value)
        );
      },
      objectWithoutPropertiesLoose: function (source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }
        return target;
      },
      except: function (obj, properties) {
        const props = {};
        const rest = {};
        for (let key in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, key)) return;
          if (properties.indexOf(key) >= 0) {
            props[key] = obj[key];
          } else {
            rest[key] = obj[key];
          }
        }
        return [props, rest];
      },
    },
    number: {
      isAlphaNumericMaxLen: (string, length = null) => {
        const regex = new RegExp(
          `^[a-zA-Z0-9]${length ? `{${length}}` : "+"}$`
        );
        return regex.test(string);
      },
      isAlphaNumeric: function (string) {
        const regex = new RegExp(`/^[a-zA-Z0-9]+$/`);
        return regex.test(string);
      },
    },
    date: {
      isDateObject: function (value) {
        return value instanceof Date;
      },
      randomDate: function (start, end) {
            let diff = new Date(Date.parse(end)) - new Date(Date.parse(start))
            let newDiff = diff * Math.random()
            return new Date(Date.parse(start) + newDiff).toISOString().slice(0, 10)
    },
  };

  return self;
}
