import DownVoteButton from '@/components/down-vote-button';
import UpVoteButton from '@/components/up-vote-button';
import { postedAt } from '@/utils';

export default function CommentItem({
  authUser,
  comment,
  upVote,
  downVote,
  neutralVote,
}) {
  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (!authUser) {
      alert('Sign in to up vote comment');
    } else {
      if (!comment.upVotesBy.includes(authUser.id)) {
        upVote(comment.id);
      } else {
        neutralVote(comment.id);
      }
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();

    if (!authUser) {
      alert('Sign in to up vote comment');
    } else {
      if (!comment.downVotesBy.includes(authUser.id)) {
        downVote(comment.id);
      } else {
        neutralVote(comment.id);
      }
    }
  };

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
          <div onClick={onUpVoteClick}>
            <UpVoteButton
              label={comment.upVotesBy.length}
              upVotedComment={comment.upVotesBy.includes(authUser.id)}
            />
          </div>
          <div onClick={onDownVoteClick}>
            <DownVoteButton
              label={comment.downVotesBy.length}
              downVotedComment={comment.downVotesBy.includes(authUser.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
