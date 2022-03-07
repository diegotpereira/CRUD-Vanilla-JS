import { dados, titulo, progresso, dificuldade, descricao, tarefa, obterTarefa, mostrarAlerta } from '../js/validacao-formulario.js'

const API = 'https://website-ecom-ff223-default-rtdb.firebaseio.com/'
const tab_tarefas = document.getElementById('tabela-tarefas')
const btn_modal = document.getElementById('btnModal')
let tarefas = []
let btn_excluir = null
let btn_editar = null

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
							      ${tarefa.dado.progresso == 'Terminado' ? 'bg-verde' : tarefa.dado.progresso == 'Não Iniciado' ? 'bg-vermelho' : tarefa.dado.progresso == 'Em curso' ? 'bg-amarelo' : ''}
								  pl-2 pr-2">${tarefa.dado.progresso}</span></td>

							   <td><span class="badge rounded-pill
							   ${tarefa.dado.dificuldade == 'Facil' ? 'bg-amarelo' : tarefa.dado.dificuldade == 'Médio' ? 'bg-laranja' : tarefa.dado.dificuldade == 'Dificil' ? 'bg-vermelho' : ''}
							   pl-2 pr-2">${tarefa.dado.dificuldade}</span></td>

							   <td>
							      <a class="link" data-toggle="collapse" data-target="#demo-${index}">Ler mais...</a>

								  <div id="demo-${index}" class="collapse">
								     ${tarefa.dado.descricao}
								  </div>
							  </td>

							  <td>
							     <button type="button" data-indice=${tarefa.id} class="btn btn-outline-warning editar mb-1">Editar</button>
								 <button type="button" data-indice=${tarefa.id} class="btn btn-outline-danger excluir mb-1">Excluir</button>
							  </td>
							</tr>
	                        `)
        .join("")
    tab_tarefas.innerHTML = tarefas_carregar
    btn_excluir = document.getElementsByClassName('excluir')
    btn_editar = document.getElementsByClassName('editar')

    Array.from(btn_excluir).forEach(btn_excluir => {
        btn_excluir.onclick = sweetAlertaExcluir
    })

    Array.from(btn_editar).forEach(btn_editar => {
        btn_editar.onclick = obterTarefa
    })
}
// Sweet alert
function sweetAlertaExcluir(e) {
    Swal.fire({
        title: 'Tem certeza?',
        text: 'O registro será excluído permanentemente!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
        if (result.isConfirmed) {
            excluirTarefa(e)
        }
    })
}
// Função para excluir uma tarefa
function excluirTarefa(e) {
    e.preventDefault();
    const id = e.target.dataset.indice
    console.log(e.target.dataset.indice);
    fetch(`${API}/tarefas/${id}.json`, {
            method: 'Delete',
        })
        .then((response) => response.json())
        .then(respostaJson => {
            console.log('respostaJson', respostaJson);
            carregarDados()
            mostrarAlerta('alert-danger', 'Registro excluído')
        })
}
// Função setar dados 
function definirDados() {
    console.log(tarefa);
    titulo.value = tarefa.dado.titulo
    progresso.value = tarefa.dado.progresso
    dificuldade.value = tarefa.dado.dificuldade
    descricao.value = tarefa.dado.descricao
}
carregarDados()

export { enviarDados, API, definirDados }