import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Error from "./pages/Error";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<Game />}></Route>
          <Route path="/error" element={<Error />}></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
