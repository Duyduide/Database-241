import App from './App'
import { pathname } from "./lib/path";
import { HomePage, PublicLayout, Login, Register } from './pages/public'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: pathname.public.layout,
        element: <PublicLayout />,
        children: [
          {
            path: pathname.public.homepage,
            element: <HomePage />
          },
          {
            path: pathname.public.login,
            element: <Login />
          },
          {
            path: pathname.public.register,
            element: <Register /> 
          },
        ],
      },
    ],
  },
]

export default routes