import CommentButton from '@/components/comment-button';
import CommentInput from '@/components/comment-input';
import CommentItem from '@/components/comment-item';
import DownVoteButton from '@/components/down-vote-button';
import Loading from '@/components/loading';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import UpVoteButton from '@/components/up-vote-button';
import {
  asyncAddComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
} from '@/states/threadDetail/action';
import { postedAt } from '@/utils';
import { ChevronLeft, Hash } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from '@/states/threads/action';

export default function DetailThreadPage() {
  const { id } = useParams();
  const {
    threadDetail = null,
    authUser,
    loading,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  const onAddComment = ({ threadId, content }) => {
    dispatch(asyncAddComment({ threadId, content }));
  };

  const onUpVoteThreadClick = () => {
    if (!authUser) {
      alert('Sign in to up vote thread');
    } else {
      if (!threadDetail.upVotesBy.includes(authUser.id)) {
        dispatch(asyncUpVoteThread(threadDetail.id));
      } else {
        dispatch(asyncNeutralVoteThread(threadDetail.id));
      }
    }
  };

  const onDownVoteThreadClick = () => {
    if (!authUser) {
      alert('Sign in to up vote thread');
    } else {
      if (!threadDetail.downVotesBy.includes(authUser.id)) {
        dispatch(asyncDownVoteThread(threadDetail.id));
      } else {
        dispatch(asyncNeutralVoteThread(threadDetail.id));
      }
    }
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncUpVoteComment({ threadId: threadDetail.id, commentId }));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncDownVoteComment({ threadId: threadDetail.id, commentId }));
  };

  const onNeutralVoteComment = (commentId) => {
    dispatch(asyncNeutralVoteComment({ threadId: threadDetail.id, commentId }));
  };

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return <Loading />;
  }

  return (
    <div>
      <div className="space-y-2">
        <Link to="/threads" className="block">
          <Button type="button" variant="outline">
            <ChevronLeft />
          </Button>
        </Link>
        <SubtleBadge
          color="teal"
          icon={<Hash className="w-2.5 h-2.5" />}
          label={threadDetail.category}
        />
        <div className="flex items-center gap-3">
          <img
            src={threadDetail.owner.avatar}
            alt={threadDetail.owner.id}
            title={threadDetail.owner.name}
            className="rounded-full h-8 w-8"
          />
          <div className="flex items-center gap-2">
            <p className="text-bas font-semibold">{threadDetail.owner.name}</p>
            <p className="text-sm text-muted-foreground">
              @{threadDetail.owner.id} · {postedAt(threadDetail.createdAt)}
            </p>
          </div>
        </div>
        <div className="space-y-0.5">
          <p className="text-base font-medium">{threadDetail.title}</p>
          <div
            className="text-sm text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ __html: threadDetail.body }}
          />
        </div>
        <div className="flex gap-3 items-center text-muted-foreground">
          <div onClick={onUpVoteThreadClick}>
            <UpVoteButton
              label={threadDetail.upVotesBy.length}
              upVotedThread={threadDetail.upVotesBy.includes(authUser.id)}
            />
          </div>
          <div onClick={onDownVoteThreadClick}>
            <DownVoteButton
              label={threadDetail.downVotesBy.length}
              downVotedThread={threadDetail.downVotesBy.includes(authUser.id)}
            />
          </div>
          <CommentButton label={threadDetail.comments.length} />
        </div>
      </div>
      <div>
        <p className="my-3 text-sm font-semibold">Add Comment</p>
        {authUser ? (
          <CommentInput
            createComment={onAddComment}
            threadId={threadDetail.id}
            loading={loading}
          />
        ) : (
          <div className="text-sm">
            <Link to="/sign-in" className="underline">
              Sign in
            </Link>{' '}
            to add comment
          </div>
        )}
      </div>
      <Separator className="my-4" />
      <div>
        <p className="my-3 text-sm font-semibold">
          Comments ({threadDetail.comments.length})
        </p>
        <div className="space-y-4">
          {threadDetail.comments.map((comment, index) => (
            <CommentItem
              key={index}
              authUser={authUser}
              comment={comment}
              upVote={onUpVoteComment}
              downVote={onDownVoteComment}
              neutralVote={onNeutralVoteComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
