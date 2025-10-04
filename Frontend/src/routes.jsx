import Landing from './components/Landing'
import ProjectBoard from './components/ProjectBoard'
import Kanban from './components/Kanban'
import Login from './components/Login'
import Signup from './components/Signup'

const routes = [
  { path: "/", element: <Landing /> },
  { path: "/projectboard", element: <ProjectBoard /> },
  { path: "/kanban", element: <Kanban /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]

export default routes
