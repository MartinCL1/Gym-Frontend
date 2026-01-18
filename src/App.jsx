import "./App.css";
import LoginForm from "../src/features/auth/LoginForm";
import { Routes, Route } from "react-router-dom";
import MemberLayout from "./features/layout/MemberLayout/MemberLayout";
import Render from "./features/Render";
import Perfil from "./features/profile/Perfil";

function App() {
  return (
    <section>
      <Routes>
        <Route element={<LoginForm />} index />
        <Route element={<Render />}>
          <Route path="/memberSection" >
            <Route index element={<MemberLayout />} />
            <Route element={<Perfil />} path="perfil" />
          </Route>
        </Route>
      </Routes>
    </section>
  );
}

export default App;
