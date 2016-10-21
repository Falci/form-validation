(function () {

  'use strict';

  const createError =(filed, message) = {
    const error = document.createElement('span');
  }

  /**
   * Add a message to existing error span
   */
  const placeError = (filed, message) => {
    const error = field.nextElementSibling;
    if(!error.tagName == 'SPAN'){
      return createError(field, message);
    }

    error.innerHTML = message;
  }

  /**
   * Validates if field has a value;
   */
  const notBlank = (field) => {
    const onChange = event => {
      return !!event.target.value;
    }
  }

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
