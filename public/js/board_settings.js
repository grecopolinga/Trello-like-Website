const boardSettingsModal = document.getElementById('board-settings-modal');
const boardSettingsShow = document.getElementById('board-settings-button');
const boardSettingsConfirm = document.getElementById('board-settings-confirm');

const closeModal = document.querySelectorAll('.close-modal');

boardSettingsShow.addEventListener('click', () => {
    boardSettingsModal.classList.remove('hidden');
});

boardSettingsConfirm.addEventListener('click', () => {
    boardSettingsModal.classList.add('hidden');
});

closeModal.forEach((close) => {
    close.addEventListener('click', () => {
        boardSettingsModal.classList.add('hidden');
    });
});
