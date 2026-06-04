import { ThumbsDown } from 'lucide-react';

export default function DownVoteButton({ label }) {
  return (
    <div className="flex gap-1 items-center">
      <ThumbsDown className="w-4 h-4" />
      <p className="text-xs">{label}</p>
    </div>
  );
}
