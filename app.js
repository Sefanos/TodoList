//selectors
const todoinput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click', DeleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions

function addTodo(event)
{
//prevent form from submitting

event.preventDefault();

//Todo Div
const TodoDiv = document.createElement("div");
TodoDiv.classList.add("todo");

//Creat Li
const newTodo = document.createElement("li");
newTodo.innerText = todoinput.value ;
TodoDiv.classList.add("todo-item");
TodoDiv.appendChild(newTodo);

//ADD TODO TO LOCAL
saveLocalTodos(todoinput.value);

// CHECK MARK BUTTON
const completedButton = document.createElement("button");
completedButton.innerHTML = '<i class="fas fa-check"></i>'
completedButton.classList.add("completed-btn");
TodoDiv.appendChild(completedButton);

// TRASH MARK BUTTON
const TrashButton = document.createElement("button");
TrashButton.innerHTML = '<i class="fas fa-trash"></i>'
TrashButton.classList.add("trash-btn");
TodoDiv.appendChild(TrashButton);

//APPREND TO LIST
todoList.appendChild(TodoDiv);

//CLEAR TODOINPUT VALUE
todoinput.value="";

}

function DeleteCheck(e)
{
const item = e.target ;

//DELETE 
if(item.classList[0] === 'trash-btn'){
    const todo = item.parentElement;

    //ANIMATION

    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend' , ()=>{
        todo.remove();
    })
}

//Checked
if(item.classList[0] === 'completed-btn'){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
}

}

function filterTodo(e) 
{
 const todos = todoList.childNodes ;
 todos.forEach((todo)=>{
     switch(e.target.value){
         case "all" :
             todo.style.display = 'flex' ;
             break ;
         case "completed" :
             if(todo.classList.contains('completed')){
                 todo.style.display ='flex' ;
             }else{
                 todo.style.display = "none";
             }
             break ;
         case "uncompleted" :
             if(!todo.classList.contains('completed')){
                 todo.style.display ='flex' ;
             }else{
                 todo.style.display = "none";
             }
             break ;
     }
 })
}

function saveLocalTodos(todo) {
    //CHECK if there is todos !
    let todos 
    if (localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos()
{ 
  //CHECK if there is todos !
      let todos ;
      if (localStorage.getItem("todos")===null){
          todos = [];
      }else{
          todos = JSON.parse(localStorage.getItem("todos"));
      }
    todos.forEach((todo)=>{
        //Todo Div
                const TodoDiv = document.createElement("div");
                TodoDiv.classList.add("todo");

                //Creat Li
                const newTodo = document.createElement("li");
                newTodo.innerText = todo ;
                TodoDiv.classList.add("todo-item");
                TodoDiv.appendChild(newTodo);

                // CHECK MARK BUTTON
                const completedButton = document.createElement("button");
                completedButton.innerHTML = '<i class="fas fa-check"></i>'
                completedButton.classList.add("completed-btn");
                TodoDiv.appendChild(completedButton);

                // TRASH MARK BUTTON
                const TrashButton = document.createElement("button");
                TrashButton.innerHTML = '<i class="fas fa-trash"></i>'
                TrashButton.classList.add("trash-btn");
                TodoDiv.appendChild(TrashButton);

                //APPREND TO LIST
                todoList.appendChild(TodoDiv);
    });
}

function removeLocalTodos(todo){
    let todos 
    if (localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
  const todoIndex = todo.children[0].innerText ;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos" , JSON.stringify(todos));
}