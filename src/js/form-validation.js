import { populateResultsData } from './results';

function showResultsSection() {
  const mainFormSection = document.getElementById('main-form');
  const searchAgainSection = document.getElementById('search-again');
  const featuresSection = document.getElementById('features');
  const resultsSection = document.getElementById('results');

  populateResultsData();

  mainFormSection.classList.add('d-none');
  featuresSection.classList.add('d-none');
  searchAgainSection.classList.remove('d-none');
  resultsSection.classList.remove('d-none');
}

function initInputValidation() {
  document.querySelectorAll('input[type="text"]').forEach(function (input) {
    input.addEventListener('keypress', function (event) {
      const email = input.value.toLowerCase();
      const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(regEx)) {
        var x = true;
        input.parentNode.classList.remove('error');
      } else {
        var x = false;
      }
      const keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode == '13') {
        event.preventDefault();
        localStorage.clear();

        if (x === true) {
          const proxyurl = '';
          const url = 'https://ltvdataapi.devltv.co/api/v1/records?email=' + email;
          fetch(proxyurl + url)
            .then(function (response) {
              return response.text();
            })
            .then(function (contents) {
              localStorage.setItem('userObject', contents);
              showResultsSection();
            })
            .catch(function (e) {
              console.log(e);
            });
        } else if (x !== true) {
          input.parentNode.classList.add('error');
        }
      }
    });
  });
}

function initSearchButton() {
  document.querySelectorAll('.js-btn-search').forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.clear(); // Clears storage for next request
      const selector = e.currentTarget.dataset.form;
      const emailInput = document.getElementById(`email-${selector}-input`);
      const email = emailInput.value.toLowerCase();

      let x;
      const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(regEx)) {
        x = true;
      } else {
        x = false;
      }

      if (x === true) {
        emailInput.parentNode.classList.remove('error');
        const proxyurl = '';
        const url = 'https://ltvdataapi.devltv.co/api/v1/records?email=' + email;
        fetch(proxyurl + url)
          .then(function (response) {
            return response.text();
          })
          .then(function (contents) {
            localStorage.setItem('userObject', contents);
            showResultsSection();
          })
          .catch(function (e) {
            console.log(e);
          });
      } else if (x !== true) {
        emailInput.parentNode.classList.add('error');
      }
    });
  });
}



document.getElementById('email-btn').addEventListener('click', function() {
  document.getElementById('email-search-input').style.display = 'block';
  document.getElementById('phone-search-input').style.display = 'none';
  document.getElementById('email-btn').classList.remove('btn-secondary');
  document.getElementById('email-btn').classList.add('btn-primary');
  document.getElementById('phone-btn').classList.remove('btn-primary');
  document.getElementById('phone-btn').classList.add('btn-secondary');
});

document.getElementById('phone-btn').addEventListener('click', function() {
  document.getElementById('email-search-input').style.display = 'none';
  document.getElementById('phone-search-input').style.display = 'block';
  document.getElementById('email-btn').classList.remove('btn-primary');
  document.getElementById('email-btn').classList.add('btn-secondary');
  document.getElementById('phone-btn').classList.remove('btn-secondary');
  document.getElementById('phone-btn').classList.add('btn-primary');
});

function initInputValidation2() {
  document.querySelectorAll('input[type="number"]').forEach(function (input) {
    input.addEventListener('keypress', function (event) {
      
      const phone = input.value;
      const regExDigits = /^\d{10}$/;

      if (phone.match(regExDigits)) {
        var x = true;
        input.parentNode.classList.remove('error2');
      } else {
        var x = false;
      }
      const keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode == '13') {
        event.preventDefault();
        localStorage.clear();

        if (x === true) {
          const proxyurl = '';
          const url = 'https://ltvdataapi.devltv.co/api/v1/records?=phone' + phone ;
          fetch(proxyurl + url)
            .then(function (response) {
              return response.text();
            })
            .then(function (contents) {
              localStorage.setItem('userObject', contents);
              showResultsSection();
            })
            .catch(function (e) {
              console.log(e);
            });
        } else if (x !== true) {
          input.parentNode.classList.add('error2');
        }
      }
    });
  });
}

function initPhoneSearchButton() {
  document.querySelectorAll('.js-btn-search-phone').forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.clear(); // Clears storage for next request
      const selector = e.currentTarget.dataset.form;
      const phoneInput = document.getElementById(`phone-${selector}-input`);
      const phone = phoneInput.value;

      let x;
      const regExDigits = /^\d{10}$/;
      if (phone.match(regExDigits)) {
        x = true;
      } else {
        x = false;
      }

      if (x === true) {
        phoneInput.parentNode.classList.remove('error2');
        const proxyurl = '';
        const url = 'https://ltvdataapi.devltv.co/api/v1/records?phone=' + phone;
        fetch(proxyurl + url)
          .then(function (response) {
            return response.text();
          })
          .then(function (contents) {
            localStorage.setItem('userObject', contents);
            showResultsSection();
          })
          .catch(function (e) {
            console.log(e);
          });
      } else if (x !== true) {
        phoneInput.parentNode.classList.add('error2');
      }
    });
  });
}

export { initInputValidation, initSearchButton };
