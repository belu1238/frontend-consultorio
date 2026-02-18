import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardView from "./views/DashboardView";
import Sidebar from "./layouts/Sidebar";
import PatientDetails from "./components/patients/PatientsDetails";
import PatientView from "./views/patient/PatientView";
import FolderView from "./views/folders/FolderView";
import Calendar from "./components/calendar/Calendar";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Sidebar/>}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/calendario/:fechaUrl?" element={<Calendar />} />
                    <Route path="/pacientes" element={<PatientView/>} />
                    <Route path="/pacientes/:pacienteId" element={<PatientDetails/>} />                 
                    <Route path="/lugares/:folderId/pacientes" element={<FolderView/>} />                 
                </Route>
            </Routes>
        </BrowserRouter>
    )
}