// console.log('this works')

let betInput = document.getElementById('betinput')
let dealButton = document.getElementById('dealbutton');
let dealerCard = document.getElementById('dealercards')
let playerTotalAmt = document.getElementById('playertotal')
let dealerTotalAmt = document.getElementById('dealertotal')
let scorePrompt = document.getElementById('score');
let hitButton = document.getElementById('hit');
let suits = ['♦','♠','♣','♥'];
let values = ['Ace',2,3,4,5,6,7,8,9,10,'J','Q','K']

let dealerHand = 0;
let playerHand = 0;
let gameStarted = false;
let winner = false;
let playerWins = false;
let dealerWins = false;
let deck = [];
let newDeck = [];

// Creating a deck


function createDeck() {
    for (let i=0; i<suits.length;i++) {
        for (let l=0;l<values.length;l++) {
            deck.push(`${values[l]}${suits[i]}`)
        }
    }
}

createDeck()

// Shuffling the deck
function shuffle(arr) {
    while(arr.length>0) {
        const idx = Math.floor(Math.random() * arr.length); //get random index of current deck
        newDeck.push(arr[idx]) //push the value of random index into a new Array
        arr.splice(idx, 1); //delete the value from the old array
    }
    return newDeck
}

shuffle(deck)

console.log(newDeck)


// // deal cards, if player or dealer draws an ace, get score, check for end of game, check/display who won, 


// // Check for End of Game
// function endOfGame() {

// }


// // Check who won
// // 
// // If player or dealer draws an Ace



// dealButton.addEventListener('click', (event) => {
//     dealCard(values)
// })
