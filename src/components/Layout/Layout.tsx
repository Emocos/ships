import { useGetVehiclesQuery, type Vehicle } from "@/graphql/generated/graphql";
import styles from "./Layout.module.css"
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { setShips } from "@/store/slices/shipSlice/shipSlice";

export const Layout = () => {
  const { data } = useGetVehiclesQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data?.vehicles) {
      dispatch(setShips(data.vehicles as Vehicle[]))
    }
  }, [data])

  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  )
}