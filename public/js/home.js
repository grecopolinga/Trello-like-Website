const boardSettingsModal = document.getElementById('board-add-modal');
const boardSettingsShow = document.getElementById('board-add-button');
const boardSettingsConfirm = document.getElementById('board-add-confirm');

const closeModal = document.querySelectorAll('.close-modal');

boardSettingsShow.addEventListener('click', () => {
    boardSettingsModal.classList.remove('hidden');
});

boardSettingsConfirm.addEventListener('click', () => {
    boardSettingsModal.classList.add('hidden');
    return window.location.replace('workspace.html');
});

closeModal.forEach((close) => {
    close.addEventListener('click', () => {
        boardSettingsModal.classList.add('hidden');
    });
});
