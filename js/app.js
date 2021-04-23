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

btnBalance.addEventListener('click', () => {
    balanceSection.style.display = 'block';
    categoriasSection.style.display = 'none';
    reportesSection.style.display = 'none';
    newOperationSection.style.display = 'none';
    editCategorySection.style.display = 'none';
})

btnCategorias.addEventListener('click', () => {
    balanceSection.style.display = 'none';
    categoriasSection.style.display = 'block';
    reportesSection.style.display = 'none';
    newOperationSection.style.display = 'none';
    editCategorySection.style.display = 'none';
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

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

// dateInput.value = '2021/07/04';
const setTodayDate = () => {
  dateInput.value = `${year}/${month < 10 ? '0' + month: month}/${day < 10 ? '0' + day: day}`;
}

// NEW OPERATION: OPEN FORM AND CLOSE FORM

const btnNewOperation = document.getElementById('new-operation');
const btnCancelNewOperation = document.getElementById('cancelNewOperation');

const newOperationSection = document.getElementById('newOperationSection');

btnNewOperation.addEventListener('click', () => {
  setTodayDate();
  newOperationSection.style.display = 'block';
  balanceSection.style.display = 'none';
})

btnCancelNewOperation.addEventListener('click', () => {
  newOperationSection.style.display = 'none';
  balanceSection.style.display = 'block';
})

// NEW OPERATION: ADD NEW OPERATION

const withOperations = document.getElementById('with-operations');
const noOperations = document.getElementById('no-operations');

const btnAcceptNewOperation = document.getElementById('acceptNewOperation');

let operations = [];

const description = document.getElementById('description');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const category = document.getElementById('category');

let amountStyle;

const clearOperations = () =>{
  description.value = '';
  amount.value = 0;
  type.value = 'Gasto';
  category.value = '';
  setTodayDate();
}

const printOperations = (operations)=>{
  // withOperations.innerHTML = '';
  for (let i = 0; i < operations.length; i++) {
      const codeBox = `<div id="${operations[i].id}" class="columns">
          <div class="column is-3 description-style">${operations[i].description}</div>
          <div class="column is-3 category-style">${operations[i].category}</div>
          <div class="column is-2 has-text-right">${operations[i].date}</div>
          <div class="column is-2 has-text-right">${operations[i].amount}</div>
          <div class="column is-2 has-text-right">
            <a class="edit-op">Editar</a>
            <a class="delete-op">Eliminar</a>
          </div>
      </div>`
      withOperations.insertAdjacentHTML('beforeend', codeBox)
  }
}

// const winOrLoose = (operations) =>{
//   // for (let i = 0; i < operations.length; i++) {
//     if(type.value === 'Gasto'){
//       amountStyle = `<div class="column is-2 has-text-right loose-style"> -${operations[i].amount}</div>`
//     } else if(type.value === 'Ganancia'){
//       amountStyle = `<div class="column is-2 has-text-right win-style"> +${operations[i].amount}</div>`
//     }
//   // }
//   return amountStyle
// }

// console.log(amountStyle)

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

// CATEGORIES

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

let categories = [
  {id:0, name:'Todas'},
  {id:1, name:'Comida'},
  {id:2, name:'Servicios'},
  {id:3, name:'Salidas'},
  {id:4, name:'Educación'},
  {id:5, name:'Transporte'},
  {id:6, name:'Trabajo'},
];

// -----  Local storage  -----

localStorage.setItem('categoriesStorage', JSON.stringify(categories));
const getCategoriesStorage = JSON.parse(localStorage.getItem('categoriesStorage'));

// Add new category

btnAddCategory.addEventListener("click", () => {

  const newCategory = inputCategories.value.replace(/^\s+|\s+$/gm, '');

  if (newCategory === '') {
    return false;
  }

  categories.push({id:categories.length, name:newCategory.charAt(0).toUpperCase() + newCategory.slice(1)});

  localStorage.setItem('categoriesStorage', JSON.stringify(categories));
  const getCategoriesStorage = JSON.parse(localStorage.getItem('categoriesStorage'));
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

setValueCategoriesSelect()

// Print category on category list

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
  }
};

updateCategoriesList();

// Edit category

let index;
const editCategory = (category) => {
  index = categories.findIndex((elem) => elem.id === Number(category.id));
  inputEditCategory.value = categories[index].name;
  if (inputEditCategory.value === '') {
    return false;
  } else {
    return index;
  }
};
  
editAction.addEventListener("click", () => {
  categories[index].name = inputEditCategory.value;
  localStorage.setItem("categoriesStorage", JSON.stringify(categories));
  setValueCategoriesSelect(getCategoriesStorage);
  updateCategoriesList(getCategoriesStorage);
});

// --- KeyCode on edit categories input ---

inputEditCategory.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    btnEditCategory.click();
  }
});

// Delete category
