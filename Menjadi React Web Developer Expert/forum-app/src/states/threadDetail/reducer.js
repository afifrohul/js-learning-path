import { ActionType as ActionTypeDetailThread } from './action';
import { ActionType as ActionTypeThread } from '@/states/threads/action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionTypeDetailThread.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionTypeDetailThread.CLEAR_THREAD_DETAIL:
      return null;
    case ActionTypeDetailThread.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...(threadDetail.comments || [])],
      };
    case ActionTypeThread.UP_VOTE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: [...threadDetail.upVotesBy, action.payload.userId],
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
          : threadDetail.downVotesBy,
      };
    case ActionTypeThread.DOWN_VOTE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.upVotesBy,
        downVotesBy: [...threadDetail.downVotesBy, action.payload.userId],
      };
    case ActionTypeThread.NEUTRAL_VOTE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.upVotesBy,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
          : threadDetail.downVotesBy,
      };
    case ActionTypeDetailThread.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id == action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.concat([action.payload.userId]),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId,
                  )
                : comment.downVotesBy,
            };
          }
          return threadDetail;
        }),
      };
    case ActionTypeDetailThread.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id == action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.concat([action.payload.userId]),
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
            };
          }
          return threadDetail;
        }),
      };
    case ActionTypeDetailThread.NEUTRAL_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id == action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId,
                  )
                : comment.downVotesBy,
            };
          }
          return threadDetail;
        }),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
