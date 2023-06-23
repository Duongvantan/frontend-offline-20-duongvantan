
let listTodos = document.getElementById("todos");
let btnSave = document.getElementById("btn-save");
let inputName = document.getElementById("name");
let inputLevel = document.getElementById("level");
let btnCancel = document.getElementById("cancel");
let fixList = document.getElementById("todos");
let inputSearch = document.getElementById("search");
let elAll = document.getElementById("status-all");
let elCompleted = document.getElementById("status-completed");
let elIncompleted = document.getElementById("status-incompleted");
let elSortBy = document.getElementById("sort-by");
let elSortDir = document.getElementById("sort-dir");
let elFilterLevel = document.getElementById("filter-level");

let idEdit = "";


let todos = JSON.parse(localStorage.getItem("TODOS"));

if (!todos) todos = [];
createTodo(todos);


//===========SAVE with EDIT==================//
btnSave.addEventListener("click", () => {
    let nameValue = inputName.value.trim();
    let levelValue = parseFloat(inputLevel.value);
    if (nameValue) {
        if (idEdit) {
            let indexEdit = todos.findIndex(todo => {
                return todo.id === idEdit;
            })
            todos[indexEdit].name = nameValue;
            todos[indexEdit].level = levelValue;
            idEdit = "";
        } else {
            let newTodo = {
                id: makeId(5),
                name: nameValue,
                level: levelValue,
                isCompleted: false,
            }
            todos.push(newTodo);
        }
        localStorage.setItem("TODOS", JSON.stringify(todos));
        createTodo(todos);
        inputName.value = "";
    } else {
        alert("Phải nhập tên vào");
    }
})


//================CANCEL==============//
btnCancel.addEventListener("click", () => {
    inputName.value = "";
})

//================EDIT-DELETE-STATUS================//
fixList.addEventListener("click", (e) => {
    let el = e.target;
    if (el.classList.contains("btn-delete")) {
        todos = todos.filter(todo => {
            return todo.id !== el.dataset.id;
        })
        createTodo(todos)
    }

    if (el.classList.contains("btn-edit")) {
        let todo = todos.find(todo => {
            return todo.id === el.dataset.id;
        })
        idEdit = todo.id;
        inputName.value = todo.name;
        inputLevel.value = todo.level;
    }

    if (el.classList.contains("todo-name")) {
        let indexStatus = todos.findIndex(todo => {
            return todo.id === el.dataset.id;
        })

        let statusTodo = todos[indexStatus].isCompleted;
        statusTodo ? todos[indexStatus].isCompleted = false : todos[indexStatus].isCompleted = true;

        localStorage.setItem("TODOS", JSON.stringify(todos));
        createTodo(todos);
    }
})

//===================SEARCH==================//
inputSearch.addEventListener("input", () => {
    let searchValue = inputSearch.value;
    let newTodo = todos.filter(todo => {
        return todo.name.toLowerCase().includes(searchValue.toLowerCase());
    })
    createTodo(newTodo, searchValue);
})

//=================Filter Status==============//
elAll.addEventListener("click", () => {
    createTodo(todos);
});


elCompleted.addEventListener("click", () => {
    let newTodo = todos.filter(todo => {
        return todo.isCompleted === true;
    })
    createTodo(newTodo);
})

elIncompleted.addEventListener("click", () => {
    let newTodo = todos.filter(todo => {
        return todo.isCompleted === false;
    })
    createTodo(newTodo);
})

//=============SORT==============//
let sortBy = "name";
let sortDir = "asc";

elSortBy.addEventListener("change",()=>{
    sortBy = elSortBy.value;
   let newTodo = sortTodos(todos, sortBy, sortDir);
   createTodo(newTodo);
})

elSortDir.addEventListener("change",()=>{
    sortDir = elSortDir.value;
    console.log('sortDir', sortDir);
    
    let newTodo = sortTodos(todos, sortBy, sortDir);
    createTodo(newTodo);
})

//==============FILTER LEVEL=============//
elFilterLevel.addEventListener("change",()=>{
    let level = elFilterLevel.value;
    if(level === "all"){
        createTodo(todos);
    }else{
        let newTodos = todos.filter(todo =>{
            return todo.level === parseInt(level);
        })
        createTodo(newTodos);
        console.log('newTodos', newTodos);
        
    }
})

function sortTodos(listTodos, sortBy, sortDir) {
    let sortItems = [...listTodos];
    let valueA;
    let valueB;
    sortItems.sort((a, b) => {
        if (sortBy === "name") {
            valueA = a[sortBy].toLowerCase();
            valueB = b[sortBy].toLowerCase();
        } else {
            valueA = a[sortBy];
            valueB = b[sortBy];
        }

        if (sortDir ==="asc") {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA > valueB ? -1 : 1;
        }
    })
    return sortItems;
}
function createTodo(items, searchValue = "") {
    let html = "";
    items.forEach(item => {
        let className = "";
        let levelText = "";
        let todoName = item.name;
        let completed = item.isCompleted;
        completed = completed ? "completed" : "";
        if (searchValue !== "") {
            let patt = new RegExp(searchValue, 'igm');
            todoName = todoName.replace(patt, (match) => {
                return `<mark>${match}</mark>`;
            })
        }

        switch (item.level) {
            case 1:
                className = "bg-secondary";
                levelText = "Thấp";
                break;

            case 2:
                className = "bg-info";
                levelText = "Bình thường";
                break;

            case 3:
                className = "bg-danger";
                levelText = "Cao";
                break;
        }
        html += `
            <li class="item mb-1">
                <div class="d-flex align-items-center justify-content-between">
                  <span role="button" class="todo-name ${completed}" data-id="${item.id}">${todoName}</span>
                  <span class="badge ${className}">${levelText}</span>
                  <div class="action">
                    <button class="btn btn-sm btn-primary btn-edit" data-id="${item.id}">
                      Sửa
                    </button>
                    <button class="btn btn-sm btn-danger btn-delete" data-id="${item.id}">
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
    `
    });

    listTodos.innerHTML = html;
}

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters[Math.floor(Math.random() * charactersLength)];
        counter += 1;
    }
    return result;
}