const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['painting', 'programming', 'interface', 'computer', 'woodwork'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let lose = new Audio("fail-144746.mp3");
let winner = new Audio("win.mp3"); 
const correctLetters = [];
const wrongLetters = [];

// Show hidden word function
function displayWord() {
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `        
    )
    .join('')}  
    `;

    const innerWord = wordE1.innerText.replace(/\n/g,'');

    if (innerWord === selectedWord) {
      finalMessage.innerText = 'You saved them. Great job!';
      popup.style.display = 'flex';
      winner.play();
    }
}
    
// Update the wrong letters
function updateWrongLetterE1(){
    // Display wrong letters
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    
      // Display parts
      figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
    
        if (index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });

    //check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'You could have saved them. This could have all been avoided if you thought harder.';
        popup.style.display = 'flex';
        lose.play();
    }
}

//show notification
function showNotification(){
    notification.classList.add('show');

setTimeout(() => {
    notification.classList.remove('show');
    }, 2000);
}

//keydown letter press
window.addEventListener('keydown', e =>{
    if (e.keyCode >=65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            }else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else{
                showNotification();
            }
        }
    }
});

//restart game and play again
playAgainBtn.addEventListener('click', () => {
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random()* words.length)];

    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
});

displayWord();