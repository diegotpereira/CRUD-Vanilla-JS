import { dados, mostrarAlerta, titulo, progresso, dificuldade, descricao, tarefa } from '../js/validacao-formulario.js'

const API = 'https://website-ecom-ff223-default-rtdb.firebaseio.com/'

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

        })
}
export { enviarDados, API }