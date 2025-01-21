const todoinput = document.getElementById("todoinput");
const todobutton = document.getElementById("todobutton");
const todolist = document.getElementById("todolist");

todobutton.addEventListener("click",addtodo);
todoinput.addEventListener("keypress",function(e){
    if (e.key ==="Enter"){
        addtodo();
    }
});

function addtodo(){
    const addtext = todoinput.value.trim();
    if (addtext !== "" ){
        const li  = document.createElement("li");
        li.textContent = addtext;
        todolist.appendChild(li);
        todoinput.value = "";
    }
}