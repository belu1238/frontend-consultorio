import { FaPlus } from "react-icons/fa6";
import PatientCard from "../../components/patients/PatientCard";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../api/PatientAPI";
import { useNavigate } from "react-router-dom";
import CreatePatient from "../../components/patients/CreatePatient";
import type { PatientCardList } from "../../types";


export default function PatientView() {
    const navigate = useNavigate()

    const { data, isLoading} = useQuery({
        queryKey: ['patients'],
        queryFn: () => getPatients(),
        retry: false
    }) 

    if(isLoading) return <p>Cargando Pacientes...</p>
    if(!data) return <p className="text-center">No hay pacientes registrados</p>

    return ( 
        <>
        <div className="flex-1 overflow-y-auto p-8">
            <header className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-4xl font-serif">Todos los Pacientes</h1>
                </div>

                <div>
                    <button 
                    type="button"
                    onClick={() => navigate(location.pathname + '?newPatient=true') }
                    className="bg-emerald-600 text-white text-lg p-4 rounded-lg hover:bg-emerald-700">
                        <span className="flex items-center gap-2">
                        <FaPlus className="h-5 w-5"/> 
                        Nuevo Paciente
                        </span>
                    </button>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-">
                {data.map((patient: PatientCardList) => (
                    <PatientCard key={patient.id} patient={patient}/>
                ))}

            </div>

            </header>
            <CreatePatient />
        </div>
        </>
    );
}

