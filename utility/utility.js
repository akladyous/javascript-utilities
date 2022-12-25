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
      sample(array) {
        return array[Math.floor(Math.random() * array.length)];
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
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
    },
    date: {
      isDateObject: function (value) {
        return value instanceof Date;
      },
      isValidDate: function (dateISOstring) {
        if (!isNaN(Date.parse(dateISOstring))) {
          return true;
        } else return false;
      },
      isValidDateAsync: async function (dateISOstring, customMsg) {
        return new Promise((resolve, reject) => {
          if (!isNaN(Date.parse(dateISOstring))) {
            resolve(dateISOstring);
          } else {
            reject(customMsg);
          }
        });
      },
      randomDate: function (startDate, endDate) {
        let diff =
          new Date(Date.parse(endDate)) - new Date(Date.parse(startDate));
        let newDiff = diff * Math.random();
        return new Date(Date.parse(startDate) + newDiff)
          .toISOString()
          .slice(0, 10);
      },
      monthDiff: function (startDate, endDate) {
        return (
          new Date(Date.parse(endDate)).getMonth() +
          1 -
          (new Date(Date.parse(startDate)).getMonth() + 1)
        );
      },
      dayDiff: function (startDate, endDate) {
        const d1 = new Date(startDate);
        const d2 = new Date(endDate);
        return Math.round(Math.abs(d1 - d2) / this.oneDay) + 1;
      },
      listFromDateRange: function (startDate, endDate) {
        var listDate = [];
        var dateMove = new Date(startDate);
        let strDate = startDate;

        while (strDate < endDate) {
          strDate = dateMove.toISOString().slice(0, 10);
          listDate.push(strDate);
          dateMove.setDate(dateMove.getDate() + 1);
        }
        return listDate;
      },
      isValidDateRange: async function (
        startDateISOstring,
        endDateISOstring,
        customMsg
      ) {
        return new Promise((resolve, reject) => {
          if (
            new Date(endDateISOstring).valueOf() < new Date(startDateISOstring)
          ) {
            reject(customMsg);
          } else {
            resolve(true);
          }
        });
      },
      isDateInRange: function (startDate, endDate, checkDate) {
        const start = Date.parse(startDate);
        const end = Date.parse(endDate);
        const check = Date.parse(checkDate);
        if (check <= end && check >= start) {
          return true;
        }
        return false;
      },
    },
  };

  return self;
}
