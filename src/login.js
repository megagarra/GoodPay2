const form = document.getElementById('formValid');
const offcanvasBackdrop = document.querySelector('.offcanvas-backdrop');
var janelaLogin = new bootstrap.Modal(document.getElementById('loginNegado'));
var janelacaixaBranca = new bootstrap.Modal(document.getElementById('caixaBranco'));
var janelaAtencao = new bootstrap.Modal(document.getElementById('atencao'));
let resposta = Number(document.getElementById('resposta').value);

let userLogin = [
    {
        id: 1001,
        username: 'victoricoma',
        senha: 'gordinho123',
        email: 'victor.icoma@soulcodeacademy.org'
    },
    {
        id: 1002,
        username: 'adminUsers',
        senha: 'goodpay2022',
        email: 'adminuser@gmail.com'
    },
    {
        id: 1003,
        username: 'catiacamara',
        senha: 'televisao',
        email: 'televisao@gmail.com'
    },
    {
        id: 1004,
        username: 'superRotas',
        senha: 'goodpayrotas',
        email: 'goodpayadmin@soulcode.org'
    }

]

// Criação de recapture e envio via innerHTML
var numero1 = document.getElementById('numero1').innerHTML = Math.floor(Math.random() * 99) + 1;
var numero2 = document.getElementById('numero2').innerHTML = Math.floor(Math.random() * 9) + 1;
var soma = numero1 + numero2;
var tentativas = 3;

console.log(soma);

// Genjutsu ArrayFormat
let arrayNames = [];
let arrayId = [];
let arrayEmail = [];
let arraySenha = [];

userLogin.forEach(prop => {
    arrayEmail.push(prop.email)
    arraySenha.push(prop.senha)
    arrayId.push(prop.id)
});

console.log(arrayEmail);
console.log(arraySenha);
console.log(arrayId);
console.log(arrayNames);

// Captura o evento de enviar formulário e (chama a função checkEmail)
form.addEventListener('submit', e => {
    e.preventDefault();
    const inputEmail = document.getElementById('inputEmail').value;
    const inputPwd = document.getElementById('inputPwd').value;
    checkEmail(inputEmail, inputPwd);
});

// Verifica email do usuário é válido e existe na base de dados, e chama função que (coleta a indexEmail)
function checkEmail(inputEmail, inputPwd) {
    if (/.com$/.test(inputEmail) === false || inputEmail == '' || !arrayEmail.includes(inputEmail)) {
        alert('Email inválido, verifique seus dados!');
        document.getElementById("inputEmail").classList.add('invalidoTexto');
        return janelacaixaBranca.show()
        // return janelaLogin.show()
    } else {
        console.log(`O email digitado tem no array ? ${arrayEmail.includes(inputEmail)}`);
        take(inputEmail, inputPwd);
    }
}

// Função que coleta a index do email, e (chama a função checkPwd com a indexEmail e o value da senha do usuário)
function take(inputEmail, inputPwd) {
    const indexEmail = arrayEmail.indexOf(inputEmail);
    console.log(`A index do email é ${indexEmail}`);
    checkPwd(inputPwd, indexEmail);
}
// debugger.includes(resposta);
// Verifica se a senha do usuário e recebe (index do email válidado)
function checkPwd(inputPwd, indexEmail) {
    // debugger;
    if (inputPwd == '' || !arraySenha.includes(inputPwd)) {
        document.getElementById("inputPwd").classList.add('invalidoTexto');
        return janelacaixaBranca.show();
    }
    else if (arraySenha.indexOf(inputPwd) !== indexEmail) {
        console.log(`index do inputPwd ${arraySenha.indexOf(inputPwd)}`);
        document.getElementById("inputPwd").classList.add('invalidoTexto');
        return alert(`Erros verifique os dados digitados!`)
    }

    // Verificando se a soma do recapture digitado é igual ao resultado
    else if (resposta == '' || resposta != soma) {

        if (tentativas > 1) {
            tentativas--;
            janelaAtencao.show();
            document.getElementById('xModal').textContent = `Erro no Captcha! Você só tem mais ${tentativas} tentativas!`;
            alert(`${numero1} + ${numero2} é igual a: ${soma}! Tente novamente`);
        }
        else {
            janelaAtencao.show();
            document.getElementById('xModal').textContent = `Você errou muitas vezes! Tente novamente mais tarde.`;
            window.location.href = '../recuperar.html';
        }
    } else {
        storageLocal(arrayId[indexEmail], arrayNames[indexEmail], arrayEmail[indexEmail], arraySenha[indexEmail]);
        window.location.reload();
    }
}

// Insere os dados do usuário no LocalStorage após validar o login
function storageLocal(arrayId, arrayNames, arrayEmail, arraySenha) {
    localStorage.setItem('user', JSON.stringify({ id: arrayId, name: arrayNames, email: arrayEmail, password: arraySenha }));
}

// Verifica que o usuário está no LocalStorage
function getStorageLocal() {
    // const userLocal = JSON.parse(localStorage.getItem('user'));
    localStorage.getItem('user') !== null ? console.log('Login feito com suceso') : console.log('Usuário não logado');
}

// função que faz refresh na página
window.onload = function requireLogin() {
    getStorageLocal();
}