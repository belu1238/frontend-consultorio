import { NavLink, Outlet, useNavigate} from "react-router-dom";
import Logo from "../components/Logo";
import { IoSearchOutline, IoChevronDown, IoChevronUp} from "react-icons/io5";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { LuFolderOpen } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import CreateFolder from "../components/folders/CreateFolder";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "../api/FolderAPI";
import FolderDropdown from "../components/FolderDropdown";
import EditFolderView from "../views/folders/EditFolderView";
import DeleteFolderModal from "../components/folders/DeleteFolderModal";
export default function Sidebar() {
    const[openFolders, setOpenFolders]= useState(true) // true es para que esten abiertas las carpetas
    const navigate = useNavigate()

    const {data} = useQuery({
        queryKey: ['folders'],
        queryFn: () => getFolders()
    })

    const navItems = [
        { name: 'Panel Principal', href: '/', icon: LuLayoutPanelLeft },
        { name: 'Pacientes', href: '/pacientes', icon: FiUsers },
        { name: 'Calendario', href: '/calendario', icon: IoCalendarClearOutline },
        { name: 'Configuración', href: '/configuracion', icon: MdOutlineSettings }
    ]

    return ( 
        <>
        <div className="flex">
        <aside className="md:w-72 md:h-screen lg:w-96 md:overflow-y-scroll bg-white flex flex-col border-r border-gray-200">
            <div className="border-b border-gray-200">
            <Logo/>
            </div>
            
            <div className="px-4 py-3">
                <div className="relative">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-xl"/>
                <input className="w-full flex items-center pl-10 rounded-md bg-stone-100 px-3 py-2  text-xl hover:bg-stone-200"
                type="text"
                placeholder="Buscar paciente..."                            
                />
                </div>
            </div>

        {/* navegacion */}
        <nav className="p-5">
            <ul className="space-y-5 text-xl text-gray-500 font-semibold">
                {navItems.map((link) => (
                    <li key={link.href}>
                        <NavLink
                        to={link.href}
                        className={({ isActive }) => 
                        `flex items-center gap-3 p-2 rounded-md transition-colors ${
                                            isActive ? 'text-emerald-600 bg-emerald-50' : 'hover:bg-stone-100'
                                        }`}
                        >
                            <link.icon className="h-6 w-6"/>
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>           
        </nav>

        {/* Carpetas */}
        <div className="p-5 text-xl text-gray-500 font-semibold">
            <button
            onClick={() => setOpenFolders(!openFolders)} // al hacer click cambia el estado de openFolders
            className="flex items-center justify-between w-full px-2 py-2 hover:bg-stone-100 rounded-md transition-colors"
            >
                <span className="flex items-center gap-2">
                    <LuFolderOpen />
                    Carpetas
                </span>
                {openFolders ? (
                    <IoChevronDown className="h-4 w-4"/>
                ) : (
                    <IoChevronUp className="h-4 w-4"/>
                )}
            </button>

            {openFolders && (
                <ul className="mt-2 ml-6 space-y-4 ">
                    {data?.map(folder => (
                        <li
                        key={folder.id}
                        className="cursor-pointer hover:text-emerald-600 hover:bg-stone-100 rounded-md p-2
                        flex items-center justify-between"
                        onClick={() => navigate(`/lugares/${folder.id}/pacientes`)}
                        >
                            {folder.nombre}
                            <FolderDropdown folder={folder}/>
                        </li>
                    ))}
                </ul>
            )}
            <button
            className="folder-item text-semerald-600 w-full flex items-center gap-2 mt-4 px-2 hover:bg-stone-100 rounded-md transition-colors cursor-pointer
            text-emerald-700" 
            type="button"
            onClick={() => navigate(location.pathname + '?newFolder=true')}
            >
                <FiPlus/>
                Nueva Carpeta
            </button>

            <CreateFolder />
            <EditFolderView />
            <DeleteFolderModal/>

        </div>

        <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center">
                    <span className="font-medium text-lg text-emerald-600">NC</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-xl truncate">Natalia Canalda</p>
                    <p className="text-gray-500">Psicopedagoga</p>
                </div>
            </div>
        </div>
        </aside>

        <section className="flex-1 p-8">
        <Outlet />
        </section>

        </div>
        <footer className="py-5">
            <p className="text-center">
                Todos los derechos reservados Belen Canalda {new Date().getFullYear()}
            </p>
        </footer>

        <ToastContainer
        position="top-right"
        hideProgressBar={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false} 
        />
        </>
    );
}

