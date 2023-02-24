const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"



startGame();

function startGame() {

    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML ='';
    game.cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    })
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face == FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "/images/" + card.icon + ".jpg";
        cardElementFace.appendChild(iconElement);
    } else {
       // cardElementFace.innerHTML = "Last";
       let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "/images/Name_The Last of Us.png";
        cardElementFace.appendChild(iconElement);
    }
    element.appendChild(cardElementFace);
}





function flipCard() {

    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';   
                }
            } else {

                setTimeout(() => {
                    let fisrtCardView = document.getElementById(game.fisrtCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    fisrtCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            };
        }
    }

}
