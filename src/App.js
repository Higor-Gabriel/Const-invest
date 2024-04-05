import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import ClientesList from './ClientesList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/clientes-inadimplentes"
            element={<ClientesList />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
