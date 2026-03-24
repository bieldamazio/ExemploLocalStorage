let nome = prompt("Digite seu nome:");

localStorage.setItem("nome", nome);

const nomeSalvo = localStorage.getItem("nome");

const nomeTela = document.querySelector("p");
nomeTela.innerHTML = `Bem-vindo de volta, ${nomeSalvo}!`;

console.log("Nome armazenado no Local Storage:", nomeSalvo);

const usuario = {
  nome: "Laura",
  idade: 17
};

localStorage.setItem("usuario",  JSON.stringify(usuario));
const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
console.log("Usuário armazenado no Local Storage:", usuarioSalvo);

const textoUsuario = document.getElementById("usuario");
textoUsuario.innerHTML = ( `${usuarioSalvo.nome} tem ${usuarioSalvo.idade} anos.` );

localStorage.removeItem("usuario");
localStorage.clear();
