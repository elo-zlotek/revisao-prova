import { useEffect, useState } from "react";
import Produto from "../../../models/Chamado";
import axios from "axios";
import { Link } from "react-router-dom";
import Chamado from "../../../models/Chamado";

function ListarChamados() {
    const [chamados, setChamado] = useState<Chamado[]>([]);

    // Buscar produtos quando componente carregar
    useEffect(() => {
        buscarChamadosAPI();
    }, []);

    async function buscarChamadosAPI() {
        try {
            // URL do backend (ajuste conforme necessário)
            const resposta = await axios.get<Chamado[]>("http://localhost:5298/api/chamado/listar");
            setChamado(resposta.data);
        } catch (error) {
            console.log("Erro ao buscar chamado:", error);
            alert("Erro ao carregar chamado! Verifique se o backend está rodando.");
        }
    }

    async function deletarChamado(id: string) {
        if (window.confirm("Tem certeza que deseja excluir este chamado?")) {
            try {
                await axios.delete(`http://localhost:5298/api/chamado/deletar/${id}`);
                buscarChamadosAPI(); // Recarregar a lista
                alert("Chamado excluído com sucesso!");
            } catch (error) {
                console.log("Erro ao excluir chamado:", error);
                alert("Erro ao excluir chamado!");
            }
        }
    }

    async function alterarChamado(id: string) {
        if (window.confirm("Tem certeza que deseja alterar este chamado?")) {
            try {
                await axios.patch(`http://localhost:5298/api/chamado/alterar/${id}`);
                buscarChamadosAPI(); // Recarregar a lista
                alert("Chamado alterado com sucesso!");
            } catch (error) {
                console.log("Erro ao alterar chamado:", error);
                alert("Erro ao alterar chamado!");
            }
        }
    }

    return (
        <div>
            <h1>Lista de Chamados</h1>
            
            <table border={1} style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                marginTop: '20px'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th style={{ padding: '10px' }}>Id</th>
                        <th style={{ padding: '10px' }}>Descrição</th>
                        <th style={{ padding: '10px' }}>Data de criação</th>
                        <th style={{ padding: '10px' }}>Status</th>
                        <th style={{ padding: '10px' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {chamados.map((item) => (
                        <tr key={item.chamadoId}>
                            <td style={{ padding: '10px' }}>{item.chamadoId}</td>
                            <td style={{ padding: '10px' }}>{item.descricao}</td>
                            <td style={{ padding: '10px' }}>{item.criadoEm}</td>
                            <td style={{ padding: '10px' }}>{item.status}</td>
                            <td style={{ padding: '10px' }}>
                                <button 
                                    onClick={() => alterarChamado(item.chamadoId!)}
                                    style={{ 
                                        color: 'green', 
                                        marginLeft: '10px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Alterar Status
                                </button>
                                <button 
                                    onClick={() => deletarChamado(item.chamadoId!)}
                                    style={{ 
                                        color: 'red', 
                                        marginLeft: '10px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {chamados.length === 0 && (
                <p style={{ marginTop: '20px', color: '#666' }}>
                    Nenhum chamado cadastrado.
                </p>
            )}
        </div>
    );
}

export default ListarChamados;