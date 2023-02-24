let game = {

    lockMode: false,
    fisrtCard: null,
    secondCard: null,

    techs: ['anna',
        'bella', 'gabriel', 'joel',
        'keyvon', 'melanie', 'murray',
        'nick', 'sarah', 'storm'],

    cards: null,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.fisrtCard) {
            this.fisrtCard = card;
            this.fisrtCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    checkMatch: function () {
        if(!this.fisrtCard|| !this.secondCard){
        return false;
        }
        return this.fisrtCard.icon === this.secondCard.icon;
        
    },
    clearCards: function () {
        this.fisrtCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    unflipCards(){
        this.fisrtCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(card =>!card.flipped).length == 0;

    },

    


    createCardsFromTechs: function () {

        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },


    createPairFromTech: function (tech) {

        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] =
                [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }


}

function restart (){
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}