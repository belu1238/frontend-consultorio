import { NavLink, Outlet} from "react-router-dom";
import Logo from "../components/Logo";
import { IoSearchOutline} from "react-icons/io5";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
export default function Sidebar() {

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

