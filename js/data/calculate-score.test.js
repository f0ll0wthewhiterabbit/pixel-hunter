import {assert} from 'chai';
import {calculateScore, ANSWERS_AMOUNT, MAX_LIVES_AMOUNT} from './calculate-score';

describe(`Calculate score`, () => {
	// Correct data
	it(`should calculate score correctly`, () => {
		// Возвращает 1150 очков, если ответил на все вопросы и не быстро, и не медленно, остались все 3 жизни
		assert.equal(calculateScore(new Array(ANSWERS_AMOUNT).fill({isRight: true, timeElapsed: 15}), 3), 1150);

		// Возвращает 1650 очков, если ответил на все вопросы быстро, остались все 3 жизни
		assert.equal(calculateScore(new Array(ANSWERS_AMOUNT).fill({isRight: true, timeElapsed: 5}), 3), 1650);

		// Возвращает 650 очков, если ответил на все вопросы медленно, остались все 3 жизни
		assert.equal(calculateScore(new Array(ANSWERS_AMOUNT).fill({isRight: true, timeElapsed: 25}), 3), 650);

		// Возвращает 1000 очков, если ответил на все вопросы и не быстро, и не медленно, не осталось жизней
		assert.equal(calculateScore(new Array(ANSWERS_AMOUNT).fill({isRight: true, timeElapsed: 15}), 0), 1000);

		// Возвращает 1050 очков, если ответил на все вопросы и не быстро, и не медленно, осталась 1 жизнь
		assert.equal(calculateScore(new Array(ANSWERS_AMOUNT).fill({isRight: true, timeElapsed: 15}), 1), 1050);
	});

	// Incorrect data
	it(`should return -1 if answers amount less then ${ANSWERS_AMOUNT}`, () => {
		const answers = new Array(ANSWERS_AMOUNT - 1).fill({isRight: true, timeElapsed: 15});

		assert.equal(calculateScore(answers, 2), -1);
	});

	it(`should return -1 if answers amount more then ${ANSWERS_AMOUNT}`, () => {
		const answers = new Array(ANSWERS_AMOUNT + 1).fill({isRight: true, timeElapsed: 15});

		assert.equal(calculateScore(answers, 2), -1);
	});

	it(`should return -1 if livesLeftAmount amount less then 0 or more then ${MAX_LIVES_AMOUNT}`, () => {
		const answers = new Array(ANSWERS_AMOUNT).fill({isRight: true, timeElapsed: 15});

		assert.equal(calculateScore(answers, -1), -1);
		assert.equal(calculateScore(answers, 4), -1);
	});

	// Invalid data
	it(`should thow an error if second parameter is not a number`, () => {
		const answers = new Array(ANSWERS_AMOUNT).fill({isRight: true, timeElapsed: 15});

		assert.throws(() => calculateScore(answers, `0`), `Second parameter should be a number`);
		assert.throws(() => calculateScore(answers, ``), `Second parameter should be a number`);
		assert.throws(() => calculateScore(answers, []), `Second parameter should be a number`);
		assert.throws(() => calculateScore(answers, {}), `Second parameter should be a number`);
		assert.throws(() => calculateScore(answers, undefined), `Second parameter should be a number`);
	});

	it(`should thow an error if first parameter is not an array `, () => {
		assert.throws(() => calculateScore({}, 3), `Second parameter should be an array`);
		assert.throws(() => calculateScore(``, 3), `Second parameter should be an array`);
		assert.throws(() => calculateScore(1, 3), `Second parameter should be an array`);
		assert.throws(() => calculateScore(undefined, 3), `Second parameter should be an array`);
	});
});