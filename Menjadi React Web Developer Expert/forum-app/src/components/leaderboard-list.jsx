import LeaderboardsItem from '@/components/leaderboard-item';

export default function LeaderboardList({ leaderboards }) {
  if (leaderboards.length <= 0) {
    return (
      <div className="space-y-4 mt-3">
        <p className="text-xs text-center">Leaderboard not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-3">
      <div className='grid grid-cols-4 text-sm font-semibold'>
        <div className='col-span-3'>User</div>
        <div className='col-span-1'>Score</div>
      </div>
      {leaderboards.map((leaderboard, index) => (
        <LeaderboardsItem key={index} leaderboard={leaderboard} />
      ))}
    </div>
  );
}
