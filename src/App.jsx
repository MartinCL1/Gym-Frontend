import "./App.css";
import LoginForm from "../src/features/auth/LoginForm";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./features/layout/AdminLayout/AdminLayout";
import MemberLayout from "./features/layout/MemberLayout/MemberLayout";
import Render from "./features/Render";

function App() {
  return (
    <section>
      <Routes>
        <Route Component={LoginForm} path="" />
        <Route Component={Render}>
          <Route Component={AdminLayout} path="/adminSection" />
          <Route Component={MemberLayout} path="/memberSection" />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
