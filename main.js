const form = document.querySelector('form');
const formInput = document.querySelector('.grocery-list__form');
const grocerList = document.querySelector('.grocer-list__list');
const btnClear = document.querySelector('.grocery-list__btn-clear');

let purchases = [];

if (localStorage.getItem('purchase')) {
    purchases = JSON.parse(localStorage.getItem('purchase'))
    if (purchases.length > 0) {
        document.querySelector('.grocery-list__wrapper').remove()
    }
}

purchases.forEach(item => {
    // Формируем CSS класс
     const cssClass = item.done ? 'grocer-list__list-item complete' : 'grocer-list__list-item';

     // Создание разметки для нового элемента списка
     const listHTML =`<li class="${cssClass}" id="${item.id}" data-item>${item.text}</li>`;

    // Добавление нового элемента на страниицу
     grocerList.insertAdjacentHTML('beforeend', listHTML);
})

// Добавление покупки в список
form.addEventListener('submit', addPurchase)

// Помечаем выполненые
grocerList.addEventListener('click', completePurchase)

// Очищаем список
btnClear.addEventListener('click', clearList)




function addPurchase(e) {
    // Отмена отпрвки формы
    e.preventDefault();

    // Проверяем написанно ли что-нибудь в поле ввода
    if (formInput.value.length == 0) return;

    //Описывю покупку в вииде объекта
    const newPurchase = {
        id: Date.now(),
        text: formInput.value,
        done: false,
    };

    //Добавляю покупку в общий массив
    purchases.push(newPurchase);

    saveToLocalStorage()

    // Создание разметки для нового элемента списка
    const listHTML =`<li class="grocer-list__list-item" id="${newPurchase.id}" data-item>${newPurchase.text}</li>`;

    // Добавление нового элемента на страниицу
    grocerList.insertAdjacentHTML('beforeend', listHTML);

    // Очистка строки ввода и возврщение фокуса
    formInput.value = '';
    formInput.focus();

    // Удаляем блок с картиинкой
    if (document.querySelector('.grocery-list__wrapper')) {
        document.querySelector('.grocery-list__wrapper').remove()
    }
}


function completePurchase(e) {
    if (e.target.dataset.item != undefined) {
        // Нахожу в общем мссиве элемент по id, меняю свойство "done" на противоположное 
        const purchasesItem = purchases.find(item => item.id == e.target.id);
        purchasesItem.done = !purchasesItem.done;

        saveToLocalStorage()

        // добавляю/убираю элементу ксласс "complete"
        e.target.classList.toggle('complete')
    }
}

function clearList() {
    // очиищаю общий массив
    purchases.splice(0);

    saveToLocalStorage();

    // Вместо всего того что у нас добавилось в лист, добавляем блок с картинкой
    grocerList.innerHTML = `
            <li class="grocery-list__wrapper">
                <p class="grocery-list__subtitle">Cписок покупок пуст...</p>
                <img class="grocery-list__image" src="./img/food_basket.png" alt="корзина">
            </li>
            `
}

function saveToLocalStorage() {
    localStorage.setItem('purchase', JSON.stringify(purchases))
}