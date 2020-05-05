var mongoose=require("mongoose");

var express=require("express");
var app=express();
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
var seedDB=require("./seeds");
seedDB(); 
mongoose.connect("mongodb://localhost:27017/yelpcampdb",{useNewUrlParser:true, useUnifiedTopology: true}, (error)=>{
    if(!error){
        console.log("success");
    }
    else{
        console.log("error in connecting");
    }
});

var campground=require("./models/campground")
//campground.create({
 //  name:"hill station",
//image:"https://www.shakushi-gc.com/wp-content/uploads/2019/06/facility_img.png",
//description:"SGBADs d dj jshj jsbqn hagdgs fyas gjqsqy td sf gdjhagd gua  y kuajsga dfgr"
//});


app.get("/",function(req,res){
res.render("landing");
});



var campgrounds=[
    {name:"camp1", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
    {name:"camp2", image:"https://storage.googleapis.com/ehimages/2019/8/9/img_28a96ae062739e258f6ade3b26851e7e_1565338740647_processed_original.jpg"},
    {name:"camp3", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/176/176776570.jpg"},
    {name:"camp4", image:"https://pawnacamp.com/wp-content/uploads/2018/10/Pawna-lake-camping-camp-E-.jpg"},
    {name:"camp1", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
    {name:"camp2", image:"https://storage.googleapis.com/ehimages/2019/8/9/img_28a96ae062739e258f6ade3b26851e7e_1565338740647_processed_original.jpg"},
    {name:"camp3", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/176/176776570.jpg"},
    {name:"camp4", image:"https://pawnacamp.com/wp-content/uploads/2018/10/Pawna-lake-camping-camp-E-.jpg"},
    {name:"camp1", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
    {name:"camp2", image:"https://storage.googleapis.com/ehimages/2019/8/9/img_28a96ae062739e258f6ade3b26851e7e_1565338740647_processed_original.jpg"},
    {name:"camp3", image:"https://q-cf.bstatic.com/images/hotel/max1024x768/176/176776570.jpg"},
    {name:"camp4", image:"https://pawnacamp.com/wp-content/uploads/2018/10/Pawna-lake-camping-camp-E-.jpg"}
];

// INDEX -show all campgrounds
app.get("/campgrounds",function(req,res){

//res.render("campgrounds",{campgrounds:campgrounds});

//get all the campgrounds from the database
campground.find({},function(err,allcampgrounds){
    if(err){
        console.log(err);
    }
    else{
        res.render("index",{campgrounds:allcampgrounds});
    }
})
});
//CREATE- add new campground to data base
app.post("/campgrounds",function(req,res){
var name=req.body.name;
var image=req.body.image;
var desc=req.body.description;
var arr={name:name,image:image,description:desc}
//campgrounds.push(arr);

//create a new campground and save to db
campground.create(arr,function(err,newlycreated){
    if(err){
        console.log(err);
    }
    else{
        res.redirect("/campgrounds");
    }
});

});
//NEW - show form to create new campground
app.get("/campgrounds/new",function(req,res){
res.render("new");
});
//SHOW- will show the info about the camp which is not on the index page
app.get("/campgrounds/:id",function(req,res){
    //find the campground with the provided id
    campground.findById(req.params.id,function(err,foundcampground){
if(err){
    console.log(err);
}
else{
    //render show template with that campground
    res.render("show",{campground:foundcampground});
}
    });
    
});
app.listen(3000,function(){
    console.log("Your server is at http://Localhost:3000");
});