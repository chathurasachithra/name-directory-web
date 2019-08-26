const moment = require('moment');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validationHelper = {

  validate: (validationRules, inputs, errors) => {

    let error = false;
    if (validationRules.required) {
      validationRules.required.map((inputKey) => {
        if ((!inputs[inputKey] || (inputs[inputKey] && String(inputs[inputKey]).trim() === '')) && !errors[inputKey].error) {
          const displayName = errors[inputKey].display.charAt(0).toUpperCase() + errors[inputKey].display.slice(1);
          errors[inputKey].error = displayName + ' cannot be empty';
          error = true;
        }
      });
    }
    if (validationRules.email) {
      validationRules.email.map((inputKey) => {
        if (inputs[inputKey] && !emailRegex.test(inputs[inputKey]) && !errors[inputKey].error) {
          errors[inputKey].error = 'Invalid ' + errors[inputKey].display;
          error = true;
        }
      });
    }
    if (validationRules.date) {
      validationRules.date.map((inputKey) => {
        if(inputs[inputKey] && !moment(inputs[inputKey]).isValid()) {
          errors[inputKey].error = 'Invalid ' + errors[inputKey].display;
          error = true;
        }
      });
    }
    return { error, errors };
  },

  reset: (errors) => {

    const keys = Object.keys(errors);
    keys.map((inputKey) => {
      errors[inputKey].error = null;
    });
    return errors;
  }
}

module.exports = validationHelper;