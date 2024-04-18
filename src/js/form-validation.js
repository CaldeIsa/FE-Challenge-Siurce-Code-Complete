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
  var inputEmail = document.getElementById('email-search-input');
  var inputPhone = document.getElementById('phone-search-input');
  
  document.querySelectorAll('input[type="text"]').forEach(function (input) {
    input.addEventListener('keypress', function (event) {

      if (inputEmail.style.display == 'block') {
        const email = input.value.toLowerCase();
        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (email.match(regEx)) {
          input.parentNode.classList.remove('error-email');
          document.querySelector('.error-msg').style.display = 'none';
        } else {
          input.parentNode.classList.add('error-email');
          document.querySelector('.error-msg').style.display = 'block';

        }
      }
      if(inputPhone.style.display=='block') {
        
        const phone = input.value;
        const regEx = /^[0-9]{10}$/; 
        if (phone.match(regEx)) {
          input.parentNode.classList.remove('error-phone');
          document.querySelector('.error-msg2').style.display = 'none';
          
        } else {
          input.parentNode.classList.add('error-phone');
          document.querySelector('.error-msg2').style.display = 'block';
          console.log("entra");
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
      const phoneInput = document.getElementById(`phone-${selector}-input`);
      const email = emailInput.value.toLowerCase();
      const phone = phoneInput.value;

      if (emailInput.style.display == 'block') {
        const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!email.match(regExEmail)) {
          emailInput.parentNode.classList.add('error-email');
          document.querySelector('.error-msg').style.display = 'block';
          return;
        }
      }

      if (phoneInput.style.display == 'block') {
        const regExPhone = /^[0-9]{10}$/; 
        if (!phone.match(regExPhone)) {
          phoneInput.parentNode.classList.add('error-phone');
          document.querySelector('.error-msg2').style.display = 'block';
          return;
        }
      }

      const proxyurl = '';
      let url;
      if (inputEmail.style.display == 'block') {
        url = 'https://ltvdataapi.devltv.co/api/v1/records?email=' + email;
      } else if (inputPhone.style.display == 'block') {
        url = 'https://ltvdataapi.devltv.co/api/v1/records?phone=' + phone;
      }

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
    });
  });
}


document.getElementById('email-btn').addEventListener('click', function() {
  const emailInput = document.getElementById('email-search-input');
  const phoneInput = document.getElementById('phone-search-input');

  emailInput.style.display = 'block';
  phoneInput.style.display = 'none';
  emailInput.value = ''; 
  phoneInput.value = ''; 
  emailInput.parentNode.classList.remove('error-email');
  phoneInput.parentNode.classList.remove('error-phone');
  document.querySelector('.error-msg').style.display = 'none'; 
  document.querySelector('.error-msg2').style.display = 'none'; 
  document.getElementById('email-btn').classList.remove('btn-secondary');
  document.getElementById('email-btn').classList.add('btn-primary');
  document.getElementById('phone-btn').classList.remove('btn-primary');
  document.getElementById('phone-btn').classList.add('btn-secondary');
  document.getElementById('btn-go').style.display = 'block';
});

document.getElementById('phone-btn').addEventListener('click', function() {
  const emailInput = document.getElementById('email-search-input');
  const phoneInput = document.getElementById('phone-search-input');

  emailInput.style.display = 'none';
  phoneInput.style.display = 'block';
  emailInput.value = ''; 
  phoneInput.value = ''; 
  emailInput.parentNode.classList.remove('error-email');
  phoneInput.parentNode.classList.remove('error-phone');
  document.querySelector('.error-msg').style.display = 'none'; 
  document.querySelector('.error-msg2').style.display = 'none'; 
  document.getElementById('email-btn').classList.remove('btn-primary');
  document.getElementById('email-btn').classList.add('btn-secondary');
  document.getElementById('phone-btn').classList.remove('btn-secondary');
  document.getElementById('phone-btn').classList.add('btn-primary');
  document.getElementById('btn-go').style.display = 'block';
});

export { initInputValidation, initSearchButton };
