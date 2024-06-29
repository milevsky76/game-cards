class MemoryGame {
  constructor(config = {}) {
    this.config = Object.assign({
      flipDelay: 1000,
      removeDelay: 700,
      cardSymbols: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      boardElementId: 'gameBoard'
    }, config);

    // Проверяем config
    this.validateConfig();

    // Создаем символы
    this.createCardSymbols();
    // Перемешиваем символы
    this.shuffleCardSymbols();
    // Создаем карты на игровом поле
    this.createCards();

    // Инициализируем переменные состояния
    this.flippedCards = [];
    this.flippedCardsElements = [];
    this.matchedCards = [];

    // Добавляем обработчик клика по карте
    this.gameBoard.addEventListener('click', this.handleCardClick.bind(this));
  }

  // Проверка корректности config
  validateConfig() {
    if (!Array.isArray(this.config.cardSymbols) || this.config.cardSymbols.length < 2) {
      throw new Error('Некорректная конфигурация: cardSymbols должен быть массивом с минимум двумя символами.');
    }

    if (this.config.cardSymbols.length * 2 > 16) {
      throw new Error('Слишком много символов карт. Максимальное количество символов - 8 пар.');
    }

    this.gameBoard = document.getElementById(this.config.boardElementId);
    if (!this.gameBoard) {
      throw new Error('Элемент игрового поля не найден.');
    }
  }

  // Создание символов
  createCardSymbols() {
    this.symbols = this.config.cardSymbols.concat(this.config.cardSymbols);
  }

  // Перемешивание символов
  shuffleCardSymbols() {
    this.symbols.sort(() => Math.random() - 0.5);
  }

  // Создание карт
  createCards() {
    this.symbols.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.setAttribute('data-index', index);

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');

      const front = document.createElement('div');
      front.classList.add('front');
      front.textContent = card;

      const back = document.createElement('div');
      back.classList.add('back');

      cardInner.appendChild(front);
      cardInner.appendChild(back);

      cardElement.appendChild(cardInner);

      this.gameBoard.appendChild(cardElement);
    });
  }

  // Обработчик клика по карте
  handleCardClick(event) {
    const clickedCard = event.target.closest('.card');

    if (!clickedCard || this.flippedCards.length === 2) {
      return;
    }

    const index = clickedCard.getAttribute('data-index');

    if (this.flippedCards.includes(index) || this.matchedCards.includes(index)) {
      return;
    }

    clickedCard.classList.add('flipped');

    this.flippedCards.push(index);
    this.flippedCardsElements.push(clickedCard);

    // Если открыты две карты
    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }

  // Проверка открытых карт
  checkForMatch() {
    const [firstIndex, secondIndex] = this.flippedCards;

    if (this.symbols[firstIndex] === this.symbols[secondIndex]) {
      this.matchedCards.push(firstIndex, secondIndex);

      setTimeout(() => {
        this.removeMatchedCards();
        this.clearFlippedCards();
        this.checkEndGame()
      }, this.config.removeDelay);
    } else {
      setTimeout(() => {
        this.resetFlippedCards();
        this.clearFlippedCards();
      }, this.config.flipDelay);
    }
  }

  // Удаление совпавших карт
  removeMatchedCards() {
    this.flippedCardsElements.forEach(cardElement => cardElement.classList.add('remove'));
  }

  // Сброс перевернутых карт
  resetFlippedCards() {
    this.flippedCardsElements.forEach(cardElement => cardElement.classList.remove('flipped'));
  }

  // Очистка переменных перевернутых карт
  clearFlippedCards() {
    this.flippedCards = [];
    this.flippedCardsElements = [];
  };

  // Проверка завершения игры
  checkEndGame() {
    if (this.matchedCards.length === this.config.cardSymbols.length * 2) {
      alert('Поздравляем! Вы нашли все пары!');
    }
  }
}