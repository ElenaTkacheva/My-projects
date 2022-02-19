// добавляем прослушку на всем окне
window.addEventListener('click', function(event) {

    // объявляем переменную для счетчика
    let counter;

    // проверяем клик строго по кнопкам плюс или минус
    if (event.target.dataset.action === "plus" || event.target.dataset.action === "minus") {
      // находим обертку счетчика
      const counterWrapper = event.target.closest(".counter-wrapper");
      // находим див с числом счетчика
        counter = counterWrapper.querySelector("[data-counter]");
    }

  
  // Проверяем, является ли элемент по которому был совершен клик, кнопкой Плюс
  if (event.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
  }

  // Проверяем, является ли элемент по которому был совершен клик, кнопкой Минус
  if (event.target.dataset.action === "minus") {
    
    // проверяем, чтобы счетчик был больше 1
    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    }
  }
})