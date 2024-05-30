document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.querySelector('.add');
    const list = document.querySelector('.todos');
    const search = document.querySelector('.search input');
  
    // Add todo
    addForm.addEventListener('submit', e => {
      e.preventDefault();
      const todo = addForm.add.value.trim();
      if (todo.length) {
        addTodo(todo);
        addForm.reset();
      }
    });
  
    // Add todo function
    const addTodo = todo => {
      const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span contenteditable="true" class="editable">${todo}</span>
          <i class="far fa-trash-alt delete"></i>
        </li>
      `;
      list.innerHTML += html;
      saveTodos();
    };
  
    // Delete and edit todos
    list.addEventListener('click', e => {
      if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this todo?')) {
          e.target.parentElement.remove();
          saveTodos();
        }
      }
    });
  
    // Prevent empty todos on edit
    list.addEventListener('blur', e => {
      if (e.target.classList.contains('editable')) {
        if (e.target.textContent.trim() === '') {
          e.target.textContent = e.target.getAttribute('data-original');
        } else {
          e.target.removeAttribute('data-original');
        }
        saveTodos();
      }
    }, true);
  
    // Save original todo before editing
    list.addEventListener('focus', e => {
      if (e.target.classList.contains('editable')) {
        e.target.setAttribute('data-original', e.target.textContent);
      }
    }, true);
  
    // Save todos to local storage
    const saveTodos = () => {
      const todos = Array.from(list.children).map(li => li.firstElementChild.textContent.trim());
      localStorage.setItem('todos', JSON.stringify(todos));
    };
  
    // Load todos from local storage
    const loadTodos = () => {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.forEach(todo => addTodo(todo));
    };
  
    loadTodos();
  
    // Filter todos
    const filterTodos = term => {
      Array.from(list.children)
        .filter(todo => !todo.firstElementChild.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'));
  
      Array.from(list.children)
        .filter(todo => todo.firstElementChild.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'));
    };
  
    // Search event
    search.addEventListener('keyup', () => {
      const term = search.value.trim().toLowerCase();
      filterTodos(term);
    });
  });
  