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
    newOperationSection.style.display = 'none';
})

btnCategorias.addEventListener('click', () =>{
    balanceSection.style.display = 'none';
    categoriasSection.style.display = 'block';
    reportesSection.style.display = 'none';
    newOperationSection.style.display = 'none';
})

btnReportes.addEventListener('click', ()=>{
    balanceSection.style.display = 'none';
    categoriasSection.style.display = 'none';
    reportesSection.style.display = 'block';
    newOperationSection.style.display = 'none';
})

// NEW OPERATION: DATE INPUT

const dateInput = document.getElementById('date-input');

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
dateInput.value = `${year}-${month < 10 ? '0' + month: month}-${day}`

// NEW OPERATION: OPEN FORM AND CLOSE FORM

const btnNewOperation = document.getElementById('new-operation');
const btnCancelNewOperation = document.getElementById('cancelNewOperation');

const newOperationSection = document.getElementById('newOperationSection');

btnNewOperation.addEventListener('click', ()=>{
    newOperationSection.style.display = 'block';
    balanceSection.style.display = 'none';
})

btnCancelNewOperation.addEventListener('click', ()=>{
    newOperationSection.style.display = 'none';
    balanceSection.style.display = 'block';
})

// NEW OPERATION: ADD NEW OPERATION

const withOperations = document.getElementById('with-operations');
const noOperations = document.getElementById('no-operations');

const btnAcceptNewOperation = document.getElementById('acceptNewOperation');

const operations = [];

const description = document.getElementById('description');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const category = document.getElementById('category');

const printOperations = (operations)=>{
  withOperations.innerHTML = '';
  for (let i = 0; i < operations.length; i++) {
      const codeBox = `<div id="${operations[i].id}">
          <span>${operations[i].description}</span> 
          <span>${operations[i].amount}</span> 
          <span>${operations[i].type}</span> 
          <span>${operations[i].category}</span> 
          <span>${operations[i].date}</span>
          <a>Editar</a>
          <a>Eliminar</a>
      </div>`
      withOperations.insertAdjacentHTML('beforeend', codeBox)
  }
}

btnAcceptNewOperation.addEventListener('click', ()=>{
  const newOp = {
      id: uuid.v4(), //para darle un id dinamico a partir de la libreria uuid
      description: description.value,
      amount: amount.value,
      type: type.value,
      category: category.value,
      date: dateInput.value
  }
  operations.push(newOp);
  localStorage.setItem('operations', JSON.stringify(operations));
  const operationsLocalStorage = JSON.parse(localStorage.getItem('operations'));
  printOperations(operationsLocalStorage);

  withOperations.style.display = 'block';
  noOperations.style.display = 'none';
  newOperationSection.style.display = 'none';
  balanceSection.style.display = 'block';
})