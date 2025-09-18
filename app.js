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
  
  