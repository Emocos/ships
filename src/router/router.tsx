import {createBrowserRouter} from "react-router";
import {Layout} from '@/components/Layout/Layout';
import {MainPage} from "@/pages/MainPage/MainPage.tsx";
import { ShipPage } from "@/pages/ShipPage/ShipPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: '/ship/:id',
        element: <ShipPage />
      }
    ]
  }
])