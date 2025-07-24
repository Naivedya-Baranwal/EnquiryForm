import enquiryModel from "../../models/enquiry.model.js";

export const enquiryInsert = (req, res) => {
    let {name ,email,phone,message}=req.body;
    let enquiry = new enquiryModel({
        name,
        email,
        phone,
        message
    });
    enquiry.save().then(()=>{
        res.send({status:1,message:"Enquiry saved successfully"});
    }).catch((err)=>{
        res.send({status:0,message:"Error while saving enquiry",error:err});
    })
};

export const enquiryList = async (req,res) => {
     try{
        let enquiry = await enquiryModel.find();
        res.status(200).json({status:1,enquiryList:enquiry})
     } catch(err){
        res.status(500).json({status:0,message:"Failed to fetch enquiries", error: err.message})
     }
     
}

export const enquiryDelete = async (req,res) => {
    try{
       let enId = req.params.id;
       let enquiry = await enquiryModel.deleteOne({_id:enId});
       res.status(200).json({status:1,message:"Enquiry Deleted successfully",enquiry});
    } catch(err){
       res.status(500).json({status:0,message:"Deletion failed" , error:err.message})
    }
}

export const enquirysingleRow = async (req,res) => {
    try {
        let enId = req.params.id;
        let enquiry = await enquiryModel.findOne({_id:enId});
        res.status(200).json({status:1,message:"Enquiry Edited successfully",enquiry});
    } catch (error) {
        res.status(500).json({status:0,message:"Error Occured" , error:err.message})
    }
}

export const enquiryUpdate = async (req,res) => {
    try {
        let enId = req.params.id;
        let {name,email,phone,message}=req.body;
        let updatedObj = {
            name,
            email,
            phone,
            message
        }
        let enquiry = await enquiryModel.updateOne({_id:enId},updatedObj);
        res.status(200).json({status:1,message:"Enquiry updated successfully",enquiry});
    } catch (error) {
        res.status(500).json({status:0,message:"Error Occured" , error:err.message}) 
    }
}