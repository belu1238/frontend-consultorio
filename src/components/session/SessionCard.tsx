import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getSessionsByPatient } from "../../api/PatientAPI";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FaRegEdit } from "react-icons/fa";
import EditModalSession from "./EditModalSession";


export default function SessionCard() {
  const navigate = useNavigate()
  const params = useParams();
  const pacienteId = Number(params.pacienteId!);

  const { data } = useQuery({
    queryKey: ["sessions", pacienteId],
    queryFn: () => getSessionsByPatient(pacienteId),
    enabled: !!pacienteId, // solo ejecuta la query si pacienteId EXISTE
  });

  if (!data || data.length === 0)
    return <p className="text-center">No hay sesiones registradas</p>;
  return (
    <div className="gap-6 ">
      {data.map((sesion) => (
        <div key={sesion.id} className="bg-white shadow-md rounded-lg p-4 mt-4">
          <div className="flex items-center gap-4">
            <h2 className="capitalize font-serif text-2xl mb-2">
              {format(
                new Date(sesion.fecha + "T00:00:00"),
                "EEEE, d 'de' MMMM yyyy",
                { locale: es },
              )}
              {sesion.hora && ` - ${sesion.hora} hs`}
            </h2>
            <span
              className="px-3 py-1 rounded-xl text-sm font-medium"
              style={{ backgroundColor: sesion.estado_pago.color }}
            >
              {sesion.estado_pago.nombre}
            </span>

            <button
              type="button"
              onClick={() => navigate(location.pathname + `?editSession=${sesion.id}`)}
              className="ml-auto text-gray-600 mr-8 hover:text-emerald-600 cursor-pointer"
            >
              <FaRegEdit className="h-6 w-6" />
            </button>

            <EditModalSession data={data} pacienteId={pacienteId}/>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-medium text-lg mb-2 text-gray-500">
                Actividades realizadas
              </p>
              <p className="font-sans text-xl">{sesion.actividad}</p>
            </div>

            <div>
              <p className="font-medium text-lg mb-2 text-gray-500">
                Observaciones
              </p>
              <p className="font-sans text-xl">{sesion.observaciones}</p>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <p className="font-medium text-lg mb-2 text-gray-500">
                Evaluación
              </p>
              {sesion.evaluacion && (
                <p className="font-sans text-xl text-emerald-700">
                  {sesion.evaluacion}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
