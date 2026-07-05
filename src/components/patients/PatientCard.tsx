import type { PatientCardList } from "../../types";
import { FaRegUser } from "react-icons/fa";
// import { LuGraduationCap } from "react-icons/lu";
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
                <table>
                    <thead>Paciente</thead>
                </table>
                
            </div>
        </div>
    );
}

