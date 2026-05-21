import React from "react";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import ThemeContext from "./contexts/ThemeContext";

function App() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === "light" ? "dark" : "light";
    });
  };
  React.useEffect(() => {
    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
    setInitializing(false);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  React.useEffect(() => {
    async function fetchUserLogged() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }

    fetchUserLogged();
  }, []);

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <div className="note-app" data-testid="note-app">
        <div className="note-app__header" data-testid="note-app-header">
          <h1>Notes</h1>
          {/* <Navigation /> */}
        </div>
        <main>
          <div className="note-app__body">
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSuccess={onLoginSuccess} />}
              />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </main>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className="note-app" data-testid="note-app">
        <div className="note-app__header" data-testid="note-app-header">
          <h1>Notes</h1>
          <Navigation logout={onLogout} name={authedUser?.name} />
        </div>
        <main>
          <div className="note-app__body">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/note/:id" element={<DetailPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
