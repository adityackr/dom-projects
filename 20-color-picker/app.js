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
	const root = document.getElementById('root');
	const output = document.getElementById('output');
	const output2 = document.getElementById('output2');
	const btnChange = document.getElementById('btn-change');
	const btnCopy = document.getElementById('btn-copy');
	const btnCopyRGB = document.getElementById('btn-copy-rgb');

	btnChange.addEventListener('click', function () {
		const color = generateColorDecimal();
		const hex = generateHexColor(color);
		const rgb = generateRGBColor(color);
		root.style.backgroundColor = hex;
		output.value = hex.substring(1);
		output2.value = rgb;
	});

	btnCopy.addEventListener('click', function () {
		if (div !== null) {
			div.remove();
			div = null;
		}
		if (isValidHex(output.value)) {
			navigator.clipboard.writeText(`#${output.value}`);
			generateToastMsg(`#${output.value} copied!`);
		} else {
			alert('Invalid Color Code! Please enter a correct color code.');
		}
	});

	btnCopyRGB.addEventListener('click', function () {
		if (div !== null) {
			div.remove();
			div = null;
		}
		if (isValidHex(output.value)) {
			navigator.clipboard.writeText(output2.value);
			generateToastMsg(`${output2.value} copied!`);
		} else {
			alert('Invalid Color Code! Please enter a correct color code.');
		}
	});

	output.addEventListener('keyup', function (e) {
		const color = e.target.value;
		if (color) {
			output.value = color.toUpperCase();
			if (isValidHex(color)) {
				root.style.backgroundColor = `#${color}`;
				output2.value = hexToRgb(color);
			}
		}
	});
}

// event handlers

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

function updateColorCodeToDom() {}

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
	return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
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
 * converts hex color to rgb
 * @param {string} hex
 * @returns {string}
 */

function hexToRgb(hex) {
	const red = parseInt(hex.slice(0, 2), 16);
	const green = parseInt(hex.slice(2, 4), 16);
	const blue = parseInt(hex.slice(4), 16);

	return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * validate hex color code
 * @param {string} color
 */
function isValidHex(color) {
	if (color.length !== 6) return false;
	return /^[0-9A-Fa-f]{6}$/i.test(color);
}
