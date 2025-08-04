import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ListUsers from "./pages/listUsers";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ListEvents from "./pages/listEventos";
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <ListUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route path="/CreateEvent" element={<CreateEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
