document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    function addTask(text) {
        const li = document.createElement('li');
        li.innerText = text;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Удалить';
        deleteBtn.addEventListener('click', function () {
            li.remove();
            saveTasks();
        });
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        li.addEventListener('click', function () {
            li.classList.toggle('complete');
            saveTasks();
        });
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(task => ({
            text: task.innerText,
            completed: task.classList.contains('complete')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerText = task.text;
            if (task.completed) {
                li.classList.add('complete');
            }
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Удалить';
            deleteBtn.addEventListener('click', function () {
                li.remove();
                saveTasks();
            });
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
            li.addEventListener('click', function () {
                li.classList.toggle('complete');
                saveTasks();
            });
        });
    }

    loadTasks();

    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
});
