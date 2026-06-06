import CommentButton from '@/components/comment-button';
import DownVoteButton from '@/components/down-vote-button';
import SubtleBadge from '@/components/subtle-badge';
import UpVoteButton from '@/components/up-vote-button';
import { postedAt } from '@/utils';
import { Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ThreadItem({ thread, upVote, downVote, neutralVote }) {
  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/threads/${thread.id}`);
  };

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (!thread.authUser) {
      alert('Sign in to up vote thread');
    } else {
      if (!thread.upVotesBy.includes(thread.authUser)) {
        upVote(thread.id);
      } else {
        neutralVote(thread.id);
      }
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();

    if (!thread.authUser) {
      alert('Sign in to up vote thread');
    } else {
      if (!thread.downVotesBy.includes(thread.authUser)) {
        downVote(thread.id);
      } else {
        neutralVote(thread.id);
      }
    }
  };

  return (
    <div
      className="border p-3 rounded-md hover:cursor-pointer duration-200 transition-all"
      onClick={onThreadClick}
    >
      <div className="space-y-4">
        <SubtleBadge
          color="teal"
          icon={<Hash className="w-2.5 h-2.5" />}
          label={thread.category}
        />
        <div className="flex items-center gap-3">
          <img
            src={thread.user.avatar}
            alt={thread.user.id}
            title={thread.user.name}
            className="rounded-full h-6 w-6"
          />
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{thread.user.name}</p>
            <p className="text-xs text-muted-foreground">
              @{thread.user.id} · {postedAt(thread.createdAt)}
            </p>
          </div>
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium">{thread.title}</p>
          <div
            className="text-xs text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ __html: thread.body }}
          />
        </div>
        <div className="flex gap-3 items-center text-muted-foreground">
          <div onClick={onUpVoteClick}>
            <UpVoteButton
              label={thread.upVotesBy.length}
              upVotedThread={thread.upVotesBy.includes(thread.authUser)}
            />
          </div>
          <div onClick={onDownVoteClick}>
            <DownVoteButton
              label={thread.downVotesBy.length}
              downVotedThread={thread.downVotesBy.includes(thread.authUser)}
            />
          </div>
          <CommentButton label={thread.totalComments} />
        </div>
      </div>
    </div>
  );
}
