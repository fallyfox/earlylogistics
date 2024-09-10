"use client"
import { useState,useEffect } from "react";
import { useFormik } from "formik";
import { TextField,Button } from "@mui/material";
import { validation } from "@/utils/create_form_rules";
import { getTrackingId } from "@/utils/generate_tracking_id";
import { billing } from "@/utils/generate_billing";
import { db } from "@/lib/firebase.lib";
import { collection,addDoc } from "firebase/firestore";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { GrStatusGood } from "react-icons/gr";

export default function Create () {
    const [trackingId,setTrackingId] = useState("");
    const [bill,setBill] = useState(0);
    const [activityIndicator,setActivityIndicator] = useState(false);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { handleBlur,handleSubmit,handleChange,touched,errors,values } = useFormik({
        initialValues: { title:"",description:"",origin:"",destination:"",senderFullName:"",senderPhone:"",weight:0,length:0,breadth:0,height:0,value:"" },
        validationSchema: validation
    });

    // create records in firestore db
    const handlePostToDB = async () => {
        setActivityIndicator(true);

        await addDoc(collection(db,"packages"),{
            packageId: trackingId,
            title: values.title,
            desc: values.description,
            origin: values.origin,
            destination: values.destination,
            sender: values.senderFullName,
            senderPhone: values.senderPhone,
            dimension: {
                l: values.length,
                b: values.breadth,
                h: values.height
            },
            weight: values.weight,
            billing: bill,
            paid: false,
            processedBy: null,
            trackingDetails: {
                processed: new Date().getTime(),
                flight: null,
                transit: null,
                delivered: null,
            },
            timestamp: new Date().getTime()
        })
        .then( () => {
            setActivityIndicator(false);
            handleClickOpen();//open success confirmation
        })
        .catch((e) => {
            setActivityIndicator(false);
            console.log(e);
        })
    }

    useEffect(() => {
        if (touched.title & !errors.title) {
            setTrackingId(getTrackingId())
        }
    },[touched.title]);

    useEffect(() => {
        if (!errors.weight & !errors.length & !errors.breadth & !errors.height) {
            setBill(billing(values.weight,values.length,values.breadth,values.height))
        }
    },[touched.height]);

    return (
        <>
        <section className="lg:grid lg:grid-cols-2 lg:gap-12 py-12 px-4 md:px-8 lg:px-12 mt-[68px]">
            <article className="p-4 border border-gray-200 rounded-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <TextField
                        className="w-full"
                        label="title"
                        type="text"
                        id="title"
                        onBlur={handleBlur}
                        value={values.title}
                        onChange={handleChange}/>
                        { touched.title && errors.title ? <span className="text-red-500 text-xs">{errors.title}</span> : null}
                    </div>
                    <div>
                        <TextField
                        className="w-full"
                        multiline={true}
                        rows={3}
                        label="description"
                        type="text"
                        id="description"
                        onBlur={handleBlur}
                        value={values.description}
                        onChange={handleChange}/>
                        { touched.description && errors.description ? <span className="text-red-500 text-xs">{errors.description}</span> : null}
                    </div>
                    <div>
                        <TextField
                        className="w-full"
                        label="origin"
                        type="text"
                        id="origin"
                        onBlur={handleBlur}
                        value={values.origin}
                        onChange={handleChange}/>
                        { touched.origin && errors.origin ? <span className="text-red-500 text-xs">{errors.origin}</span> : null}
                    </div>
                    <div>
                        <TextField
                        className="w-full"
                        label="destination"
                        type="text"
                        id="destination"
                        onBlur={handleBlur}
                        value={values.destination}
                        onChange={handleChange}/>
                        { touched.destination && errors.destination ? <span className="text-red-500 text-xs">{errors.destination}</span> : null}
                    </div>
                    <div>
                        <TextField
                        className="w-full"
                        label="senderFullName"
                        type="text"
                        id="senderFullName"
                        onBlur={handleBlur}
                        value={values.senderFullName}
                        onChange={handleChange}/>
                        { touched.senderFullName && errors.senderFullName ? <span className="text-red-500 text-xs">{errors.senderFullName}</span> : null}
                    </div>
                    <div>
                        <TextField
                        className="w-full"
                        label="senderPhone"
                        type="tel"
                        id="senderPhone"
                        onBlur={handleBlur}
                        value={values.senderPhone}
                        onChange={handleChange}/>
                        { touched.senderPhone && errors.senderPhone ? <span className="text-red-500 text-xs">{errors.senderPhone}</span> : null}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <TextField
                            className="w-full"
                            label="weight"
                            type="number"
                            id="weight"
                            onBlur={handleBlur}
                            value={values.weight}
                            onChange={handleChange}/>
                            { touched.weight && errors.weight ? <span className="text-red-500 text-xs">{errors.weight}</span> : null}
                        </div>
                        <div>
                            <TextField
                            className="w-full"
                            label="length"
                            type="number"
                            id="length"
                            onBlur={handleBlur}
                            value={values.length}
                            onChange={handleChange}/>
                            { touched.length && errors.length ? <span className="text-red-500 text-xs">{errors.length}</span> : null}
                        </div>
                        <div>
                            <TextField
                            className="w-full"
                            label="breadth"
                            type="number"
                            id="breadth"
                            onBlur={handleBlur}
                            value={values.breadth}
                            onChange={handleChange}/>
                            { touched.breadth && errors.breadth ? <span className="text-red-500 text-xs">{errors.breadth}</span> : null}
                        </div>
                        <div>
                            <TextField
                            className="w-full"
                            label="height"
                            type="number"
                            id="height"
                            onBlur={handleBlur}
                            value={values.height}
                            onChange={handleChange}/>
                            { touched.height && errors.height ? <span className="text-red-500 text-xs">{errors.height}</span> : null}
                        </div>
                    </div>
                    <div>
                        <TextField
                        className="w-full"
                        label="value"
                        type="number"
                        id="value"
                        onBlur={handleBlur}
                        value={values.value}
                        onChange={handleChange}/>
                        { touched.value && errors.value ? <span className="text-red-500 text-xs">{errors.value}</span> : null}
                    </div>

                    <Button 
                    onClick={!errors.length ? handlePostToDB : console.log(errors.length)}
                    variant="contained" 
                    type="submit">Create Package Tracking</Button>
                </form>
            </article>
            
            <aside className="hidden lg:flex flex-col gap-6 p-4 bg-gray-200 rounded-md">
                <div className="grid grid-cols-2 border border-gray-50 rounded-md">
                    <blockquote className="h-24 flex justify-center items-center border-r border-gray-50 p-4">
                        <p className="text-xl text-gray-800">Tracking ID</p>
                    </blockquote>
                    <blockquote className="h-24 flex justify-center items-center p-4">
                        <p className="text-2xl text-gray-800">{trackingId}</p>
                    </blockquote>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-gray-600 border-b border-gray-50 pb-2">{values.title}</p>
                    <p className="text-gray-600 border-b border-gray-50 pb-2">{values.description}</p>
                    <blockquote className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <p className="text-gray-600 border-b border-gray-50 pb-2">
                            <span className="block text-gray-500">Origin</span>
                            <span className="block">{values.origin}</span>
                        </p>
                        <p className="text-gray-600 border-b border-gray-50 pb-2">
                            <span className="block text-gray-500">Destination</span>
                            <span className="block">{values.destination}</span>
                        </p>
                    </blockquote>
                    <blockquote className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <p className="text-gray-600 border-b border-gray-50 pb-2">
                            <span className="block text-gray-500">Sender&apos;s Full Name</span>
                            <span className="block">{values.senderFullName}</span>
                        </p>
                        <p className="text-gray-600 border-b border-gray-50 pb-2">
                            <span className="block text-gray-500">Sender&apos;s Phone Number</span>
                            <span className="block">{values.senderPhone}</span>
                        </p>
                    </blockquote>

                    <p className="text-gray-600 border-b border-gray-50 pb-2">
                        <span className="block text-gray-500">Billing</span>
                        <span className="block">NGN{bill}</span>
                    </p>
                </div>
            </aside>
        </section>

        <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={activityIndicator}
        >
            <CircularProgress color="error" />
        </Backdrop>

        {/* engage this dialog after successful sending to database */}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="flex flex-col gap-6 justify-center items-center">
                <GrStatusGood className="text-6xl text-green-500"/>
                <p className="text-lg text-gray-800">Your package tracking was successfuly created</p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        </Dialog>
    </>
    )
}