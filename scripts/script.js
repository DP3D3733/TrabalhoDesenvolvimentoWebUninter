function ajustaBody() { //faz ajustes no body (aniversario, tema escuro)
    if (window.location.href.includes('sobre')) ajustarIdade();
    ajustaTemaEscuro();
}

function ajustarIdade() { //na aba sobre mim, ajusta a idade
    const inicio = new Date(1998, 4, 12); // mês começa em 0 (4 = maio)
    const fim = new Date();

    const anos = diferencaEmAnos(inicio, fim);
    document.getElementById('idade').innerText = anos;
}

function diferencaEmAnos(dataInicial, dataFinal) { //retorna os anos para o ajuste da idade
    let anos = dataFinal.getFullYear() - dataInicial.getFullYear();

    const aniversarioEsteAno = new Date( //senão ele não vai considerar o aniversário exato
        dataFinal.getFullYear(),
        dataInicial.getMonth(),
        dataInicial.getDate()
    );

    if (dataFinal < aniversarioEsteAno) {
        anos--;
    }

    return anos;
}

function toggleDarkMode() { //ativa o modo escuro
    const modoEscuroAtivoOuNao = document.body.classList.toggle('modoEscuro');
    localStorage.setItem('modoEscuroAtivo', modoEscuroAtivoOuNao); //guarda a opção de tema
}

function ajustaTemaEscuro() { //se tiver tema salvo, ajusta
    const modoEscuroAtivoOuNao = localStorage.getItem('modoEscuroAtivo') || 'false';
    if (modoEscuroAtivoOuNao == 'false') return;
    toggleDarkMode();
}

function enviarFormulario() { //valida todos os campos
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');
    const toastMessage = document.getElementById('toastMessage');

    if (!nomeInput || !emailInput || !mensagemInput) return; //Porque são essenciais para o resto da função

    const nome = nomeInput.value;
    const email = emailInput.value;
    const mensagem = mensagemInput.value;

    let haErros = false;

    if (nome == '') {
        const mensagemErroSpan = document.getElementById('errorMessageNome');
        mensagemErroSpan.classList.add('visivel');
        nomeInput.classList.add('erro');
        haErros = true;
    }

    if (email == '' || !email.includes('@') || !email.includes('.')) {
        const mensagemErroSpan = document.getElementById('errorMessageEmail');
        mensagemErroSpan.classList.add('visivel');
        emailInput.classList.add('erro');
        haErros = true;
    }

    if (mensagem == '') {
        const mensagemErroSpan = document.getElementById('errorMessageMensagem');
        mensagemErroSpan.classList.add('visivel');
        mensagemInput.classList.add('erro');
        haErros = true;
    }

    if (haErros) return; //pra não mostrar a mensagem de sucesso se há erros

    toastMessage.classList.toggle('visivel');
    setTimeout(() => {
        toastMessage.classList.toggle('visivel');
    }, 2000);

}

function limpaMsgErro(campo){ //já que o usuário está resolvendo os erros
    campo.classList.remove('erro');
    campo.nextElementSibling.nextElementSibling.classList.remove('visivel')
}