import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from 'axios';


const EnquiryList = ({data,getAllEnquiry,Swal,setFormData}) => {


   
    let deleteRow=(delId)=>{

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/website/enquiry/delete/${delId}`)
        .then((res)=>{
            getAllEnquiry();
        })
              Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
    }

    let editRow = (editId)=>{
        axios.get(`http://localhost:8000/api/website/enquiry/single/${editId}`)
        .then((res)=>{
           setFormData(res.data.enquiry);
        })
    }

  return (
    <div className='bg-gray-800 p-4 rounded-2xl w-99/100'>
    <h1 className='text-xl text-white font-bold'>Enquiry List</h1>
    <div className="overflow-x-hidden mt-5">
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeadCell>Sr. No</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Email</TableHeadCell>
                    <TableHeadCell>Phone</TableHeadCell>
                    <TableHeadCell>Message</TableHeadCell>
                    <TableHeadCell>Edit</TableHeadCell>
                    <TableHeadCell>Delete</TableHeadCell>
                    <TableHeadCell>
                        <span className="sr-only">Edit</span>
                    </TableHeadCell>
                    <TableHeadCell>
                    <span className="sr-only">Delete</span>
                    </TableHeadCell>
                </TableRow>
            </TableHead>
            <TableBody className="divide-y">
                {
                    data.length>=1 ? 
                    data.map((items,index)=>{
                        return (
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>{index+1}</TableCell>
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                     {items.name}
                    </TableCell>
                    <TableCell>{items.email}</TableCell>
                    <TableCell>{items.phone}</TableCell>
                    <TableCell>{items.message}</TableCell>
                    <TableCell>
                        <button onClick={()=>editRow(items._id)} className="cursor-pointer bg-blue-600 text-white py-1.25 px-4 rounded">
                            Edit
                        </button>
                    </TableCell>
                    <TableCell>
                        <button onClick={()=>deleteRow(items._id)} className="cursor-pointer bg-red-500 text-white py-1.25 px-4 rounded">
                            Delete
                        </button>
                    </TableCell>
                </TableRow>
                        ) 
                    })
                    : 
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell colSpan={7} className="text-center text-white">No data found</TableCell>
                    </TableRow> 
                }
                
            </TableBody>
        </Table>
    </div>
</div>
  )
}

export default EnquiryList