import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import GameHandler from "./pages/GameHandler";
import Home from "./pages/Home";
import Error from "./pages/Error";

const App = () => {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<GameHandler />}></Route>
          <Route path="/error" element={<Error />}></Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
