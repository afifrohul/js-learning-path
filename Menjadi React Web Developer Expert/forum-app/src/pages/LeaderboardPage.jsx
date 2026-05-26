import LeaderboardList from '@/components/leaderboard-list';
import { asyncPopulateLeaderboards } from '@/states/shared/action';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LeadeboardPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <div className="mt-2">
      <div className="">
        <p className="text-sm font-semibold">Leaderboards</p>
        <div>
          <LeaderboardList leaderboards={leaderboards} />
        </div>
      </div>
    </div>
  );
}

export default LeadeboardPage;
