function createTaskHtml(id, name, description, assignedTo, dueDate, status){
    const html = `
      <li class="card" data-task-id="${id}">
          <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <div>
                  <ul class="list-group">           
                      <li class="list-group-item">
                          <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
                              
                              <span style="font-weight: bold">${status}</span>
                          </div>
                          <div class="d-flex w-100 mb-3 justify-content-between">
                              <small>Assigned To: ${assignedTo}</small>
                              <small>Due: ${dueDate}</small>
                          </div>
                              <p>${description}</p>
                              <p>
                                  <button class="btn btn-success btn-sm doneButton" id="done">DONE</button>
                                  <button class="btn btn-danger btn-sm deleteButton">DELETE</button>
                              </p>
                      </li>
                  </ul>
              </div>                     
          </div>
      </div>
    </li>`
    return html;
  }
  
  class TaskManager {
    constructor(currentId=0){
      this.tasks = [];
      this.currentId = currentId;
    }
  
    addTask(name, description, assignedTo, dueDate, status){
      const task = {
        id: this.currentId++,
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status
      }
      this.tasks.push(task);
    }
  
    deleteTask(taskId){
      const newTasks = [];
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if(task.id !== taskId){
          newTasks.push(task);
        }
        
      }
      this.tasks = newTasks;
    }
      
    getTaskById(taskId){
      let foundTask;
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if (task.id === taskId){
          foundTask = task;
        }
      }
      return foundTask;
    }
  
    save(){
      const tasksJson = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', tasksJson);
      const currentId = JSON.stringify(this.currentId);
      localStorage.setItem('currentId', currentId);
    }
  
    load(){
      if(localStorage.getItem('tasks')){
        const tasksJson = localStorage.getItem('tasks');
        this.tasks = JSON.parse(tasksJson);
      }
      
      if(localStorage.getItem('currentId')){
        const currentId = localStorage.getItem('currentId');
        this.currentId = Number(currentId);
      }
    }
  
    render(){
      let tasksHtmlList = [];
      for (let i = 0; i < this.tasks.length; i++){
        const task = this.tasks[i];
        const date = new Date(task.dueDate);
        const formattedDate = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
        const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);
        tasksHtmlList.push(taskHtml);
      }
      const tasksHtml = tasksHtmlList.join('\n');
  
      const tasksList = document.querySelector('#taskList');
      tasksList.innerHTML = tasksHtml;
    }
    
  }