import type { PatientCardList } from "../../types";
import { FaRegUser, FaRegBuilding  } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

type PatientCardProps =  {
    patient: PatientCardList
}
export default function PatientCard({ patient } : PatientCardProps) {
    const navigate = useNavigate()

    return ( 
        <div
        onClick={() => navigate(`/pacientes/${patient.id}`)} 
        className="flex items-start gap-4 bg-white rounded-lg p-4 mt-6 shadow-md">
            <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center">
                <FaRegUser className="w-6 h-6"/>
            </div>

            <div>
                <div className="flex flex-col gap-2 cursor-pointer">
                    <h3 className="text-xl hover:text-emerald-600 font-serif">{patient.nombre} {patient.apellido}</h3>
                    <p className="text-gray-600 text-lg">{patient.edad} años • DNI: {patient.dni || 'No registrado'}</p>
                    <div className="flex flex-wrap gap-3 text-gray-600 text-lg">
                        {patient.colegio && (
                        <p className="flex items-center gap-2 "><LuGraduationCap /> {patient.colegio}</p> )}
                        {patient.obra_social && (
                        <p className="flex items-center gap-2"><FaRegBuilding />{patient.obra_social}</p> )}
                    </div>

                    <div className="bg-stone-200 w-fit px-3 rounded-2xl mt-2">
                        <p className="text-emerald-600 text-lg">{patient.diagnostico}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

