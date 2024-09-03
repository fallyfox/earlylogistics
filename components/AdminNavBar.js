import Image from "next/image";
import Link from "next/link";

export default function AdminNav () {
    return (
        <nav className="h-[60px] fixed top-0 right-0 left-0 z-10 flex flex-row justify-between items-center bg-red-700 px-4 md:px-8">
            <ul className="flex flex-row items-center gap-6">
                <li className="py-1 hover:border-b-2 hover:border-white">
                    <Link className="text-xl text-white font-thin" href="/admin">Home</Link>
                </li>
                <li className="py-1 hover:border-b-2 hover:border-white">
                    <Link className="text-xl text-white font-thin" href="/admin/create">Create</Link>
                </li>
                <li className="py-1 hover:border-b-2 hover:border-white">
                    <Link className="text-xl text-white font-thin" href="/admin/packages">Packages</Link>
                </li>
                <li className="py-1 hover:border-b-2 hover:border-white">
                    <Link className="text-xl text-white font-thin" href="/admin/track">Track</Link>
                </li>
            </ul>

            <div>
                <Link href="/admin/profile">
                    <Image className="rounded-full" width={48} height={48} src="/sample_user.jpg" alt="profile image"/>
                </Link>
            </div>
        </nav>
    )
}