const addTaskBtn = document.querySelector('#add-task-btn'); // кнопка Add
const deskTaskInput = document.querySelector('#description-task'); // input
const todosWrapper = document.querySelector('.todos-wrapper'); // поле, куда будут записываться наши задачи

let tasks; // массив , куда будут добавляться tasks
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks')); // проверка, есть ли в local storage какие-то tasks или нет

// массив, где будут храниться все шаблоны(Template) задач
let todoItemElems = [];

// создание задачи
function Task(description) {
    this.description = description;
    this.completed = false;
}
 // создание шаблона задачи
const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? "checked" : ""}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick='completeTask(${index})' type="checkbox" class="btn-complete" ${task.completed ? "checked" : ""
                }>
                <button onclick='deleteTask(${index})'  class="btn-delete">Delete</button>
            </div>
        </div>
    `;
}

// фильтрация tasks (в начале-активные, выполненные - внизу списка)
const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks =
      tasks.length && tasks.filter((item) => item.completed == true);
      tasks = [...activeTasks, ...completedTasks];
}

// функция отправки tasks на страницу HTML
const fillHtmlList = () => {
    todosWrapper.innerHTML = ''; //зачистка данных, которые были в todosWrapper
    filterTasks();
    //проверка массива tasks
    if(tasks.length > 0) {
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

// функция обновления local storage
const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// функция завершения дела
const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove("checked");
    }
    updateLocal();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';
})

// функция удаления задачи
const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500)
}