  // connect to database
  var express=require("express"),
  mongoose=require("mongoose"),
  passport=require("passport"),
  bodyParser=require("body-parser"),
  localStrategy=require("passport-local"),
  passportlocalMongoose=require("passport-local-mongoose"),
  user=require("./models/user");

  mongoose.set('useNewUrlParser',true);
  mongoose.set('useFindAndModify',false)
  mongoose.set('useCreateIndex',true)
  mongoose.set('useUnifiedTopology',true)
  mongoose.connect("mongodb://localhost/auth demo app");

  var app = express();
  app.set("view engine","ejs");
  app.use(bodyParser.urlencoded({extended:true}));

  app.use(require("express-session")({
      secret:"Bosco is a dog",
      resave:false,
      saveUninitialized:false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new localStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

// routes

const express=require('express');

const app=express;
const bodyParser=require('bodyParser');
// is middleware that parses user input and makes it available through req body property
app.request(bodyParser.urlencoded({extended:false}))
// .urlencoded indicates that we are parsing URL encoded data from the body. When working with forms, we use the urlencoded parser because by default, forms send data in URL encoded format.
// extended is an option allowing you to choose which library you want to use to parse the URL encoded data. By default, this option is set to true and will use the qs library. When set to false, like the example above, it uses the QueryString library.
app.get('/',function(req,res){
// route to homepage
res.sendFile(__dirname+'/static/index.html');
});


//route to login Page
app.get('/login',function(req,res){
    res.sendFile(__dirname+'/static/login.html');
});
// app.get is function with route path is /
//  rte handler -funct of res and req ,server will respond to get req by sending file staticindex.htmls

// user Login
app.post("/login",passport.authenticate(
"local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}),function(req,res){}
);

// user logout
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    res.redirect("/login")
    }

    // assign port
    var port =process.env.port
    app.listen(port,function(){
        console.log("server has started")
    });

    // showing secret
    app.get("/secret", isLoggedIn, function (req, res) {
        res.render("secret");
    });

    // Signup
    app.post("/register",function(req, res)
    {
        var username=req.body.username
        var password=req.body.password
        User.register(new User({username:username}),password, function (err,user){
            if(err){
                console.log(err);
                return res.render("register")
            }
            passport.authenticate("local")(req,res,function(){
                res.render("secret");
            });
        });
    });

  