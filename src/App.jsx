import Index from "./pages/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Parentesco from "./pages/apoderados/Parentesco";
import Vehiculos from "./pages/vehiculos/Vehiculos";
import {VehiculosForm} from "./pages/vehiculos/form/VehiculosForm";
import Documentos from "./pages/vehiculos/Documentos";
import { DocumentosForm } from "./pages/vehiculos/form/DocumentosForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/parentesco" element={<Parentesco />} />

        <Route exact path="/vehiculos/:search?" element={<Vehiculos />} />
        <Route path="/vehiculos/:id" element={<VehiculosForm />} />       
        <Route path="/vehiculos-form" element={<VehiculosForm />} />
        {/* <Route path="/vehiculos-search/:search" element={<Vehiculos />} /> */}

        <Route path="/documentos" element={<Documentos />} />
        <Route path="/documentos/:id" element={<DocumentosForm />} />
        <Route path="/documentos-form" element={<DocumentosForm />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
