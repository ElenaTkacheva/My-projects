// находим элементы на странице
const btnMinus = document.querySelector('[data-action="minus"]');
const btnPlus = document.querySelector('[data-action="plus"]');
const counter = document.querySelector('[data-counter]');

// отслеживаем клики на кнопки
btnMinus.addEventListener('click', function() {

    // проверяем, чтобы счетчик был больше 1
    if (parseInt(counter.innerText) > 1) {
        counter.innerText = --counter.innerText;
    } 
});
btnPlus.addEventListener("click", function () {
    counter.innerText = ++counter.innerText;
});
