"use client"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'; 
import { IUser } from '@/types/user.interface';
import React from 'react';
import profile from "@/assets/homeImage/student-1.png"
import Image from 'next/image';

const UserDetails = ({modalData}:{modalData:IUser}) => {
    

    return (
        <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          
          <div className="my-10">

          <Image src={modalData?.photoUrl || profile} alt={modalData?.name} className='h-36 w-36 rounded-full object-cover mx-auto border-2 border-sky-400'/>
          </div>
          <DialogDescription>
        <div className="text-black gap-2 flex flex-col">
            <h2><strong>id: </strong>  {modalData?.studentId}.</h2>
            <h2><strong>Name: </strong>  {modalData?.name}.</h2>
            <h2><strong>Email:</strong>   {modalData?.email}.</h2>
            <h2><strong>Phone Number: </strong>  {modalData?.phoneNumber}.</h2>
            <h2><strong>Address: </strong>  {modalData?.presentAddress?.street && modalData?.presentAddress?.street +", "+ modalData?.presentAddress?.district && modalData?.presentAddress?.district+ ", " + modalData?.presentAddress?.country && modalData?.presentAddress?.country}</h2>
        </div>
          </DialogDescription>
        </DialogHeader>
        
      </DialogContent>
    );
};

export default UserDetails;
 

