const box = document.querySelector(`#input`)
box.addEventListener(`input`,()=>resizeBox(box));
box.addEventListener(`paste`,()=>resizeBox(box));
function resizeBox(box){ 
    if(box.scrollHeight > 300){
        box.style.height = `300px`;
        box.style.overflow = `visible`;
    }else{
        box.style.height = 'auto';
        box.style.height = box.scrollHeight+`px`;
    }
}

document.querySelector(`#submit`).addEventListener("click", ()=>addTask());
document.addEventListener("keydown", event=>{
    if(event.key == "Enter")addTask();
});



function addTask(){
    let task = document.querySelector(`#input`).value.trim();
    if(!task)return;

    let body = document.querySelector(`.ContainsTasks`);
    let checkBox = document.createElement(`input`);
    let box = document.createElement(`div`);
    let label = document.createElement(`div`);

    box.classList.add("Task");
    checkBox.type = "checkbox";
    label.classList.add("myLabel");
    checkBox.classList.add("myCheckbox");

    label.innerText = task;
    box.append(checkBox,label);
    body.prepend(box);
    document.querySelector(`#input`).value = "";
}


document.querySelector(`.ContainsTasks`).addEventListener("click", event=>{
    if(event.target.checked){
        doneTask(event.target);
    }
});
function doneTask(a){
    let label = a.nextElementSibling;
    let box = a.parentElement;
    
    let doneBox = document.querySelector(`.ContainsDoneTasks`)
   
    label.classList.toggle(`myLabel`);
    label.classList.toggle(`doneLabel`);
    box.classList.toggle(`Task`);
    box.classList.toggle(`donetask`);

    doneBox.prepend(box);
}

document.querySelector(`.ContainsDoneTasks`).addEventListener("click", event=>{
    if(!event.target.checked){
        backToTasks(event.target);
    }
});
function backToTasks(a){
    let label = a.nextElementSibling;
    let box = a.parentElement;
    
    let doneBox = document.querySelector(`.ContainsTasks`)
   
    label.classList.toggle(`myLabel`);
    label.classList.toggle(`doneLabel`);
    box.classList.toggle(`Task`);
    box.classList.toggle(`donetask`);

    doneBox.prepend(box);
}

document.querySelector(`.ContainsTasks`).addEventListener(`mouseover`, ()=>{
    let myOptions = document.querySelector(`.containsControls`);
    let task_arr = document.querySelectorAll(`.Task`);
    task_arr.forEach(function(i){
    i.addEventListener(`mouseover`, ()=>{
        i.append(myOptions);
        myOptions.style.display = `flex`;
    })
    i.addEventListener(`mouseout`, ()=>{
        document.querySelector(`.taskControlsContainer`).append(myOptions);
        myOptions.style.display = `none`;
    })
})
})
