// --------------- START OF BURGER NAVBAR -----------------
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
// --------------- END OF BURGER NAVBAR -----------------

// --------------- START OF NAVBAR -----------------
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
// --------------- END OF NAVBAR -----------------

const withOperations = document.getElementById('with-operations');
const noOperations = document.getElementById('no-operations');
let operations = [];
let categories = [];
let defaultCategories = [
  {name:'Comida', id: uuid.v4()},
  {name:'Servicios', id: uuid.v4()},
  {name:'Salidas', id: uuid.v4()},
  {name:'Educación', id: uuid.v4()},
  {name:'Transporte', id: uuid.v4()},
  {name:'Trabajo', id: uuid.v4()}];
categories = JSON.parse(localStorage.getItem("categories"));
operations = JSON.parse(localStorage.getItem('operations'));

// --------------- START OF NEW OPERATION -----------------
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
  categoryOp.value = `${categories[0].name}`;
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

const btnAcceptNewOperation = document.getElementById('acceptNewOperation');

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
    reportesCategoria()
    reportesMonth()
    
    newOperationSection.style.display = 'none';
    balanceSection.style.display = 'block';
    noOperations.style.display = 'none';
    withOperations.style.display = 'block';
  })
// --------------- END OF NEW OPERATIONS -----------------

// --------------- START OF FILTERS -----------------

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

const filterByType = (type, operations) => operations.filter((operation) => operation.type === type);

const filterByCategory = (category, operations) => operations.filter((operation) => operation.category === category);

const filterByDate = (date, operations) => operations.filter((operation) => new Date(operation.date).getTime() >= new Date(date).getTime());

const filterByLessRecent = (operations, order) => {
  const arr = [...operations];
  let result;
  if(order === 'ASC'){
    result = arr.sort((a, b) => (a.date > b.date ? 1 : -1));
  } else{
    result = arr.sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  return result
}

const filterbyLessAmount = (operations, order) => {
  const arr = [...operations];
  let result;
  if (order === "ASC") {
    result = arr.sort((a, b) =>
      Number(a.amount) > Number(b.amount) ? 1 : -1
    );
  } else {
    result = arr.sort((a, b) =>
      Number(a.amount) < Number(b.amount) ? 1 : -1
    );
  }
  return result;
};

const filterAZ_ZA = (operations, order) => {
  const arr = [...operations];
  let result;
  if (order === "A-Z") {
    result = arr.sort((a, b) => (a.description > b.description ? 1 : -1));
  } else {
    result = arr.sort((a, b) => (a.description < b.description ? 1 : -1));
  }
  return result;
};

const filterType = document.getElementById('filter-type');
const filterCategories = document.getElementById('filter-categories');
const filterOrder = document.getElementById('filter-order');

const filterOperations = () => {
  const type = filterType.value;
  const category = filterCategories.value;
  const date = filterDate.value;
  const order = filterOrder.value;

  let operationsFilter = operations

  if (type !== "Todas") {
    operationsFilter = filterByType(type, operationsFilter);
  }

  if (category !== "Todas") {
    operationsFilter = filterByCategory(category, operationsFilter);
  }

  operationsFilter = filterByDate(date, operationsFilter);

  switch (order) {
    case "Más reciente":
      operationsFilter = filterByLessRecent(operationsFilter, "DESC");
      break;
    case "Menos reciente":
      operationsFilter = filterByLessRecent(operationsFilter, "ASC");
      break;
    case "Mayor monto":
      operationsFilter = filterbyLessAmount(operationsFilter, "DESC");
      break;
    case "Menor monto":
      operationsFilter = filterbyLessAmount(operationsFilter, "ASC");
      break;
    case "A/Z":
      operationsFilter = filterAZ_ZA(operationsFilter, "A-Z");
      break;
    case "Z/A":
      operationsFilter = filterAZ_ZA(operationsFilter, "Z-A");
      break;
    default:
      break;
  }

  printOperations(operationsFilter)
};

filterType.addEventListener("change", filterOperations);
filterCategories.addEventListener("change", filterOperations);
filterDate.addEventListener("change", filterOperations);
filterOrder.addEventListener("change", filterOperations);

// --------------- END OF FILTERS -----------------

// ------ START OF DELETE AND EDIT OPERATIONS ------
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
  // editCategoriesOp.value = operations[editOperation].category;
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
// --------------- END OF DELETE AND EDIT OPERATIONS -----------------

// --------------- START OF CATEGORIES -----------------
// DOM
// const categoriesSelect = document.getElementById('filter-categories');
const inputCategories = document.getElementById('category-name');
const categoriesList = document.getElementById('categories-list');
const btnAddCategory = document.getElementById('btn-add-category');

const editCategorySection = document.getElementById('edit-category-section');
const inputEditCategory = document.getElementById('edit-category-input');
const btnEditCategory = document.getElementById('edit-category-button');
const btnCancelEditCategory = document.getElementById('cancel-category-button');

const editCategoriesOpOptions = document.getElementById('edit-categories-op-select');


// Print categories on select filter
const setValueCategoriesSelect = (categories) => {
  categoryOp.innerHTML = "";
  filterCategories.innerHTML = `<option value="Todas">Todas</option>`;
  for (let i = 0; i < categories.length; i++) {
    const categoria = `
    <option value="${categories[i].name}">${categories[i].name}</option>
    `;
    categoryOp.insertAdjacentHTML("beforeend", categoria);
    editCategoriesOpOptions.insertAdjacentHTML("beforeend", categoria);
    filterCategories.insertAdjacentHTML("beforeend", categoria);
  }
};

// Add new category
btnAddCategory.addEventListener("click", () => {

  const newCategory = inputCategories.value.replace(/^\s+|\s+$/gm, '');

  if (newCategory === '') {
    return false;
  }

  categories.push({id: uuid.v4(), name:newCategory.charAt(0).toUpperCase() + newCategory.slice(1)});

  localStorage.setItem('categories', JSON.stringify(categories));
  const categoriesGetStorage = JSON.parse(localStorage.getItem('categories'));  

  setValueCategoriesSelect(categoriesGetStorage);
  updateCategoriesList(categoriesGetStorage);

  inputCategories.value = '';
});

// --- KeyCode on new category input ---
inputCategories.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    btnAddCategory.click();
  }
});

// Print category on categories list
const updateCategoriesList = () => {
  categoriesList.innerHTML = '';

  for (let i = 0; i < categories.length; i++) {
    // if(categories[i].name !== 'Todas'){

    const categoryItem = document.createElement('div');
    categoryItem.classList.add('mb-3');
    categoryItem.innerHTML = `
    <div class="columns is-vcentered is-mobile">
      <div class="column">
        <span class="tag is-primary is-light">${categories[i].name}</span>
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
      editCategory(categories[i].id);
    }

    deleteAction.onclick = () => {
      deleteCategory(categories[i].id);
    }

    categoriesList.append(categoryItem);
  // }
  }
}

// --- KeyCode on edit categories input ---
inputEditCategory.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    btnEditCategory.click();
  }
});

// Edit category
const editCategory = (idCategory) => {
  const index = categories.findIndex((category) => category.id === idCategory);

  inputEditCategory.value = categories[index].name

  btnCancelEditCategory.addEventListener('click', () => {
    editCategorySection.style.display = 'none';
    categoriasSection.style.display = 'block';
  });

  btnEditCategory.addEventListener('click', () => {
    const renameCategory = inputEditCategory.value;

    categories[index].name = renameCategory;
    localStorage.setItem('categories', JSON.stringify(categories));
    const categoriesGetStorage = JSON.parse(localStorage.getItem('categories'));
    setValueCategoriesSelect(categoriesGetStorage);
    updateCategoriesList(categoriesGetStorage);
    // newOpCategoriesSelect(categoriesGetStorage);
    // editCategoriesOpSelect(categoriesGetStorage);

    editCategorySection.style.display = 'none';
    categoriasSection.style.display = 'block';
  })
};

// Delete category
const deleteCategory = (idCategory) => {
  categories = categories.filter(category => category.id !== idCategory);
  localStorage.setItem('categories', JSON.stringify(categories));
  const categoriesGetStorage = JSON.parse(localStorage.getItem('categories'));
  updateCategoriesList(categoriesGetStorage);
}
// -------------- END OF CATEGORIES ---------------------------

// --------------- START OF REPORTES -----------------
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

// By Category
categories = JSON.parse(localStorage.getItem("categories"));
operations = JSON.parse(localStorage.getItem('operations'));

const catMoreEarnings = document.getElementById('catMoreEarnings');
const amountCatMoreEarnings = document.getElementById('amountCatMoreEarnings');
const catMoreExpense = document.getElementById('catMoreExpense');
const amountCatMoreExpense = document.getElementById('amountCatMoreExpense');
const catMoreBalance = document.getElementById('catMoreBalance');
const amountCatMoreBalance = document.getElementById('amountCatMoreBalance');
const reportesCat = document.getElementById('reportes-categorias');

const reportesCategoria = () =>{
  const arr = [];
  for (let i = 0; i < categories.length; i++) {
    const arrExpense = operations.filter(element => element.category === categories[i].name && element.type === 'expense').reduce((inicial, current) => Number(inicial) + Number(current.amount), 0);
    const arrGain = operations.filter(element => element.category === categories[i].name && element.type === 'gain').reduce((inicial, current) => Number(inicial) + Number(current.amount), 0);
    const arrBalance = arrGain - arrExpense;
    arr.push({name: categories[i].name, gain: arrGain, expense: arrExpense, balance: arrBalance});
  }
  
  let gainCat = Math.max(...arr.map(value => value.gain));
  let expenseCat = Math.max(...arr.map(value => value.expense));
  let balanceCat = Math.max(...arr.map(value => value.balance));
  amountCatMoreEarnings.innerHTML = gainCat;
  amountCatMoreExpense.innerHTML = expenseCat;
  amountCatMoreBalance.innerHTML = balanceCat

  arr.forEach(element => {
    element.gain === gainCat ? catMoreEarnings.innerHTML = element.name : false
  });
  arr.forEach(element => {
    element.expense === expenseCat ? catMoreExpense.innerHTML = element.name : false
  });
  arr.forEach(element => {
    element.balance === balanceCat ? catMoreBalance.innerHTML = element.name : false
  });

  reportesCat.innerHTML = '';
  arr.forEach(element => {
    if(element.gain === 0 && element.expense === 0){
      return false
    } else{
      const totalCat = document.createElement('div');
      totalCat.classList.add('columns', 'is-vcentered', 'is-mobile');
      totalCat.innerHTML =
       `<div class="column">
          <h3 class="has-text-weight-semibold">${element.name}</h3>
        </div>
        <div class="column gain-style has-text-right">+${element.gain}</div>
        <div class="column expense-style has-text-right">-${element.expense}</div>
        <div class="column has-text-right">${element.balance}</div>`
        reportesCat.append(totalCat)
    }
  });
}

reportesCategoria()

// By Month
const monthMoreEarnings = document.getElementById('monthMoreEarnings');
const amountMonthMoreEarnings = document.getElementById('amountMonthMoreEarnings');
const monthMoreExpense = document.getElementById('monthMoreExpense');
const amountMonthMoreExpense = document.getElementById('amountMonthMoreExpense');
const reportesMonthSection = document.getElementById('reportes-month');


const reportesMonth = () =>{
  let totalMonth = [];
  for (let m = 0; m <= 12; m++) {
    let month = new Date(2021, m, 04);
    let itemReport = {
      month: month.getMonth() +1,
      monthFull : '',
      earning: 0,
      expense: 0,
      balance: 0,
    }
    operations.forEach((operation) =>{
      let datex = new Date(operation.date);
      let date = `${parseInt(datex.getMonth() +1) < 10 ? '0' + parseInt(datex.getMonth() +1) : parseInt(datex.getMonth() +1)}/${datex.getFullYear()}`

      if(m === datex.getMonth()){
        if(operation.type === 'gain'){
          itemReport.earning += parseFloat(operation.amount)
          itemReport.monthFull = date
        } else{
          itemReport.expense += parseFloat(operation.amount)
          itemReport.monthFull = date
        }
      }
    });
    itemReport.balance = itemReport.earning - itemReport.expense;
    if(itemReport.earning !== 0 || itemReport.expense !== 0){
      totalMonth.push(itemReport)
    }
  }
  let gainMonth = Math.max(...totalMonth.map(value => value.earning));
  let expenseMonth = Math.max(...totalMonth.map(value => value.expense));
  
  amountMonthMoreEarnings.innerHTML = gainMonth;
  amountMonthMoreExpense.innerHTML = expenseMonth;

  totalMonth.forEach(element => {
    element.earning === gainMonth ? monthMoreEarnings.innerHTML = element.monthFull : false
  });
  totalMonth.forEach(element => {
    element.expense === expenseMonth ? monthMoreExpense.innerHTML = element.monthFull : false
  });

  reportesMonthSection.innerHTML = ''
  totalMonth.forEach(element => {
    if(element.earning === 0 && element.expense === 0){
      return false
    } else{
      const totalMonth = document.createElement('div')
      totalMonth.classList.add('columns', 'is-vcentered', 'is-mobile');
      totalMonth.innerHTML =
       `<div class="column">
          <h3 class="has-text-weight-semibold">${element.monthFull}</h3>
        </div>
        <div class="column gain-style has-text-right">+${element.earning}</div>
        <div class="column expense-style has-text-right">-${element.expense}</div>
        <div class="column has-text-right">${element.balance}</div>`
        reportesMonthSection.append(totalMonth)
    }
  });
}

reportesMonth()

// --------------- END OF REPORTES -----------------


// --------------- START OF BALANCES -----------------
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
// --------------- END OF BALANCES -----------------

// --------------- START WITH LOCAL STORAGE -----------------

// Start with all categories of local Storage
const getLocalStorage = () =>{
  categories = JSON.parse(localStorage.getItem("categories"));
  if(!categories || categories === null){
    localStorage.setItem('categories', JSON.stringify(defaultCategories));
    categories = JSON.parse(localStorage.getItem('categories'));
    setValueCategoriesSelect(categories);
    updateCategoriesList(categories);
  } else{
    setValueCategoriesSelect(categories);
    updateCategoriesList(categories);
  }
  
  // Start with all operations of local Storage
  operations = JSON.parse(localStorage.getItem('operations'));
  if(!operations || operations.length === 0){
    withOperations.style.display = 'none';
    noOperations.style.display = 'block';
  } else{
    withOperations.style.display = 'block';
    noOperations.style.display = 'none';
    printOperations(operations);
  }
}

getLocalStorage()
// --------------- END WITH LOCAL STORAGE -----------------
