const taskManager = new TaskManager(0);
taskManager.load();
taskManager.render();

//Get Date and display Date
let timeDate = document.querySelector('#timeDate')
let showTimeDate = new Date();
let day = showTimeDate.getDate();
let month = showTimeDate.getMonth() + 1;
let year = showTimeDate.getFullYear();
let displayDate = `Date: ${day} / ${month} / ${year}`;
timeDate.innerHTML = displayDate; 

//Disables previous dates
if (day < 10) {
  day = '0' + day;
}

if (month < 10) {
  month = '0' + month;
} 
let today = year + '-' + month + '-' + day;
document.getElementById("newTaskDateInput").setAttribute("min", today)

//Clears errors and inputs on close button
function clearOnClose(){
  newTaskNameInput.value = "";
  newTaskDescriptionInput.value = "";
  newTaskAssignedInput.value = "";
  newTaskDateInput.value = "";
  newTaskStatusInput.value = "Select Status..";

  newTaskNameInput.classList.remove("is-valid");
  newTaskDescriptionInput.classList.remove("is-valid");
  newTaskAssignedInput.classList.remove("is-valid");
  newTaskDateInput.classList.remove("is-valid");
  newTaskStatusInput.classList.remove("is-valid");
  
  newTaskNameInput.classList.remove("is-invalid");
  newTaskDescriptionInput.classList.remove("is-invalid");
  newTaskAssignedInput.classList.remove("is-invalid");
  newTaskDateInput.classList.remove("is-invalid");
  newTaskStatusInput.classList.remove("is-invalid");
};

let closeTaskForm = document.querySelector('#closeButton')
closeTaskForm.addEventListener('click', () => {
  clearOnClose();
});

let addTaskForm = document.querySelector('#addTaskForm')
//Function for checking if the information is valid
function validFormFieldInput(data) {
  let newTaskNameInput = document.querySelector('#newTaskNameInput');
  let newTaskDescriptionInput = document.querySelector('#newTaskDescriptionInput');
  let newTaskAssignedInput = document.querySelector('#newTaskAssignedInput');
  let newTaskDateInput = document.querySelector('#newTaskDateInput');
  let newTaskStatusInput = document.querySelector('#newTaskStatusInput');
  let errorSum = 0;

  function clearForm(){
    newTaskNameInput.value = "";
    newTaskDescriptionInput.value = "";
    newTaskAssignedInput.value = "";
    newTaskDateInput.value = "";
    newTaskStatusInput.value = "To Do";
    newTaskNameInput.classList.remove("is-valid");
    newTaskDescriptionInput.classList.remove("is-valid");
    newTaskAssignedInput.classList.remove("is-valid");
    newTaskDateInput.classList.remove("is-valid");
    newTaskStatusInput.classList.remove("is-valid");
  };

  //Check if name is > 5 characters
  if(newTaskNameInput.value.length > 5){
    newTaskNameInput.classList.add("is-valid");
    newTaskNameInput.classList.remove("is-invalid");
  } else {
    newTaskNameInput.classList.add("is-invalid");
    newTaskNameInput.classList.remove("is-valid"); 
    errorSum += 1;
  }

  //Check if description is > 5 characters
  if(newTaskDescriptionInput.value.length > 5){
    newTaskDescriptionInput.classList.add("is-valid");
    newTaskDescriptionInput.classList.remove("is-invalid");
  } else {
    newTaskDescriptionInput.classList.add("is-invalid");
    newTaskDescriptionInput.classList.remove("is-valid"); 
    errorSum += 1;
  }

  //Check if assigned value is > 5 characters
  if(newTaskAssignedInput.value.length > 5){
    newTaskAssignedInput.classList.add("is-valid");
    newTaskAssignedInput.classList.remove("is-invalid");
  } else {
    newTaskAssignedInput.classList.add("is-invalid");
    newTaskAssignedInput.classList.remove("is-valid"); 
    errorSum += 1; 
  }

  //Check if date is not empty
  if(newTaskDateInput.value){
    newTaskDateInput.classList.add("is-valid");
    newTaskDateInput.classList.remove("is-invalid");
  } else {
    newTaskDateInput.classList.add("is-invalid");
    newTaskDateInput.classList.remove("is-valid"); 
    errorSum += 1;
  }

  //Check if status is not empty
  if(newTaskStatusInput.value !== 'Select Status..'){
    newTaskStatusInput.classList.add("is-valid");
    newTaskStatusInput.classList.remove("is-invalid");
  } else {
    newTaskStatusInput.classList.add("is-invalid");
    newTaskStatusInput.classList.remove("is-valid");  
    errorSum += 1;
  }

  data.preventDefault();
  // console.log("name:  " + newTaskNameInput.value);
  // console.log("description:  " + newTaskDescriptionInput.value);
  // console.log("assigned:  " + newTaskAssignedInput.value);
  // console.log("date:  " + newTaskDateInput.value);
  // console.log("status:  " + newTaskStatusInput.value);

  if (errorSum > 0){
    errorSum = 0
    return;
  }
  else {
    taskManager.addTask(
      newTaskNameInput.value, 
      newTaskDescriptionInput.value, 
      newTaskAssignedInput.value, 
      newTaskDateInput.value, 
      newTaskStatusInput.value
    );
    
    clearForm();
    $('#addtaskModal').modal('hide')
    taskManager.save();
    taskManager.render();
    
  }
}

addTaskForm.addEventListener('submit', validFormFieldInput);

const tasksList = document.querySelector('#taskList')
tasksList.addEventListener('click', (event) => {
  if(event.target.classList.contains("doneButton")) {
    const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    const taskId = Number(parentTask.dataset.taskId);
    const task = taskManager.getTaskById(taskId);
    task.status = "Done";
    taskManager.save();

    taskManager.render();
  }
  if(event.target.classList.contains("deleteButton")){
    const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    const taskId = Number(parentTask.dataset.taskId);
    taskManager.deleteTask(taskId);
    taskManager.save();
    taskManager.render();
  }
});