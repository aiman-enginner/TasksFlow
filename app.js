// Save board state
function saveBoard() {
    const board = {};
    document.querySelectorAll('.col').forEach(col => {
      const colId = col.id;
      const tasks = [];
      col.querySelectorAll('.card').forEach(card => {
        tasks.push(card.innerText.trim());
      });
      board[colId] = tasks;
    });
    localStorage.setItem('taskflow-board', JSON.stringify(board));
  }
  
  // Load board state
  function loadBoard() {
    const saved = JSON.parse(localStorage.getItem('taskflow-board'));
    if (!saved) return;
    for (const colId in saved) {
      const col = document.getElementById(colId);
      saved[colId].forEach(taskText => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerText = taskText;
        col.querySelector('.tasks').appendChild(card);
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadBoard);
  
  // التقاط الزر
const btnNew = document.getElementById("btn-new");


btnNew.addEventListener("click", () => {
  const task = prompt("أدخل عنوان المهمة:");
  if (task) {
    const card = createTaskCard(task); 
    document.getElementById("col-todo").appendChild(card); 
    saveBoard(); 
  }
});

function createTaskCard(text) {
  const card = document.createElement("article");
  card.className = "card";
  card.draggable = true;
  card.innerHTML = `
    <h3>${text}</h3>
    <button class="delete-btn">🗑</button>
  `;
  // حدث زر الحذف
  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.remove();
    saveBoard();
  });
  return card;
}

// السماح بإفلات البطاقات داخل الأعمدة
document.querySelectorAll(".cards").forEach(col => {
  col.addEventListener("dragover", e => {
    e.preventDefault();
  });

  col.addEventListener("drop", e => {
    const dragging = document.querySelector(".dragging");
    if (dragging) {
      col.appendChild(dragging);
      saveBoard();
    }
  });
});

// عند بدء السحب
document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("card")) {
    e.target.classList.add("dragging");
  }
});

// عند انتهاء السحب
document.addEventListener("dragend", e => {
  if (e.target.classList.contains("card")) {
    e.target.classList.remove("dragging");
  }
});