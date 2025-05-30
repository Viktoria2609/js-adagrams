const LETTER_POOL = {
  A: 9, B: 2, C: 2, D: 4, E: 12,
  F: 2, G: 3, H: 2, I: 9, J: 1,
  K: 1, L: 4, M: 2, N: 6, O: 8,
  P: 2, Q: 1, R: 6, S: 4, T: 6,
  U: 4, V: 2, W: 2, X: 1, Y: 2,
  Z: 1,
};

const SCORE_CHART = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
};

const ADDITIONAL_POINTS = 8;

export const drawLetters = () => {
  const allLetters = [];
  for (const letter in LETTER_POOL) {
    const count = LETTER_POOL[letter];
    for (let i = 0; i < count; i++) {
      allLetters.push(letter);
    }
  }

  const hand = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * allLetters.length);
    const letter = allLetters.splice(randomIndex, 1)[0];
    hand.push(letter);
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
 
  const letterCount = {};

  for (let letter of lettersInHand) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  
  for (let char of input.toUpperCase()) {
    if (!letterCount[char] || letterCount[char] === 0) {
      return false; 
    }
    letterCount[char] -= 1;
  }

  return true;
};

export const scoreWord = (word) => {
    let totalScore = 0;
    for(let i = 0; i < word.length; i++){
      let char = word[i].toUpperCase();
      totalScore += SCORE_CHART[char] || 0;
    }

    if (word.length >= 7 && word.length <= 10) {
    totalScore += ADDITIONAL_POINTS;
  }
    return totalScore;
  };

export const highestScoreFrom = (words) => {
    let bestWord = "";
  let highestScore = 0;

  for (const word of words) {
    const currentScore = scoreWord(word);

    if (currentScore > highestScore) {
      bestWord = word;
      highestScore = currentScore;
    } else if (currentScore === highestScore) {
      if (bestWord.length === 10) continue;
      if (word.length === 10) {
        bestWord = word;
      } else if (word.length < bestWord.length) {
        bestWord = word;
      }
    }
  }

  return { word: bestWord, score: highestScore };
};
