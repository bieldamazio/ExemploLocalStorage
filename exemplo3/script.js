
// Você está criando um gerenciador de tarefas onde os(as) usuários(as) podem adicionar e remover tarefas. No entanto, como o localStorage só aceita strings, precisamos converter os dados antes de salvar e recuperar.

// Crie um script que:

// Tenha um input e um botão para adicionar tarefas.
// Salve as tarefas no localStorage como um array de strings usando JSON.stringify().
// Ao recarregar a página, recupere e exiba as tarefas salvas usando JSON.parse().


const input = document.getElementById("task-input");
const botao = document.getElementById("add-task");
const listaTarefa = document.getElementById("task-list");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function atualizarLista(){
    listaTarefa.innerHTML = "";
    tarefas.forEach((tarefa) => {
        let itemTarefa = document.createElement("li");
        itemTarefa.innerHTML = tarefa;
        listaTarefa.appendChild(itemTarefa);
    });
}

botao.addEventListener("click", () => {
    const tarefa = input.value;
    if(tarefa){
        tarefas.push(tarefa);
         localStorage.setItem("tarefas", JSON.stringify(tarefas));
        atualizarLista();
        
    }});
 atualizarLista();

//   if (novaTarefa.trim() !== "") {
//     tarefas.push(novaTarefa);
//   
//     input.value = "";
//     renderizarTarefas();




// Pega tarefas do localStorage ou cria array vazio
// let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Função para mostrar tarefas na tela
function renderizarTarefas() {
  listaTarefa.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.textContent = tarefa;

    // Botão de remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";

    btnRemover.addEventListener("click", () => {
      tarefas.splice(index, 1); // remove do array
      localStorage.setItem("tarefas", JSON.stringify(tarefas)); // salva atualizado
      renderizarTarefas(); // atualiza tela
    });

    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
}

// Mostrar tarefas ao carregar a página
renderizarTarefas();