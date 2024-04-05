// ClientesList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientesList.css';

const API_URL = 'http://localhost:8000/clientes-inadimplentes/';

function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fazendo requisição para obter dados dos clientes...');
    axios.get(API_URL)
      .then(response => {
        setClientes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao obter dados dos clientes:', error);
        setLoading(false);
      });
  }, []);

  const ordenarPorNome = () => {
    const clientesOrdenados = [...clientes].sort((a, b) => a.nome.localeCompare(b.nome));
    setClientes(clientesOrdenados);
  };

  const ordenarPorValorInadimplencia = () => {
    const clientesOrdenados = [...clientes].sort((a, b) => parseFloat(a.valor_inadimplencia) - parseFloat(b.valor_inadimplencia));
    setClientes(clientesOrdenados);
  };

  const ordenarPorDataPrimeiraInadimplencia = () => {
    const clientesOrdenados = [...clientes].sort((a, b) => new Date(a.data_inadimplencia) - new Date(b.data_inadimplencia));
    setClientes(clientesOrdenados);
  };

  const filtrarClientes = () => {
    axios.get(`${API_URL}?search=${termoBusca}`)
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Erro ao filtrar clientes:', error);
      });
  };

  const handleTermoBuscaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  return (
    <div className="clientes-list-container">
      <h1>Lista de Clientes Inadimplentes</h1>
      <div className="clientes-list-filtro">
        <input 
          type="text" 
          placeholder="Digite para buscar..." 
          value={termoBusca} 
          onChange={handleTermoBuscaChange} 
        />
        <button onClick={filtrarClientes}>Buscar</button>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="clientes-list-table">
          <thead>
            <tr>
              <th onClick={ordenarPorNome}>Nome</th>
              <th onClick={ordenarPorValorInadimplencia}>Valor da Inadimplência</th>
              <th onClick={ordenarPorDataPrimeiraInadimplencia}>Desde</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>R${cliente.valor_inadimplencia}</td> {/* Adicionando "R$" aqui */}                <td>{cliente.data_inadimplencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientesList;
