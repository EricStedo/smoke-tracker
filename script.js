function getTodayKey() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

function updateDisplay() {
    const todayKey = getTodayKey();
    const count = parseInt(localStorage.getItem(todayKey) || '0');
    const goal = parseInt(localStorage.getItem('goal') || '8');
    const message = document.getElementById('messageDisplay');

    document.getElementById('countDisplay').textContent = count;
    document.getElementById('goalDisplay').textContent = goal;

    if (count < goal) {
        message.textContent = '👏 Bravo, vous êtes sous votre objectif !';
        message.style.color = 'green';
    } else if (count === goal) {
        message.textContent = '🟡 Vous avez atteint votre objectif.';
        message.style.color = 'orange';
    } else {
        message.textContent = '⚠️ Attention, objectif dépassé.';
        message.style.color = 'red';
    }

    document.getElementById('dateDisplay').textContent = "📅 " + todayKey;
    loadHistory();
}

document.getElementById('addBtn').addEventListener('click', () => {
    const todayKey = getTodayKey();
    const current = parseInt(localStorage.getItem(todayKey) || '0');
    localStorage.setItem(todayKey, current + 1);
    updateDisplay();
});

document.getElementById('saveGoalBtn').addEventListener('click', () => {
    const goalInput = document.getElementById('goalInput').value;
    if (goalInput) {
        localStorage.setItem('goal', parseInt(goalInput));
        updateDisplay();
    }
});

function loadHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const key = date.toISOString().split('T')[0];
        const count = parseInt(localStorage.getItem(key) || '0');
        const li = document.createElement('li');
        li.textContent = `${key} : ${count} cigarette(s)`;
        historyList.appendChild(li);
    }
}

window.onload = updateDisplay;
