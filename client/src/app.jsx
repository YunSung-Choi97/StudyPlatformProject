import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/header";
import Main from "./components/main/main";

function App() {
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  );
}

export default App;