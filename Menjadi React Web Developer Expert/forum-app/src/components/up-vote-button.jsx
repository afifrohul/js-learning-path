import { ThumbsUp } from 'lucide-react';

export default function UpVoteButton({ label, upVotedThread, upVotedComment }) {
  return (
    <div className="flex gap-1 items-center">
      <ThumbsUp
        className={`w-4 h-4 hover:fill-blue-400 duration-200 transition-all ${upVotedThread || upVotedComment ? 'fill-blue-400' : null}`}
      />
      <p className="text-xs">{label}</p>
    </div>
  );
}
