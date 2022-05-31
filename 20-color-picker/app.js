/**
 * Date: 25-05-2022
 * Author: Aditya Chakraborty
 * Description: Color picker refactoring with huge DOM functionalities
 */

// Globals
let toastContainer = null;
const defaultColor = {
	red: 221,
	green: 222,
	blue: 238,
};

// onload function
window.onload = () => {
	main();
	updateColorCodeToDom(defaultColor);
};

// main or boot function, this function will take care of getting all dom references
function main() {
	// dom references
	const colorHexInp = document.getElementById('input-hex');
	const btnGenerateRandomColor = document.getElementById(
		'btn-generate-random-color'
	);
	const colorSliderRed = document.getElementById('color-slider-red');
	const colorSliderGreen = document.getElementById('color-slider-green');
	const colorSliderBlue = document.getElementById('color-slider-blue');
	const btnCopyToClipboard = document.getElementById('copy-to-clipboard');

	// event listeners
	btnGenerateRandomColor.addEventListener(
		'click',
		handlerBtnGenerateRandomColor
	);

	colorHexInp.addEventListener('keyup', handlerColorHexInp);

	colorSliderRed.addEventListener(
		'change',
		handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
	);

	colorSliderGreen.addEventListener(
		'change',
		handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
	);

	colorSliderBlue.addEventListener(
		'change',
		handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
	);

	btnCopyToClipboard.addEventListener('click', handleBtnCopyToClipboard);
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

function handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue) {
	return function () {
		const color = {
			red: +colorSliderRed.value,
			green: +colorSliderGreen.value,
			blue: +colorSliderBlue.value,
		};

		updateColorCodeToDom(color);
	};
}

function handleBtnCopyToClipboard() {
	const colorModeRadios = document.getElementsByName('color-mode');
	const mode = getCheckedValueFromRadios(colorModeRadios);

	if (mode === null) {
		throw new Error('Invalid Radio Input');
	}

	if (toastContainer !== null) {
		toastContainer.remove();
		toastContainer = null;
	}

	if (mode === 'hex') {
		const hexColor = document.getElementById('input-hex').value;
		if (hexColor && isValidHex(hexColor)) {
			navigator.clipboard.writeText(`#${hexColor}`);
			generateToastMsg(`#${hexColor} copied!`);
			setTimeout(() => {
				toastContainer.remove();
				toastContainer = null;
			}, 5000);
		} else {
			alert('Invalid Hex Code');
		}
	} else {
		const rgbColor = document.getElementById('input-rgb').value;
		if (rgbColor) {
			navigator.clipboard.writeText(rgbColor);
			generateToastMsg(`${rgbColor} copied`);
			setTimeout(() => {
				toastContainer.remove();
				toastContainer = null;
			}, 5000);
		} else {
			alert('Invalid RGB color');
		}
	}
}

// DOM functions

/**
 * Generate a dom element to show toast message
 * @param {string} msg
 */
function generateToastMsg(msg) {
	toastContainer = document.createElement('div');
	toastContainer.innerText = msg;
	toastContainer.className = 'toast-message toast-message-slide-in';

	toastContainer.addEventListener('click', function () {
		toastContainer.classList.remove('toast-message-slide-in');
		toastContainer.classList.add('toast-message-slide-out');

		toastContainer.addEventListener('animationend', function () {
			toastContainer.remove();
			toastContainer = null;
		});
	});

	document.body.appendChild(toastContainer);
}

/**
 * Find the checked elements from a list of radios
 * @param {Array} nodes
 * @returns {string | null}
 */
function getCheckedValueFromRadios(nodes) {
	let checkedValue = null;
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].checked) {
			checkedValue = nodes[i].value;
			break;
		}
	}
	return checkedValue;
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
