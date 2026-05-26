import { postedAt } from '@/utils';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export default function CommentItem({ comment }) {
  return (
    <div className="">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <img
            src={comment.owner.avatar}
            alt={comment.owner.id}
            title={comment.owner.name}
            className="rounded-full h-6 w-6"
          />
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{comment.owner.name}</p>
            <p className="text-xs text-muted-foreground">
              @{comment.owner.id} · {postedAt(comment.createdAt)}
            </p>
          </div>
        </div>
        <div className="space-y-0.5">
          <div
            className="text-sm text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />
        </div>
        <div className="flex gap-3 items-center text-muted-foreground">
          <div className="flex gap-1 items-center">
            <ThumbsUp className="w-3 h-3" />
            <p className="text-xs">{comment.upVotesBy.length}</p>
          </div>
          <div className="flex gap-1 items-center">
            <ThumbsDown className="w-3 h-3" />
            <p className="text-xs">{comment.downVotesBy.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
