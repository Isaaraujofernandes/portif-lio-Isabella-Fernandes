/* ============================================================
   PORTFÓLIO DA ISABELLA FERNANDES — script.js
   ------------------------------------------------------------
   O CSS sozinho não consegue fazer três coisas deste site,
   então este arquivo cuida delas:
     1. Abrir/fechar o menu do celular
     2. Alternar entre modo claro e escuro
     3. Fazer os carrosséis de projetos e certificados funcionarem
   ============================================================ */

/* ------------------------------------------------------------
   1. MENU DO CELULAR
   ------------------------------------------------------------ */
const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', () => {
  // A classe .nav-open no header mostra o menu (o CSS cuida do resto)
  const abriu = header.classList.toggle('nav-open');
  menuBtn.setAttribute('aria-label', abriu ? 'Fechar menu' : 'Abrir menu');
  menuBtn.setAttribute('aria-expanded', abriu);
});

// Ao clicar em qualquer link do menu, ele se fecha sozinho
document.querySelectorAll('.nav-mobile a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    menuBtn.setAttribute('aria-label', 'Abrir menu');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

/* ------------------------------------------------------------
   2. MODO CLARO / ESCURO
   ------------------------------------------------------------ */
const themeBtn = document.querySelector('.theme-toggle');

// Se a pessoa já escolheu o modo escuro antes, mantemos a escolha
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}

themeBtn.addEventListener('click', () => {
  // A classe .dark no <html> troca todas as cores (definidas no style.css)
  const escuro = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', escuro ? 'dark' : 'light');
});

/* ------------------------------------------------------------
   3. CARROSSÉIS (projetos e certificados)
   ------------------------------------------------------------
   Cada carrossel funciona assim:
   - o "trilho" (carousel-track) é um flexbox com todos os slides
   - para trocar de slide, basta empurrar o trilho para o lado
     com translateX(-numero-do-slide * 100%)
   - as bolinhas (dots) são criadas automaticamente aqui
   ------------------------------------------------------------ */
function iniciarCarrossel(carrossel) {
  const trilho = carrossel.querySelector('.carousel-track');
  const slides = Array.from(trilho.children);
  const areaDots = carrossel.querySelector('.carousel-dots');
  let atual = 0;

  // Cria uma bolinha para cada slide
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Ir para o item ' + (i + 1));
    dot.addEventListener('click', () => irPara(i));
    areaDots.appendChild(dot);
  });

  const dots = Array.from(areaDots.children);

  function irPara(i) {
    // O módulo (%) faz o carrossel dar a volta (do último volta pro primeiro)
    atual = (i + slides.length) % slides.length;

    // Empurra o trilho
    trilho.style.transform = 'translateX(-' + atual * 100 + '%)';

    // Marca o slide e a bolinha ativos
    slides.forEach((slide, k) => {
      slide.classList.toggle('is-active', k === atual);
      slide.setAttribute('aria-hidden', k !== atual);
    });
    dots.forEach((dot, k) => {
      dot.classList.toggle('is-active', k === atual);
      dot.setAttribute('aria-selected', k === atual);
    });
  }

  // Setas
  carrossel.querySelector('[data-prev]').addEventListener('click', () => irPara(atual - 1));
  carrossel.querySelector('[data-next]').addEventListener('click', () => irPara(atual + 1));

  // Começa no primeiro slide
  irPara(0);
}

// Inicia todos os carrosséis da página
document.querySelectorAll('[data-carousel]').forEach(iniciarCarrossel);

/* ------------------------------------------------------------
   4. ANO ATUAL NO RODAPÉ
   ------------------------------------------------------------ */
document.getElementById('ano').textContent = new Date().getFullYear();
