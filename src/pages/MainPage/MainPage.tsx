import styles from "./MainPage.module.css"
import { useAppSelector } from "@/store/store.ts";
import { useEffect, useState } from "react";
import type { Vehicle } from "@/graphql/generated/graphql.ts";
import { ShipCard } from "@/components/ShipCard/ShipCard.tsx";
import classNames from "classnames";
import { convertToRoman } from "@/utils/utils";

const ELEMENTS_PER_PAGE = 20



export const MainPage = () => {
  const { ships } = useAppSelector(state => state.ships)
  const [shipsData, setShipsData] = useState<Vehicle[] | []>([])
  const [nations, setNations] = useState<{ name: string, title: string }[]>([])
  const [levels, setLevels] = useState<number[]>([])
  const [currentLevel, setCurrentLevel] = useState<number | null>(null)
  const [currentNation, setCurrentNation] = useState<string>('')
  const [classes, setClasses] = useState<{ name: string, title: string }[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [currentClass, setCurrentClass] = useState<string>('')

  const updateShipsData = (page: number, nation: string, level: number | null, shipClass: string) => {
    const startIndex = (page - 1) * ELEMENTS_PER_PAGE;
    const endIndex = startIndex + ELEMENTS_PER_PAGE;
    setShipsData(
      ships
        .filter((ship) => 
          ship.nation?.name === nation && 
          (level === null || ship.level === level) &&
          (shipClass === '' || ship.type?.name === shipClass)
        )
        .slice(startIndex, endIndex)
    );
    setCurrentPage(page);
    setCurrentLevel(level);
    setCurrentClass(shipClass);
  }

  useEffect(() => {
    if (ships) {
      const nations = Array.from(
        new Map(
          ships
            .filter(ship => ship.nation?.name && ship.nation?.title)
            .map(ship => [ship.nation!.name, { name: ship.nation!.name as string, title: ship.nation!.title as string }])
        ).values()
      ).sort((a, b) => a.title.localeCompare(b.title));
      const levels = Array.from(
        new Map(
          ships
            .filter(ship => ship.level)
            .map(ship => [ship.level, ship.level as number])
        ).values()
      ).sort((a, b) => a - b);
      const classes = Array.from(
        new Map(
          ships
            .filter(ship => ship.type?.name)
            .map(ship => [ship.type!.name, {name: ship.type!.name as string, title: ship.type!.title as string}])
        ).values()
      ).sort((a, b) => a.title.localeCompare(b.title));
      setNations(nations)
      setLevels(levels)
      setClasses(classes)
      setCurrentNation(nations[0]?.name)
      setCurrentLevel(levels[0])
      setCurrentClass(classes[0]?.name)
      setTotalPages(Math.ceil(ships.length / ELEMENTS_PER_PAGE));
      updateShipsData(currentPage, nations[0]?.name, levels[0], classes[0]?.name);
    }
  }, [ships]);

  useEffect(() => {
    const filteredShips = ships.filter((ship) => ship.nation?.name === currentNation && (currentLevel === null || ship.level === currentLevel));
    setTotalPages(Math.ceil(filteredShips.length / ELEMENTS_PER_PAGE));
    updateShipsData(1, currentNation, currentLevel || 1, currentClass);
  }, [currentNation, currentLevel, currentClass, ships]);

  return (
    <div className={styles.container}>
      <div className={styles.filterItemWrapper}>
        {nations?.map((nation) => (
          <button
            onClick={() => setCurrentNation(nation.name)}
            className={classNames(styles.button, {
              [styles.activeButton]: currentNation === nation.name
            })}
          >
            {nation.title}
          </button>
        ))}
      </div>
      <div className={styles.filterItemWrapper}>
      {classes?.map((item) => (
          <button
            onClick={() => setCurrentClass(item?.name)}
            className={classNames(styles.button, {
              [styles.activeButton]: currentClass === item?.name
            })}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className={styles.filterItemWrapper}>
      {levels?.map((level) => (
          <button
            onClick={() => setCurrentLevel(level)}
            className={classNames(styles.button, {
              [styles.activeButton]: currentLevel === level
            })}
          >
            {convertToRoman(level)}
          </button>
        ))}
      </div>
      <div className={styles.shipCardsWrapper}>
        {shipsData.map((ship) => (
          <ShipCard ship={ship} />
        ))}
      </div>
      {totalPages > 2 && (
        <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => {
              updateShipsData(page, currentNation, currentLevel || 1, currentClass)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={classNames([styles.button, {
              [styles.activeButton]: currentPage === page
            }])}
          >
            {page}
          </button>
        ))}
        </div>
      )}
    </div>
  )
}