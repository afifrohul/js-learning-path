import { ThumbsDown } from 'lucide-react';

export default function DownVoteButton({
  label,
  downVotedThread,
  downVotedComment,
}) {
  return (
    <div className="flex gap-1 items-center">
      <ThumbsDown
        className={`w-4 h-4 hover:fill-rose-400 duration-200 transition-all ${downVotedThread || downVotedComment ? 'fill-rose-400' : null}`}
      />
      <p className="text-xs">{label}</p>
    </div>
  );
}
