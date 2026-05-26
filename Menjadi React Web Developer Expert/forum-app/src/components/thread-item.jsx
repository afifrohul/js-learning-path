import SubtleBadge from '@/components/subtle-badge';
import { Hash, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';

export default function ThreadItem({ thread }) {
  return (
    <div className="border p-3 rounded-md space-y-2">
      <SubtleBadge
        color="teal"
        icon={<Hash className="w-2.5 h-2.5" />}
        label={thread.category}
      />
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{thread.title}</p>
        <div
          className="text-xs text-muted-foreground line-clamp-3"
          dangerouslySetInnerHTML={{ __html: thread.body }}
        />
      </div>
      <div className="flex gap-3 items-center text-muted-foreground">
        <div className="flex gap-1 items-center">
          <ThumbsUp className="w-3 h-3" />
          <p className="text-xs">{thread.upVotesBy.length}</p>
        </div>
        <div className="flex gap-1 items-center">
          <ThumbsDown className="w-3 h-3" />
          <p className="text-xs">{thread.downVotesBy.length}</p>
        </div>
        <div className="flex gap-1 items-center">
          <MessageCircle className="w-3 h-3" />
          <p className="text-xs">{thread.totalComments}</p>
        </div>
      </div>
    </div>
  );
}
