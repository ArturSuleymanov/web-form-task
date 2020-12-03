function timestamp() { 
  var response = document.getElementById("g-recaptcha-response"); 

  if (response == null || response.value.trim() == "") {
    var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
    elems["ts"] = JSON.stringify(new Date().getTime());
    document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems);
  } 
}

setInterval(timestamp, 500); 

function checkRecaptcha() {
  document.getElementById("qwerty").addEventListener("submit", function(evt) {
   
    var response = grecaptcha.getResponse();
    
    if(response.length == 0) {
      alert("Please, complete captcha validation!"); 
      evt.preventDefault();
      return false;
    }
     
  });
}

setTimeout(checkRecaptcha, 0);

function checkvalidity(elem) {
  var isValid = true;

  if (elem.id === '00N5g000000iJhE') {
    if (elem.value.trim()) {
      if (!isValidDate(elem.value)) {
        elem.classList.add('has-error');
        isValid = false;
      } else {
        elem.classList.remove('has-error');
      }
    } else {
      elem.classList.remove('has-error');
    }
  } else if (elem.id === 'url') {
      if (elem.value.trim()) {
        if (!isValidUrl(elem.value)) {
          elem.classList.add('has-error');
          isValid = false;
        } else {
          elem.classList.remove('has-error');
        }
      } else {
        elem.classList.remove('has-error');
      }
  } else if (!elem.value.trim()) {
    elem.classList.add('has-error');
    isValid = false;
  } else if (elem.id === 'email' && !isValidEmail(elem.value)) {
    elem.classList.add('has-error');
    isValid = false;
  } else {
    elem.classList.remove('has-error');
  }
  
  return isValid;
}

function isValidEmail(email) {
  return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
}

function isValidDate(date) {
  var a = String(new Date().getFullYear() - 18).slice(-1);
  var regExpDate = new RegExp("^(0?[1-9]{1}|1[012])\\/(0?[1-9]|1[0-9]|2[0-9]|3[01])\\/(19\\d\\d|200[0-" + a + "]{1})$");
  return regExpDate.test(date);
}

function isValidUrl(url) {
  return /^((https?|ftp)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/.test(url);
}

function ischecked(elem) {
  var section = document.getElementById("shipping-address");

  if (elem.checked) {
    section.style.display = 'flex';
  } else {
    section.style.display = 'none';
  }
}

function clickpage(button) {
  var firstSection = document.getElementById("company-info");
  var secondSection = document.getElementById("billing-address");
  var thirdSection = document.getElementById("summary-info");
  var isValid = true;
  
  if (button.value === 'Next') {
    if (firstSection.style.display === 'none') {
      for (var elem of secondSection.querySelectorAll('.web-form-section-field.important')) {
        validity = checkvalidity(elem);
        isValid = validity ? isValid : validity;
      }

      if (isValid) {
        secondSection.style.display = 'none';
        thirdSection.style.display = 'flex';
        setsummaryinfo();
      }
    } else {
      for (var elem of firstSection.querySelectorAll('.web-form-section-field.important')) {
        validity = checkvalidity(elem);
        isValid = validity ? isValid : validity;
      }

      if (isValid) {
        firstSection.style.display = 'none';
        secondSection.style.display = 'flex';
      }
    }
  } else {
    if (secondSection.style.display === 'none') {
      secondSection.style.display = 'flex';
      thirdSection.style.display = 'none';
    } else {
      firstSection.style.display = 'flex';
      secondSection.style.display = 'none';
    }
  }

}

function setsummaryinfo() {
  var fields = document.querySelectorAll('.web-form-field');
  var summarydivs = document.querySelectorAll('.web-form-section-summary-field');

  for (var i = 0; i < fields.length; i++) {
    var label = fields[i].children[0].innerHTML;
    var input = fields[i].children[1];
    var value;
    
    if (input.children.length) {
      value = input.children[0].value + ' ' + input.children[1].value;
    } else {
      value = input.value;
    }

    if (value) {
      summarydivs[i].innerHTML = '<span>' + label + '</span><span>' + value + '</span>';
      summarydivs[i].style.margin = '6px 0px 8px 6px';
    }
  }
}