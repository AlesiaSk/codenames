import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './styles/App.scss';
import Board from "./components/Board";
import Home from "./pages/Home";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/:id" element={<Board/>}>
                </Route>
            </Routes>
        </Router>
  );
}

export default App;
