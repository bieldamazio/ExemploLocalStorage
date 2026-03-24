// <!-- Enunciado

// Criar uma aplicação de lista de tarefas utilizando:

// DOM
// Eventos
// localStorage

// 🔹 Funcionalidades obrigatórias
// ✅ Solicitar o nome do Usuário através de um prompt.
// ✅ Validar o nome (não pode ser em branco), e após validação colocar no cabeçalho da aplicação o nome do usuário em um elemento h2
// ✅ Adicionar tarefa
// ✅ Exibir na tela
// ✅ Remover tarefa
// ✅ Salvar no localStorage
// ✅ Carregar tarefas ao abrir a página
// ✅ Marcar como concluída (riscar texto)
// ✅ Tema escuro salvo no localStorage -->

const input = document.getElementById('inputTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const lista = document.getElementById('lista');
const nomeUsuario = document.getElementById('nomeUsuario');
const btnTema = document.getElementById('tema');

const btnTodas = document.getElementById('todas');
const btnPendentes = document.getElementById('pendentes');
const btnConcluidas = document.getElementById('concluidas');


let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let filtro = 'todas';

let nome = localStorage.getItem('usuario');

if (!nome) {
  nome = prompt('Digite seu nome:');

  while (!nome || nome.trim() === '') {
    nome = prompt('Nome inválido, digite novamente:');
  }

  localStorage.setItem('usuario', nome);
}

nomeUsuario.innerHTML = `Olá, ${nome}!`;

const removerTarefa = (index) => {
  tarefas.splice(index, 1);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  atualizarLista();
};

const toggleTarefa = (index) => {
  tarefas[index].concluida = !tarefas[index].concluida;
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  atualizarLista();
};

const atualizarLista = () => {
  lista.innerHTML = '';

  let tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === 'pendentes') return !tarefa.concluida;
    if (filtro === 'concluidas') return tarefa.concluida;
    return true;
  });

  tarefasFiltradas.forEach((tarefa, index) => {
    const li = document.createElement('li');

    li.innerHTML = tarefa.texto;

    if (tarefa.concluida) {
      li.classList.add('concluida');
    }

    li.addEventListener('click', () => toggleTarefa(index));

    const btnRemover = document.createElement('button');
    btnRemover.innerHTML = '<i class="fa-solid fa-x"></i>';

    btnRemover.addEventListener('click', (e) => {
      e.stopPropagation();
      removerTarefa(index);
    });

    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
};

btnAdicionar.addEventListener('click', () => {
  const texto = input.value.trim();

  if (texto) {
    tarefas.push({
      texto: texto,
      concluida: false
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    input.value = '';
    atualizarLista();
  }
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    btnAdicionar.click();
  }
});

btnTodas.addEventListener('click', () => {
  filtro = 'todas';
  atualizarLista();
});

btnPendentes.addEventListener('click', () => {
  filtro = 'pendentes';
  atualizarLista();
});

btnConcluidas.addEventListener('click', () => {
  filtro = 'concluidas';
  atualizarLista();
});

let tema = localStorage.getItem('tema');

if (tema === 'dark') {
  document.body.classList.add('dark');
}

btnTema.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  let temaAtual = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('tema', temaAtual);
});

atualizarLista();