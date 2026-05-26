export default function LeaderboardItem({ leaderboard }) {
  return (
    <div className="grid grid-cols-4 text-sm">
      <div className="col-span-3">
        <div className="flex gap-2 items-center">
          <img
            src={leaderboard.user.avatar}
            alt={leaderboard.user.id}
            title={leaderboard.user.name}
            className="rounded-full h-8 w-8"
          />
          <div className="flex gap-1 items-center">
            <p className="font-semibold">{leaderboard.user.name}</p>
            <p className="text-xs italic">·</p>
            <p className="text-xs italic">@{leaderboard.user.id}</p>
          </div>
        </div>
      </div>
      <div className="col-span-1">{leaderboard.score}</div>
    </div>
  );
}
