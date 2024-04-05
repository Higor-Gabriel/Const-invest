import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Importe o componente Navigate

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar se o usuário está logado ou não

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Enviar requisição para autenticar o usuário
      const response = await axios.post('http://localhost:8000/login/', {
        username: username,
        password: password
      });
      
      // Armazenar o token JWT no local storage
      localStorage.setItem('token', response.data.token);

      // Se o login for bem-sucedido, atualize o estado para indicar que o usuário está logado
      setLoggedIn(true);
    } catch (error) {
      // Se houver um erro no login, exiba uma mensagem de erro
      setErrorMessage('Usuário ou senha inválidos.');
      console.error('Erro ao fazer login:', error);
    }
  };

  // Se o usuário estiver logado, redirecione para a rota de clientes inadimplentes
  if (loggedIn) {
    return <Navigate to="/clientes-inadimplentes/" />;
  }
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Nome de usuário" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Login;
