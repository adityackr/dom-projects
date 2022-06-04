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
const defaultPresetColors = [
	'#ffcdd2',
	'#f8bbd0',
	'#e1bee7',
	'#ff8a80',
	'#ff80ab',
	'#ea80fc',
	'#b39ddb',
	'#9fa8da',
	'#90caf9',
	'#b388ff',
	'#8c9eff',
	'#82b1ff',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#80d8ff',
	'#84ffff',
	'#a7ffeb',
	'#c8e6c9',
	'#dcedc8',
	'#f0f4c3',
	'#b9f6ca',
	'#ccff90',
	'#ffcc80',
];
const customColors = [];
const copySound = new Audio('./copy-sound.wav');

// onload function
window.onload = () => {
	main();
	updateColorCodeToDom(defaultColor);
	// display color boxes
	displayColorBoxes(
		document.getElementById('preset-colors'),
		defaultPresetColors
	);
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
	const btnSaveToCustom = document.getElementById('save-to-custom');
	const presetColorParent = document.getElementById('preset-colors');
	const customColorParent = document.getElementById('custom-colors');

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

	presetColorParent.addEventListener('click', handlePresetColorParent);

	btnSaveToCustom.addEventListener(
		'click',
		handleBtnSaveToCustom(customColorParent, colorHexInp)
	);
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
			copySound.volume = 0.2;
			copySound.play();
			generateToastMsg(`#${hexColor} copied!`);
		} else {
			alert('Invalid Hex Code');
		}
	} else {
		const rgbColor = document.getElementById('input-rgb').value;
		if (rgbColor) {
			navigator.clipboard.writeText(rgbColor);
			copySound.volume = 0.2;
			copySound.play();
			generateToastMsg(`${rgbColor} copied`);
		} else {
			alert('Invalid RGB color');
		}
	}
}

function handlePresetColorParent(event) {
	const child = event.target;
	if (toastContainer !== null) {
		toastContainer.remove();
		toastContainer = null;
	}

	if (child.className === 'color-box') {
		const color = child.getAttribute('data-color');
		navigator.clipboard.writeText(color);
		copySound.volume = 0.2;
		copySound.play();
		generateToastMsg(`${color.toUpperCase()} copied!`);
	}
}

function handleBtnSaveToCustom(customColorParent, inputHex) {
	return function () {
		customColors.push(`#${inputHex.value}`);
		removeChildren(customColorParent);
		displayColorBoxes(customColorParent, customColors);
	};
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
	setTimeout(() => {
		toastContainer.remove();
		toastContainer = null;
	}, 3000);
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

/**
 * create a div element with class name color-box
 * @param {string} color
 * @returns {object}
 */
function generateColorBox(color) {
	const div = document.createElement('div');
	div.className = 'color-box';
	div.style.backgroundColor = color;
	div.setAttribute('data-color', color);

	return div;
}

/**
 * This function will create and append new color boxes to it's parent
 * @param {object} parent
 * @param {Array} colors
 */
function displayColorBoxes(parent, colors) {
	colors.forEach((color) => {
		const colorBox = generateColorBox(color);
		parent.appendChild(colorBox);
	});
}

/**
 * remove all children from parent
 * @param {object} parent
 */
function removeChildren(parent) {
	let child = parent.lastElementChild;
	while (child) {
		parent.removeChild(child);
		child = parent.lastElementChild;
	}
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
