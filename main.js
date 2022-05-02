//유저는 할일을 추가할 수 있다.
//각 할일에 삭제와 체크버튼이 있다.
//삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
//체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
//끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
//탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
//모바일 버전에서도 확인할 수 있는 반응형 웹이다 

let inputText = document.getElementById("input-box");
let inputButton = document.querySelector(".input-button");
let tabItem = document.querySelectorAll(".tab");
let underLine = document.querySelector(".under-line");

inputButton.addEventListener("click", plus);
inputText.addEventListener("keypress", (key) => {
    if(key.key == "Enter"){
        plus();
    }
});
for(let i=0;i<tabItem.length;i++){
    tabItem[i].addEventListener("click", filter);
}

let filterValue = '';
let inputList = [];
let filterList = [];
let list = inputList;

function plus(){
    if(inputText.value == ''){
        alert("텍스트를 입력하세요");
        return;
    }
    let inputValue = {
        text : inputText.value,
        id : getRandomID(),
        isComplete: false,
    }
    inputList.push(inputValue);
    inputText.value = '';
    render();
}

function toggleComplete(id){
    console.log(id);
    for(let i=0; i<inputList.length; i++){
        if(inputList[i].id == id){
            inputList[i].isComplete = !inputList[i].isComplete;
            break;
        }
    }
    render();
}

function remove(id){
    console.log(id);
    for(let i=0; i<inputList.length; i++){
        if(inputList[i].id == id){
            inputList.splice(i,1);
        }
    } render();
}

function filter(){
    filterValue = this.id
    filterList = [];
    underLine.style.width = this.offsetWidth + "px";
    underLine.style.left = this.offsetLeft + "px";
    underLine.style.top = this.offsetTop + this.offsetHeight -3 + "px";
    
    if(filterValue == "all"){
        render();
    } else if (filterValue == "not-done"){
        for(let i=0; i<inputList.length; i++){
            if(inputList[i].isComplete == false){
                filterList.push(inputList[i]);
            }
        }
    } else if (filterValue == "done"){
        for(let i=0; i<inputList.length; i++){
            if(inputList[i].isComplete == true){
                filterList.push(inputList[i]);
            }
        }
    }
    render();
}

function render(){
    if(filterValue == "all"){
        list = inputList;
    } else if (filterValue == "not-done" || filterValue == "done"){
        list = filterList;
    }
    let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="todo-list" id="todo-list">
                <div class="todo-text complete">${list[i].text}</div>
                <div class="todo-button-area">
                    <button onclick="toggleComplete('${list[i].id}')" class="todo-button">Check</button>
                    <button onclick="remove('${list[i].id}')" class="todo-button">Delete</button>
                </div>
            </div>`
        } else {
            resultHTML += `<div class="todo-list" id="todo-list">
                <div class="todo-text">${list[i].text}</div>
                <div class="todo-button-area">
                    <button onclick="toggleComplete('${list[i].id}')" class="todo-button">Check</button>
                    <button onclick="remove('${list[i].id}')" class="todo-button">Delete</button>
                </div>
            </div>`
        }
    }

    document.getElementById("todo-area").innerHTML = resultHTML
}

function getRandomID(){
    return ('000000000' + Math.random().toString(36).substr(2, 9)).slice(-9);
}