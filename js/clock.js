let timers = [];

function formatTime(time) {
  let minutes = Math.floor(time / 6000);
  let seconds = Math.floor((time % 6000) / 100);
  let milliseconds = time % 100;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function updateClockDisplay(clock) {
  document.getElementById(`clock${clock.id}-time`).textContent = formatTime(clock.time);
}

function startClock(clock) {
  if (!clock.intervalId) {
    clock.intervalId = setInterval(() => {
      clock.time += 1;
      updateClockDisplay(clock);
    }, 10);
  }
}

function stopClock(clock) {
  clearInterval(clock.intervalId);
  clock.intervalId = null;
  clock.time = 0;
  updateClockDisplay(clock);
}

function pauseClock(clock) {
  clearInterval(clock.intervalId);
  clock.intervalId = null;
}

function stopAllClocks() {
  timers.forEach(clock => {
    clearInterval(clock.intervalId);
    clock.intervalId = null;
    clock.time = 0;
    updateClockDisplay(clock);
  });
}

function startAllClocks() {
  timers.forEach(clock => {
    if (!clock.intervalId) {
      clock.intervalId = setInterval(() => {
        clock.time += 1;
        updateClockDisplay(clock);
      }, 10);
    }
  });
}

function addNewClock() {
  const newClockId = timers.length + 1;
  const newClock = { id: newClockId, intervalId: null, time: 0 };
  timers.push(newClock);

  const clocksContainer = document.getElementById('clocks-container');
  const newClockHtml = `
  <div class="clock" id="clock${newClockId}">
    <div class="clock-index">Clock ${newClockId}</div>
    <div class="clock-display">
      <span id="clock${newClockId}-time">00:00.00</span>
    </div>
    <div class="controls">
      <button onclick="startClock(timers[${newClockId - 1}])">Start</button>
      <button onclick="stopClock(timers[${newClockId - 1}])">Stop</button>
      <button onclick="pauseClock(timers[${newClockId - 1}])">Pause</button>
      <button onclick="removeClock(${newClockId})">Remove</button>
    </div>
  </div>
`;


  clocksContainer.insertAdjacentHTML('beforeend', newClockHtml);
}

function removeClock(clockId) {
    // Lọc ra đồng hồ cần xóa khỏi mảng timers
    timers = timers.filter(clock => clock.id !== clockId);
  
    // Tìm đối tượng HTML của đồng hồ cần xóa
    const clockToRemove = document.querySelector(`#clock${clockId}`);
  
    // Kiểm tra xem đối tượng tồn tại trước khi xóa
    if (clockToRemove) {
      clockToRemove.remove(); // Xóa đồng hồ khỏi DOM
    } else {
      console.error(`Clock with ID ${clockId} not found.`);
    }
  }
  
