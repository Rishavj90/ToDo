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
    let BigTaskBox = document.createElement(`div`);
    let ContainsTaskAndControls = document.createElement(`div`);
    let containsSubTask = document.createElement(`div`);

    let myTask = document.createElement(`div`);
    let myCheckBox = document.createElement(`input`);
    myCheckBox.type = `checkbox`;
    let theTask = document.createElement(`div`);
    theTask.innerText = task;
    myTask.prepend(myCheckBox, theTask);
    myTask.classList.add(`myTask`);
    myCheckBox.classList.add(`myCheckbox`);
    theTask.classList.add(`theTask`);

    let containsControls=  document.createElement(`div`);
    let containsDueTime=  document.createElement(`div`);
    let dueTimeIcon = document.createElement(`div`);
    dueTimeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-520q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z"/></svg>`;
    let time = document.createElement(`div`);
    time.innerText = `time`;

    let otherBtns = document.createElement(`div`);
    let ScheduleTime = document.createElement(`div`);
    ScheduleTime.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360Zm112 168 56-56-128-128v-184h-80v216l152 152ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z"/></svg>`;
    let subTaskIcon = document.createElement(`div`);
    subTaskIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z"/></svg>`;
    let binIcon = document.createElement(`div`);
    binIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

    otherBtns.append(subTaskIcon,ScheduleTime,binIcon);
    otherBtns.classList.add(`otherBtns`);
    containsDueTime.append(dueTimeIcon,time);
    containsDueTime.classList.add(`containsDueTime`);
    containsControls.append(containsDueTime,otherBtns);
    containsControls.classList.add(`containsControls`);
    ContainsTaskAndControls.append(myTask,containsControls);
    ContainsTaskAndControls.classList.add(`ContainsTaskAndControls`);
    BigTaskBox.append(ContainsTaskAndControls,containsSubTask)
    BigTaskBox.classList.add(`BigTaskBox`);
    body.prepend(BigTaskBox);

    BigTaskBox.addEventListener(`mouseover`,()=>{
        containsControls.style.display = `block`;
    })
    BigTaskBox.addEventListener(`mouseout`,()=>{
        containsControls.style.display = `none`;
    })

    document.querySelector(`#input`).value = "";
    document.querySelector(`#input`).style.height = 'auto';
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

document.querySelector(`.ContainsTasks`).addEventListener(`mouseover`,()=>{
    let MyTasks = [...document.querySelectorAll(`.Task`)];
    MyTasks.forEach(i=>{
        i.addEventListener(`mouseover`,()=>{
            let parts = [...i.children];
            parts[2].style.display = `flex`;
            console.log(parts[2]);
        })
        i.addEventListener(`mouseout`,()=>{
            let parts = [...i.children];
            parts[2].style.display = `none`;
            console.log(parts[2]);
        })
    })
})

document.querySelector(`.ContainsTasks`).addEventListener(`mouseout`, ()=>{
    let myOptions = document.querySelector(`.containsControls`);
    document.querySelector(`.taskControlsContainer`).append(myOptions);
    myOptions.style.display = `none`;
})
