import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Logo from "../components/Logo";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";

export default function AuthLayout() {
  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:min-h-screen ">

        <div className="hidden lg:flex flex-col justify-center bg-emerald-600 p-12 relative overflow-hidden">

          <div className="absolute top-12 left-12 w-24 h-24 border-2 border-white/20 rounded-full" />
          <div className="absolute top-20 left-20 w-16 h-16 border border-white/20 rounded-full" />
          <div className="absolute bottom-20 right-16 w-32 h-32 border-2 border-white/30 rounded-full" />
          <div className="absolute bottom-32 right-28 w-20 h-20 border-2 border-white/30 rounded-full" />
          <div className="absolute top-1/3 right-12 w-12 h-12 bg-white/20 rounded-full" />
          <div className="absolute bottom-1/3 left-16 w-8 h-8 bg-white/20 rounded-full" />

        <div className="relative flex flex-col mb-auto items-start z-10 w-full">
          <div className=" opacity-90 ">
            <div className="w-70 h-70">
            <Logo />
            </div>
          </div>

          <div className="flex flex-col px-4 gap-4 ">
          <h2 className="text-5xl text-white font-serif">Gestión simple para tu <br />consultorio</h2>
          <p className="text-xl text-white mb-12">Organizá tu agenda, pacientes y sesiones en un solo lugar.</p>
          </div>

          <ul className="space-y-6 mt-4 px-8">
            <li className="flex items-center gap-6">
                <div className="bg-white/10 rounded-full p-3">
                <IoCalendarClearOutline className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xl">Agenda inteligente</span>
            </li>
            <li className="flex items-center gap-6">
                <div className="bg-white/10 rounded-full p-3">
                <FiUsers className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xl">Gestión de pacientes</span>
            </li>
            <li className="flex items-center gap-6">
                <div className="bg-white/10 rounded-full p-3">
                <FaRegClock className="w-6 h-6 text-white "/>
                </div>
                <span className="text-white text-xl">Control de sesiones</span>
            </li>

          </ul>
        </div>


        </div>


        
          <div className="">
            <Outlet />
          </div>
        </div>
     

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
