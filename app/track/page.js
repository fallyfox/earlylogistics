"use client"
import React from "react";
import Link from "next/link";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import * as yup from "yup";
import { CiGift } from "react-icons/ci";//process
import { FaPlane } from "react-icons/fa";//plane
import { FaTruckMoving } from "react-icons/fa";//transit
import { FaHome } from "react-icons/fa";//deliver

const rules = yup.object().shape({
    trackingId:yup.string().required().min(16),
})

export default function Track() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { values,handleSubmit,touched,errors,handleChange} = useFormik({
        initialValues:{trackingId:''},
        onSubmit:() => {
            setOpen(true);
        },
        validationSchema:rules
    });

    return (
        <>
        <main className="min-h-screen flex justify-center mt-[108px] lg:mt-[120px] lg:pt-0 px-3 md:px-0">
            <div className="h-full w-full md:w-[320px] flex flex-col gap-8 border border-gray-300 rounded-md p-3 md:p-5">
                <p className="text-gray-700">Track a package</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <TextField 
                        id="trackingId" 
                        label="trackingId" 
                        variant="outlined" 
                        placeholder="trackingId"
                        className="w-full"
                        value={values.trackingId}
                        onChange={handleChange}
                        />
                        {touched.trackingId && errors.trackingId ? <span className="text-xs text-red-500">{errors.trackingId}</span> : null}
                    </div>
            
                    <Button type="submit" variant="contained" color="warning">TRACK PACKAGE</Button>
                </form>
            </div>
        </main>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <div className="md:min-w-[420px] flex flex-col md:grid grid-cols-4 gap-6">
                    <div>
                       <blockquote className={`w-[98px] h-[98px] flex flex-col justify-center items-center border border-gray-500 rounded-full gray-500`}>
                            <CiGift className={`text-4xl text-gray-500`}/>
                            <span className={`text-xs text-gray-500`}>Processed</span>
                        </blockquote>
                    </div>
                    <div>
                       <blockquote className={`w-[98px] h-[98px] flex flex-col justify-center items-center border border-gray-500 rounded-full gray-500`}>
                            <FaPlane className={`text-4xl text-gray-500`}/>
                            <span className={`text-xs text-gray-500`}>Flight</span>
                        </blockquote>
                    </div>
                    <div>
                       <blockquote className={`w-[98px] h-[98px] flex flex-col justify-center items-center border border-gray-500 rounded-full gray-500`}>
                            <FaTruckMoving className={`text-4xl text-gray-500`}/>
                            <span className={`text-xs text-gray-500`}>Transit</span>
                        </blockquote>
                    </div>
                    <div>
                       <blockquote className={`w-[98px] h-[98px] flex flex-col justify-center items-center border border-gray-500 rounded-full gray-500`}>
                            <FaHome className={`text-4xl text-gray-500`}/>
                            <span className={`text-xs text-gray-500`}>Delivered</span>
                        </blockquote>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}