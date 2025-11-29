import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ListarProdutos from './components/Pages/Chamado/ListarChamados';
import CadastrarProduto from './components/Pages/Chamado/CadastrarChamados';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Menu de navegação */}
        <nav style={{ padding: '20px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <ul style={{ 
            listStyle: 'none', 
            display: 'flex', 
            gap: '20px', 
            margin: 0, 
            padding: 0 
          }}>
            <li>
              <Link to="/" style={{ 
                textDecoration: 'none', 
                color: 'blue',
                fontWeight: 'bold'
              }}>
                Listar Produtos
              </Link>
            </li>
            <li>
              <Link to="/cadastrar" style={{ 
                textDecoration: 'none', 
                color: 'green',
                fontWeight: 'bold'
              }}>
                Cadastrar Produto
              </Link>
            </li>
          </ul>
        </nav>

        {/* Área de conteúdo */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<ListarProdutos />} />
            <Route path="/cadastrar" element={<CadastrarProduto />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;