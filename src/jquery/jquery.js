(function () {

  'use strict';

  /**
   * Create a span.text-danger next to field group
   */
  const createError = ($field) => {
    return $('<span>')
      .addClass('text-danger')
      .insertAfter($field.parent());
  }

  /**
   * Remove the span.text-danger next to field group.
   */
  const removeErrors = $field => {
    const $error = $field.parent().next();

    if($error.prop('tagName') === 'SPAN'){
      $error.remove();
    }

    $field.parent().removeClass('has-error');
  }

  /**
   * Makes the field group green
   */
  const showSuccess = $field => {
    $field.parent().addClass('has-success');
  }

  /**
   * Add a message to existing error span
   */
  const showErrors = ($field, message) => {
    const $group = $field.parent();
    let $error = $group.next();

    if($error.prop('tagName') !== 'SPAN'){
      $error = createError($field);
    }

    $group.addClass('has-error');
    $error.html(message.join('<br />'));
  }

  /**
   * Returns true only if field has a value;
   */
  const notBlank = $field => {
    return !!$field.val();
  }
  notBlank.errorMessage = 'Required';

  /**
   * Validate if the value matches with email regex
   * @see http://emailregex.com/
   */
  const emailRegex = $field => {
    return $field.val().match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  }
  emailRegex.errorMessage = 'Must to be an email';

  /**
   * Returns true only if field is checked;
   */
  const checked = $field => {
    return $field.is(':checked');
  }
  checked.errorMessage = 'Required';

  /**
   * Validate all forms fields
   */
  const validateForm = e => {
    const form = {
      'firstName': [notBlank],
      'lastName': [notBlank],
      'username': [notBlank],
      'email': [notBlank, emailRegex],
      'password': [notBlank],
      'termsCheck': [checked]
    };

    for(let id in form){
      const $field = $(`#${id}`);
      const errors = form[id].filter(validator => !validator($field))
        .map(validator => validator.errorMessage);

      if(errors.length){
        showErrors($field, errors);
        e.preventDefault();
      } else {
        removeErrors($field);
        showSuccess($field);
      }
    }
  }

  $('form').on('submit', validateForm);

  $('#showPassword').on('change', e => {
    $('#password').attr('type', e.target.checked ? 'text' : 'password')
  })

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

  $('#terms').on('click', termsOnClick);

})();
