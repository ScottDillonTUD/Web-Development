// Accessible, non-color-dependent client-side validation for contact form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    reason: document.getElementById('reason'),
    message: document.getElementById('message')
  };

  const errorsContainer = document.getElementById('formErrors');

  function showFieldError(fieldEl, msg) {
    const err = document.getElementById(fieldEl.id + 'Error');
    if (err) {
      err.textContent = 'Error: ' + msg; // text cue, not just color
      err.hidden = false;
    }
    fieldEl.classList.add('input-invalid');
  }

  function clearFieldError(fieldEl) {
    const err = document.getElementById(fieldEl.id + 'Error');
    if (err) {
      err.textContent = '';
      err.hidden = true;
    }
    fieldEl.classList.remove('input-invalid');
  }

  function clearAllErrors() {
    Object.values(fields).forEach(f => clearFieldError(f));
    errorsContainer.innerHTML = '';
    errorsContainer.hidden = true;
  }

  function validEmail(v) {
    return /\S+@\S+\.\S+/.test(v);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAllErrors();

    const errorList = [];

    // First name
    if (!fields.firstName.value || !fields.firstName.value.trim()) {
      errorList.push({ field: fields.firstName, msg: 'Please enter your first name.' });
    }

    // Last name
    if (!fields.lastName.value || !fields.lastName.value.trim()) {
      errorList.push({ field: fields.lastName, msg: 'Please enter your last name.' });
    }

    // Email
    const emailVal = fields.email.value || '';
    if (!emailVal.trim()) {
      errorList.push({ field: fields.email, msg: 'Please enter your email address.' });
    } else if (!validEmail(emailVal.trim())) {
      errorList.push({ field: fields.email, msg: 'Please enter a valid email address (for example: name@example.com).' });
    }

    // Reason
    if (!fields.reason.value) {
      errorList.push({ field: fields.reason, msg: 'Please select a reason for your inquiry.' });
    }

    // Message (minimum length to ensure meaningful input)
    const messageVal = fields.message.value || '';
    if (!messageVal.trim()) {
      errorList.push({ field: fields.message, msg: 'Please enter a message.' });
    } else if (messageVal.trim().length < 10) {
      errorList.push({ field: fields.message, msg: 'Message is too short — please provide more details (at least 10 characters).' });
    }

    if (errorList.length) {
      // Build accessible error summary
      const heading = document.createElement('div');
      heading.className = 'error-heading';
      heading.textContent = 'There are problems with your submission:';

      const ul = document.createElement('ul');
      ul.style.margin = '0';
      ul.style.paddingLeft = '20px';

      errorList.forEach(item => {
        showFieldError(item.field, item.msg);
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + item.field.id;
        a.textContent = item.msg;
        a.addEventListener('click', function (ev) {
          ev.preventDefault();
          item.field.focus();
        });
        li.appendChild(a);
        ul.appendChild(li);
      });

      errorsContainer.innerHTML = '';
      errorsContainer.appendChild(heading);
      errorsContainer.appendChild(ul);
      errorsContainer.hidden = false;

      // Focus first invalid field
      errorList[0].field.focus();
      return false;
    }

    // If validation passes: simulate submission (demo). Replace with real POST as needed.
    errorsContainer.innerHTML = '';
    const success = document.createElement('div');
    success.textContent = 'Thanks — your message has been submitted.';
    success.style.fontWeight = '700';
    errorsContainer.appendChild(success);
    errorsContainer.hidden = false;

    // Optionally send to server here using fetch, then show server response.
    // For demo we reset after a short delay so screen readers can read the success text.
    setTimeout(() => {
      form.reset();
      clearAllErrors();
    }, 1000);

    return true;
  });

  // Clear field error when user types
  Object.values(fields).forEach(f => {
    f.addEventListener('input', function () { clearFieldError(f); });
    f.addEventListener('change', function () { clearFieldError(f); });
  });
});
