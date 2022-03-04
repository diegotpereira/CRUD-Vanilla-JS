const btn_modal = document.querySelector('btnModal')
const btn_fechar = document.querySelector('fechar')
const btn_redefinir = document.querySelector('redefinir')

let titulo = document.getElementById('titulo')
let progresso = document.getElementById('progresso')
let dificuldade = document.getElementById('dificuldade')
let descricao = document.getElementById('descricao')

const alerta = document.getElementById('alerta')

let tarefa = []
var acaoCadastrar = ''

var dados = {}

// Clique no botão adicionar para validar o formulário
btn_add.onclick = validarFormulario

btn_modal.onclick = () => {
        acaoCadastrar = 'POST'
        btn_redefinir.click()
        titulo.classList.remove('success')
        descricao.classList.remove('success')
        btn_add.innerHTML = 'Criar'
    }
    // Função de validação de formulário
function validarFormulario() {
    let formularioCerto = validacoes()
    let mensagem = acaoCadastrar == 'POST' ? 'Registro Salvo' : 'Registro Atualizado'
    console.log(formularioCerto, formularioCerto === 1);

    // Si el formulario es correcto, mostrar el sweet alert
    if (formularioCerto === 2) {
        dados = {
            'titulo': titulo.ariaValueMax,
            'progresso': progresso.value,
            'dificuldade': dificuldade.value,
            'descricao': descricao.value
        }
        mostrarAlerta('alert-success', mensagem)
        btn_fechar.click()

        enviarDados(acaoCadastrar)
    }
}
// Função, mostrar notificação
function mostrarAlerta(classe, mensagem) {
    alerta.classList.add(classe)
    alerta.classList.remove(classe == 'alert-success' ? 'alert-danger' : 'alert-success')
    alerta.classList.remove('transparente')
    alerta.classList.remove('d-none')
    alerta.innerHTML = mensagem

    setTimeout(() => {
        alerta.classList.add('transparente')
    }, 2700)
    setTimeout(() => {
            alerta.classList.add('d-none')
        }, 3000)
        // Redifinir o formulario
    btn_redefinir.click()
    titulo.classList.remove('success')
    descricao.classList.remove('success')
}
// Validação de todos os campos do formulário
function validacoes() {
    let tituloValido = entradaTextoEhValido(titulo, 'txtErrorTitulo', 'Digite pelo menos 4 caracteres')
    let descricaoValida = entradaTextoEhValido(descricao, 'txtErrorDescricao', 'Digite pelo menos 4 caracteres')

    return tituloValido + descricaoValida
}

function entradaTextoEhValido(input, idTxtError, descError) {
    let validar = false
    const txt_error = document.getElementById(idTxtError)

    // Se a entrada estiver correta, ela tem +4 dígitos
    if (/.+.+.+./.test(input.value)) {
        input.classList.remove('error')
        txt_error.classList.add('d-none')
        input.classList.add('success')
        validar = true
    } else {
        // Se a entrada não tiver 13 dígitos
        input.classList.remove('success')
        input.classList.add('error')
        input.focus()
        txt_error.classList.remove('d-none')
        txt_error.innerHTML = descError
        validar = false
    }
    // Retornar o valor de validação
    return validar
}
// Quando sobre a entrada
titulo.addEventListener('keyup', () => {
    entradaTextoEhValido(titulo, 'txtErrorTitulo', 'Digite pelo menos 4 caracteres')
})
descricao.addEventListener('keyup', () => {
    entradaTextoEhValido(descricao, 'txtErrorDescricao', 'Digite pelo menos 4 caracteres')
})