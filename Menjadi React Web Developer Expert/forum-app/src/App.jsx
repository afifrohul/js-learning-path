import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from '@/pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncPreloadProcess } from '@/states/isPreload/action';
import { SigninPage } from '@/pages/SigninPage';
import { SignupPage } from '@/pages/SignupPage';
import { Navigation } from '@/components/navigation';
import { asyncUnsetAuthUser } from '@/states/authUser/action';
import Loading from '@/components/loading';
import { ModeToggleKey } from '@/components/mode-toggle-key';

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
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<SigninPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <ModeToggleKey />
      <section className="flex justify-center">
        <div className="flex flex-col gap-2 min-w-4xl min-h-screen border-x p-4">
          <header>
            <Navigation authUser={authUser} signOut={onSignOut} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </section>
    </>
  );
}

export default App;
