// $ = (selector) => document.querySelector(selector);
// $ = (selector) =>document.querySelectorAll(selector);

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
    // ${'#balanceSection'}.style.display = 'block';
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
const filterDate = document.getElementById('filter-date');

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

dateInput.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`;
filterDate.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`;

// const setTodayDate = (bt) =>{
//   bt.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`;
// }

// setTodayDate(filterDate);

// NEW OPERATION: OPEN FORM AND CLOSE FORM

const btnNewOperation = document.getElementById('new-operation');
const btnCancelNewOperation = document.getElementById('cancelNewOperation');

const newOperationSection = document.getElementById('newOperationSection');

btnNewOperation.addEventListener('click', ()=>{
  // setTodayDate(dateInput);
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

let operations = [];

// Form inputs
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const category = document.getElementById('category');

let amountStyle;

// Clear operations
const clearOperations = () =>{
  description.value = '';
  amount.value = 0;
  type.value = 'expense';
  category.value = '';
  dateInput.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`;
  // setTodayDate(dateInput);
}

// Print operations in HTML
const printOperations = (operations)=>{
  withOperations.innerHTML = '';
  for (let i = 0; i < operations.length; i++) {
      const codeBox = `<div id="${operations[i].id}" class="columns">
          <div class="column is-3 description-style">${operations[i].description}</div> 
          <div class="column is-3 category-style">${operations[i].category}</div>
          <div class="column is-2 has-text-right">${operations[i].date}</div>
          <div class="column is-2 has-text-right ${operations[i].type === 'gain' ? 'gain-style' : 'expense-style'}">${operations[i].type === 'gain' ? '+ ' : '- '}${operations[i].amount}</div>
          <div class="column is-2 has-text-right">
            <a class="edit-op">Editar</a>
            <a class="delete-op">Eliminar</a>
          </div> 
      </div>`
      withOperations.insertAdjacentHTML('beforeend', codeBox)
  }
}

// Create new operation in JS
btnAcceptNewOperation.addEventListener('click', ()=>{
  const newOp = {
      id: uuid.v4(),
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

  clearOperations();
  newOperationSection.style.display = 'none';
  balanceSection.style.display = 'block';
  noOperations.style.display = 'none';
  withOperations.style.display = 'block';
})

// Start with all operations of local Storage
if(JSON.parse(localStorage.getItem('operations')) === null){
  withOperations.classList.add('display');
  noOperations.classList.remove('display');
} else{
  withOperations.classList.remove('display');
  noOperations.classList.add('display');
  operations = JSON.parse(localStorage.getItem('operations'));
  printOperations(operations);
}

// FILTERS

// Show and unshow filters box
const toggleFilters = document.getElementById('toggle-filters');
const filtersBox = document.getElementById('filters');
let filterDisplay = false;

toggleFilters.addEventListener('click', ()=>{
  if(filterDisplay === false){
    filtersBox.style.display = 'block';
    toggleFilters.innerHTML = 'Ocultar filtros';
    filterDisplay = true;
  } else{
    filtersBox.style.display = 'none';
    toggleFilters.innerHTML = 'Mostrar filtros';
    filterDisplay = false;
  }
})

// Categorias y Tipos filtros
let operationsFiltered = [...operations];
const filterType = document.getElementById('filter-type');
const filterCategories = document.getElementById('filter-categories');

const filters = (e) =>{
  let atr = '';
  if(e.target.id === 'filter-type'){
    operationsFiltered = [...operations];
    filterCategories.value = 'all';
    atr = 'type';
  } else{
    filterType.value = 'all';
    atr = 'category'
  }
  // puede haber error por la mayuscula o minuscula de los values/ingles y español
  operationsFiltered = operationsFiltered.filter(operation => operation[atr] === e.target.value);
  e.target.value === 'all' ? printOperations(operations) : printOperations(operationsFiltered);
}

filterCategories.addEventListener('change', (e) => {filters(e)});
filterType.addEventListener('change', (e) => {filters(e)});

// Filter de fecha
filterDate.addEventListener('change', (e) =>{
  let result = operations.filter(operation => operation.date === e.target.value);
  printOperations(result);
})

// Filter Ordenar por
const filterOrder = document.getElementById('filter-order');

filterOrder.addEventListener('change', ()=>{
  let newArr = [...operations];
  if(filterOrder.value === 'a-z'){
    newArr.sort((a, b) => a.description > b.description ? 1 : -1)
  }
  if(filterOrder.value === 'z-a'){
    newArr.sort((a, b) => a.description < b.description ? 1 : -1)
  }
  if(filterOrder.value === 'more-recent'){
    newArr.sort((a, b) => a.date < b.date ? 1 : -1)
  }
  if(filterOrder.value === 'less-recent'){
    newArr.sort((a, b) => a.date > b.date ? 1 : -1)
  }
  if(filterOrder.value === 'more-amount'){
    newArr.sort((a, b) => a.amount < b.amount ? 1 : -1)
  }
  if(filterOrder.value === 'less-amount'){
    newArr.sort((a, b) => a.amount > b.amount ? 1 : -1)
  }
  printOperations(newArr)
})