import CommentInput from '@/components/comment-input';
import CommentItem from '@/components/comment-item';
import Loading from '@/components/loading';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
} from '@/states/threadDetail/action';
import { postedAt } from '@/utils';
import { ChevronLeft, Hash, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

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
            <ChevronLeft/>
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
          <div className="flex gap-1 items-center">
            <ThumbsUp className="w-3 h-3" />
            <p className="text-xs">{threadDetail.upVotesBy.length}</p>
          </div>
          <div className="flex gap-1 items-center">
            <ThumbsDown className="w-3 h-3" />
            <p className="text-xs">{threadDetail.downVotesBy.length}</p>
          </div>
          <div className="flex gap-1 items-center">
            <MessageCircle className="w-3 h-3" />
            <p className="text-xs">{threadDetail.comments.length}</p>
          </div>
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
            <CommentItem key={index} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
