"use client"
import Link from "next/link";
import { useState,useEffect,useContext } from "react";
import { AppContext } from "@/lib/global_context";
import { db } from "@/lib/firebase.lib";
import { onSnapshot,collection,query,orderBy,limit,deleteDoc,doc,updateDoc } from "firebase/firestore";
import { AdminPackageCard } from "@/components/AdminPackageCard";
import { Button,CircularProgress } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { GrStatusGood } from "react-icons/gr";

export default function Packages () {
    const [packages,setPackages] = useState([]);
    const [clickedPackage,setClickedPackage] = useState(undefined);
    const [selectedPackage,setSelectedPackage] = useState(null);
    const [openProgress,setOpenProgress] = useState(false);
    const [trackUpdatePanel,setTrackUpdatePanel] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    //access global variables
    const {packageDocId,setPackageDocId} = useContext(AppContext);

    useEffect(() => {
        onSnapshot(collection(db,"packages"),onSnap => {
            const retreivedDocs = [];

            onSnap.forEach(doc => {
                //get each documents and hold before updating on the useState
                retreivedDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            });

            //send to useState constant after full retreival
            setPackages(retreivedDocs);
        })
    },[]);

    useEffect(() => {
        const filtered = packages.filter(item => item.id == clickedPackage)[0];
        setSelectedPackage(filtered)
    },[clickedPackage]);

    //handle package delete on firestore
    const handleDeletePackage = async () => {
        setOpenProgress(true);
        await deleteDoc(doc(db,"packages",clickedPackage))
        .then(() => {
            setClickedPackage(undefined);
            selectedPackage(null);
            setOpenProgress(false)
        })
        .catch((error) => {
            setOpenProgress(false);
            console.log(error);
        })
    }


    //update tracking on database
    async function handleUpdateTracking (proc,flig,tran,deli) {
        const currentTracking = {
            processed:proc,
            flight: flig,
            transit: tran,
            delivered: deli
        }

        await updateDoc(doc(db,"packages",selectedPackage.id),{
            trackingDetails: currentTracking,
        })
        .then(() => {
            setOpen(true)
        })
        .catch((error) => {
            alert("There was a problem")
            console.log(error);
        })
    } 

    return (
        <>
        <section className="pt-[68px] grid grid-cols-3 gap-6 py-12 px-8 md:px-12 lg:px-16">
            <article className="col-span-2 border border-gray-500 rounded-md p-6">
                <h2 className="text-3xl text-gray-800 mb-6">Recent Packages</h2>

                {packages.map(item => {
                    return (
                        <div 
                        key={item.id}
                        onClick={() => {
                            setClickedPackage(item.id);
                            setPackageDocId(item.id);//updates a global variable
                        }}>
                            <AdminPackageCard 
                            senderName={item.data.sender} 
                            timestamp={item.data.timestamp} 
                            title={item.data.title} 
                            origin={item.data.origin} 
                            dest={item.data.destination}/>
                        </div>
                    )
                })}
            </article>

            {
                selectedPackage != null ?
                <aside>
                    {/* when a package is clicked, the details will show here */}
                    <div className="flex flex-col gap-5 bg-gray-800 rounded-md p-6">
                        <div className="pb-2 border-b border-gray-600">
                            <Button onClick={() => setTrackUpdatePanel(!trackUpdatePanel ? true : false)} variant="contained" className="w-full">
                                {!trackUpdatePanel ? "Open" : "Hide"} Track Update Panel
                            </Button>

                            {trackUpdatePanel ?
                            <ul className="flex justify-between gap-3 items-center mt-4">
                                <li>
                                    <Button 
                                    onClick={() => handleUpdateTracking(selectedPackage?.data.trackingDetails.processed,new Date().getTime(),null,null)} 
                                    variant="contained" 
                                    color="info" 
                                    size="small">Flight</Button>
                                </li>
                                <li>
                                    <Button 
                                    onClick={() => handleUpdateTracking(selectedPackage?.data.trackingDetails.processed,null,new Date().getTime(),null)}
                                    variant="contained" 
                                    color="warning" 
                                    size="small">Transit</Button>
                                </li>
                                <li>
                                    <Button 
                                    onClick={() => handleUpdateTracking(selectedPackage?.data.trackingDetails.processed,null,null,new Date().getTime())}
                                    variant="contained" 
                                    color="success" 
                                    size="small">Delivered</Button>
                                </li>
                            </ul>
                            : null}
                        </div>

                        <div className="grid grid-cols-2 gap-4 pb-2 border-b border-gray-600">
                            <p className="text-gray-100">
                                <span className="block text-xs mb-1 text-gray-300">Billing</span>
                                <span className={`block ${selectedPackage?.data.paid === true ? "text-green-500" : "text-red-500"}`}>NGN{selectedPackage?.data.billing}</span>
                            </p>
                            <div className="flex justify-end">
                                <p className="text-gray-100">
                                    <span className="block text-xs mb-1 text-gray-300">Weight</span>
                                    <span className="block">{selectedPackage?.data.weight}kg</span>
                                </p>
                            </div>
                        </div>
                        <p className="pb-2 border-b border-gray-600 text-gray-100">
                            <span className="block text-xs mb-1 text-gray-300">Tracking Number</span>
                            <span className="block">{selectedPackage?.data.packageId}</span>
                        </p>
                        <p className="pb-2 border-b border-gray-600 text-gray-100">
                            <span className="block text-xs mb-1 text-gray-300">Description</span>
                            <span className="block">{selectedPackage?.data.desc}</span>
                        </p>
                        <p className="pb-2 text-gray-100">
                            <span className="block text-xs mb-1 text-gray-300">Dimensions</span>
                            <span className="block">{selectedPackage?.data.dimension.l} x {selectedPackage?.data.dimension.b} x {selectedPackage?.data.dimension.h}cm</span>
                        </p>

                        <Button onClick={handleDeletePackage} variant="contained" color="error" size="large" className="flex items-center gap-4"> 
                            {openProgress ? <CircularProgress style={{color:"white"}}/> : null}
                            <span>Delete Package</span>
                        </Button>

                        <p className="text-center text-sky-500 text-xs">
                            <Link href={`/admin/update?doc_id=${clickedPackage}`}>Update Package Records</Link>
                        </p>
                    </div>
                </aside>
                : null
            }
        </section>

        {/* general success dialog */}
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