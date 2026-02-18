import { useQuery } from "@tanstack/react-query";
import { getPatientByFolder } from "../../api/FolderAPI";
import { useParams } from "react-router-dom";
import PatientCard from "../../components/patients/PatientCard";

export default function FolderView() {
  const params = useParams();
  const folderId = Number(params.folderId);

  const { data, isLoading } = useQuery({
    queryKey: ["folderPatient", folderId],
    queryFn: () => getPatientByFolder(folderId),
    retry: false,
    enabled: folderId !== null,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (data)
    return (
      <>
        <div>
          <h2 className="text-4xl text-center font-serif mb-5">
            Pacientes en este lugar de atención
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-">
          {data.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </>
    );
}
