import DownVoteButton from '@/components/down-vote-button';
import UpVoteButton from '@/components/up-vote-button';
import { postedAt } from '@/utils';

export default function CommentItem({ comment }) {
  return (
    <div className="">
      <div className="space-y-4">
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
          <UpVoteButton label={comment.upVotesBy.length} />
          <DownVoteButton label={comment.downVotesBy.length} />
        </div>
      </div>
    </div>
  );
}
