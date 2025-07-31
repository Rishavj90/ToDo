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
    let containsControls = document.createElement(`div`);
    let btnClock = document.createElement(`button`);
    btnClock.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#FFFFFF"><path d="M479.33-81.33q-74.33 0-139.83-28.17-65.5-28.17-114-76.67t-77-114Q120-365.67 120-440.49t28.5-140.17q28.5-65.34 77-114.17 48.5-48.84 114-77Q405-800 479.33-800q74.34 0 139.84 28.17 65.5 28.16 114.33 77 48.83 48.83 77 114.17 28.17 65.35 28.17 140.17T810.5-300.17q-28.17 65.5-77 114T619.17-109.5q-65.5 28.17-139.84 28.17Zm0-358Zm118 163.33L644-322.67 514.67-452v-188H448v214.67L597.33-276Zm-380-590.67L264-820 98-658l-46.67-46.67 166-162Zm524 0 166 162L860.67-658l-166-162 46.66-46.67ZM479.36-148q122.31 0 207.47-85.19Q772-318.39 772-440.7q0-122.3-85.19-207.47-85.2-85.16-207.51-85.16-122.3 0-207.47 85.19-85.16 85.2-85.16 207.5 0 122.31 85.19 207.47Q357.06-148 479.36-148Z"/></svg>`;
    let btnBin = document.createElement(`button`);
    btnBin.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#FFFFFF"><path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>`;

    containsControls.classList.add(`containsControls`);
    btnClock.classList.add(`taskControl`);
    btnBin.classList.add(`taskControl`);
    box.classList.add("Task");
    checkBox.type = "checkbox";
    label.classList.add("myLabel");
    checkBox.classList.add("myCheckbox");

    label.innerText = task;
    containsControls.append(btnClock,btnBin);
    box.append(checkBox,label,containsControls);
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
