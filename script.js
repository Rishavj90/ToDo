const AllMyTasks = Array();
class Task{
    constructor(str){
        this.task = str,
        this.done = false;
        this.timeSet = false,
        this.date = new Date(),
        this.dayArr = Array(7).fill(false),
        this.timeLeft = null,
        this.TotalsubTask = null,
        this.DoneSubTask = null
    }

    addTask(task,ind){
        let index = document.createElement(`div`);
        index.innerText = `${ind}`;
        index.style.display = `none`;

        let body = document.querySelector(`#TodayTask`);
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
        
        ScheduleTime.innerHTML= `<svg id="ScheduleTime" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360Zm112 168 56-56-128-128v-184h-80v216l152 152ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z"/></svg>`;
        let subTaskIcon = document.createElement(`div`);
        subTaskIcon.id = `subTaskIcon`;
        subTaskIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z"/></svg>`;
        let binIcon = document.createElement(`div`);
        binIcon.id = `binIcon`;
        binIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

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

    giveTime(){
        this.timeSet = true;
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
        if(isNaN(newDate)){
            window.alert(`Invalid Date`);
        }
        this.date = newDate;
        return newDate;   
    }

    repeatingTime(){
        let dateToday = this.date;
        const myday = dateToday.getDay(); 
        let days = 0;
        let lessTime = 30;
        this.dayArr.forEach(element => {
            if(element == true){
                if(myday <= i) days = i-myday;
                else days = 7-myday+i;
                lessTime = Math.min(lessTime,days);
            }
        });
        dateToday.setDate(dateToday.getDate()+lessTime);
        this.date = dateToday;
        return dateToday;
    }


}

function coverFuncToAddTask(){
    let task = document.querySelector(`#input`).value.trim();
    if(!task)return;
    let a = new Task(task);
    AllMyTasks.push(a);
    a.addTask(task,AllMyTasks.indexOf(a));
}

document.querySelector(`#submit`).addEventListener("click", ()=>coverFuncToAddTask());
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
        CheckedMeridian[0] = true;
        CheckedMeridian[1] = false;
    }else{
        CheckedMeridian[0] = false;
        CheckedMeridian[1] = true;
    }
}

function fillerTime(){
    let mydate = new Date();
    document.querySelector(`#date`).value = mydate.getDate();
    document.querySelector(`#month`).value = mydate.getMonth()+1;
    document.querySelector(`#year`).value = mydate.getFullYear();
    document.querySelector(`#minute`).value = mydate.getMinutes();

    let hrs = mydate.getHours();
    if(hrs >= 12){
        hrs /=12;
        document.querySelector(`#pm`).style.backgroundColor = `pink`;
        document.querySelector(`#pm`).style.color = `black`;
        toggleMeridian(1);
    }else{
        document.querySelector(`#am`).style.backgroundColor = `pink`;
        document.querySelector(`#am`).style.color = `black`;
        toggleMeridian(0);
    }
    if(hrs == 0){
        document.querySelector(`#hour`).value = 12;
    }else{
        document.querySelector(`#hour`).value = hrs;
    }
}
let tags = document.querySelectorAll(`.Tags`);
tags.forEach(ele=>{
    
})
document.querySelector(`#TodayTask`).addEventListener(`click`, e =>{
    if(e.target.id == `ScheduleTime`){
        document.querySelector(`.TimeBox`).style.display = `block`;
        fillerTime();
        let thetask = e.target.parentElement.parentElement
                   .parentElement.parentElement.parentElement;

        let num = parseInt(thetask.childNodes[0].innerText);

        //coloring options for days and storing days
        let TheDays = document.querySelectorAll(`.Day`);
        TheDays = Array.from(TheDays);
        CheckedDay = AllMyTasks[num].dayArr;
        CheckedDay.forEach(element=>{
            for(let i = 0; i < 7; i++){
                if(element == true){
                    TheDays[i].style.backgroundColor = `pink`;
                    TheDays[i].style.color = `black`;
                }else{
                    TheDays[i].style.backgroundColor = `rgb(34, 34, 34)`;
                    TheDays[i].style.color = `white`;
                }
            }
            
        })

        for(let i = 0; i < 7; i++){
            TheDays[i].addEventListener(`click`, ()=>{
                if(CheckedDay[i] === false){
                    TheDays[i].style.backgroundColor = `pink`;
                    TheDays[i].style.color = `black`;
                    CheckedDay[i] = true;
                    
                }else{
                    TheDays[i].style.backgroundColor = `rgb(34, 34, 34)`;
                    TheDays[i].style.color = `white`;
                    CheckedDay[i] = false;
                }
            })
        }

        document.querySelector(`#CloseBtn`).addEventListener("click",()=>{
            document.querySelector(`.TimeBox`).style.display = `none`;
            AllMyTasks[num].dayArr = CheckedDay;
            theDate =  AllMyTasks[num].repeatingTime();
            let a = new Date();
            if(parseInt(theDate.getDate()) != parseInt(a.getDate())){
                document.querySelector(`#ScheduleTaskBox`).prepend(thetask);
            }
            let theChild = thetask.childNodes[1].childNodes[1].childNodes[0].childNodes;
            // childNodes[0] == the hourglass svg, [1] = `time`
            updateTimer(theChild[1],num);
        })
    }
})


function updateTimer(theChild, num){
    let startTimer = setInterval(() => {
        let now = new Date();
        let theDue = AllMyTasks[num].repeatingTime();
        theChild.innerText = `${theDue.getMinutes() - now.getMinutes()}`;
    }, 1000);
}

document.querySelector(`#TodayTask`).addEventListener(`click`, e =>{
    if(e.target.type == `checkbox` && e.target.checked){
        doneTask(e.target);
    }
})
function doneTask(a){
    let task = a.parentElement.parentElement.parentElement
    document.querySelector(`#DoneTask`).prepend(task);
}

function backToTasks(a){
    
}
