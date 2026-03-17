import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardView from "./views/DashboardView";
import Sidebar from "./layouts/Sidebar";
import PatientDetails from "./components/patients/PatientsDetails";
import PatientView from "./views/patient/PatientView";
import FolderView from "./views/folders/FolderView";
import Calendar from "./components/calendar/Calendar";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestConfirmationCode from "./views/auth/RequestConfirmationCode";
import NewPasswordView from "./views/auth/NewPasswordView";

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

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="/auth/request-code" element={<RequestConfirmationCode />} />
                    <Route path="/auth/new-password" element={<NewPasswordView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}