"use client"
import { useState,useEffect } from "react";
import { db } from "@/lib/firebase.lib";
import { onSnapshot,collection,query,orderBy,limit } from "firebase/firestore";
import { AdminPackageCard } from "@/components/AdminPackageCard";

export default function Packages () {
    const [packages,setPackages] = useState([]);
    const [clickedPackage,setClickedPackage] = useState(undefined);

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
    },[])

    return (
        <section className="pt-[68px] grid grid-cols-3 gap-6 py-12 px-8 md:px-12 lg:px-16">
            <article className="col-span-2 border border-gray-500 rounded-md p-6">
                <h2 className="text-3xl text-gray-800 mb-6">Recent Packages</h2>

                {packages.map(item => {
                    return (
                        <div onClick={() => setClickedPackage(item.id)}>
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

            <aside className="bg-gray-800 rounded-md p-6">
                {/* when a package is clicked, the details will show here */}
            </aside>
        </section>
    )
}