const functions = require("firebase-functions");

const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
const mongoose=require("mongoose");

//app.use(express.static("public"));
app.set('views',"./views");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

mongoose.connect("mongodb+srv://admin-ashwin:admin@cluster0.qtcbu.mongodb.net/microp",{useNewUrlParser:true});
//mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});

const userSchema={
  email:String,
  password:String,
  name:String,
  address:String
};
const userSchema1={
  name:String,
  flatno:String,
  plant_type:String,
  no_plant:String,
  token:String
};
const UserInfo=new mongoose.model("Userdata",userSchema1);
const User= new mongoose.model("User",userSchema);

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

////////////////////////////////////////////////
app.get("/login",function(req,res){
  res.render("login");
})

app.get("/faq",function(req,res){
  res.render("faq");
});
app.get("/dashboard",function(req,res){
  res.sendFile(__dirname+"/dashboard.html");
});
app.get("/register",function(req,res){
  res.render("register");
})

app.get("/newindex.html",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

// app.get("/sucess",function(req,res){
//   res.render("sucess");
// })
app.get("/dashboard.html",function(req,res){
  res.sendFile(__dirname+"/dashboard.html");
})

// app.get("/dashboard",function(req,res){
//   res.sendFile(process.env.PWD+"/dashboard.html");
// })
app.get("/image.html",function(req,res){
  res.sendFile(__dirname+"/image.html");
})
app.post("/image.html",function(req,res){
  res.sendFile(__dirname+"/image.html");
})

app.get("/index.html",function(req,res){
  res.sendFile(process.env.PWD+"/public/index.html");
})

app.get("/marketplace.html",function(req,res){
  res.sendFile(process.env.PWD+"/public/marketplace.html");
})

app.get("/lead.html",function(req,res){
  res.sendFile(process.env.PWD+"/public/lead.html");
})

app.post("/sucess",function(req,res){
  res.render("login");
})

var name1,email1;
app.post("/register",function(req,res)
{
  const name=req.body.name;
  const email=req.body.username;
  const password=req.body.password;
  const address=req.body.address;
  //console.log(email);
  //console.log(password);
  //console.log(name);
  const user=new User({
    email:email,
    password:password,
    name:name,
    address:address
  });
  // var tok=(Math.floor(Math.random()*11)).toString();
  // console.log(tok);
  // const userinfo=new UserInfo({
  //   name:name,
  //   address:address,
  //   plant_type:"Vegetables",
  //   no_plant:"4",
  //   token:tok;
  // })
  user.save();
  //userinfo.save();
  //res.sendFile(__dirname+"/sucess.html");
  res.render("sucess");
})

app.post("/dashboard",function(req,res){
  const email=req.body.username;
  const password=req.body.password;
  //console.log(email);
  //console.log(password);
  User.find({},function(er,foundItems)
  {
    if(er){
      console.log("Error")
    }
    else{
      console.log("Inside else");
        //console.log(foundItems);
        foundItems.forEach(function(item){
          if(item.email==email){
            console.log("Inside if");
            if(item.password==password){
              name1=item.name;
              console.log(name1);
              email1=item.email;
              console.log(email);
                res.sendFile(__dirname+"/dashboard.html");;
            }
            //redirect to dashboard
            //res.sendFile(process.env.PWD+"/public/dashboard.html");
          }
          else
          {
            //document.getElementById("incorect").innerHTML = "Incorrect username/password!!";
          }
        });
      }
    })
  })


exports.app = functions.https.onRequest(app);
