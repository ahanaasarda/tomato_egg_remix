const buttons = document.querySelectorAll("[data-complete]");
const progressCount = document.querySelector("#progress-count");
const progressFill = document.querySelector("#progress-fill");
const progressMessage = document.querySelector("#progress-message");

const completedSteps = new Set();

const messages = [
  "Ready when you are.",
  "Preparation complete. Keep going!",
  "Eggs ready. Time to heat things up.",
  "The tomatoes are cooking. Almost there.",
  "Everything is coming together!",
  "Experiment complete. Time to eat!"
];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const stepNumber = Number(button.dataset.complete);
    const step = button.closest(".step");

    if (completedSteps.has(stepNumber)) {
      completedSteps.delete(stepNumber);
      button.classList.remove("completed");
      step.classList.remove("is-done");

      button.textContent = stepNumber === 5
        ? "FINISH THE EXPERIMENT ↗"
        : "MARK AS DONE ↗";
    } else {
      completedSteps.add(stepNumber);
      button.classList.add("completed");
      step.classList.add("is-done");
      button.textContent = "✓ COMPLETED — UNDO";
    }

    const total = completedSteps.size;

    progressCount.textContent = `${total} / 5`;
    progressFill.style.width = `${total * 20}%`;

    if (total === 5) {
      progressMessage.textContent = messages[5];
    } else if (total === 0) {
      progressMessage.textContent = messages[0];
    } else {
      progressMessage.textContent = messages[total];
    }
  });
});