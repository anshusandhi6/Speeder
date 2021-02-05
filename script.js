const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
var results=[]; var timing=[];
var timer_c=0;
var correcter=0; var incorrect=0;
var final;
$('#quoteInput').bind('copy paste', function (e) {
  e.preventDefault();
});
quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
      correcter++;
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      incorrect++;
      correct = false
    }
  })

  if (correct) 
  {
    renderNewQuote()
    final=correcter/(incorrect+correcter);
    console.log();
    results.push(final);
    
    correcter=0;  incorrect=0;
    var x= Math.max(...results)
    x=x*100;
    var timings1 = Math.min(...timing)
    x=Math.floor(x)
    document.getElementById("max_time").innerHTML =`Best Accuracy ${x}% and least timing is ${timings1}s  `;
  }
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  startTimer()
}

let startTime = " "
let endTime = " "
function startTimer() {
  timerElement.innerText = 0
  
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
  var diift= startTime.getSeconds()-endTime
  if(endTime!=" ")
  endTime=startTime.getSeconds()
  timing.push(diift)



  
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()