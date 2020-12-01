var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(process.cwd(), 'source')));
console.log(process.env.PORT || 5000);
app.listen(process.env.PORT || 5000);

/* function timestamp() { 
    var response = document.getElementById("g-recaptcha-response"); 
    
    if (response == null || response.value.trim() == "") {
        var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
        elems["ts"] = JSON.stringify(new Date().getTime());
        document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems); 
       } 
   } setInterval(timestamp, 500);  */