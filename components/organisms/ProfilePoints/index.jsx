import { useCallback, useEffect, useState } from 'react';
import { getWatchPointAPI, getSeenPointAPI, getRemainingPointAPI } from '../../../services/points';
import ProfilePointsItem from '../../molecules/ProfilePointsItem';

const ProfilePoints = ({ id_creator }) => {
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
  }, [getWatchPoint, getSeenPoint, getRemainingPoint, id_creator]);
  return (
    <div className="flex justify-between items-center gap-4 absolute top-[50%] right-24">
      <ProfilePointsItem
        label="Watch"
        value={watch}
        borderColor="border-[#FF7917]"
        textColor="text-[#FF7917]"
      />
      <ProfilePointsItem
        label="Seen"
        value={seen}
        borderColor="border-[#87F100]"
        textColor="text-[#87F100]"
      />
      <ProfilePointsItem
        label="Remaining"
        value={remaining}
        borderColor="border-[#FFBE17]"
        textColor="text-[#FFBE17]"
      />
    </div>
  );
};

export default ProfilePoints;
