$(document).ready(function () {
  let todos = [
    {
      id: makeId(5),
      name: 'sleeping edit',
      level: 1,
      isCompleted: true,
    },
    {
      id: makeId(5),
      name: 'eating',
      level: 3,
      isCompleted: false,
    },
    {
      id: makeId(5),
      name: 'todo new',
      level: 2,
      isCompleted: false,
    },
    {
      id: makeId(5),
      name: 'todo 2',
      level: 1,
      isCompleted: false,
    },
    {
      id: makeId(5),
      name: 'todo 3',
      level: 1,
      isCompleted: true,
    },
    {
      id: makeId(5),
      name: 'todo 4',
      level: 2,
      isCompleted: false,
    },
    {
      id: makeId(5),
      name: 'todo 5',
      level: 3,
      isCompleted: true,
    },
    {
      id: makeId(5),
      name: 'todo 6',
      level: 1,
      isCompleted: false,
    },
    {
      id: makeId(5),
      name: 'coding',
      level: 3,
      isCompleted: false,
    },
    {
      id: makeId(5),
      name: 'dfdfg',
      level: 1,
      isCompleted: true,
    },
  ];

  const elList = $("#todos");
  const inputName = $("#name");
  const selectLevel = $("#level");
  const btnSave = $("#btn-save");
  const btnCancel = $("#cancel");
  const elListTodos = $("#todos");
  const elSearch = $("#search");
  const btnStatusAll = $("#status-all");
  const btnStatusCompleted = $("#status-completed");
  const btnStatusIncompleted = $("#status-incompleted");
  const filterLevel = $("#filter-level");
  const sortBy = $("#sort-by");
  const sortDir = $("#sort-dir");
  let by = "name";
  let dir = "asc";

  let idEdit = "";
  createList(todos);
  //===========Save===============//
  btnSave.on("click", function () {
    let nameValue = inputName.val().trim();
    let levelValue = parseFloat(selectLevel.val());
    if (nameValue) {
      if (idEdit) {
        let indexEdit = todos.findIndex(function (todo) {
          return todo.id === idEdit;
        });
        todos[indexEdit].name = nameValue;
        todos[indexEdit].level = levelValue;
      } else {
        let newTodo = {
          id: makeId(5),
          name: nameValue,
          level: levelValue,
          isCompleted: false,
        }
        todos.push(newTodo);
      }
      createList(todos);
      inputName.val("");
      indexEdit = "";
    } else {
      alert("Bắt buộc phải nhập tên");
    }
  })

  //===============CANCEL===============//
  btnCancel.on("click", function () {
    inputName.val("");
  })

  //=============DELETE-EDIT===============//
  elListTodos.on("click", '.btn-delete', function () {
    let el = $(this);
    todos = todos.filter(function (todo) {
      return todo.id !== el.data('id');
    })
    createList(todos);
  })

  elListTodos.on("click", ".btn-edit", function () {
    let el = $(this);
    todo = todos.find(function (todo) {
      return todo.id === el.data('id');
    })
    idEdit = todo.id;
    inputName.val(todo['name']);
    selectLevel.val(todo['level']);
  })

  //================SEARCH================//

  elSearch.on("input", function () {
    let searchValue = elSearch.val();
    let newTodo = todos.filter(function (todo) {
      return todo.name.toLowerCase().includes(searchValue.toLowerCase());
    })
    createList(newTodo, searchValue);

  })

  //==============FILTER STATUS===========//
  btnStatusAll.on("change", function () {
    createList(todos)
  });

  btnStatusCompleted.on("change", function () {
    let newTodo = todos.filter(function (todo) {
      return todo.isCompleted === true;
    })
    createList(newTodo);
  })

  btnStatusIncompleted.on("change", function () {
    let newTodo = todos.filter(function (todo) {
      return todo.isCompleted === false;
    })
    createList(newTodo);
  })

  elListTodos.on("click", ".name", function () {
    let el = $(this)
    let idStatus = el.data("id");
    let indexStatus = todos.findIndex(function (todo) {
      return todo.id === idStatus;
    })
    let status = todos[indexStatus].isCompleted;
    status ? todos[indexStatus].isCompleted = false : todos[indexStatus].isCompleted = true;
    createList(todos);
  })

  //===========Filter-Level===========//
  filterLevel.on("change", function () {
    let value = filterLevel.val();
    if(value !== "all"){
      let newTodos = todos.filter(function (todo) {
        return todo.level === parseFloat(value);
      })
      createList(newTodos);
    }else{
      createList(todos);
    }
  })

  //============SORT===========//
  sortBy.on("change",function () {
     by = $(this).val();
   let newArr =  sortTodos(todos,by,dir);
     createList(newArr);
  })
  sortDir.on("change",function () {
    dir = $(this).val();
    let newArr = sortTodos(todos,by,dir);
    createList(newArr);
  })

  function sortTodos(items,by,dir) {
    const sortArr = [...items];
    sortArr.sort(function (a,b) {
      let valueA = a[by];
      let valueB = b[by];
      if(by === "name"){
        valueA = a[by].toLowerCase()
        valueB = b[by].toLowerCase()
      }

      if(dir === "asc"){
        return valueA > valueB ? 1 : -1;
      } else{
        return valueA > valueB ? -1 : 1;
      }
    })
    return sortArr;
  }
  
  function createList(items, searchValue = "") {
    let html = "";
    items.forEach(function (item) {
      let levelClass = "";
      let levelText = "";
      let todoName = item.name;
      let completed = item.isCompleted;
      completed = completed ? "completed" : "";
      if (searchValue) {
        let pattern = new RegExp(searchValue, "igm");
        todoName = item.name.replace(pattern, function (match) {
          return `<mark>${match}</mark>`
        })
      }
      switch (item.level) {
        case 1:
          levelClass = 'bg-secondary';
          levelText = 'Thấp';
          break;
        case 2:
          levelClass = 'bg-info';
          levelText = 'Bình Thường';
          break;
        case 3:
          levelClass = 'bg-danger';
          levelText = 'Cao';
          break;
      }
      html += `
    <li class="item mb-1">
              <div class="d-flex align-items-center justify-content-between">
                <span role="button" class='name ${completed}' data-id=${item.id}>${todoName}</span>
                <span class="badge ${levelClass}">${levelText}</span>
                <div class="action">
                  <button class="btn btn-sm btn-primary btn-edit" data-id=${item.id}>
                    Sửa
                  </button>
                  <button class="btn btn-sm btn-danger btn-delete" data-id=${item.id}>
                    Xóa
                  </button>
                </div>
              </div>
            </li>
    `
    })
    elList.html(html);
  }

  function makeId(length = 12) {
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
})