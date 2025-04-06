document.getElementById("add-button").addEventListener("click", function() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Bitte gib eine Aufgabe ein!");
        return;
    }

    const taskList = document.getElementById("task-list");

    const listItem = document.createElement("li");

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;
    listItem.appendChild(taskContent);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function() {
        taskList.removeChild(listItem);
        saveTasksToLocalStorage(); 
    });
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    taskInput.value = "";

    saveTasksToLocalStorage(); 
});


function saveTasksToLocalStorage() {
    const taskList = document.getElementById("task-list");
    const tasks = [];


    taskList.querySelectorAll("li").forEach(function(taskItem) {
        const taskContent = taskItem.querySelector("span").textContent;
        tasks.push(taskContent);
    });

 
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const taskList = document.getElementById("task-list");
    tasks.forEach(function(taskText) {
        const listItem = document.createElement("li");

        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;
        listItem.appendChild(taskContent);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function() {
            taskList.removeChild(listItem);
            saveTasksToLocalStorage();
        });
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}


window.addEventListener("load", loadTasksFromLocalStorage);
