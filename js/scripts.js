// business logic for TaskList------
function TaskList() {
  this.tasks = {};
  this.currentId = 0;
}

TaskList.prototype.addTask = function (task) {
  task.id = this.assignId();
  this.tasks[task.id] = task;
};

TaskList.prototype.assignId = function () {
  this.currentId++;
  return this.currentId;
};

TaskList.prototype.findTask = function (id) {
  if (this.tasks[id] != undefined) {
    return this.tasks[id];
  }
  return false;
};

TaskList.prototype.deleteTask = function (id) {
  if (this.tasks[id] === undefined) {
    return false;
  }
  delete this.tasks[id];
  return true;
};

// business logic for tasks
function Task (taskName, description, dueDate) {
  this.taskName = taskName;
  this.description = description;
  this.dueDate = dueDate;
}

// UI logic ------------
let taskList = new TaskList();
let usedTask = [];
console.log(taskList);
console.log(usedTask);

function displayTaskDetails (taskListToDisplay) {
  let taskList = $('ul#taskList');
  let htmlForTask = '';
  Object.keys(taskListToDisplay.tasks).forEach(function(key) {
    const task = taskListToDisplay.findTask(key);
    if (!usedTask.includes(`${task.id}`)) {
      htmlForTask += `<li id = ${task.id}>${task.taskName}</li>`
    } else {
      htmlForTask += `<li id = ${task.id} class='done'>${task.taskName}</li>`
    }
    
  });
  taskList.html(htmlForTask);
  
}

function showTask (taskId) {
  const task = taskList.findTask(taskId);
  if (!usedTask.includes(`${taskId}`)) {
    $('#show-tasks').show();
    $('.taskName').html(`<span class='${task.id}'>${task.taskName}</span>`);
    $('.description').html(`<span class='${task.id}'>${task.description}</span>`);
    $('.dueDate').html(`<span class='${task.id}'>${task.dueDate}</span>`);
    let buttons = $('#buttons');
    buttons.empty();
    buttons.append(`<button class='deleteButton' id='${task.id}'>Delete</button>`)
    buttons.append(`<button class='finishTask' id='${task.id}'>Done</button>`)
  } else {
    $('#show-tasks').show();
    $('.taskName').html(`<span class='${task.id} done'>${task.taskName}</span>`);
    $('.description').html(`<span class='${task.id} done'>${task.description}</span>`);
    $('.dueDate').html(`<span class='${task.id} done'>${task.dueDate}</span>`);
    let buttons = $('#buttons');
    buttons.empty();
    buttons.append(`<button class='deleteButton' id='${task.id}'>Delete</button>`);
    buttons.append(`<button class='finishTask' id='${task.id}'>Done</button>`);
  }
  
}

function attachTaskListeners() {
  $('ul#taskList').on('click', 'li', function() {
    showTask(this.id);
  });
  $('#buttons').on('click', '.deleteButton', function() {
    taskList.deleteTask(this.id);
    $('#show-tasks').hide();
    displayTaskDetails(taskList);
  });
  $('#buttons').on('click', '.finishTask', function() {
    $(`.${this.id}`).addClass('done');
    $(`#${this.id}`).addClass('done');
    usedTask.push(`${this.id}`);
  });
}

$(document).ready(function() {
  attachTaskListeners();
  $('form#new-task').submit(function(event) {
    event.preventDefault();
    let taskInput = $('input#taskName').val();
    let descriptionInput = $('textarea#description').val();
    let dueDateInput = $('input#dueDate').val();
    let newTask = new Task(taskInput, descriptionInput, dueDateInput);
    taskList.addTask(newTask);
    // console.log(newTask);
    displayTaskDetails(taskList);
  })
})