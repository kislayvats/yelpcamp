var mongoose=require("mongoose");
var campground=require("./models/campground");
var Comment =require("./models/comment");
var data=[
    {
        name:"camp 1",
        image:"https://images.rics.org/publishedmedia/282ryhj4rgsrvyihkd0o/tony-webster-97532-unsplash.jpg",
        description:"blah blah blah......"
    },
    {
        name:"camp 2",
        image:"https://121quotes.com/wp-content/uploads/2019/10/good-night-sweet-heart-love-you-image.jpg",
        description:"blah blah blah......"
    },
    {
         name:"camp 3",
        image:"https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
        description:"blah blah blah......"
    }
];
function seedDB(){
    //REMOVE ALL CAMPGROUND
    campground.remove({},function(error){
        if(error){
            console.log(error);
        }
        else{
            console.log("removed campgrounds");
           data.forEach(function(seed){
               campground.create(seed,function(error,data){
                   if(error){
                       console.log(error);
                   }
                   else{
                       console.log(data);
                   }
               
               //CREATE COMMENT
               Comment.create(
                   {
                       text:"This place is great but i wish there was internet",
                       author:"kislay"
                   },
                   function(error,comment){
                       if(error){
                           console.log(error);
                       }
                       else{
                           console.log(campground,comment);
                           campground.comments.push(comment._id);
                           campground.save(function(error,comment2){
                               if(error){
                                   console.log(error);
                               }
                               else{
                                console.log(comment2);
                               }
                           });
                           
                       }
                   }
               )
            });
           })
        }
    });     
}

module.exports=seedDB;
 


