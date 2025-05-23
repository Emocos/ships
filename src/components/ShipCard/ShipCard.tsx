import styles from "./ShipCard.module.css"
import type { Vehicle } from "@/graphql/generated/graphql.ts";
import { convertToRoman } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
interface ShipCardProps {
  ship: Vehicle
}

export const ShipCard = ({ ship }: ShipCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/ship/${ship.title}`)
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <img src={ship.icons?.medium} alt="" className={styles.shipImage} />
      <p>{ship.title}</p>
      <p>{convertToRoman(ship.level || 1)}</p>
      <div className={styles.subtitleWrapper}>
        <p>{ship.nation?.title}</p>
        <img src={ship.nation?.icons?.large} alt="" />
      </div>
      <div className={styles.subtitleWrapper}>
        <p>{ship.type?.title}</p>
        <img src={ship.type?.icons?.default} alt="" />
      </div>
    </div>
  )
}