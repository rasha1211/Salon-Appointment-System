import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminAppointments from "./components/AdminAppointments";
import AdminServices from "./components/AdminService";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <About />
            <WhyChooseUs />
            <Gallery />
            <Testimonials />
            <Booking />
            <Contact />
        </>
    );
}

function App() {
    const path = window.location.pathname;

    if (path === "/admin/login") {
        return <AdminLogin />;
    }

    if (path === "/admin/dashboard") {
    return <AdminDashboard />;
    }
    
    if (path === "/admin/appointments") {
    return <AdminAppointments />;
    }

    if (path === "/admin/services") {
    return <AdminServices />;
}

    return <Home />;
}

export default App;