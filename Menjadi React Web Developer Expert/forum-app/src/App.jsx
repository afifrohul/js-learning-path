import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from '@/pages/HomePage';
import { SigninPage } from '@/pages/SigninPage';
import { SignupPage } from '@/pages/SignupPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncPreloadProcess } from '@/states/isPreload/action';
import { asyncUnsetAuthUser } from '@/states/authUser/action';
import Loading from '@/components/loading';
import { ModeToggleKey } from '@/components/mode-toggle-key';
import { MainLayout } from '@/components/main-layout';
import ThreadPage from '@/pages/ThreadPage';
import LeadeboardPage from '@/pages/LeaderboardPage';
import CreateThreadPage from '@/pages/CreateThreadPage';
import DetailThreadPage from '@/pages/DetailThreadPage';

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return <Loading />;
  }

  return (
    <>
      <Loading />
      <ModeToggleKey />

      <Routes>
        <Route
          path="/sign-in"
          element={authUser ? <Navigate to="/" replace /> : <SigninPage />}
        />
        <Route
          path="/sign-up"
          element={authUser ? <Navigate to="/" replace /> : <SignupPage />}
        />

        <Route element={<MainLayout authUser={authUser} signOut={onSignOut} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads" element={<ThreadPage />} />
          <Route path="/threads/add" element={<CreateThreadPage />} />
          <Route path="/threads/:id" element={<DetailThreadPage />} />
          <Route path="/leaderboards" element={<LeadeboardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
