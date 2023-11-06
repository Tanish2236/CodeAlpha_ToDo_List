const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("edit-btn")) {
        // Call a function to handle the edit action
        editTask(e.target.parentElement);
    }
});

function addTodo(event){
    event.preventDefault();

    if(todoInput.value.trim() === ""){
        alert("Please enter the task");
        return;
    }

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Adding to Local Storage
    savedLocalTodos(todoInput.value);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-pen" style="font-size:24px"></i></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const completedButton = document.createElement("button"); 
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    todoInput.value = "";

    //window.alert("task added");
}

function deleteCheck(e){
    console.log(e.target);
    const item = e.target;

    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
        case "all":
            todo.style.display = "flex";
            break;
        case "completed":
            if(todo.classList.contains("completed")){
                todo.style.display = "flex";
            } else{
                todo.style.display = "none";
            }
            break;
        case "incomplete":
            if(todo.classList.contains("completed")){
                todo.style.display = "none";
            } else {
                todo.style.display = "flex";
            }
            break;

        }
    });
}

function savedLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    const existingTodoIndex = todos.findIndex(item => item === todo);

    if (existingTodoIndex !== -1) {
        // If the todo already exists, update it
        todos[existingTodoIndex] = todo;
    } else {
        // If it's a new todo, add it
        todos.push(todo);
    }

    localStorage.setItem("todos", JSON.stringify(todos));
}


function getLocalTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-pen" style="font-size:24px"></i></i>';
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    }); 
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function editTask(todoDiv) {
    const todoItem = todoDiv.querySelector(".todo-item");
    const updatedTask = prompt("Edit task:", todoItem.innerText);

    if (updatedTask !== null && updatedTask !== "") {
        todoItem.innerText = updatedTask;
        // Update local storage if needed

        const todos = JSON.parse(localStorage.getItem("todos"));
        const index = todos.findIndex(todo => todo === todoItem.innerText);
        if (index !== -1) {
            todos[index] = updatedTask;
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
}


