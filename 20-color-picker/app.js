/**
 * Date: 25-05-2022
 * Author: Aditya Chakraborty
 * Description: Color picker refactoring with huge DOM functionalities
 */

// Globals
let div = null;

// onload function
window.onload = () => {
	main();
};

// main or boot function, this function will take care of getting all dom references
function main() {
	const colorHexInp = document.getElementById('input-hex');
	const btnGenerateRandomColor = document.getElementById(
		'btn-generate-random-color'
	);

	btnGenerateRandomColor.addEventListener(
		'click',
		handlerBtnGenerateRandomColor
	);

	colorHexInp.addEventListener('keyup', handlerColorHexInp);
}

// event handlers
function handlerBtnGenerateRandomColor() {
	const color = generateColorDecimal();
	updateColorCodeToDom(color);
}

function handlerColorHexInp(e) {
	const hexColor = e.target.value;
	if (hexColor) {
		this.value = hexColor.toUpperCase();
		if (isValidHex(hexColor)) {
			const color = hexToDecimalColors(hexColor);
			updateColorCodeToDom(color);
		}
	}
}

// DOM functions

function generateToastMsg(msg) {
	div = document.createElement('div');
	div.innerText = msg;
	div.className = 'toast-message toast-message-slide-in';

	div.addEventListener('click', function () {
		div.classList.remove('toast-message-slide-in');
		div.classList.add('toast-message-slide-out');

		div.addEventListener('animationend', function () {
			div.remove();
			div = null;
		});
	});

	document.body.appendChild(div);
}

/**
 * update dom elements with calculated color values
 * @param {object} color
 */
function updateColorCodeToDom(color) {
	const hexColor = generateHexColor(color);
	const rgbColor = generateRGBColor(color);
	document.getElementById(
		'color-display'
	).style.backgroundColor = `#${hexColor}`;
	document.getElementById('input-hex').value = hexColor;
	document.getElementById('input-rgb').value = rgbColor;
	document.getElementById('color-slider-red').value = color.red;
	document.getElementById('color-slider-red-label').innerText = color.red;
	document.getElementById('color-slider-green').value = color.green;
	document.getElementById('color-slider-green-label').innerText = color.green;
	document.getElementById('color-slider-blue').value = color.blue;
	document.getElementById('color-slider-blue-label').innerText = color.blue;
}

// Utils

/**
 * generates and returns an object of three decimal random color code
 * @returns {object}
 */
function generateColorDecimal() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return {
		red,
		green,
		blue,
	};
}

/**
 * takes a color object of three decimal values and returns hex color code
 * @param {object} color
 * @returns {string}
 */
function generateHexColor({ red, green, blue }) {
	const getTwoCode = (value) => {
		const hex = value.toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	};
	return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
		blue
	)}`.toUpperCase();
}

/**
 * takes a color object of three decimal values and returns RGB color code
 * @param {object} color
 * @returns {string}
 */
function generateRGBColor({ red, green, blue }) {
	return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * converts hex color to decimal color object
 * @param {string} hex
 * @returns {object}
 */

function hexToDecimalColors(hex) {
	const red = parseInt(hex.slice(0, 2), 16);
	const green = parseInt(hex.slice(2, 4), 16);
	const blue = parseInt(hex.slice(4), 16);

	return {
		red,
		green,
		blue,
	};
}

/**
 * validate hex color code
 * @param {string} color
 */
function isValidHex(color) {
	if (color.length !== 6) return false;
	return /^[0-9A-Fa-f]{6}$/i.test(color);
}
