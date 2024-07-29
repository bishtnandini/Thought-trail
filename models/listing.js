const { name } = require("ejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema=new Schema({
    image :{
        type: String,
       
    },
    title :{
        type: String,
        required: true ,
    },
    desc :{
        type: String,
        required:  true,
    },
    breef:{
        type: String,

    },
    aimg :{
        type:String,
        
    },
    aname :{
        type: String,
        required: true,
    },
    views :{
        type: Number,
     
    },

});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;