const nomeUsuarioInput = document.getElementById('username');
const senhaUsuarioInput = document.getElementById('password');
const btnEntrar = document.getElementById('login-btn');
const formLogin = document.getElementById('login-section');
const appSection = document.getElementById('app-section');
const tituloUsuario = document.getElementById('user-name');
const btnLogout = document.getElementById('logout-btn');
const produtoInput = document.getElementById('produto-nome');
const precoInput = document.getElementById('produto-preco');
const btnAdicionar = document.getElementById('add-produto');

const lista = document.getElementById('lista-produtos');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const salvarCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const renderizarCart = () => {
lista.innerHTML = '';
cart.forEach((produto, index) => {

  const li = document.createElement('li');
  li.innerHTML = `${produto.nome} - R$ ${produto.preco}`;
  const btnRemover = document.createElement('button');
  btnRemover.textContent = '❌';
  
  btnRemover.addEventListener('click', () => {
      cart.splice(index,1);
      salvarCart();
      renderizarCart();
  });
  li.appendChild(btnRemover);
  lista.appendChild(li);
});
}
const atualizarLogin = () => {

    const usuario = localStorage.getItem('usuario');
  if(usuario){
    formLogin.classList.add('hidden');
    appSection.classList.remove('hidden');
    
    tituloUsuario.innerHTML = `Olá, ${usuario}`;

    renderizarCart();
    }else{
      formLogin.classList.remove('hidden');
      appSection.classList.add('hidden');
    }
  }
btnEntrar.addEventListener('click', () => {

    const usuario = nomeUsuarioInput.value.trim();
    const senha = senhaUsuarioInput.value.trim();

    if(usuario && senha){

        localStorage.setItem('usuario', usuario);

        nomeUsuarioInput.value = '';
        senhaUsuarioInput.value = '';

        atualizarLogin();
    }
  });
btnLogout.addEventListener('click', () => {

    localStorage.removeItem('usuario');

    atualizarLogin();

});
//corrigr
btnAdicionar.addEventListener('click', () => {

    const nome = produtoInput.value.trim();
    const preco = precoInput.value.trim();
    if(!nome || !preco) return;
    cart.push({
        nome: nome,
        preco: preco
    });

    salvarCart();
    renderizarCart();
    produtoInput.value = '';
    precoInput.value = '';
});
window.addEventListener('storage', (evento) => {
  if(evento.key === 'usuario'){
        atualizarLogin();
}
  if(evento.key === 'cart'){
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        renderizarCart();
    }
});
atualizarLogin();