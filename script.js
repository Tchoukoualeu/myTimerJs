class theTimer {
  constructor(now, duration, backup, toggle) {
    this.now = now,
    this.duration = duration,
    this.r = null,
    this.backup = backup,
    this.toggle = toggle,
    this.oneCount = this.oneCount();
    this.timeFormatter = this.timeFormatter();
  }

  oneCount() {
    this.duration = Date.now() - this.now;
    document.getElementById('output').innerText = this.timeFormatter(this.duration);
  }

  // Starts the time
  start() {
    // console.log(duration)
    if (this.toggle) {
      this.now = Date.now() - this.backup;
      this.r = setInterval(this.oneCount, 10)
      this.toggle = false; //this helps limit the number of setInterval started
    }
  }

  // Stops the timer
  stop() {
    this.backup = 0;
    clearInterval(this.r)
    this.toggle = true;
    this.backup = this.duration; //This helps start where we stopped
  }

  // Resets the time
  reset() {
    document.getElementById('output').innerText = '00 : 00 . 000';
    this.backup = 0; //Make sure this is zero
    if (!this.toggle) {
      notificationBox();
    }
  }

  // Records lapses
  lapses() {
    lapsesOut(document.getElementById('output').innerText)
  }

  // Rrender lapses
  lapsesOut(element) {
    var ul = document.getElementById("lapOutput");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(element));
    ul.appendChild(li);
  }

  // Clear the lapses recorded
  clean() {
    document.getElementById('lapOutput').innerText = ''
  }

  // helps format the time
  timeFormatter(time) {
    time = new Date(time);

    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();

    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }

    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }

    while (milliseconds.length < 3) {
      milliseconds = "0" + milliseconds;
    }
    return minutes + " : " + seconds + " . " + milliseconds;
  }

}

let clock = new theTimer(0, 0, 0, true);


// Notification box message
let box = document.getElementById('notification-box')
function notificationBox() {
  box.style.display = 'block';
  setTimeout(function () {
    box.style.display = 'none';
  }, 3000);
}