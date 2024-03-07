

const form = document.querySelector("#todoAddForm");
const inputAdd = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const clearBtn = document.querySelector("#clearBtn");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filterInput = document.querySelector("#todoName2");


let todos = [];

runEvents();
function runEvents(){
    form.addEventListener('submit', addTodo);
    document.addEventListener("DOMContentLoaded", pageLoad);
    secondCardBody.addEventListener("click", removeTodoUI);
    clearBtn.addEventListener('click', removeAllLi);
    filterInput.addEventListener('keyup', filter);
}


function filter(e){
const filterValue = e.target.value.toLowerCase().trim();
const todoSiyahisi = document.querySelectorAll(".list-group-item");

if(todoSiyahisi.length>0){
todoSiyahisi.forEach(function(todo){
    if(todo.textContent.toLowerCase().trim().includes(filterValue)){
        todo.setAttribute("style", "display: block");
    }else{
        todo.setAttribute("style", "display: none !important");
    }
})
}else{
    showAlert("warning","siyahi bosdur")
}
}

function removeAllLi(){
    const todoLiAll = document.querySelectorAll('.list-group-item');
    if(todoLiAll.length>0){
todoLiAll.forEach(function(todo){
todo.remove()
});

todos=[];
    localStorage.setItem("todos",JSON.stringify(todos));
    showAlert("success", 'ugurla silindi')
    }

    else{
        showAlert("warning", 'sile bilmek ucun element yoxdur');
    }
}

function removeTodoUI(e){
if(e.target.className== 'fa fa-solid fa-xmark'){
   const todo = e.target.parentElement.parentElement;
    todo.remove()

    removeTodoToStorage(todo.textContent);
    showAlert('danger', 'todo silindi')
}
}

function removeTodoToStorage(removeTodo){
checkTodoFromStorage();
todos.forEach(function(todo, index){
    if(removeTodo===todo){
        todos.splice(index,1)
    }
});
localStorage.setItem("todos", JSON.stringify(todos))
}

function pageLoad(){
    checkTodoFromStorage();

    todos.forEach(function(todo1) {
         addTodoToUI(todo1);
    });
}

function addTodo(e){
    e.preventDefault();
    const inputText = inputAdd.value.trim(); 
    if(inputText==null || inputText==""){
        showAlert('danger', 'todo elave edin')
    }else{
        addTodoToUI(inputText);
        todoToStorage(inputText);
        showAlert('secondary', 'todo elave edildi')
    }

}


function addTodoToUI(newTodo){
    /*
<li class="list-group-item d-flex justify-content-between">
    <a href="#" class="delete-item">
        <i class="fa-solid fa-xmark"></i>
    </a>
    <img src="" id="profile_pic">
</li>
*/
const li = document.createElement("li");
li.className = "list-group-item d-flex justify-content-between";
li.textContent = newTodo;



const a = document.createElement("a");
a.href = "#";
a.className = "btn delete-item";

const i = document.createElement("i");
i.className = "fa fa-solid fa-xmark";
a.appendChild(i);
li.appendChild(a);
todoList.appendChild(li);

inputAdd.value = '';

}

function todoToStorage(newTodo){
    checkTodoFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodoFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}


function showAlert(type, message){
    /*
<div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div>*/

const div = document.createElement("div");
div.className = `alert alert-${type}`;
div.textContent = message;

firstCardBody.appendChild(div)

setTimeout(() =>[
div.remove()
], 3000)
}




