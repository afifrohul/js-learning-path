import { hideLoading, showLoading } from '@/states/loading/action';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function asyncReceiveThreadDetail(threadId, isLoadingPage = true) {
  return async (dispatch) => {
    dispatch(showLoading());

    if (isLoadingPage) {
      dispatch(clearThreadDetailActionCreator());
    }
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();

    const optimisticComment = {
      id: `temp-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      owner: authUser,
      upVotesBy: [],
      downVotesBy: [],
    };

    dispatch(addCommentActionCreator(optimisticComment));

    try {
      await api.createComment({ threadId, content });

      dispatch(asyncReceiveThreadDetail(threadId, false));
    } catch (error) {
      alert(error.message);

      dispatch(asyncReceiveThreadDetail(threadId));
    }

    dispatch(hideLoading());
  };
}

function upVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      upVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }),
    );

    try {
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(
        asyncNeutralVoteComment({ threadId, commentId, userId: authUser.id }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      downVoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(
        asyncNeutralVoteComment({ threadId, commentId, userId: authUser.id }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      neutralVoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.neutralVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  addCommentActionCreator,
  asyncAddComment,
  upVoteCommentActionCreator,
  asyncUpVoteComment,
  downVoteCommentActionCreator,
  asyncDownVoteComment,
  neutralVoteCommentActionCreator,
  asyncNeutralVoteComment,
};
