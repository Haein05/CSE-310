const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(event) {
    if (event.target.tagName === 'LI') {
        toggleTaskCompletion(event.target);
    } else if (event.target.tagName === 'SPAN') {
        deleteTask(event.target.parentElement);
    }
});

function toggleTaskCompletion(taskItem) {
    // Toggle 'checked' class and directly call saveData()
    taskItem.classList.toggle("checked") && saveData();
}

function removeAllTasks() {
    // Confirm before removing all tasks
    if (confirm("Are you sure you want to remove all tasks?")) {
        while (listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild);
        }
        saveData(); // Update localStorage after removing tasks
    }
}

function saveData() {
    localStorage.setItem("data", listContainer.hasChildNodes() ? JSON.stringify(listContainer.innerHTML) : "[]");
}

function saveData() {
    const listContainer = document.getElementById("list-container");
    localStorage.setItem("data", listContainer.innerHTML);
}

document.getElementById('removeAllBtn').addEventListener('click', removeAllTasks);

function deleteTask(taskItem) {
    taskItem.remove();
    saveData();
}

function saveData() {
    if (!listContainer.hasChildNodes()) {
        // If there are no tasks, store an empty array or a null value
        localStorage.setItem("data", JSON.stringify([]));  // Using JSON to maintain data format consistency
    } else {
        // Store the tasks as an array of objects if you are storing task details beyond just HTML
        const tasks = Array.from(listContainer.querySelectorAll('li')).map(li => ({
            text: li.textContent.replace("\u00D7", "").trim(), // Assuming "\u00D7" is your delete button text
            completed: li.classList.contains("checked")
        }));
        localStorage.setItem("data", JSON.stringify(tasks));
    }
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem("data") || "[]"); // Ensures an empty array if null
    listContainer.innerHTML = ''; // Clear existing tasks
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.text; // Setting text content safely
        if (task.completed) {
            taskItem.classList.add("checked");
        }
        const closeButton = document.createElement("span");
        closeButton.textContent = "\u00D7";
        taskItem.appendChild(closeButton);
        listContainer.appendChild(taskItem);
    });
}
showTask();

class TaskManager {
    constructor(listContainer) {
        this.tasks = new Map();
        this.listContainer = document.getElementById("list-container");
        this.loadTasks();
    }

    countCompletedTasks() {
        const taskItems = this.listContainer.querySelectorAll('li');
        let completedCount = 0;
        taskItems.forEach(taskItem => {
            if (taskItem.classList.contains("checked")) {
                completedCount++;
            }
        });
        alert("Number of completed tasks: " + completedCount);
    }
}


