let playerCard = document.getElementById('playercards')
let betInput = document.getElementById('betinput')
let dealButton = document.getElementById('dealbutton');
let dealerCard = document.getElementById('dealercards')
let playerTotalAmt = document.getElementById('playertotal')
let dealerTotalAmt = document.getElementById('dealertotal')
let scorePrompt = document.getElementById('score');
let hitButton = document.getElementById('hit');
let stayButton = document.getElementById('stay');
let playAgainButton = document.getElementById('playagain')
let suits = ['♦','♠','♣','♥'];
let values = ['Ace',2,3,4,5,6,7,8,9,10,'J','Q','K']
let num = [];
let faceCards = ['J','Q','K']
let newPlayerCard = [];
let newDealerCard =[];

let dealerTotal = 0;
let playerTotal = 0;
let playerHand = [];
let dealerHand = [];
let gameStarted = false;
let winner = false;
let playerWins = false;
let dealerWins = false;
let deck = [];
let newDeck = [];
let newDeckValues = [];
let playerStays = false;

function createDeck() {
    for (let i=0; i<suits.length;i++) {
        for (let l=0;l<values.length;l++) {
            let num = Number(values[l]); 
            if (faceCards.includes(values[l])) {
                num = 10;
            };
            if (values[l] == 'Ace') {
                num = 1;
            };
            let card = {Value: values[l], Suit: suits[i], Number: num};
            deck.push(card)
        }
    }
}


function shuffle(arr) {
    while(arr.length>0) {
        const idx = Math.floor(Math.random() * arr.length);
        newDeck.push(arr[idx]) 
        arr.splice(idx, 1); 
    }
    return newDeck
}



function dealCards(array) {
    playerHand.push(array[0],array[2])
    dealerHand.push(array[1],array[3]);
    dealButton.style.display = 'none';
}



function displayPlayerCards() {
    for (let i=0;i<playerHand.length;i++) {
        setTimeout(() => {playerCard.innerHTML += `${playerHand[i].Value}${playerHand[i].Suit} `;
        }, i*2000)
    }}


function displayDealerCards() {
    setTimeout(() => {dealerCard.innerHTML = `${dealerHand[0].Value}${dealerHand[0].Suit}  `;
}, 1000);
    setTimeout(() => {dealerCard.append(`[Hidden Card]`);
}, 3000)  
}

function showAllDealerCards() {
    dealerTotalAmt.innerHTML = `Total: ${dealerTotal}`
    dealerCard.innerHTML = '';
    for (let i = 0; i<dealerHand.length;i++) {
        dealerCard.innerHTML += `${dealerHand[i].Value}${dealerHand[i].Suit}  `;
    }
}

function hideButtons() {
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
}


function gameOver() {
    if (playerTotal == 21) {
        scorePrompt.append('Player 1 wins!')
        playAgainButton.style.display = 'block';
        hideButtons()
        showAllDealerCards()
        winner = true
    } else if (dealerTotal > 21) {
        scorePrompt.append('Player 1 wins!')
        playAgainButton.style.display = 'block';
        hideButtons()
        showAllDealerCards()
        winner = true
    } else if (playerHand.length == 5 && playerTotal <21) {
        scorePrompt.append('Player 1 wins!')
        playAgainButton.style.display = 'block';
        hideButtons()
        showAllDealerCards()
        winner = true
    } else if (dealerTotal == 21) {
        scorePrompt.append('Dealer wins!')
        playAgainButton.style.display = 'block';
        hideButtons()
        showAllDealerCards()
        winner = true
    } else if (playerTotal > 21) {
        scorePrompt.append('Dealer wins!')
        playAgainButton.style.display = 'block';
        hideButtons()
        showAllDealerCards()
        winner = true
    } else if (playerStays === true && dealerTotal > playerTotal && dealerTotal >= 17){
        scorePrompt.append('Dealer wins!')
        playAgainButton.style.display = 'block';
        hideButtons()
        showAllDealerCards()
        winner = true
    } else if (playerStays === true && playerTotal > dealerTotal && dealerTotal >= 17){
        scorePrompt.append('Player 1 wins!')
        playAgainButton.style.display = 'block';
        hideButtons()
        showAllDealerCards()
        winner = true
    }
    else if (dealerHand.length == 5 && dealerTotal <21) {
        scorePrompt.append('Dealer wins!')
        playAgainButton.style.display = 'block';
        hideButtons()
        showAllDealerCards()
        winner = true
    } else if (playerTotal == 21 && dealerTotal ==21) {
        scorePrompt.append(`It's a tie!`)
        playAgainButton.style.display = 'block';
        hideButtons()
        showAllDealerCards()
        winner = true
    } else if (playerTotal == dealerTotal && playerStays) {
        scorePrompt.append(`It's a tie!`)
        playAgainButton.style.display = 'block';
        hideButtons()
        showAllDealerCards()
        winner = true
} 
};


function updateTotals() {
    setTimeout(() => {
        for (let i=0; i<playerHand.length;i++) {
            playerTotal += playerHand[i].Number
        if ((playerHand[i].Number == 1) && playerTotal<21) {
            playerTotal = playerTotal+10
        } else {}
    } playerTotalAmt.append(` ${playerTotal}`);
    for (let i=0; i<dealerHand.length;i++) {
        dealerTotal += dealerHand[i].Number
    if ((dealerHand[i].Number == 1) && dealerTotal<21) {
        dealerTotal = dealerTotal+10
    } else {}
} 
    gameOver()
}, 3000);
};


function playerHits() {
    if (newDeck.length === 52) {
        newDeck.splice(0, 4)
        let newPlayerCard = newDeck.shift()
        playerHand.push(newPlayerCard)
        playerCard.innerHTML += ` ${newPlayerCard.Value}${newPlayerCard.Suit}`
        updateHitTotal()
        gameOver()
    }
    else {
        let newPlayerCard = newDeck.shift()
        playerHand.push(newPlayerCard)
        playerCard.innerHTML += ` ${newPlayerCard.Value}${newPlayerCard.Suit}`
        updateHitTotal()
        gameOver()
    }
};

function updateHitTotal() {
    playerTotal += playerHand[playerHand.length-1].Number
    playerTotalAmt.innerHTML = `Total: ${playerTotal}`
};

function checkDealerHits() {
    gameOver();
    while(dealerTotal<=16 && !winner) {
        if (dealerTotal <= 16 && newDeck.length === 52){
            newDeck.splice(0, 4)
            let newDealerCard = newDeck.shift()
            dealerHand.push(newDealerCard)
            dealerTotal += newDealerCard.Number
            gameOver()
        } else if (dealerTotal<=16 && !winner && newDealerCard.length < 48) {
        newDealerCard = newDeck.shift()
        dealerHand.push(newDealerCard)
        dealerTotal += newDealerCard.Number
        gameOver()}
    };
}

function showButtons() {
    hitButton.style.display = 'inline-block';
    stayButton.style.display = 'inline-block';
}

function restartGame() {
    suits = ['♦','♠','♣','♥'];
    values = ['Ace',2,3,4,5,6,7,8,9,10,'J','Q','K']
    num = [];
    faceCards = ['J','Q','K']
    newPlayerCard = [];
    newDealerCard =[];

    dealerTotal = 0;
    playerTotal = 0;
    playerHand = [];
    dealerHand = [];
    gameStarted = false;
    winner = false;
    playerWins = false;
    dealerWins = false;
    deck = [];
    newDeck = [];
    newDeckValues = [];
    playerStays = false;
    playerCard.innerHTML = '';
    dealerCard.innerHTML = '';
    dealButton.style.display = 'block';
    playAgainButton.style.display = 'none';
    scorePrompt.innerHTML= '';
    playerTotalAmt.innerHTML = 'Total:';
    dealerTotalAmt.innerHTML = 'Total:';
}


dealButton.addEventListener('click', (event) => {
    createDeck(), shuffle(deck), dealCards(newDeck),displayPlayerCards(),displayDealerCards(), console.log(newDeck), updateTotals(), showButtons();
});


hitButton.addEventListener('click', (event) => {
    playerHits()
});

stayButton.addEventListener('click', (event) => {
playerStays = true, checkDealerHits()
});

playAgainButton.addEventListener('click', (event) => {
restartGame()
    });