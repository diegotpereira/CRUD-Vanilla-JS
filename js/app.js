import { dados, mostrarAlerta, titulo, progresso, dificuldade, descricao, tarefa } from '../js/validacao-formulario.js'

const API = 'https://website-ecom-ff223-default-rtdb.firebaseio.com/'
const tab_tarefas = document.getElementById('tabela-tarefas')
const btn_modal = document.getElementById('btnModal')
let tarefas = []

//Cadastrar dado 'POST'
function enviarDados(metodo) {
    let url = metodo == 'POST' ? `${API}/tarefas.json` : metodo == 'PUT' ? `${API}/tarefas/${tarefa.id}.json` : ''
    fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        })
        .then((response) => response.json())
        .then(respostaJson => {
            console.log('respostaJson', respostaJson);
            carregarDados()
        })
}

//Função para carregar os dados "GET"
function carregarDados() {
    fetch(`${API}/tarefas.json`)
        .then(res => res.json())
        .then(responseTarefas => {
            console.log('responseTarefas', responseTarefas);
            tarefas = responseTarefas
            definirDadosTabela()
        })
}
// Função para carregar dados na tabela
function definirDadosTabela() {
    const tarefas_key = Object.keys(tarefas)
    const tarefas_value = Object.values(tarefas)
    const tamanho_array = tarefas_key.length
    const tarefas_dado = []

    for (let index = 0; index < tamanho_array; index++) {
        tarefas_dado.push({
            'id': tarefas_key[index],
            'dado': tarefas_value[index]
        })
    }
    const tarefas_carregar = tarefas_dado
        .map((tarefa, index) => `
	                        <tr>
							   <th scope="row">${index+1}</th>
							   <td>${tarefa.dado.titulo}</td>

							   <!-- Operador ternário para validar estilos de crachá -->
							   <td><span class="badge rounded-pill
							      ${tarefa.dado.progresso == 'Terminado' ? 'bg-verde' : tarefa.dado.progresso == 'Não Iniciado' ? 'bg-rojo' : tarefa.dado.progresso == 'Em curso' ? 'bg-amarillo' : ''}
								  pl-2 pr-2">${tarefa.dado.progresso}</span></td>

							   <td><span class="badge rounded-pill
							   ${tarefa.dado.dificuldade == 'Facil' ? 'bg-amarillo' : tarefa.dado.dificuldade == 'Medio' ? 'bg-naranja' : tarefa.dado.dificuldade == 'Dificil' ? 'bg-rojo' : ''}
							   pl-2 pr-2">${tarefa.dado.dificuldade}</span></td>

							   <td>
							      <a class="link" data-toggle="collapse" data-target="#demo-${index}">Ler mais...</a>

								  <div id="demo-${index}" class="collapse">
								     ${tarefa.dado.picon}
								  </div>
							  </td>

							  <td>
							     <button type="button" data-indice=${tarefa.id} class="btn btn-outline-warning editar mb-1>Editar</button>
								 <button type="button" data-indice=${tarefa.id} class="btn btn-outline-danger excluir mb-1>Excluir</button>
							  </td>
							</tr>
	                        `)
        .join("")
    tab_tarefas.innerHTML = tarefas_carregar
}
carregarDados()

export { enviarDados, API }