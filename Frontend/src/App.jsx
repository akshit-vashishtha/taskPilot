import React from 'react'
import Landing from './components/Landing'
import ProjectBoard from './components/ProjectBoard'
import Kanban from './components/Kanban'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./routes";

function AppRoutes() {
  return useRoutes(routes);
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
