const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
// static CSS and images
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
  //  res.send("MasoomBasha")

});

app.post("/", function(req, res) {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  //  console.log(fName, lName, email);
  // mailchimp
  const data = {
    members: [{
      /*string*/
      email_address: email,
      /*string*/
      status: "subscribed",
      /*object*/
      merge_fields: {
        FNAME: fName,
        LNAME: lName
      }

    }]
  };
  const jasonData = JSON.stringify(data);


  const url = "https://us14.api.mailchimp.com/3.0/lists/ff3f2ebc62";
  const options = {
    method: "POST",
    auth: "masoom1:43f04731b09c3144897c2907dc0802cb-us14"
  };
  const request = https.request(url, options, function(response) {

    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      // it will be executed if auth or url goes wrong
      res.sendFile(__dirname+"/filure.html")
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
    // status of the response
    console.log("your code status is : "+ response.statusCode);
  });
  request.write(jasonData);
  request.end();
});

app.post("/failure",function(req, res){
  res.redirect("/");
});

app.post("/success", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Your server is conntected to port 3000.");
});

// api key
//43f04731b09c3144897c2907dc0802cb-us14
