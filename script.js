let AllMyTasks = {};
let taskCount = 0; 
let isSubTask = false;

class Task{
    constructor(str){
        this.task = str,
        this.done = false;
        this.date = null,
        this.dayArr = new Array(7).fill(false),
        this.TotalsubTask = null,
        this.DoneSubTask = null,
        this.parentTask = null
    }

    addTask(task,ind){
        let index = document.createElement(`div`);
        index.innerText = `${ind}`;
        index.style.display = `none`;

        let body = document.querySelector(`#TodayTask`);
        let BigTaskBox = document.createElement(`div`);
        let ContainsTaskAndControls = document.createElement(`div`);
        let containsSubTask = document.createElement(`div`);
        containsSubTask.classList.add(`containsSubTask`);

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
        ScheduleTime.innerHTML= `<svg id="ScheduleTime" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360Zm112 168 56-56-128-128v-184h-80v216l152 152ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z"/></svg>`;
        let subTaskIcon = document.createElement(`div`);
        subTaskIcon.innerHTML = `<svg id="subTaskIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z"/></svg>`;
        let binIcon = document.createElement(`div`);
        binIcon.innerHTML = `<svg id="binIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

        otherBtns.append(subTaskIcon,ScheduleTime,binIcon);
        otherBtns.classList.add(`otherBtns`);
        containsDueTime.append(dueTimeIcon,time);
        containsDueTime.classList.add(`containsDueTime`);
        containsControls.append(containsDueTime,otherBtns);
        containsControls.classList.add(`containsControls`);
        ContainsTaskAndControls.append(myTask,containsControls);
        ContainsTaskAndControls.classList.add(`ContainsTaskAndControls`);
        BigTaskBox.append(index, ContainsTaskAndControls,containsSubTask)
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

    addLabelOnTextBox(thetask){
        this.parentTask = document.createElement(`div`);
        let num = parseInt(thetask.childNodes[0].innerText);
        this.parentTask.innerText = (AllMyTasks[num].task.length > 20) ? (AllMyTasks[num].task.slice(0,20) + "...") : AllMyTasks[num].task;
        this.parentTask.id = `parentTask`;
        document.querySelector(`.inputBox`).prepend(this.parentTask);
    }

    addSubTask(thetask){
        let str = document.querySelector(`#input`).value.trim();
        let theSubTask = document.createElement(`div`);
        theSubTask.classList.add(`theSubTask`);
        let strSubTask = document.createElement(`div`);
        strSubTask.classList.add(`theTask`)
        strSubTask.innerText = str;
        let myCheckBox = document.createElement(`input`);
        myCheckBox.type = `checkbox`;
        myCheckBox.classList.add(`myCheckbox`);
        theSubTask.append(myCheckBox, strSubTask);
        thetask.childNodes[2].prepend(theSubTask);
        this.parentTask.remove()
    }


    giveTime(){
        let mydate = document.querySelector(`#date`).value; 
        let mymonth = document.querySelector(`#month`).value-1;
        let myyear = document.querySelector(`#year`).value;
        let myhour = document.querySelector(`#hour`).value
        let mymin = document.querySelector(`#minute`).value;

        mydate = parseInt(mydate);
        mymonth = parseInt(mymonth);
        myyear = parseInt(myyear);
        myhour = parseInt(myhour);
        mymin = parseInt(mymin);

        if(myhour == 12 && CheckedMeridian[0] == true ){ //check if it is 12am
            myhour = 0;
        }
        else if(myhour < 12 && CheckedMeridian[1] == true){ //it is pm
            myhour+=12;
        }

        let newDate = new Date(myyear, mymonth, mydate, myhour, mymin);
        this.date = newDate;  
    }

    repeatingTime(){
        let dateToday = new Date(this.date);  
        const myday = dateToday.getDay(); 
        let days = 0;
        let lessTime = 100;
        for(let i = 0; i < this.dayArr.length; i++){
            if(this.dayArr[i] == true){
                if(myday <= i) days = i-myday;
                else days = 7-myday+i;
                lessTime = Math.min(lessTime,days);
            }
        }
        if(lessTime != 100)dateToday.setDate(dateToday.getDate()+lessTime);
        this.date = dateToday;  
    }


}

function coverFuncToAddTask(){
    let task = document.querySelector(`#input`).value.trim();
    if(!task)return;
    let a = new Task(task);
    AllMyTasks[taskCount] = a;
    a.addTask(task,taskCount);
    taskCount++;
    
}

document.querySelector(`#submit`).addEventListener(`click`, coverFuncToAddTask)
document.addEventListener("keydown", event=>{
    if(event.key == "Enter"){
        coverFuncToAddTask();
    }
});

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

function ThsVisibleBox(){
let tags = document.querySelectorAll(`.Tags`);
let DiffTaskContainers = document.querySelectorAll(`.ContainsTasks`);
tags = Array.from(tags);
let checkedTag = Array(3).fill(false);
checkedTag[0]= true;
visibleTaskBox();
for(let i = 0; i< 3; i++){
    tags[i].addEventListener(`click`,()=>{
        for(let j = 0; j< 3; j++){
            if(j == i){
                checkedTag[j] = true;
            }else{
                checkedTag[j] = false;
            }
        }
        visibleTaskBox();
    })
}

function visibleTaskBox(){
    for(let j = 0; j< 3; j++){
        if(checkedTag[j] == true){
            tags[j].style.backgroundColor = `pink`;
            tags[j].style.color = `black`;
            DiffTaskContainers[j].style.display = `block`;
        }else{
            tags[j].style.backgroundColor = `rgb(46, 43, 44)`;
            tags[j].style.color = `white`;
            DiffTaskContainers[j].style.display = `none`;
        }
    }
}

}
ThsVisibleBox()


//coloring options for meridians
let TheMeridian = document.querySelectorAll(`.Meridian`);
TheMeridian = Array.from(TheMeridian);
let CheckedMeridian = Array(2).fill(false);

for(let i = 0; i < 2; i++){
    TheMeridian[i].addEventListener(`click`, ()=>{
        toggleMeridian(i);
        for(let i = 0; i < 2; i++){
            if(CheckedMeridian[i] == false){
                TheMeridian[i].style.backgroundColor = `rgb(34, 34, 34)`;
                TheMeridian[i].style.color = `white`;
            }else{
                TheMeridian[i].style.backgroundColor = `pink`;
                TheMeridian[i].style.color = `black`;
            }
        }
    })
}


function toggleMeridian(a){
    if(a == 0){
        document.querySelector(`#am`).style.backgroundColor = `pink`;
        document.querySelector(`#am`).style.color = `black`;
        CheckedMeridian[0] = true;
        CheckedMeridian[1] = false;
    }else{
        document.querySelector(`#pm`).style.backgroundColor = `pink`;
        document.querySelector(`#pm`).style.color = `black`;
        CheckedMeridian[0] = false;
        CheckedMeridian[1] = true;
    }
}

function fillerTime(taskObj, TheDays, CheckedDay){
    let mydate = new Date();
    if(taskObj.date != null){
        mydate = taskObj.date;
    }
    
    document.querySelector(`#date`).value = mydate.getDate();
    document.querySelector(`#month`).value = mydate.getMonth()+1;
    document.querySelector(`#year`).value = mydate.getFullYear();
    document.querySelector(`#minute`).value = mydate.getMinutes();

    let hrs = mydate.getHours();
    if(hrs >= 12){
        hrs = hrs-12;
        if(hrs == 0)hrs=12;
        toggleMeridian(1);
    }else{
        toggleMeridian(0);
    }
    
    document.querySelector(`#hour`).value = hrs;

    const n = TheDays.length;
    for(let i = 0; i < n; i++){
        if(CheckedDay[i] == true){
            TheDays[i].style.backgroundColor = `pink`;
            TheDays[i].style.color = `black`;
        }else{
            TheDays[i].style.backgroundColor = `rgb(34, 34, 34)`;
            TheDays[i].style.color = `white`;
        }
    }
}

let num = 0;
let thetask = null;
let TheDays = document.querySelectorAll(`.Day`);
let CheckedDay;
let ContainTask = document.querySelectorAll(`.ContainsTasks`);
ContainTask.forEach(ele=>{
    ele.addEventListener(`click`, e =>{
        thetask = e.target.closest(".BigTaskBox")
        num = parseInt(thetask.childNodes[0].innerText);

        if(e.target.id == `ScheduleTime`){
            document.querySelector(`.TimeBox`).style.display = `block`;
            CheckedDay = [...AllMyTasks[num].dayArr];
            CheckedMeridian = Array(2).fill(false);
            TheMeridian.forEach(i =>{
                i.style.backgroundColor = `rgb(34, 34, 34)`;
                i.style.color = `white`;
            })
            fillerTime(AllMyTasks[num], TheDays, CheckedDay);
        }

        if(e.target.id == `binIcon`){
            thetask.remove();
            delete AllMyTasks[num];
        }

        if(e.target.id == `subTaskIcon`){
            AllMyTasks[num].addLabelOnTextBox(thetask)
            function wrapper(){
                AllMyTasks[num].addSubTask(thetask)
            }
            
            if(isSubTask){
                document.querySelector(`#submit`).removeEventListener(`click`, coverFuncToAddTask);
                document.querySelector(`#submit`).addEventListener(`click`, wrapper)
                isSubTask = !isSubTask;
        
            }
            
        }

    })

})
const n = TheDays.length;
for(let i = 0; i < n; i++){
    const wrapperFunc = ()=>{
        if(CheckedDay[i] === false){
            TheDays[i].style.backgroundColor = `pink`;
            TheDays[i].style.color = `black`;
            CheckedDay[i] = true;
            
        }else{
            TheDays[i].style.backgroundColor = `rgb(34, 34, 34)`;
            TheDays[i].style.color = `white`;
            CheckedDay[i] = false;
        }
    }
    TheDays[i].addEventListener(`click`, wrapperFunc)
}

document.querySelector(`#CloseBtn`).addEventListener("click",()=>{
    document.querySelector(`.TimeBox`).style.display = `none`;
    AllMyTasks[num].dayArr = CheckedDay;
    AllMyTasks[num].giveTime();
    AllMyTasks[num].repeatingTime();
    
    let a = new Date();
    let theDate = AllMyTasks[num].date;
    if(parseInt(theDate.getDate()) != parseInt(a.getDate())){
        document.querySelector(`#ScheduleTaskBox`).prepend(thetask);
    }
    let theChild = thetask.childNodes[1].childNodes[1].childNodes[0].childNodes;
    // childNodes[0] == the hourglass svg, [1] = `time`
    updateTimer(theChild[1],num);
})

function updateTimer(theChild, num){
    let startTimer = setInterval(() => {
        let now = new Date();
        let diffInMilliseconds = AllMyTasks[num].date - now;
        if(diffInMilliseconds < 0){
            AllMyTasks[num].repeatingTime();
            diffInMilliseconds = AllMyTasks[num].date - now;
        }
        if(AllMyTasks[num].done){
            clearInterval(startTimer);
        }
        const oneSecondInMs = 1000;
        const oneMinuteInMs = oneSecondInMs * 60;
        const oneHourInMs = oneMinuteInMs * 60;
        const oneDayInMs = oneHourInMs * 24;

        const diffInSeconds = Math.floor((diffInMilliseconds / oneSecondInMs)%60) ;
        const diffInMinutes = Math.floor((diffInMilliseconds / oneMinuteInMs)%60);
        const diffInHours = Math.floor((diffInMilliseconds / oneHourInMs)%24);
        const diffInDays = Math.floor(diffInMilliseconds / oneDayInMs);
        theChild.innerText = `${diffInDays} days, ${diffInHours} hours, ${diffInMinutes} mins, ${diffInSeconds} sec`;
    }, 1000);
}

document.querySelector(`#TodayTask`).addEventListener(`click`, e =>{
    if(e.target.type == `checkbox` && e.target.checked){
        doneTask(e.target);
    }
})
function doneTask(a){
    let task = a.closest(".BigTaskBox");
    let num = parseInt(thetask.childNodes[0].innerText);
    AllMyTasks[num].done = true;
    task.classList.toggle("donetask");
    task.children[1].children[0].children[1].classList.toggle(`doneLabel`)
    document.querySelector(`#DoneTask`).prepend(task);
}
document.querySelector(`#DoneTask`).addEventListener(`click`, e =>{
    if(e.target.type == `checkbox` && !e.target.checked){
        backToTasks(e.target);
    }
})

function backToTasks(a){
    let task = a.closest(".BigTaskBox");
    let num = parseInt(thetask.childNodes[0].innerText);
    AllMyTasks[num].done = false;
    task.classList.toggle("donetask");
    task.children[1].children[0].children[1].classList.toggle(`doneLabel`)
    document.querySelector(`#TodayTask`).prepend(task);
}


