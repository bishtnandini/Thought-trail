const express= require("express");
const app= express();
const mongoose = require("mongoose");
const Listing=require("../New folder/models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
// const People=require("../New folder/models/people.js");



// const LogInCollection = require("./mongo")

 const MONGO_URL="mongodb://127.0.0.1:27017/atom";
 main()
 .then(()=>{
    console.log("connected to DB");
 })
 .catch((err)=>{
    console.log("err");
 });

 async function main(){
    await mongoose.connect(MONGO_URL);
 }

//  app.get("/test", async(req,res)=>{
//    let sampleListing =new Listing({
//     title:"heel",
//     desc:"hello",
//     aname:"hhh"

//    });

//    await sampleListing.save();
//    console.log("saved");
//    res.send("successful");
//  });


app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

 app.get("/",(req,res)=>{
    res.send("hello");
 });



//search bar 
app.get('/search', async (req, res) => {
   const query = req.query.q;

   if (!query) {
       return res.status(400).json({ error: 'Query parameter "q" is required.' });
   }

   try {
       const results = await Listing.find({ title: { $regex: query, $options: 'i' } });
       res.render("../views/listings/res.ejs",{results});
      //  res.json(results);
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});
// Route to find all posts with a specific description
app.get('/listings/education', async (req, res) => {
   try {
      const results = await Listing.find({ desc: { $regex: 'education', $options: 'i' } });
      
      res.render("../views/listings/education.ejs",{results});
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});

//article
app.get('/listings/Article', async (req, res) => {
   try {
      const allListings=await Listing.find({});
      res.render("../views/listings/index.ejs",{allListings});
   }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
//job
app.get('/listings/Job', async (req, res) => {
   try {
      const results = await Listing.find({ desc: { $regex: 'career', $options: 'i' } });
       const foundPosts = await Listing.find({ desc: 'education' });
      res.render("../views/listings/job.ejs",{results});
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});
//event
app.get('/listings/Event', async (req, res) => {
   try {
      const results = await Listing.find({ desc: { $regex: 'event', $options: 'i' } });
       const foundPosts = await Listing.find({ desc: 'education' });
      res.render("../views/listings/event.ejs",{results});
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});





// index route 
app.get("/listing", async(req,res)=>{
   const allListings=await Listing.find({});
   res.render("../views/listings/index.ejs",{allListings});
 });

 //new route
 app.get("/listings/new", async(req,res)=>{
   res.render("../views/listings/new.ejs")
 })

// show route 
 app.get("/listings/:id", async(req,res)=>{
let {id}= req.params;
const listing =await Listing.findById(id);
res.render("../views/listings/show.ejs",{listing});
 });

 //create route 
app.post("/listings", async(req,res)=>{
   // let listing =req.body;
   // console.log(listing);
   const newListing = new Listing(req.body.listing);
   console.log(newListing);
   await newListing.save();
   res.redirect("/listing");
});

//edit route
app.get("/listings/:id/edit", async(req,res)=>{
   let {id}= req.params;
   const listing =await Listing.findById(id);
   res.render("../views/listings/edit.ejs",{listing});
    });

//update route 
app.put("/listings/:id", async(req,res)=>{
   let {id}= req.params;
   await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
   res.redirect(`/listings/${id}`);
    });

//delete route
app.delete("/listings/:id", async(req,res)=>{
   let { id }= req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   res.redirect("/listing");
});





// login person route route 
app.get("/users", async(req,res)=>{
   const allListings=await Listing.find({});
   res.render("../views/listings/user.ejs",{allListings});
 });


app.listen(8080,()=>{
    console.log("server is listneing");
});







//login and signup
app.get('/signup', (req, res) => {
   res.render('../views/listings/signup.ejs')
})
app.get('/Login', (req, res) => {
   res.render('../views/listings/login.ejs')
})


// app.post('/signup', async (req, res) => {
   
//    const data = new LogInCollection({
//        name: req.body.name,
//        password: req.body.password,
//        lname: req.body.lname,
//       email: req.body.email

     
//    })
//    await data.save()


   // const data = {
   //     name: req.body.name,
   //     lname: req.body.lname,
   //     email: req.body.email,
   //     password: req.body.password
   // }

//    const checking = await LogInCollection.findOne({ email: req.body.email })

//   try{
//    if (checking.email === req.body.email && checking.password===req.body.password) {
//        res.send("user details already exists")
//    }
//    else{
//        await LogInCollection.insertMany([data])
//    }
//   }
//   catch{
//    res.send("wrong inputs")
//   }

//    res.status(201).render("error", {
//        naming: req.body.name
//    })
// })


// app.post('/login', async (req, res) => {

//    try {
//        const check = await LogInCollection.findOne({ name: req.body.name })

//        if (check.password === req.body.password) {
//            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
//        }

//        else {
//            res.send("incorrect password")
//        }


//    } 
   
//    catch (e) {

//        res.send("wrong details")
       

//    }


// })
