const validate = values => {
  const x = document.getElementsByTagName('input');
  const arrayOfInputNames = [];

  for (const i in x) {
    arrayOfInputNames.push(x[i].name);
  }

  // HACK
  const optionals = [
    'email',
    'phone_number',
    'email_phone_can_be_used',
    'lived_with_partner',
  ];

  const errors = {};
  arrayOfInputNames.forEach(item => {
    if (!values[item] && !optionals.includes(item)) {
      errors[item] = 'This is a required field, please provide an answer';
    }

    // Custom errors
  });
  return errors;
};

export default validate;
