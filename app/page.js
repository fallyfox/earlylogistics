import Link from "next/link";
import { Abril_Fatface} from "next/font/google";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const abril = Abril_Fatface({
  subsets:['latin'],
  weight:'400'
});

export default function Home () {

  return (
    <main className="h-screen bg-img-mobile bg-img-desktop">
      <div className="h-full bg-black/60 flex flex-col justify-between py-8 md:py-10 lg:py-12 px-6 md:px-12 lg:px-72">
        <p className={`${abril.className} text-white text-3xl text-center`}>Early Logistics</p>

        <div className="flex flex-col gap-5">
          <h1 className="text-yellow-500 text-5xl lg:text-6xl font-bold text-center">Package Tracking At It&apos;s Best</h1>
          
          <blockquote className="flex justify-center">
            <Link href="/track" className="bg-red-500 p-8 lg:p-6 text-center text-white text-xl">Track Package</Link>
          </blockquote>
        </div>

        <footer className="flex flex-col gap-6">
          <ul className="flex justify-center items-center gap-8">
            <li className="text-white text-2xl">
              <Link href="https://instagram.com/early_code_tech"><IoLogoInstagram/></Link>
            </li>

            <li className="text-white text-2xl">
              <Link href="https://x.com/earlycodetech"><FaXTwitter/></Link>
            </li>
          </ul>

          <ul className="flex justify-between">
            <li className="text-xs text-gray-300">&copy; {new Date().getFullYear()} Early Logistics</li>
            
            <li  className="text-xs text-gray-300">
              <Link href="#">Privacy Policy</Link>
            </li>
          </ul>
        </footer>
      </div>
    </main>
  )
}