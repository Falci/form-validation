(function () {

  'use strict';


  const removeErrors = () => {

  }

  const showSuccess = () => {

  }

  const createError =(filed, message) = {
    const error = document.createElement('span');
  }

  /**
   * Add a message to existing error span
   */
  const showErrors = (filed, message) => {
    const error = field.nextElementSibling;
    if(!error.tagName == 'SPAN'){
      return createError(field, message);
    }

    error.innerHTML = message;
  }

  /**
   * Returns true only if field has a value;
   */
  const notBlank = (field) => {
    return !!field.value;
  }
  notBlank.errorMessage = 'Required';

  /**
   * Returns true only if field is checked;
   */
  const checked = field => {
    return field.checked;
  }
  checked.errorMessage = 'Required';

  /**
   * Validate all forms fields
   */
  const validateForm = () => {
    const form = {
      'firstName': [notBlank],
      'lastName': [notBlank],
      'username': [notBlank],
      'email': [notBlank],
      'password': [notBlank],
      'terms': [checked]
    };

    for(let id in form){
      const field = document.querySelector(`#${id}`);
      const errors = form[id].filter(validator => validator(field))
        .map(validator => validator.errorMessage);

      if(errors.lenght){
        showErrors(field, errors);
      } else {
        removeErrors(field);
        showSuccess(field);
      }
    }
  }

  /**
   * Opens a popup when click on terms link;
   */
  const termsOnClick = event => {
    event.preventDefault();

    const width = 400,
      height = 300,
      top = window.screen.height/2 - height/2,
      left = window.screen.width/2 - width/2;

    window.open('../terms.html', 'terms', `width=${width},height=${height},top=${top},left=${left}`);
  }

  document.querySelector('#terms').addEventListener('click', termsOnClick, true);

})();
