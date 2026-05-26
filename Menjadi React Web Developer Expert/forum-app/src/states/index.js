import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from '@/states/users/reducer';
import loadingReducer from '@/states/loading/reducer';
import threadsReducer from '@/states/threads/reducer';
import threadDetailReducer from '@/states/threadDetail/reducer';
import leaderboardsReducer from '@/states/leaderboards/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    loading: loadingReducer,
  },
});

export default store;
