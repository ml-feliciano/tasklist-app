const form = document.querySelector("form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector(".collection");
const clearButton = document.querySelector(".clear-button");
const filter = document.querySelector("#filter");

loadAllListeners();

function loadAllListeners(){
    document.addEventListener("DOMContentLoaded", displayStoredTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearButton.addEventListener("click", clearTasks);
    filter.addEventListener("keyup", filterTask);
}


function addTask(e){
    if(taskInput.value){
        const task = document.createElement("li");
        task.appendChild(document.createTextNode(taskInput.value));
        task.className = "collection-item";
        const removeButton = document.createElement("a");
        removeButton.setAttribute("href", "#");
        removeButton.innerHTML = '<i class="material-icons">cancel</i>';
        removeButton.className = 'secondary-content remove-task black-text';
        task.appendChild(removeButton);
        taskList.appendChild(task);
        storeTaskToLocalStorage(taskInput.value);
        taskInput.value = "";
    }else{
        alert("Please enter a task. :)");
    }
    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.className.includes('remove-task')){
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    e.preventDefault();
}

function clearTasks(){
    if(confirm("Clear all tasks?")){
        while(taskList.firstChild){
            taskList.firstChild.remove();
        }
        localStorage.clear();
        //taskList.innerHTML = "";
        //Can also use taskList.innerHTML = ""; But using the method above is faster.
    }
}

function filterTask(){
    const text = filter.value.toLowerCase();
    //Can also use e.target.value instead of filter.value
    const tasks = document.querySelectorAll('.collection-item');
    tasks.forEach(function(task){
        if(task.firstChild.textContent.toLowerCase().includes(text)){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    });   
}

function storeTaskToLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(taskItem, index){
        if(task.firstChild.textContent === taskItem){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayStoredTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(entry){
        const task = document.createElement("li");
        task.appendChild(document.createTextNode(entry));
        task.className = "collection-item";
        const removeButton = document.createElement("a");
        removeButton.setAttribute("href", "#");
        removeButton.innerHTML = '<i class="material-icons">cancel</i>';
        removeButton.className = 'secondary-content remove-task black-text';
        task.appendChild(removeButton);
        taskList.appendChild(task);
    });
}