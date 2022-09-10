import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import injectContext from "./store/appContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NavbarNew from "./components/NewNavbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
const Specialists = lazy(() => import("./pages/Specialists"));
const Contact = lazy(() => import("./pages/Contact"));
const SuperAdmin = lazy(() => import("./pages/Dashboard/SuperAdmin"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const RegisterForm = lazy(() => import("./components/RegisterForm"));
const Login = lazy(() => import("./components/Login"));
const Profile = lazy(() => import("./pages/Dashboard/Profile"));
const Doctores = lazy(() => import("./pages/Dashboard/Doctores"));
const Pacientes = lazy(() => import("./pages/Dashboard/Pacientes"));
const Appointment = lazy(() => import("./components/Appointment"));
const FormEditService = lazy(() => import("./components/Modal/Forms/FormEditService"));
const FormEditClient = lazy(() => import("./components/Modal/Forms/FormEditClient"));
const FormEditAppointment = lazy(() => import("./components/Modal/Forms/FormEditAppointment"));
const FormEditSpecialist = lazy(() => import("./components/Modal/Forms/FormEditSpecialist"));
const AppointmentFromDoctor = lazy(() => import("./components/AppointmentFromDoctor"));

const Layout = () => {
  const FooterCheck = () => {
    const { pathname } = useLocation();
    // console.log(pathname);

    // Only display footer in these routes
    if (pathname === "/" || pathname === "*" || pathname === "/specialists") {
      return <Footer />;
    } else {
      return null;
    }
  };
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
      <BrowserRouter>
        <ScrollToTop />
        <NavbarNew />
        <Routes>
          {/* PAGES */}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/specialists" element={<Specialists />} />
          <Route path="/contact" element={<Contact />} />
          {/* DASHBOARD  */}
          <Route path="/admin" element={<SuperAdmin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doctores" element={<Doctores />} />
          <Route path="/pacientes" element={<Pacientes />} />
          {/* AUTH COMPONENTS */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          {/* WIZARD COMPONENTS */}
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/appointmentdoctor" element={<AppointmentFromDoctor />} />
          {/* EDIT ROUTES */}
          <Route path="/edit/service/:id" element={<FormEditService />} />
          <Route path="/edit/client/:id" element={<FormEditClient />} />
          <Route path="/edit/specialist/:id" element={<FormEditSpecialist />} />
          <Route path="/edit/appointment/:id" element={<FormEditAppointment />} />
        </Routes>
        <ToastContainer />
        <FooterCheck />
      </BrowserRouter>
    </Suspense>
  );
};

export default injectContext(Layout);
