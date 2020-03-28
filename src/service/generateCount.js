'use strict';

const fs = require(`fs`);
const utils = require(`./utils`);
const titles = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`
];

const descriptions = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.,`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`
];

const categories = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`
];

const offerTypes = [`offer`, `sale`];
const getPicture = (num) => `item${num < 10 ? `0${num}` : num}.jpg`;
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
      picture: getPicture(Math.floor(Math.random() * 16)),
      description: generateArray(utils.getRandomArbitrary(1, 5), descriptions).join(` `),
      type: utils.getRandomFromArray(offerTypes),
      sum: utils.getRandomArbitrary(1000, 100000),
      category: generateArray(utils.getRandomArbitrary(1, 6), categories)
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

