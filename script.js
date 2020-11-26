class theTimer {
  constructor(now, duration, backup, toggle) {
    this.now = now
    this.duration = duration
    this.r = null
    this.backup = backup
    this.toggle = toggle
  }

  // Starts the time
  start() {
    if (this.toggle) {
      this.now = Date.now() - this.backup;
      this.r = setInterval(() => {

        this.duration = Date.now() - this.now;

        // Formating
        let time = new Date(this.duration);

        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = time.getMilliseconds().toString();

        document.getElementById('output').innerText = `${('0' + minutes).slice(-2)} : ${('0' + seconds).slice(-2)} . ${('00' + milliseconds).slice(-3)}`;

      }, 10)
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
    var ul = document.getElementById("lapOutput");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(document.getElementById('output').innerText));
    ul.appendChild(li);
  }

  // Clear the lapses recorded
  clean() {
    document.getElementById('lapOutput').innerText = ''
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
