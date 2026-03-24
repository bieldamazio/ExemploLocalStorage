
// Agora, imagine que você está desenvolvendo um site onde os(as) usuários(as) podem escolher entre o modo claro e o modo escuro. Quando um(a) usuário(a) escolhe um tema, essa escolha deve ser salva para que, ao voltar ao site, o tema selecionado permaneça ativo.

// Crie um programa que:

// Exiba dois botões: "Modo Claro" e "Modo Escuro".
// Quando o(a) usuário(o) clicar em um dos botões, salve a escolha no localStorage.
// Ao recarregar a página, aplique automaticamente o tema salvo.
// Exemplo de Interação:

// O(a) usuário(a) clica em "Modo Escuro", a cor de fundo muda e a escolha é salva.
// Ao recarregar a página, o site continua em modo escuro.

const body = document.querySelector("body");
const btnClaro = document.getElementById("light-mode");
const btnEscuro = document.getElementById("dark-mode");

 function atualizarTema(tema) {
    if (tema === "dark") {
        body.classList.add("dark");
    }else{
        body.classList.remove("dark");
    }
    localStorage.setItem("tema", tema);
 }

//carregar o tema salvo ao iniciar a página
const temaSalvo = localStorage.getItem("tema") || "light";
atualizarTema(temaSalvo);

btnEscuro.addEventListener("click", () =>  atualizarTema("dark"));
btnClaro.addEventListener("click",() => atualizarTema("light"));

window.addEventListener("storage", (evento) => {
    if (evento.key === "tema") {
        atualizarTema = (evento.newValue);
       }
});

