// BURGER NAVBAR

document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
});

// NAVBAR BUTTONS

const btnBalance = document.getElementById('btnBalance');
const btnCategorias = document.getElementById('btnCategorias');
const btnReportes = document.getElementById('btnReportes');

const balanceSection = document.getElementById('balanceSection');
const categoriasSection = document.getElementById('categoriasSection');
const reportesSection = document.getElementById('reportesSection');

btnBalance.addEventListener('click', ()=>{
    balanceSection.style.display = 'block';
    categoriasSection.style.display = 'none';
    reportesSection.style.display = 'none';
})

btnCategorias.addEventListener('click', () =>{
    balanceSection.style.display = 'none';
    categoriasSection.style.display = 'block';
    reportesSection.style.display = 'none';
})

btnReportes.addEventListener('click', ()=>{
    balanceSection.style.display = 'none';
    categoriasSection.style.display = 'none';
    reportesSection.style.display = 'block';
})

// NEW OPERATION: DATE INPUT

const fechaInput = document.getElementById('fecha-input');

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
fechaInput.value = `${year}-${month < 10 ? '0' + month: month}-${day}`