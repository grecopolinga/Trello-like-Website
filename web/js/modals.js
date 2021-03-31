const deactivateModal = document.getElementById("deactivate-modal");
const deactivateShow = document.getElementById("deactivate-button");
const deactivateConfirm = document.getElementById("deactivate-confirm");

const saveModal = document.getElementById("save-modal");
const saveShow = document.getElementById("save-button");
const saveConfirm = document.getElementById("save-confirm");

const closeModal = document.querySelectorAll(".close-modal");

deactivateShow.addEventListener("click", () => {
  deactivateModal.classList.remove("hidden");
});

deactivateConfirm.addEventListener("click", () => {
  deactivateModal.classList.add("hidden");
});

saveShow.addEventListener("click", () => {
  saveModal.classList.remove("hidden");
});

saveConfirm.addEventListener("click", () => {
  saveModal.classList.add("hidden");
});

closeModal.forEach((close) => {
  close.addEventListener("click", () => {
    deactivateModal.classList.add("hidden");
    saveModal.classList.add("hidden");
  });
});
