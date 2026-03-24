// Você está desenvolvendo um sistema onde os(as) usuários(as) podem armazenar suas cores favoritas. No entanto, agora precisa permitir que eles(as) removam uma cor específica.

// Crie um script que:

// Permita que o(a) usuário(a) adicione cores ao localStorage, as cores serão armazenadas em uma array
// Exiba todas as cores salvas.
// Tenha um botão para remover uma cor específica usando removeItem().

const input = document.getElementById('color-input');
const btnAdicionar = document.getElementById('add-color');
const listaFCores = document.getElementById('color-list');

let cores = JSON.parse(localStorage.getItem('cores')) || [];

const removerCor = (index) => {
  cores.splice(index, 1);
  localStorage.setItem('cores', JSON.stringify(cores));
  atualizarLista();
}

const atualizarLista = () => {
    listaFCores.innerHTML = '';
    cores.forEach((cor, index) => {
        const novaCor = document.createElement('li');
        novaCor.innerHTML = cor;

        const btnRemover = document.createElement('button');
        btnRemover.classList.add('remove');
        btnRemover.innerHTML = 'Remover';
        novaCor.appendChild(btnRemover);
        listaFCores.appendChild(novaCor);

        btnRemover.addEventListener('click', () => removerCor(index))
    })
}

btnAdicionar.addEventListener('click', () => {
  const cor = input.value;
  if (cor) {
    cores.push(cor);
    localStorage.setItem('cores', JSON.stringify(cores));
    input.value = '';
    atualizarLista();
  }
})

atualizarLista();