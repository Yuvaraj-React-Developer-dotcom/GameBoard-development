import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingScreen from "./module/LandingModule";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
      </Routes>
    </>
  );
}

export default App;
