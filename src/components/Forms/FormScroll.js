import { scroller } from 'react-scroll';

export const scrollToFirstError = errors => {
  const errorFields = getErrorFieldNames(errors);
  for (let i = 0; i < errorFields.length; i++) {
    const fieldName = errorFields[i];
    if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
      scroller.scrollTo(fieldName, { offset: -200, smooth: true });
      break;
    }
  }
};

const getErrorFieldNames = (obj, name = '') => {
  const errorArr = [];
  errorArr.push(
    Object.keys(obj)
      .map(key => {
        const next = obj[key];
        if (next) {
          if (typeof next === 'string') {
            return name + key;
          }
          if (next.map) {
            errorArr.push(
              next
                .map((item, index) =>
                  getErrorFieldNames(item, `${name}${key}[${index}].`),
                )
                .filter(o => o),
            );
          }
        }
        return null;
      })
      .filter(o => o),
  );
  return flatten(errorArr);
};

const flatten = arr => {
  return arr.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    [],
  );
};
