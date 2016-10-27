(function () {

  'use strict';

  /**
   * Create a span.text-danger next to field group
   */
  const createError = (field) => {
    const error = document.createElement('span');
    error.className = 'text-danger';

    const node = field.parentNode;
    node.parentNode.insertBefore(error, node.nextSibling);

    return error;
  }

  /**
   * Remove the span.text-danger next to field group.
   */
  const removeErrors = field => {
    const error = field.parentNode.nextSibling;
    if(error.tagName === 'SPAN'){
      error.remove();
    }

    removeClass(field.parentNode, 'has-error')
  }

  /**
   * Makes the field group green
   */
  const showSuccess = field => {
    addClass(field.parentNode, 'has-success');
  }

  /**
   * Add a message to existing error span
   */
  const showErrors = (field, message) => {
    const group = field.parentNode;
    let error = group.nextSibling;

    if(error.tagName !== 'SPAN'){
      error = createError(field);
    }

    addClass(group, 'has-error');
    error.innerHTML = message.join('<br />');
  }

  /**
   *  Remove a css class by name
   */
  const removeClass = (field, className) => {
    field.className = field.className.replace(className, '');
  }

  /**
   *  Add a css class by name
   */
  const addClass = (field, className) => {
    if(field.className.indexOf(className) === -1){
      field.className += ' ' + className;
    }
  }

  /**
   * Returns true only if field has a value;
   */
  const notBlank = (field) => {
    return !!field.value;
  }
  notBlank.errorMessage = 'Required';

  /**
   * Validate if the value matches with email regex
   * @see http://emailregex.com/
   */
  const emailRegex = field => {
    return field.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  }
  emailRegex.errorMessage = 'Must to be an email';

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
  const validateForm = e => {
    e.preventDefault();

    const form = {
      'firstName': [notBlank],
      'lastName': [notBlank],
      'username': [notBlank],
      'email': [notBlank, emailRegex],
      'password': [notBlank],
      'termsCheck': [checked]
    };

    for(let id in form){
      const field = document.querySelector(`#${id}`);
      const errors = form[id].filter(validator => !validator(field))
        .map(validator => validator.errorMessage);

      if(errors.length){
        showErrors(field, errors);
      } else {
        removeErrors(field);
        showSuccess(field);
      }
    }
  }

  document.querySelector('form').addEventListener('submit', validateForm, true);

  const onShowPassword = e => {
    document.querySelector('#password').type = e.target.checked ? 'text' : 'password';
  }

  document.querySelector('#showPassword').addEventListener('change', onShowPassword, true);

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
