let spans = document.querySelectorAll("span");
let inCount = document.querySelectorAll('span').length;
let score_headings = document.getElementsByClassName("score-heading");
let wrp = document.getElementById("score-wrp");
let acc = document.getElementById("score-accuracy");
let testText = document.getElementById("testText");
let accuracy;
let startBtn = document.getElementById("startBtn");
let watchTime = document.getElementById("watchTime");
let stopwatch = document.getElementById("stopwatch");
let countDown = document.getElementById("countDown");
const correctSoundsrc = "correct.wav";
const missSoundsrc = "miss.wav";
const backspaceSoundsrc = "backspace.wav";

let curCount = inCount;
console.log("count from direct", curCount)
let currentIdx = 0;
let stopWatchTime = 0;
let tempTime;

window.addEventListener('DOMContentLoaded', () => {        
  const element = document.getElementById('heading');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

 //FOR MOBILEEEE SCREEENS
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    alert("The Web is under Maintainance for Mobile Phones !! until then, See you on the Desktop !!!");
  }


let timer = 30000;  //default 30 sec
const buttons = document.querySelectorAll(".timers");
    
buttons.forEach((btn, idx) => {                             
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.style.backgroundColor = "");
    btn.style.backgroundColor = "white";
    if (idx === 0) timer = 30000;
    if (idx === 1) timer = 60000;
    if (idx === 2) timer = 120000;
    if (idx === 3) timer = 180000;
    console.log(timer)
  });
});

let sp;
let count;
startBtn.addEventListener("click", () => {
    watchTime.textContent = "...";
    clearInterval(stop);
    clearTimeout(sp);
    countDown.textContent = "3";
    count = 2;

    testText.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // **Scroll once on mobile**
    if (/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)) {
        testText.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    cd = setInterval(() => {
        if (count === 0)
            countDown.textContent = "Go!";
        else if (count < 0) {
            countDown.textContent = "";
            clearInterval(cd);
            start();
        } else {
            countDown.textContent = count;
        }    
        count--;
    }, 1000)
});

let state;
function start() {
    let correct;
    let isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

    keylistener = function(e) {  
        e.preventDefault();

        if (e.key.length > 1 && e.key !== "Backspace") return;     
        const currentSpan = spans[currentIdx];

        if (e.key === "Backspace") {
            const backspaceSound = new Audio(backspaceSoundsrc);
            backspaceSound.play();
            if (currentIdx > 0) {
                currentIdx--;
                spans[currentIdx].style.color = "black";
            }
            return;
        }

        if (e.key === currentSpan.textContent) {
            currentSpan.style.color = "green";
            const correctSound = new Audio(correctSoundsrc);
            correctSound.play();
        } else {
            currentSpan.style.color = "red";
            const missSound = new Audio(missSoundsrc);
            missSound.play();
        }

        // **Scroll per span only on desktop**
        if (!isMobile && tempTime !== 0) {      
            currentSpan.scrollIntoView({
                block: "start",   
                behavior: "smooth" 
            });
        }

        currentIdx++;
    }

    document.removeEventListener("keydown", keylistener);
    document.addEventListener("keydown", keylistener);

    stopwatch.classList.remove("deactive");
    stopwatch.classList.add("active");

    history.replaceState(null, '', window.location.pathname + window.location.search);

    currentIdx = 0;   
    watchTime.textContent = (timer / 1000);
    tempTime = (timer / 1000);

    clearInterval(stop);         
    stop = setInterval(() => {
        watchTime.textContent = tempTime;      
        tempTime--;

        if (tempTime === 0) {
            if (timer === 30000) wrp.textContent = (Math.trunc(currentIdx / 5) * 2);
            if (timer === 60000) wrp.textContent = (Math.trunc(currentIdx / 5));
            if (timer === 120000) wrp.textContent = (Math.trunc((currentIdx / 5) / 2));
            if (timer === 180000) wrp.textContent = (Math.trunc((currentIdx / 5) / 3));

            clearInterval(stop);
        }
    }, 1000);

    for (let i = 0; i < inCount; i++) {        
        spans[i].style.color = "black";                  
    }

    sp = setTimeout(() => {                                                               
        correct = document.querySelectorAll("span[style*='green']").length;
        accuracy = (correct / currentIdx) * 100;
        
        acc.textContent = (Math.trunc(accuracy));
            
        stopwatch.classList.remove("active");     
        stopwatch.classList.add("deactive");      

        window.location.hash = "wrp";   
        document.removeEventListener("keydown", keylistener);
    }, timer);
}



