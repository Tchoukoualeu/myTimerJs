let now = 0;
let duration = 0;
let r;
let backup = 0;
let toggle = true;

function oneCount(){
  duration = Date.now() - now;
  document.getElementById('output').innerText = timeFormatter(duration);
}

// Starts the time
function start(){ 
  // console.log(duration)
  if(toggle){
    now = Date.now() - backup;
    r = setInterval(oneCount, 10)
    toggle = false; //this helps limit the number of setInterval started
  }
}

// Stops the timer
function stop(){
  backup = 0;
  clearInterval(r)
  toggle = true; 
  backup = duration; //This helps start where we stopped
}

// Resets the time
function reset(){
  document.getElementById('output').innerText = '00 : 00 . 000';
  backup = 0; //Make sure this is zero
  if(!toggle){
    notificationBox();
  }
}

// Records lapses
function lapses(){
  lapsesOut(document.getElementById('output').innerText)
}

// Helps render lapses
function lapsesOut(element) {
  var ul = document.getElementById("lapOutput");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(element));
  ul.appendChild(li);
}

// Clear the lapses recorded
function clean(){
  document.getElementById('lapOutput').innerText = ''
}

// helps format the time
function timeFormatter(time) {
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

// Notification box message
let box = document.getElementById('notification-box')
function notificationBox(){
  box.style.display = 'block';
  setTimeout(function(){ 
    box.style.display = 'none'; 
  }, 3000);
}