// function showScreen(screenId) {
//   var screens = document.getElementsByClassName('screen');
//   for (var i = 0; i < screens.length; i++) {
//     screens[i].style.display = 'none';
//   }
//   document.getElementById(screenId).style.display = 'block';
// }

function game() {
  // Константы
  const FLIP_DELAY = 1000;
  const REMOVE_DELAY = 700;
  const END_GAME_DELAY = 1100;

  // Колода карт
  const cards = [
    'A', 'A', 'B', 'B',
    'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H'
  ];

  // Функция для перемешивания карт
  function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
  }

  // Функция создания карт
  function createCards() {
    cards.forEach((card, index) => {
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

      gameBoard.appendChild(cardElement);
    });
  }

  // Обработчик клика по карте
  function handleCardClick(event) {
    const clickedCard = event.target.closest('.card');

    if (!clickedCard || flippedCards.length === 2) {
      return;
    }

    const index = clickedCard.getAttribute('data-index');

    if (flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    clickedCard.classList.add('flipped');

    flippedCards.push(index);
    flippedCardsElements.push(clickedCard);

    // Если открыты две карты
    if (flippedCards.length === 2) {
      checkForMatch();
    }

    // Проверяем, завершилась ли игра
    if (matchedCards.length === cards.length) {
      endGame();
    }
  }

  // Функция обработки совпадения открытых карт
  function checkForMatch() {
    const [firstIndex, secondIndex] = flippedCards;

    if (cards[firstIndex] === cards[secondIndex]) {
      setTimeout(() => {
        removeMatchedCards();
        clearFlippedCards();
      }, REMOVE_DELAY);

      matchedCards.push(firstIndex, secondIndex);
    } else {
      setTimeout(() => {
        resetFlippedCards();
        clearFlippedCards();
      }, FLIP_DELAY);
    }
  }

  // Функция удаления совпавших карт
  function removeMatchedCards() {
    flippedCardsElements.forEach(cardElement => cardElement.classList.add('remove'));
  }

  // Функция сброса перевернутых карт
  function resetFlippedCards() {
    flippedCardsElements.forEach(cardElement => cardElement.classList.remove('flipped'));
  }

  // Функция очистки перевернутых карт
  function clearFlippedCards() {
    flippedCards = [];
    flippedCardsElements = [];
  };

  // Функция завершения игры
  function endGame() {
    setTimeout(() => {
      alert('Поздравляем! Вы нашли все пары!');
    }, END_GAME_DELAY);
  }

  // Получаем элемент игрового поля
  const gameBoard = document.getElementById('gameBoard');

  // Перемешиваем карты
  shuffleCards();

  // Создаем карты на игровом поле
  createCards();

  let flippedCards = [];
  let flippedCardsElements = [];
  let matchedCards = [];

  gameBoard.addEventListener('click', handleCardClick);
}

game();