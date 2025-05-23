import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom'
import styles from './ShipPage.module.css'
import { useAppSelector } from '@/store/store'
import type { Vehicle } from '@/graphql/generated/graphql';
import { convertToRoman } from '@/utils/utils';
export const ShipPage = () => {
  const { id } = useParams()
  const { ships } = useAppSelector(state => state.ships)
  const [ship, setShip] = useState<Vehicle | null>(null)

  useEffect(() => {
    if (ships) {
      const ship = ships.find(ship => ship.title === id)
      setShip(ship || null)
      console.log(ship)
    }
  }, [ships])

  return (
    <div className={styles.container}>
      <img src={ship?.icons?.large} alt="" className={styles.shipImage} />
      <div className={styles.infoField}>
        <p>Name:</p>
        <p>{ship?.title}</p>
      </div>
      <div className={styles.infoField}>
        <p>Level:</p>
        <p>{convertToRoman(ship?.level || 1)}</p>
      </div>
      <div className={styles.infoField}>
        <p>Nation:</p>
        <p>{ship?.nation?.title}</p>
        <img src={ship?.nation?.icons?.large} alt="" />
      </div>
      <div className={styles.infoField}>
        <p>Type:</p>
        <p>{ship?.type?.title}</p>
        <img src={ship?.type?.icons?.default} alt="" />
      </div>
      <div className={styles.descriptionWrapper}>
        <p>Description</p>
        <p>{ship?.description}</p>
      </div>
    </div>
  )
}