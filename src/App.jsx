import "./App.css";
import LoginForm from "../src/features/auth/LoginForm";
import { Routes, Route } from "react-router-dom";
import MemberLayout from "./features/layout/MemberLayout/MemberLayout";
import Render from "./features/Render";
import Perfil from "./features/profile/Perfil";
import Alimentacion from "./features/pages/alimentacion/Alimentacion";

function App() {
  return (
    <section className="bg-[#151515]">
      <Routes>
        <Route element={<LoginForm />} index />
        <Route element={<Render />}>
          <Route path="/memberSection" >
            <Route index element={<MemberLayout />} />
            <Route element={<Perfil />} path="perfil" />
            <Route element={<Alimentacion />} path="alimentacion" />
          </Route>
        </Route>
      </Routes>
    </section>
  );
}

export default App;
