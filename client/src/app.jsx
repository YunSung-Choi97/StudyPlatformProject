import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Main from "./components/main/main";
import ListMode from './components/main/list_mode/list_mode';
import WritingMode from './components/main/writing_mode/writing_mode';
import ContentMode from './components/main/content_mode/content_mode';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='/' element={<ListMode />} />
          <Route path='/write' element={<WritingMode />} />
          <Route path='/content/:contentId' element={<ContentMode />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;