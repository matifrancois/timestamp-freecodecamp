
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  let now = new Date();

  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  });
});


app.get("/api/:date_string", function (req, res) {
  let dateString = req.params.date_string;
  console.log(dateString);
  if(parseInt(dateString) > 10000){
    let unixTime = new Date(parseInt(dateString));
    console.log(unixTime);
    res.json({
      "unix": unixTime.getTime(),
      "utc": unixTime.toUTCString()
    });
  }else{

    let Value = new Date(dateString);

    if(Value == "Invalid Date"){
      res.json({"error": "invalid Date"});
    } else{
      res.json({
        "unix": Value.getTime(),
        "utc": Value.toUTCString()
      })
    }
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
