import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const Enquiry = () => {
    return (
        <div>
            <h1 className='font-bold text-4xl text-center'>User Enquiry</h1>
            <div className='grid grid-cols-[30%_auto]'>
                <div className='bg-gray-300 p-4'>
                    <h1 className='text-xl font-bold'>Enquiry Form</h1>
                    <form action="">
                       <div className='py-3 flex flex-col'>
                       <Label htmlFor="name">Your name</Label>
                       <TextInput id="name" type="text" placeholder="Enter Your name" required shadow />
                       </div>
                        </form>

                </div>

            </div>


        </div>
    )
}

export default Enquiry