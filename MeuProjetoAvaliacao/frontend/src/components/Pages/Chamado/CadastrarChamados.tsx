import { useState } from "react";
import Produto from "../../../models/Chamado";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chamado from "../../../models/Chamado";

function CadastrarChamados() {
    const [descricao, setDescricao] = useState("");
    
    const navigate = useNavigate();

    async function enviarChamadoAPI(e: React.FormEvent) {
        e.preventDefault();
        
        // Validação básica
        if (!descricao.trim()) {
            alert("Por favor, preencha a descrição!");
            return;
        }

        try {
            const chamado: Chamado = {
                descricao: descricao.trim(),
            };

            await axios.post("http://localhost:5298/api/chamado/cadastrar", chamado);
            
            alert("Chamado cadastrado com sucesso!");
            navigate("/"); // Voltar para lista
        } catch (error: any) {
            console.log("Erro ao cadastrar chamado:", error);
        }
    }

    return (
        <div>
            <h1>Cadastrar Novo Produto</h1>
            
            <form onSubmit={enviarChamadoAPI} style={{ maxWidth: '500px' }}>
            
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Descrição:
                    </label>
                    <input 
                        type="text" 
                        value={descricao} 
                        onChange={(e) => setDescricao(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                    />
                </div>
                
                <button 
                    type="submit" 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Cadastrar Chamado
                </button>
                
                <button 
                    type="button" 
                    onClick={() => navigate("/")}
                    style={{ 
                        padding: '10px 20px', 
                        marginLeft: '10px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default CadastrarChamados;