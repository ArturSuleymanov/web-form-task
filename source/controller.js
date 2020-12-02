function timestamp() { 
    var response = document.getElementById("g-recaptcha-response"); 
    
    if (response == null || response.value.trim() == "") {
        var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
        elems["ts"] = JSON.stringify(new Date().getTime());
        document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems); 
       } 
   } setInterval(timestamp, 500); 

document.getElementById("web-form").addEventListener("submit",function(evt) {
   
   var response = grecaptcha.getResponse();
   if(response.length == 0) { 
     //reCaptcha not verified
     alert("Please, complete captcha validation!"); 
     evt.preventDefault();
     return false;
   }
   
 });