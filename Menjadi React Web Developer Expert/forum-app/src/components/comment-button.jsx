import { MessageCircle } from 'lucide-react';

export default function CommentButton({ label }) {
  return (
    <div className="flex gap-1 items-center">
      <MessageCircle className="w-4 h-4" />
      <p className="text-xs">{label}</p>
    </div>
  );
}
