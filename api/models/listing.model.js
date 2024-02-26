import mongoose from "mongoose";

const lsitingSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        description:{
            type: String , 
            required:true,
        },
        adress:{
            type:String,
            requried:true,
        },
        regularPrice:{
            type:Number,
            required:true,
        },
        discountPrice:{
            type:Number,
            required : true,
        },
        bedrooms:{
            type:Number,
            required:true,
        },
        bathroom:{
            type:Number,
            required:true,
        },
        furnished:{
            type:Boolean,
            required : true,
        },
        parking:{
            type:Boolean,
            required:true,
        },
        type:{
            type:String,
            required:true,
        },
        offer:{
            type:Boolean,
            requried:true,
        },
        imageUrls:{
            type:Array,
            required : true,
        },
        userRefs:{
            type:String,
            required:true,
        },



    },{timestamps : true}
)

const Listing = mongoose.model('Listing' , lsitingSchema);

export default Listing;