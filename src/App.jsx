import { Toaster } from "react-hot-toast";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import NovoCliente from "./pages/NovoCliente";
import EditarCliente from "./pages/EditarCliente";
import Pets from "./pages/Pets";
import NovoPet from "./pages/NovoPet";
import EditarPet from "./pages/EditarPet";
import Reservas from "./pages/Reservas";
import NovaReserva from "./pages/NovaReserva";
import EditarReserva from "./pages/EditarReserva";
import Footer from "./components/Footer";
import ReservaCliente from "./pages/ReservaCliente";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <HashRouter>
        <Header />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/novo" element={<NovoCliente />} />
            <Route path="/clientes/editar/:id" element={<EditarCliente />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pets/novo" element={<NovoPet />} />
            <Route path="/pets/editar/:id" element={<EditarPet />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/reservas/novo" element={<NovaReserva />} />
            <Route path="/reservas/editar/:id" element={<EditarReserva />} />
            <Route path="/clientes/:id/reservas" element={<ReservaCliente />} />
          </Routes>
        </div>
        <Footer />
      </HashRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
