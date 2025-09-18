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
  