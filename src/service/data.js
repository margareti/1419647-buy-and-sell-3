'use strict';

const { DateTime } = require('luxon');
const fs = require(`fs`);
const utils = require(`../utils`);

const titles = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучше рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];

const descriptions = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];

const categories = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

const maxLimit = 1000;

const generateArray = (limit, arr) => {
  const result = [];
  const history = [];
  for (let i = limit; i > 0; i--) {

    let randomIndex;
    do {
      randomIndex = utils.getRandomArbitrary(0, arr.length);
    } while (history.includes(randomIndex));
    history.push(randomIndex);
    const string = arr[randomIndex];
    result.push(string);
  }
  return result;
};

const generateCount = (count = 1) => {
  if (count > maxLimit) {
    return console.log(`Не больше 1000 объявлений`);
  }

  const offers = [];
  for (let i = count; i > 0; i--) {
    const offer = {
      title: utils.getRandomFromArray(titles),
      announce: generateArray(utils.getRandomArbitrary(1, 5), descriptions).join(` `),
      fullText: generateArray(utils.getRandomArbitrary(1, descriptions.length), descriptions).join(` `),
      createdDate: DateTime.local().minus({days: utils.getRandomArbitrary(0, 90)}).toFormat('yyyy-MM-dd hh:mm:ss'),
      category: generateArray(utils.getRandomArbitrary(1, categories.length), categories)
    };
    offers.push(offer);
  }

  fs.writeFile(`mock.json`, JSON.stringify(offers, null, 4), function () {
    return 1;
  });
  return 0;
};

module.exports = {
  generateCount
};
