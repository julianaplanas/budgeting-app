// --------------- START OF HTML ELEMENTS -----------------
// Navbar
const btnBalance = document.getElementById('btnBalance');
const btnCategorias = document.getElementById('btnCategorias');
const btnReportes = document.getElementById('btnReportes');
const btnBrandLogo = document.getElementById('brand-logo')
// Sections
const balanceSection = document.getElementById('balanceSection');
const categoriasSection = document.getElementById('categoriasSection');
const reportesSection = document.getElementById('reportesSection');
// Sections of operations
const withOperations = document.getElementById('with-operations');
const noOperations = document.getElementById('no-operations');
const newOperationSection = document.getElementById('newOperationSection');
// Button: new operation, accept and cancel new operation
const btnNewOperation = document.getElementById('new-operation');
const btnCancelNewOperation = document.getElementById('cancelNewOperation');
const btnAcceptNewOperation = document.getElementById('acceptNewOperation');
// Form inputs
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const dateInput = document.getElementById('date-input');
const categoryOp = document.getElementById('category');
// Filter section
const toggleFilters = document.getElementById('toggle-filters');
const filtersBox = document.getElementById('filters');
// Filters
const filterType = document.getElementById('filter-type');
const filterCategories = document.getElementById('filter-categories');
const filterDate = document.getElementById('filter-date');
const filterOrder = document.getElementById('filter-order');
// Edit operations
const editOperationSection = document.getElementById('editOperationSection');
const editDescription = document.getElementById('editDescription');
const editAmount = document.getElementById('editAmount');
const editType = document.getElementById('editType');
const editCategoriesOp = document.getElementById('edit-categories-op-select');
const editDate = document.getElementById('editDate');
const cancelEditOperation = document.getElementById('cancelEditOperation');
const editNewOperation = document.getElementById('editNewOperation');
// Categories section
const inputCategories = document.getElementById('category-name');
const categoriesList = document.getElementById('categories-list');
const btnAddCategory = document.getElementById('btn-add-category');
const editCategorySection = document.getElementById('edit-category-section');
const inputEditCategory = document.getElementById('edit-category-input');
const btnEditCategory = document.getElementById('edit-category-button');
const btnCancelEditCategory = document.getElementById('cancel-category-button');
const editCategoriesOpOptions = document.getElementById('edit-categories-op-select');
// Reportes section
const noReports = document.getElementById('no-reports');
const withReports = document.getElementById('with-reports');
// Reportes by category
const catMoreEarnings = document.getElementById('catMoreEarnings');
const amountCatMoreEarnings = document.getElementById('amountCatMoreEarnings');
const catMoreExpense = document.getElementById('catMoreExpense');
const amountCatMoreExpense = document.getElementById('amountCatMoreExpense');
const catMoreBalance = document.getElementById('catMoreBalance');
const amountCatMoreBalance = document.getElementById('amountCatMoreBalance');
const reportesCat = document.getElementById('reportes-categorias');
// Reportes by month
const monthMoreEarnings = document.getElementById('monthMoreEarnings');
const amountMonthMoreEarnings = document.getElementById('amountMonthMoreEarnings');
const monthMoreExpense = document.getElementById('monthMoreExpense');
const amountMonthMoreExpense = document.getElementById('amountMonthMoreExpense');
const reportesMonthSection = document.getElementById('reportes-month');
// Reportes balance
const earningsBalance = document.getElementById('earnings-balance');
const expensesBalance = document.getElementById('expenses-balance');
const balanceBalance = document.getElementById('balance-balance');
// --------------- END OF HTML ELEMENTS -----------------

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
btnBalance.addEventListener('click', ()=>{
    balanceSection.style.display = 'block';
    categoriasSection.style.display = 'none';
    reportesSection.style.display = 'none';
    newOperationSection.style.display = 'none';
})

btnBrandLogo.addEventListener('click', ()=>{
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
let operations = [];
let categories = [];
let defaultCategories = [
  {name:'Comida', id: uuid.v4()},
  {name:'Servicios', id: uuid.v4()},
  {name:'Salidas', id: uuid.v4()},
  {name:'Educación', id: uuid.v4()},
  {name:'Transporte', id: uuid.v4()},
  {name:'Trabajo', id: uuid.v4()}];

// --------------- START OF NEW OPERATION -----------------
// NEW OPERATION: DATE INPUT
const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

const todayDate = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`;

dateInput.value = todayDate;
filterDate.value = todayDate;
dateInput.setAttribute("max", todayDate)
filterDate.setAttribute("max", todayDate)
editDate.setAttribute("max", todayDate)

// Clear operations
const clearOperations = () =>{
  description.value = '';
  amount.value = 0;
  type.value = 'expense';
  categoryOp.value = `${categories[0].name}`;
  dateInput.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`;
}

// NEW OPERATION: OPEN FORM AND CLOSE FORM
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
let amountStyle;

// PRINT OPERATIONS
const printOperations = (operations)=>{
  withOperations.innerHTML = '';
  for (let i = 0; i < operations.length; i++) {
      const codeOperation = document.createElement('div');
      codeOperation.innerHTML = `<div id="${operations[i].id}" class="columns is-mobile">
          <div class="column is-3 has-text-weight-semibold">${operations[i].description}</div> 
          <div class="column is-3"><span class="tag is-warning is-light">${operations[i].category}</span></div>
          <div class="column is-2 has-text-right">${operations[i].date}</div>
          <div class="column is-2 has-text-right has-text-weight-semibold ${operations[i].type === 'gain' ? 'has-text-success ' : 'has-text-danger'}">${operations[i].type === 'gain' ? '+ ' : '- '}${operations[i].amount.replace(/^0+/, '')}</div>
          <div class="column is-2 has-text-right">
            <a class="edit-op is-size-7 link-style">Editar</a>
            <a class="delete-op is-size-7 link-style">Eliminar</a>
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

// CREATE NEW OPERATION
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
// SHOW OR UNSHOW FILTER BOX
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

// FILTER BY TYPE
const filterByType = (type, operations) => operations.filter((operation) => operation.type === type);

// FILTER BY CATEGORY
const filterByCategory = (category, operations) => operations.filter((operation) => operation.category === category);

// FILTER BY DATE
const filterByDate = (date, operations) => operations.filter((operation) => new Date(operation.date).getTime() >= new Date(date).getTime());

// FILTER BY LESS RECENT OPERATION
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

// FILTER BY OPERATION AMOUNT
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

// FILTER BY DESCRIPTION
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

// PRINT FILTERS
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
// DELETE OPERATIONS
const deleteOperation = (idOperation) => {
  operations = operations.filter(operation => operation.id !== idOperation);
  localStorage.setItem('operations', JSON.stringify(operations));
  const operationsLocalStorage = JSON.parse(localStorage.getItem('operations'));
  printOperations(operationsLocalStorage);

  if(operations.length < 1){
    withOperations.style.display = 'none';
    noOperations.style.display = 'block';
    withReports.classList.add('display');
    noReports.classList.remove('display');
  }
}

// EDIT OPERATIONS
const editOperation = (idOperation) =>{
  editOperationSection.style.display = 'block';
  balanceSection.style.display = 'none';
  
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
// --------------- END OF DELETE AND EDIT OPERATIONS -----------------

// --------------- START OF CATEGORIES -----------------
// DOM

// PRINT CATEGORIES ON SELECT FILTER
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

// ADD NEW CATEGORY
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

// --- KEYCODE ON NEW CATEGORY INPUT ---
inputCategories.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    btnAddCategory.click();
  }
});

// PRINT CATEGORY ON CATEGORIES LIST
const updateCategoriesList = () => {
  categoriesList.innerHTML = '';

  for (let i = 0; i < categories.length; i++) {
    const categoryItem = document.createElement('div');
    categoryItem.classList.add('mb-3');
    categoryItem.innerHTML = `
    <div class="columns is-vcentered is-mobile">
      <div class="column">
        <span class="tag is-warning is-light">${categories[i].name}</span>
      </div>
      <div class="column is-narrow has-text"
        <p class="is-fullwidth has-text-right-tablet">
          <a href="#" class="mr-4 is-size-7 edit-link link-style">Editar</a>
          <a href="#" class="is-size-7 delete-link link-style">Eliminar</a>
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
  }
}

// GET CATEGORIES FROM LOCAL STORAGE
const getCategories = () =>{
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
}

getCategories()

// --- KEYCODE ON EDIT CATEGORIES INPUT ---
inputEditCategory.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    btnEditCategory.click();
  }
});

// EDIT CATEGORY
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

    editCategorySection.style.display = 'none';
    categoriasSection.style.display = 'block';
  })
};

// DELETE CATEGORY
const deleteCategory = (idCategory) => {
  categories = categories.filter(category => category.id !== idCategory);
  localStorage.setItem('categories', JSON.stringify(categories));
  const categoriesGetStorage = JSON.parse(localStorage.getItem('categories'));
  updateCategoriesList(categoriesGetStorage);
}
// -------------- END OF CATEGORIES ---------------------------

// --------------- START OF REPORTES -----------------
let profits; 
let spending;

// REPORTES BY CATEGORY
categories = JSON.parse(localStorage.getItem("categories"));
operations = JSON.parse(localStorage.getItem('operations')) ?? [];

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
    element.gain === gainCat ? catMoreEarnings.innerHTML = `<span class="tag is-primary is-light">${element.name}</span>` : false
  });
  arr.forEach(element => {
    element.expense === expenseCat ? catMoreExpense.innerHTML = `<span class="tag is-primary is-light">${element.name}</span>` : false
  });
  arr.forEach(element => {
    element.balance === balanceCat ? catMoreBalance.innerHTML = `<span class="tag is-primary is-light">${element.name}</span>` : false
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
          <h3 class="has-text-weight-semibold"><span class="tag is-primary is-light">${element.name}</span></h3>
        </div>
        <div class="column has-text-success has-text-weight-semibold has-text-right">+${element.gain}</div>
        <div class="column has-text-danger has-text-weight-semibold has-text-right">-${element.expense}</div>
        <div class="column has-text-right">${element.balance}</div>`
        reportesCat.append(totalCat)
    }
  });
}

// REPORTES BY MONTH
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
        <div class="column has-text-success has-text-weight-semibold has-text-right">+${element.earning}</div>
        <div class="column has-text-danger has-text-weight-semibold has-text-right">-${element.expense}</div>
        <div class="column has-text-right">${element.balance}</div>`
        reportesMonthSection.append(totalMonth)
    }
  });
}
// --------------- END OF REPORTES -----------------

// --------------- START OF BALANCES -----------------
const balance = () =>{
  let earnings = operations.filter(element => element.type === 'gain').reduce((inicial, current) => Number(inicial) + Number(current.amount), 0);
  let expenses = operations.filter(element => element.type === 'expense').reduce((inicial, current) => Number(inicial) + Number(current.amount), 0);

  earningsBalance.innerHTML = `+$${!profits ? 0 : earnings}`;
  expensesBalance.innerHTML = `-$${!spending ? 0 : expenses}`;

  balanceBalance.innerHTML = `$${earnings - expenses}`;
}
// --------------- END OF BALANCES -----------------

// GET OPERATIONS FROM LOCAL STORAGE
const getOperations = () =>{
  operations = JSON.parse(localStorage.getItem('operations'));
  if(!operations || operations.length === 0){
    withOperations.style.display = 'none';
    noOperations.style.display = 'block';
    operations = [];
  } else{
    withOperations.style.display = 'block';
    noOperations.style.display = 'none';
    printOperations(operations);
    // balance()
  }
}
getOperations()

// SHOW OR UNSHOW REPORT SECTION
const reportesCanvas = () =>{
  if(!operations || operations.length === 0){
  withReports.classList.add('display');
  noReports.classList.remove('display');
} else{
  profits = operations.some(el => el.type === 'gain');
  spending = operations.some(el => el.type === 'expense');
  balance()
  if(!profits || !spending){
    withReports.classList.add('display');
    noReports.classList.remove('display');
  } else{
    withReports.classList.remove('display');
    noReports.classList.add('display');
    reportesCategoria()
    reportesMonth()
  }
}}

reportesCanvas();