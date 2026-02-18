import { IoArrowBackOutline } from "react-icons/io5";
import { FaRegUser, FaRegBuilding, FaStethoscope } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineEdit, MdFolderShared } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPatientById } from "../../api/PatientAPI";
import type { Patient } from "../../types";
import { useState } from "react";
import EditModalPatient from "./EditModalPatient";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import SessionCard from "../session/SessionCard";

export default function PatientDetails() {
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const pacienteId = params.pacienteId!;
  const parsedPacienteId = Number(pacienteId);

  const { data } = useQuery<Patient>({
    // para que usequery sepa que datos traer
    queryKey: ["getPatient", pacienteId],
    queryFn: () => getPatientById(Number(pacienteId)),
    enabled: !!pacienteId,
    retry: false,
  });

  if (data)
    return (
      <>
        <div className="flex-1 overflow-y-auto">
          {/** Header */}
          <div className="bg-emerald-100 px-8 py-6 border-b border-gray-300">
            <button
              onClick={() => navigate("/pacientes")}
              className="flex items-center gap-2 text-gray-500 font-medium hover:text-gray-600 cursor-pointer py-4 text-lg"
            >
              <IoArrowBackOutline className="w-6 h-5" />
              <span>Volver a Pacientes</span>
            </button>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="bg-white rounded-2xl p-8 flex items-center">
                  <FaRegUser className="w-12 h-12 text-emerald-600" />
                </div>

                <div className="m-4">
                  <h3 className="text-3xl font-semibold">
                    {data.nombre} {data.apellido}
                  </h3>
                  <p className="mt-1 text-lg">
                    {data.edad} años • DNI {data.dni || "No registrado"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpenEdit(true)}
                  className="flex items-center gap-1 bg-white hover:bg-amber-500 rounded-lg p-3 border border-gray-200 font-medium text-lg"
                >
                  <MdOutlineEdit className="h-6 w-6 " />
                  Editar
                </button>

                {openEdit && (
                  <EditModalPatient
                    data={data}
                    pacienteId={parsedPacienteId}
                    onClose={() => setOpenEdit(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/** Informacion de Padres */}
        <TabGroup>
          <TabList className="mb-6 flex gap-2 rounded-xl bg-stone-200 p-2 w-fit mt-4">
            {["Información", "Sesiones"].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `px-4 py-2 rounded-lg text-lg font-medium transition 
        ${
          selected
            ? "bg-white text-black shadow"
            : "text-gray-600 hover:bg-stone-300"
        }`
                }
              >
                {tab}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <FiUsers className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-2xl font-serif">Datos de los Padres</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-500 text-xl mt-4">Madre</p>
                    <p className="font-medium text-2xl">
                      {data.nombre_madre || "-"}
                    </p>

                    <div>
                      <p className="text-gray-500 text-xl">Padre</p>
                      <p className="font-medium text-2xl">
                        {data.nombre_padre || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <FaStethoscope className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-2xl font-serif">Información Clínica</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-500 text-xl mt-4">Diagnóstico</p>
                    <p className="font-medium text-2xl">
                      {data.diagnostico || "-"}
                    </p>

                    <div>
                      <p className="text-gray-500 text-xl">Medicación</p>
                      <p className="font-medium text-2xl">
                        {data.medicacion || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <FaRegBuilding className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-2xl font-serif">Obra Social</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-500 text-xl mt-4">Obra Social</p>
                      <p className="font-medium text-2xl">
                        {data.obra_social || "-"}
                      </p>

                      <p className="text-gray-500 text-xl">N Beneficiario</p>
                      <p className="font-medium text-2xl">
                        {data.numero_beneficiario || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xl">CUIT</p>
                      <p className="font-medium text-2xl">
                        {data.cuit_obra_social || "-"}
                      </p>

                      <p className="text-gray-500 text-xl">Situación IVA</p>
                      <p className="font-medium text-2xl">
                        {data.situacion_frente_iva || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <LuGraduationCap className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-2xl font-serif">Información Escolar</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-500 text-xl mt-4">Colegio</p>
                    <p className="font-medium text-2xl">
                      {data.colegio || "-"}
                    </p>

                    <div>
                      <p className="text-gray-500 text-xl">
                        Horario Presupuesto
                      </p>
                      <p className="font-medium text-2xl">
                        {data.horario_presupuesto || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xl">Profesionales</p>
                      <p className="font-medium text-2xl">
                        {data.profesionales || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <IoCalendarClearOutline className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-2xl font-serif">Fecha de Nacimiento</h3>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium text-2xl">
                      {data.fecha_nacimiento}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <MdFolderShared className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-2xl font-serif">Historia Clinica</h3>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium ">
                      {data.historia_clinica || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <h3 className="font-serif text-2xl">Historial de Sesiones</h3>
              <SessionCard/>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </>
    );
}
