const express = require('express');
const request = require('request');

const app = express();

app.use(express.static("public"));  // using static file path
app.use(express.urlencoded({extended: true})); //
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.listen(process.env.PORT || 3000, function(){    //listening to dynamic port, local on 3000
  console.log("server is running on port 3000");
});

app.post("/", function(req, res){

  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  var data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName

    }
  }
  var jasonData = JSON.stringify(data);

  var options = {
      url: "https://us4.api.mailchimp.com/3.0/lists/f2e1bc19b4/members",
      method: "POST",
      headers: {
        "Authorization": "jason d62298aed9ebf008e63db26531a1c0d3-us4"
      },
      body: jasonData
  }

  request(options, function(error, response, body){

    if(error){
      res.sendFile(__dirname + "/failure.html");
    }
    else{
        if(response.statusCode !=200){
          res.sendFile(__dirname + "/failure.html");
        }
        else{
          res.sendFile(__dirname + "/success.html");
        }
    }

  })

});

app.post("/failure", function(req, res){

      res.redirect("/");

})

// List_id = f2e1bc19b4
// ApI key: d62298aed9ebf008e63db26531a1c0d3-us4
