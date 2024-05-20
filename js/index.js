document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  const intervalInput = document.getElementById("intervalInput");
  const notificationSound = document.getElementById("notificationSound");
  const minutesDigit = document.querySelector(".minutes");
  const secondsDigit = document.querySelector(
    ".flip-clock-container.flip-clock-s"
  );

  if (
    !startButton ||
    !stopButton ||
    !intervalInput ||
    !notificationSound ||
    !minutesDigit ||
    !secondsDigit
  ) {
    console.error("One or more elements not found.");
    return;
  }

  let countdownInterval;

  function startCountdown(duration) {
    let remainingTime = duration;
    updateCountdownDisplay(remainingTime);

    countdownInterval = setInterval(() => {
      remainingTime -= 1;
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        // Notify when the countdown finishes
        notify();
      }
      updateCountdownDisplay(remainingTime);
    }, 1000);
  }

  function updateCountdownDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    updateFlipClockDigits(minutes, secs);
  }

  function updateFlipClockDigits(minutes, seconds) {
    minutesDigit.textContent = padWithZero(minutes);
    secondsDigit.textContent = padWithZero(seconds);
  }

  function padWithZero(number) {
    return number < 10 ? "0" + number : number;
  }

  function notify() {
    // Play notification sound
    notificationSound.play();
    // You can add additional notification logic here
    // For example, showing a message on the screen
  }

  startButton.addEventListener("click", () => {
    const intervalMinutes = parseInt(intervalInput.value);

    if (isNaN(intervalMinutes) || intervalMinutes <= 0) {
      alert("Please enter a valid number of minutes.");
      return;
    }

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    const intervalSeconds = intervalMinutes * 60;

    startCountdown(intervalSeconds);
  });

  stopButton.addEventListener("click", () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    console.log("Countdown stopped");
  });
});
