import React,{useEffect, useState} from 'react'
import { Button, Textarea, Label, TextInput } from "flowbite-react";
import EnquiryList from './enquiry/EnquiryList';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const Enquiry = () => {

    let [enquiryList,setEnquiryList] = useState([]);
    let [formData,setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        message:"",
        _id:""
    })
    let saveEnquiry = (e) => { 
        e.preventDefault();
        if(formData._id){
             axios.put(`http://localhost:8000/api/website/enquiry/update/${formData._id}`,formData)
             .then((res)=>{
                toast.success('Enquiry Updated Successfully');
                setFormData({
                name:"",
                email:"",
                phone:"",
                message:"",
                _id:""
            });
            getAllEnquiry();
             })
            
        } else{
             axios.post(`http://localhost:8000/api/website/enquiry/insert`,formData)
        .then((res)=>{
            toast.success('Enquiry Saved successfully');
            setFormData({
                name:"",
                email:"",
                phone:"",
                message:""
            });
            getAllEnquiry();
        })
        }
       
    }

    let getAllEnquiry = () => {
        axios.get(`http://localhost:8000/api/website/enquiry/view`)
        .then((res)=>{
            return res.data;
        })
        .then((finalData)=>{
            if(finalData.status)setEnquiryList(finalData.enquiryList);
        })
    }

    let getValue=(e)=>{
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let oldData = {...formData};
        oldData[inputName]=inputValue;
        setFormData(oldData);
    }

    useEffect(()=>{
        getAllEnquiry();
    },[])

    return (
        <div>
            <ToastContainer/>
            <h1 className='font-bold text-4xl text-center mb-6'>User Enquiry Form</h1>
            <div className='grid grid-cols-[30%_auto] gap-5 ml-1'>
                <div className='bg-gray-800 p-4 rounded-2xl'>
                    <h1 className='text-xl text-white py-3 font-bold'>Enquiry Form</h1>
                    <form onSubmit={ saveEnquiry } action="">
                        <div className='text-black py-1 gap-y-2 flex flex-col'>
                            <Label htmlFor="name">Your name</Label>
                            <TextInput id='name' name="name" value={formData.name} onChange={getValue} type="text" placeholder="Enter Your name" required shadow />
                        </div>
                        <div className='text-black py-1 gap-y-2 flex flex-col'>
                            <Label htmlFor="email">Your email</Label>
                            <TextInput id='email' name="email" value={formData.email}  onChange={getValue} type="email" placeholder="Enter Your email" required shadow />   
                        </div>
                        <div className='text-black py-1 gap-y-2 flex flex-col'>
                            <Label htmlFor="phone">Mobile number</Label>
                            <TextInput id='phone' name="phone" value={formData.phone}  onChange={getValue} type="text" placeholder="Enter your number" required shadow />
                        </div>
                        <div className='text-black py-1 gap-y-2 flex flex-col'>
                            <Label htmlFor="message">Message</Label>
                            <Textarea id='message' name="message" value={formData.message}  onChange={getValue} placeholder="Leave a comment..." required rows={4} />
                        </div>
                        <div className='py-3 '>
                            <Button className='w-full' type="submit">{formData._id ? "update" : "save"}</Button>
                        </div>
                    </form>
                </div>
               <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} Swal={Swal} setFormData={setFormData}/>
            </div>
        </div>
    )
}

export default Enquiry
