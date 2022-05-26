import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Main from "./components/main/main";

function App() {
  const [field, setField] = useState('전체');
  const [mode, setMode] = useState('list');
  const [status, setStatus] = useState('전체');

  return (
    <Router>
      <Header field={field} status={status} onChangeState={(field, mode, status) => { setField(field); setMode(mode); setStatus(status) }} />
      <Routes>
        <Route path='/*' element={
          <Main field={field} mode={mode} status={status} onChangeState={(field, mode, status) => { setField(field); setMode(mode); setStatus(status) }} onChangeStatus={(recruit) => { setStatus(recruit) }} />
        }></Route>
      </Routes>
    </Router>

  );
}

export default App;