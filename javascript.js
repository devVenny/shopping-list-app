'use strict'

const input = document.querySelector(".input");
const form = document.querySelector(".addList");
const ul = document.querySelector(".list");

const LIST_KEY = "LIST";
const LIST_ARRAY = [];

// add & reaove a item-list

function deleteList(e){
    const li = e.target.parentNode;
    ul.removeChild(li)

    const cleanList = LIST_ARRAY.filter(() => {
        return li.id !== 1;
    });
    console.log(cleanList);
}

function saveList(obj){
    localStorage.setItem(LIST_KEY, JSON.stringify(obj));
}

function paintList(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    
    span.textContent=text;
    delBtn.textContent="O";
    li.id=LIST_ARRAY.length;
    li.append(span);
    li.append(delBtn);
    ul.append(li);

    delBtn.addEventListener('click', deleteList);
    
    const newObj = {
        text : text,
        id :LIST_ARRAY.length 
    }
LIST_ARRAY.push(newObj);
saveList(LIST_ARRAY);
}

function handleSubmit(e){
    e.preventDefault();
    const currentValue = input.value;
    paintList(currentValue)
    input.value="";
}

function loadList(){
    const loadedList = localStorage.getItem(LIST_KEY);
    if(loadedList !== null){
        const parsedLists = JSON.parse(loadedList);
        parsedLists.forEach((list) => {
            const text = list.text;
            paintList(text)
        })
    }
}

function init(){
    loadList();
    form.addEventListener('submit', handleSubmit);
}
init();