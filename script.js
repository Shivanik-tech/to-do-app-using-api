let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');
function askToDOM(task){
    const li=document.createElement('li');
    li.innerHTML=`
   
    <input type="checkbox" id="${task.id}" 
    "${task.done ? 'checked ':''}" 
    class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    
  <img src="./imges/bin.svg" class="delete" data-id="${task.id}" />
  `;
  tasksList.append(li);
}
function renderList () {
   tasksList.innerHTML='';
      for(let i=0;i<tasks.length;i++){
      askToDOM(tasks[i])
      }
}
///left to do here:for now it is copied
function markTaskAsComplete (taskId) {
   
   const completedTask = tasksArray.filter(function (individualTask) {
    return individualTask.id === Number(taskId);
});

if (completedTask.length > 0) {
    if (completedTask[0].completed == false) {
        showNotification("Task completed");
    } else {
        showNotification("Task not completed");
    }
    completedTask[0].completed = !completedTask[0].completed;
    renderList();
    return;
}

showNotification("Task not found");


}

function ToggleTask (taskId) {
    const newTask=tasks.filter(function(task){
        return taskId==task
    })
    if(task.length >0){
        currentTask=task[0];
        currentTask.done=!currentTask.done;
        renderList()
        showNotification("Task togglled")
        return;

    }
    showNotification("Could not toggle")
}

function deleteTask (taskId) {
    const newTask=tasks.filter(function(task){
        return task.id!==taskId;
    })
    
    
    tasks=newTask;
    renderList();
    showNotification("task deleted successfully")
}

function addTask (task) {
    if(task){
        tasks.push(task)
        console.log(task.text)
        renderList()
        showNotification("task added successfully")
        return;
    }
    showNotification("task cannot be added")
}

function showNotification(text) {
    alert(text)
}
function handleInputKeypress(e){
    if(e.key=='Enter'){
        const text=e.target.value;


    
    if(!text){
        showNotification("Task not added");
        return;
    }
    const task={
        text:text,
        id:Date.now().toString(),
        done:false
    }
    e.target.value='';
    addTask(task)

    }
}

//event delegation
function handleclickListener(e){
    const target=e.target;
    if(target.className==='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId)
        return
    }
    else if(target.className==='custom-checkbox'){
        const taskId=target.id;
        ToggleTask(taskId)
        return

    }
}
function initializeApp(){
addTaskInput.addEventListener('keyup',handleInputKeypress);
document.addEventListener('click',handleclickListener);
}
initializeApp();