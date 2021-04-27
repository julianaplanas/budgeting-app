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

btnReportes.addEventListener('click', () => {
  balanceSection.style.display = 'none';
  categoriasSection.style.display = 'none';
  reportesSection.style.display = 'block';
  newOperationSection.style.display = 'none';
  editCategorySection.style.display = 'none';
})

// NEW OPERATION: DATE INPUT
const dateInput = document.getElementById('date-input');
const filterDate = document.getElementById('filter-date');

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

dateInput.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`;
filterDate.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`;

// Clear operations
const clearOperations = () =>{
  description.value = '';
  amount.value = 0;
  type.value = 'expense';
  category.value = '';
  dateInput.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`;
}

// NEW OPERATION: OPEN FORM AND CLOSE FORM

const btnNewOperation = document.getElementById('new-operation');
const btnCancelNewOperation = document.getElementById('cancelNewOperation');

const newOperationSection = document.getElementById('newOperationSection');

btnNewOperation.addEventListener('click', ()=>{
  clearOperations();
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
const categoryOp = document.getElementById('category');

let amountStyle;

// Print operations in HTML
const printOperations = (operations)=>{
  withOperations.innerHTML = '';
  for (let i = 0; i < operations.length; i++) {
      const codeOperation = document.createElement('div');
      codeOperation.innerHTML = `<div id="${operations[i].id}" class="columns">
          <div class="column is-3 description-style">${operations[i].description}</div> 
          <div class="column is-3 category-style">${operations[i].category}</div>
          <div class="column is-2 has-text-right">${operations[i].date}</div>
          <div class="column is-2 has-text-right ${operations[i].type === 'gain' ? 'gain-style' : 'expense-style'}">${operations[i].type === 'gain' ? '+ ' : '- '}${operations[i].amount}</div>
          <div class="column is-2 has-text-right">
            <a class="edit-op">Editar</a>
            <a class="delete-op">Eliminar</a>
          </div> 
      </div>`

      const editButton = codeOperation.querySelector('.edit-op')
      const deleteButton = codeOperation.querySelector('.delete-op')

      editButton.onclick = () => {
        editOperation(operations[i].id);
      }
      
      deleteButton.onclick = () => {
        deleteOperation(operations[i].id);
      }
      
      withOperations.append(codeOperation)
  }
}

// Create new operation in JS
btnAcceptNewOperation.addEventListener('click', ()=>{
const newOp = {
    id: uuid.v4(),
    description: description.value,
    amount: amount.value,
    type: type.value,
    category: categoryOp.value,
    date: dateInput.value
}

operations.push(newOp);
localStorage.setItem('operations', JSON.stringify(operations));
const operationsLocalStorage = JSON.parse(localStorage.getItem('operations'));
printOperations(operationsLocalStorage);

  clearOperations();
  reportesCanvas();
  balance();
  
  newOperationSection.style.display = 'none';
  balanceSection.style.display = 'block';
  noOperations.style.display = 'none';
  withOperations.style.display = 'block';
})

// Start with all operations of local Storage
if(operations.length > 1){
  withOperations.style.display = 'none';
  noOperations.style.display = 'block';
} else{
  withOperations.style.display = 'block';
  noOperations.style.display = 'none';
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
  newArr.sort((a, b) => Number(a.amount) < Number(b.amount) ? 1 : -1)
}
if(filterOrder.value === 'less-amount'){
  newArr.sort((a, b) => Number(a.amount) > Number(b.amount) ? 1 : -1)
}
printOperations(newArr)
})

// --------------- START OF CATEGORIES -----------------

// DOM
const categoriesSelect = document.getElementById('filter-categories');
const inputCategories = document.getElementById('category-name');
const categoriesList = document.getElementById('categories-list');
const btnAddCategory = document.getElementById('btn-add-category');

const editCategorySection = document.getElementById('edit-category-section');
const inputEditCategory = document.getElementById('edit-category-input');
const btnEditCategory = document.getElementById('edit-category-button');
const btnCancelEditCategory = document.getElementById('cancel-category-button');

// Categories
let categories = [];

// -----  Local storage  -----
localStorage.setItem('categories', JSON.stringify(categories));
const getCategoriesStorage = JSON.parse(localStorage.getItem('categories'));

// Add new category

btnAddCategory.addEventListener("click", () => {

  const newCategory = inputCategories.value.replace(/^\s+|\s+$/gm, '');

  if (newCategory === '') {
    return false;
  }

  categories.push({id:categories.length, name:newCategory.charAt(0).toUpperCase() + newCategory.slice(1)});

  localStorage.setItem('categories', JSON.stringify(categories));
  const getCategoriesStorage = JSON.parse(localStorage.getItem('categories'));
  setValueCategoriesSelect(getCategoriesStorage);
  updateCategoriesList(getCategoriesStorage);

  inputCategories.value = '';

});

// --- KeyCode on new category input ---
inputCategories.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    btnAddCategory.click();
  }
});

// Print categories on select filter
const setValueCategoriesSelect = () => {
  categoriesSelect.innerHTML = '';
  categories.forEach(
    (category, index) =>
    (categoriesSelect.options[index] = new Option(category.name, category.id))
)};

setValueCategoriesSelect();

// Print category on categories list
const updateCategoriesList = () => {
  const list = categoriesList;

  list.innerHTML = '';

  for (let category of categories) {
    const categoryItem = document.createElement('div');
    categoryItem.classList.add('mb-3');
    categoryItem.innerHTML = `
    <div class="columns is-vcentered is-mobile">
      <div class="column">
        <span class="tag is-primary is-light">${category.name}</span>
      </div>
      <div class="column is-narrow has-text"
        <p class="is-fullwidth has-text-right-tablet">
          <a href="#" class="mr-4 is-size-7 edit-link">Editar</a>
          <a href="#" class="is-size-7 delete-link">Eliminar</a>
        </p>
      </div>
    </div>`;

    const editAction = categoryItem.querySelector('.edit-link');
    const deleteAction = categoryItem.querySelector('.delete-link');

    editAction.onclick = () => {
      editCategorySection.style.display = 'block';
      balanceSection.style.display = 'none';
      categoriasSection.style.display = 'none';
      reportesSection.style.display = 'none';
      newOperationSection.style.display = 'none';
      editCategory();
  }

  deleteAction.onclick = () => {
    // deleteCategory(category.id);
  }

  list.append(categoryItem);
}}

updateCategoriesList();


// --- KeyCode on edit categories input ---
inputEditCategory.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    btnEditCategory.click();
  }
});

// Edit category

// Delete category

// Start with all categories of local Storage
// if (JSON.parse(localStorage.getItem('categories')) === null){
//   categories = [
//     {id:0, name:'Todas'},
//     {id:1, name:'Comida'},
//     {id:2, name:'Servicios'},
//     {id:3, name:'Salidas'},
//     {id:4, name:'Educación'},
//     {id:5, name:'Transporte'},
//     {id:6, name:'Trabajo'}
//   ];
// } else {
//   categories = JSON.parse(localStorage.getItem('categories'));
//   setValueCategoriesSelect(getCategoriesStorage);
//   updateCategoriesList(getCategoriesStorage);
// } 

// -------------- END OF CATEGORIES ---------------------------

// Delete operations
const deleteOperation = (idOperation) => {
  operations = operations.filter(operation => operation.id !== idOperation);
  localStorage.setItem('operations', JSON.stringify(operations));
  const operationsLocalStorage = JSON.parse(localStorage.getItem('operations'));
  printOperations(operationsLocalStorage);

  if(operations.length < 1){
    withOperations.style.display = 'none';
    noOperations.style.display = 'block';
  }
}

// Edit operations
const editOperationSection = document.getElementById('editOperationSection');
const editDescription = document.getElementById('editDescription');
const editAmount = document.getElementById('editAmount');
const editType = document.getElementById('editType');
const editCategoriesOp = document.getElementById('editCategoriesOp');
const editDate = document.getElementById('editDate');
const cancelEditOperation = document.getElementById('cancelEditOperation');
const editNewOperation = document.getElementById('editNewOperation');

const editOperation = (idOperation) =>{
  editOperationSection.style.display = 'block';
  balanceSection.style.display = 'none';
  
  // const editOperation = operations.filter(operation => operation.id === idOperation);
  const editOperation = operations.findIndex((operation) => operation.id === idOperation);

  editDescription.value = operations[editOperation].description;
  editAmount.value = operations[editOperation].amount;
  editType.value = operations[editOperation].type;
  editCategoriesOp.value = operations[editOperation].category;
  editDate.value = operations[editOperation].date;

  cancelEditOperation.addEventListener('click', () =>{
    editOperationSection.style.display = 'none';
    balanceSection.style.display = 'block';
  })

  editNewOperation.addEventListener('click', ()=>{
    const newOp = {
      id: idOperation,
      description: editDescription.value,
      amount: editAmount.value,
      type: editType.value,
      category: editCategoriesOp.value,
      date: editDate.value
    }

    operations[editOperation] = newOp;
    localStorage.setItem('operations', JSON.stringify(operations));
    const operationsLocalStorage = JSON.parse(localStorage.getItem('operations'));
    printOperations(operationsLocalStorage);

    editOperationSection.style.display = 'none';
    balanceSection.style.display = 'block';
  })
}

// REPORTES

// Show or unshow report section
const noReports = document.getElementById('no-reports');
const withReports = document.getElementById('with-reports');

const profits = operations.some(el => el.type === 'gain');
const spending = operations.some(el => el.type === 'expense');

const reportesCanvas = () =>{
  if(!operations || operations.length === 0 || !profits || !spending){
  withReports.classList.add('display');
  noReports.classList.remove('display');
} else{
  withReports.classList.remove('display');
  noReports.classList.add('display');
}}

reportesCanvas();

// Total per category
// const categories = ['education', 'work'];

// const arr = [];
// for (let i = 0; i < categories.length; i++) {
//   const arrExpense = operations.filter(element => element.category === categories[i] && element.type === 'expense').reduce((inicial, current) => Number(inicial) + Number(current.amount), 0);
//   const arrGain = operations.filter(element => element.category === categories[i] && element.type === 'gain').reduce((inicial, current) => Number(inicial) + Number(current.amount), 0);
//   arr.push({name: categories[i], gain: arrGain, expense: arrExpense});
// }

// // console.log(arr);

// const result = Math.max(...arr.map(value => value.gain));
// console.log(result);

// BALANCE
const earningsBalance = document.getElementById('earnings');
const expensesBalance = document.getElementById('expenses');
const balanceBalance = document.getElementById('balance');

const balance = () =>{
  let earnings = operations.filter(element => element.type === 'gain').reduce((inicial, current) => Number(inicial) + Number(current.amount), 0);
  let expenses = operations.filter(element => element.type === 'expense').reduce((inicial, current) => Number(inicial) + Number(current.amount), 0);

  earningsBalance.innerHTML = `+$${!profits ? 0 : earnings}`;
  expensesBalance.innerHTML = `-$${!spending ? 0 : expenses}`;

  balanceBalance.innerHTML = `$${earnings - expenses}`;
}

balance()