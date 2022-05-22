import { useState } from "react";
import Header from "./components/header/header";
import Main from "./components/main/main";

function App() {
  const [field, setField] = useState('전체');
  const [mode, setMode] = useState('list');
  const [status, setStatus] = useState('전체');

  return (
    <>
      <Header field={field} status={status} onChangeField={(field, mode, status) => { setField(field); setMode(mode); setStatus(status) }} />
      <Main field={field} mode={mode} status={status} onChangeMode={(mode) => { setMode(mode); }} onChangeStatus={(recruit) => { setStatus(recruit) }} />
    </>
  );
}

export default App;