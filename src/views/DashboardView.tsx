import { useQuery } from "@tanstack/react-query";
import { getSessionsByOrder } from "../api/PatientAPI";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
export default function DashboardView() {
    const navigate = useNavigate()
    const { user } = useAuth()

    const {data, isLoading} = useQuery({
        queryKey: ['sessionsByOrder'],
        queryFn: getSessionsByOrder
    })

    if(isLoading) return <p>Cargando Sesiones...</p>
    if(!data) return <p className="text-center">No hay sesiones registradas.</p>
    
    if(data) return ( 
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-serif">Hola !, {user?.nombre} {user?.apellido}</h1>
                <p className="mt-2 text-gray-600 font-sans text-xl">Aquí está el resumen de tu consultorio</p>
            </header>

            <div className="grid grid-cols-2 gap-2">
                {/** SESIONES */}
                <div className=" bg-white shadow-md rounded-xl p-6 mt-4">
                    <h2 className="font-serif text-2xl pl-2">Sesiones Recientes</h2>
                    {data.recientes.map((sesion) => (
                        <div
                        key={sesion.id}
                        className="border pl-6 border-gray-200 cursor-pointer  hover:border-gray-300 rounded-xl mt-4"
                        onClick={() => navigate(`/`)}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                <p className="font-sans text-2xl mt-2">{sesion.paciente.nombre} {sesion.paciente.apellido}</p>
                                <p className="font-sans text-xl text-gray-600">{sesion.actividad}</p> 
                                </div>
                                <div className="text-right p-3">
                                    <p className="font-sans text-2xl">{format(new Date(sesion.fecha), 'd MMM', { locale: es })}</p>
                                    <p className="text-sm rounded-full p-1.5"
                                    style={{backgroundColor: sesion.estado_pago.color}}>{sesion.estado_pago.nombre}</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 mt-2">
                                <p className="text-emerald-600 m-2">{sesion.evaluacion}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                    <div className="flex items-center mt-4">
                    <IoCalendarClearOutline className="w-6 h-6 text-emerald-600" />
                    <h2 className="font-serif text-2xl upp pl-2">Proximas Citas</h2>
                    </div>
                    {data.proximas.map((sesion) => (
                        <div
                        key={sesion.id}
                        className="flex items-start p-4 bg-stone-100 hover:bg-stone-200 cursor-pointer rounded-xl mt-4"
                        onClick={() => navigate('/calendario')}
                        >
                            <div className="w-14 h-14 bg-emerald-600 rounded-xl flex flex-col items-center justify-center">
                                <span className="text-white font-semibold capitalize">{format(new Date(sesion.fecha), 'EEE', { locale: es })}</span>  
                                <span className="text-lg font-bold">{format(new Date(sesion.fecha), 'd', { locale: es })}</span>                
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                    <p className="font-sans text-2xl pl-3">{sesion.paciente.nombre} {sesion.paciente.apellido}</p>
                                </div>
                                <div className="flex items-center gap-2 pl-3">
                                    <FaRegClock className="text-gray-400"/>
                                    <p className="text-gray-600 text-lg uppercase">{sesion.hora}</p>
                                </div>
                            </div>
                                <div className="text-right p-3">
                                    <p className="text-sm rounded-full p-1.5"
                                    style={{backgroundColor: sesion.estado_pago.color}}>{sesion.estado_pago.nombre}</p>
                                </div>
                            
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

