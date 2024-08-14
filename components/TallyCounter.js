"use client";
import React from "react"

export function TallyCounter () {
    const [counter,setCounter] = React.useState(0);

    return (
        <div className="bg-yellow-500 p-2">
            <blockquote className="p-4 bg-gray-700 text-center text-4xl text-white">
                <span>{counter}</span>
            </blockquote>

            <div className="grid grid-cols-2 gap-6 bg-white p-8">
                <button 
                onClick={() => setCounter(counter - 1)}
                className="p-4 text-center text-2xl text-white bg-red-500">-</button>

                <button 
                onClick={() => setCounter(counter + 1)}
                className="p-4 text-center text-2xl text-white bg-green-500">+</button>
            </div>
        </div>
    )
}