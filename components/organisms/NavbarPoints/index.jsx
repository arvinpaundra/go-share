import { useCallback, useEffect, useState, useContext } from 'react';
import { CounterContext } from '../../../context/counterContext';
import { getRemainingPointAPI, getSeenPointAPI, getWatchPointAPI } from '../../../services/points';
import NavbarPointsItem from '../../molecules/NavbarPointsItem';

const NavbarPoints = (props) => {
  const { id_creator } = props;

  const { updatePointCounter, updaterCounter } = useContext(CounterContext);

  const [watch, setWatch] = useState(0);
  const [seen, setSeen] = useState(0);
  const [remaining, setRemaning] = useState(0);

  const getWatchPoint = useCallback(async (id_creator) => {
    try {
      const response = await getWatchPointAPI(id_creator);

      setWatch(response.data.result.watch);
    } catch (error) {}
  }, []);

  const getSeenPoint = useCallback(async (id_creator) => {
    try {
      const response = await getSeenPointAPI(id_creator);

      setSeen(response.data.result.seen);
    } catch (error) {}
  }, []);

  const getRemainingPoint = useCallback(async (id_creator) => {
    try {
      const response = await getRemainingPointAPI(id_creator);

      setRemaning(response.data.result.remaining);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getWatchPoint(id_creator);
    getSeenPoint(id_creator);
    getRemainingPoint(id_creator);
  }, [getRemainingPoint, getSeenPoint, getWatchPoint, id_creator]);

  useEffect(() => {
    updaterCounter(true);
    if (updatePointCounter) {
      getWatchPoint(id_creator);
      getSeenPoint(id_creator);
      getRemainingPoint(id_creator);
    }

    updaterCounter(false);
  }, [
    getWatchPoint,
    getSeenPoint,
    getRemainingPoint,
    id_creator,
    updatePointCounter,
    updaterCounter,
  ]);

  return (
    <div className="flex justify-between items-center gap-4">
      <NavbarPointsItem
        label="Watch"
        value={watch}
        borderColor="border-[#FF7917]"
        textColor="text-[#FF7917]"
      />
      <NavbarPointsItem
        label="Seen"
        value={seen}
        borderColor="border-[#87F100]"
        textColor="text-[#87F100]"
      />
      <NavbarPointsItem
        label="Remaining"
        value={remaining}
        borderColor="border-[#FFBE17]"
        textColor="text-[#FFBE17]"
      />
    </div>
  );
};

export default NavbarPoints;
