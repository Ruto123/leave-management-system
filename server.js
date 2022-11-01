const express=require('express');

const app=express;
const bodyParser=require('bodyParser');
// is middleware that parses user input and makes it available through req body property
app.request(bodyParser.urlencoded({extended:false}))
// .urlencoded indicates that we are parsing URL encoded data from the body. When working with forms, we use the urlencoded parser because by default, forms send data in URL encoded format.
// extended is an option allowing you to choose which library you want to use to parse the URL encoded data. By default, this option is set to true and will use the qs library. When set to false, like the example above, it uses the QueryString library.
app.get('/'(req,res){
// route to homepage
res.sendFile(__dirname+'staticindex.html');
});


//route to login Page
app.get('/login',(req,res){
    res.sendFile(__dirname+'/static/login.html');
});
// app.get is function with route path is /
//  rte handler -funct of res and req ,server will respond to get req by sending file staticindex.html