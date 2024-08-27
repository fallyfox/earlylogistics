import Link from "next/link";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
import { FaMapPin } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

export default function Admin () {
    return (
        <>
        <nav className="h-[60px] flex justify-between items-center bg-[#795458] px-4 md:px-8 lg:px-12">
            <ul className="flex items-center gap-6">
                <li>
                    <Image width={48} height={48} src="/logo.png" alt="brand logo" />
                </li>
                <li>
                    <Link className="text-gray-200 text-lg" href="/admin">Home</Link>
                </li>
            </ul>

            <div>
                <Link href="/admin/profile">
                    <blockquote className="h-[54px] w-[54px] rounded-full bg-gradient-to-b from-yellow-500 via-red-500 to-sky-500] flex justify-center items-center">
                        <p className="h-[50px] w-[50px] rounded-full bg-[#795458] flex justify-center items-center">
                            <Image width={38} height={38} src="/logo.png" alt="user photo" />
                        </p>
                    </blockquote>
                </Link>
            </div>
        </nav>

        <section className="h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 md:px-8 lg:px-12 py-8 md:py-12">
            <article className="grid grid-cols-2 gap-4 md:gap-8 bg-gray-100 p-4 rounded-md">
                <Link href="/admin/create" className="min-h-24 lg:min-h-36 flex justify-center items-center gap-3 bg-[#453F78] text-2xl text-gray-100 rounded-md">
                    <CiCirclePlus/>
                    <span>Create</span>
                </Link>
                
                <Link href="/admin/track" className="min-h-24 lg:min-h-36 flex justify-center items-center gap-3 bg-[#453F78] text-2xl text-gray-100 rounded-md">
                    <FaMapPin/>
                    <span>Track</span>
                </Link>

                <Link href="/admin/support" className="min-h-24 lg:min-h-36 flex justify-center items-center gap-3 bg-[#453F78] text-2xl text-gray-100 rounded-md">
                    <IoMdMail/>
                    <span>Support</span>
                </Link>

                <Link href="/admin/profile" className="min-h-24 lg:min-h-36 flex justify-center items-center gap-3 bg-[#453F78] text-2xl text-gray-100 rounded-md">
                    <FaRegUserCircle/>
                    <span>Profile</span>
                </Link>
            </article>
            <aside className="border border-gray-200 rounded-md p-4">

            </aside>
        </section>
        </>
    )
}