import { ThumbsUp } from 'lucide-react';

export default function UpVoteButton({ label }) {
  return (
    <div className="flex gap-1 items-center">
      <ThumbsUp className="w-4 h-4" />
      <p className="text-xs">{label}</p>
    </div>
  );
}
