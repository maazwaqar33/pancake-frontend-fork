export const underscorize = string => {
  return string
    .replace(/[^A-Za-z0-9]/g, ' ')
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .join('_');
};

export const camelCaser = string => {
  if (string) {
    const splitStr = string.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join('');
  }
  return 'Unknown value';
};

export const removeUnderscore = string => {
  return (
    string.charAt(0).toUpperCase() +
    string
      .slice(1)
      .split('_')
      .join(' ')
  );
};
