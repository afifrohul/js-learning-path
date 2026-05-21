import React from "react";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div className="note-app" data-testid="note-app">
      <div className="note-app__header" data-testid="note-app-header">
        <h1>Notes</h1>
        <Navigation />
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
  );
}

export default App;
