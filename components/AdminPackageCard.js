import { timestampToDate } from "@/utils/timestamp_to_date"

export function AdminPackageCard ({senderName,timestamp,title,origin,dest}) {
    return (
        <div className="grid grid-cols-2 gap-6 border border-gray-400 p-4 rounded-md cursor-pointer mb-4">
            <p className="flex flex-col gap-2">
                <span className="text-md text-gray-600">{senderName}</span>
                <span className="text-sm text-gray-600">Created at {timestampToDate(timestamp)}</span>
                <span className="text-md text-gray-800">{title}</span>
            </p>
            
            <blockquote className="grid grid-cols-2 gap-4 border border-gray-400 p-2 rounded-md">
                <p className="flex flex-col gap-2 p-4 bg-gray-200 rounded-md">
                    <span className="text-gray-800 text-md">Origin</span>
                    <span className="text-gray-800 text-xl uppercase">{origin}</span>
                </p>
                <p className="flex flex-col gap-2 p-4 bg-gray-200 rounded-md">
                    <span  className="text-gray-800 text-md">Destination</span>
                    <span className="text-gray-800 text-xl uppercase">{dest}</span>
                </p>
            </blockquote>
        </div>
    )
}