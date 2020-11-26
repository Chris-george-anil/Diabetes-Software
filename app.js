const express=require("express");
const bodyparser=require("body-parser");
const path=require("path");
const app=express();
const ejs = require("ejs");
const tf = require('@tensorflow/tfjs');

var details=[];
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
});
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');


// app.get("/features",function(req,res){
//   res.render("features");
// })

app.get('/:name', function (req, res, next) {
  var options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    }
    else {
      console.log('Sent:', fileName)
    }
  })
})
app.post("/",function(req,res){
  var details=[req.body.Pregnancies,req.body.Glucose,req.body.BP,req.body.Skin,req.body.Insulin,req.body.BMI,req.body.DPF,req.body.Age];
  console.log(details);
  res.render("result",{details:details});
});


app.listen(3000,function(){
  console.log("3000");
});
