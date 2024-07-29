// DOM elements
const modeDark = document.querySelector(".modeDark"); // Button to activate dark mode
const modeLight = document.querySelector(".modeLight"); // Button to activate light mode
const bodyTheme = document.querySelector("body"); // Body element to change the theme

const contentTodo = document.querySelector(".todoAPP"); // Container for the todo list
const valueInput = document.querySelector("#createTodo"); // Input field for adding new todos

// Function to toggle between dark and light mode
function altTheme() {
  if (!bodyTheme.classList.contains("activeModeTheme")) {
    bodyTheme.classList.add("activeModeTheme"); // Adds class for dark mode
    modeDark.style.display = "none"; // Hides dark mode button
    modeLight.style.display = "block"; // Shows light mode button
  } else {
    bodyTheme.classList.remove("activeModeTheme"); // Removes dark mode class
    modeDark.style.display = "block"; // Shows dark mode button
    modeLight.style.display = "none"; // Hides light mode button
  }
}

// Function to attach events to checkboxes
function attachCheckboxEvents() {
  const inputCheckedTodo = document.querySelectorAll(".checkedTodo"); // All checkboxes
  const txtTodo = document.querySelectorAll(".txtTodo"); // All todo texts

  inputCheckedTodo.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      const completeChecked = txtTodo[index];
      if (checkbox.checked) {
        completeChecked.classList.add("todoComplete"); // Marks the todo as completed
      } else {
        completeChecked.classList.remove("todoComplete"); // Unmarks the todo
      }
      contadorTodoList(); // Update count when a checkbox is changed
    });
  });
}

// Function to count the number of remaining todos (not completed)
function contadorTodoList() {
  const numberRow = document.querySelectorAll(".filaTodo"); // All todo rows
  const numbersTodo = document.querySelector(".numberItems"); // Element to display the count

  // Count only the rows that are not completed
  const remainingTodos = Array.from(numberRow).filter(todo => !todo.querySelector(".checkboxInputs").checked).length;
  numbersTodo.textContent = remainingTodos; // Updates the count
}

// Function to create a new todo in the list
function createTodoList(event) {
  if (event.key === 'Enter') {
    const ValueTodoInput = valueInput.value;
    if (ValueTodoInput.trim() === "") return; // Do not add empty todos

    const tpl = `
      <tr class="filaTodo">
        <td>
          <div class="bx-inputsSelected">
            <div class="sectionInfoTodo">
              <input class="checkboxInputs hoverActiveInput checkedTodo" type="checkbox" name="task" />
              <label class="txtTodo">${ValueTodoInput}</label>
            </div>
            <svg class="deleteTodo" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path fill="#494C6B" fill-rule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
            </svg>
          </div>
        </td>
      </tr>
    `;

    contentTodo.innerHTML += tpl; // Adds the new todo to the container
    valueInput.value = ""; // Clears the input field

    attachCheckboxEvents(); // Attaches events to new checkboxes
    attachDeleteEvents(); // Attaches events to delete buttons
    contadorTodoList(); // Updates the todo count
  }
}

// Function to attach events to delete buttons
function attachDeleteEvents() {
    const deleteTodoButtons = document.querySelectorAll(".deleteTodo"); // All delete buttons
    deleteTodoButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      const todoRow = deleteButton.closest(".filaTodo");
      if (todoRow) {
        todoRow.remove(); // Removes the todo row
        contadorTodoList(); // Updates the count after deletion
      }
    });
  });
}

// Function to filter todos based on status (active, completed, all)
function filterTodos(filter) {
  const allTodos = document.querySelectorAll(".filaTodo"); // All todo rows

  allTodos.forEach((todo) => {
    const isChecked = todo.querySelector(".checkboxInputs").checked;

    switch (filter) {
      case 'all':
        todo.style.display = ''; // Shows all todos
        break;
      case 'active':
        todo.style.display = isChecked ? 'none' : ''; // Shows only active todos
        break;
      case 'completed':
        todo.style.display = isChecked ? '' : 'none'; // Shows only completed todos
        break;
    }
  });
}

// Function to delete all completed todos
function deleteComplete() {
  const clearComplete = document.querySelector(".clearComplete"); // Button to clear completed todos

  clearComplete.addEventListener("click", () => {
    const filaTodo = document.querySelectorAll(".filaTodo"); // All todo rows

    filaTodo.forEach((todo) => {
      const checkbox = todo.querySelector(".checkedTodo");
      if (checkbox.checked) {
        todo.remove(); // Removes the row if the todo is completed
      }
    });

    contadorTodoList(); // Updates the count after clearing completed todos
  });
}

// Function to attach events to navbar items
function navbar() {
  const navitems = document.querySelectorAll(".navItems"); // All navbar items

  navitems.forEach((item) => {
    item.addEventListener("click", () => {
      navitems.forEach((navItem) => {
        navItem.classList.remove("colorActive"); // Removes 'colorActive' class from all items
      });

      item.classList.add("colorActive"); // Adds 'colorActive' class to clicked item

      const filter = item.getAttribute("data-filter"); // Gets selected filter
      filterTodos(filter); // Applies the filter
    });
  });
}

// Attach events to buttons and elements on page load
modeDark.addEventListener("click", altTheme); // Toggles theme on dark mode button click
modeLight.addEventListener("click", altTheme); // Toggles theme on light mode button click
valueInput.addEventListener('keydown', createTodoList); // Creates todo on Enter key press

// Attach events to existing checkboxes and delete buttons on page load
attachCheckboxEvents();
attachDeleteEvents();
contadorTodoList();
navbar();
deleteComplete();