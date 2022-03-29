let div = null;

window.onload = () => {
	main();
};

function main() {
	const root = document.getElementById('root');
	const output = document.getElementById('output');
	const btnChange = document.getElementById('btn-change');
	const btnCopy = document.getElementById('btn-copy');

	btnChange.addEventListener('click', function () {
		let bgColor = getRandomHexColor();
		root.style.backgroundColor = bgColor;
		output.value = bgColor;
	});

	btnCopy.addEventListener('click', function () {
		if (div !== null) {
			div.remove();
			div = null;
		}
		if (isValidHex(output.value)) {
			navigator.clipboard.writeText(output.value);
			generateToastMsg(`${output.value} copied!`);
		} else {
			alert('Invalid Color Code! Please enter a correct color code.');
		}
	});

	output.addEventListener('keyup', function (e) {
		color = e.target.value;
		if (color && isValidHex(color)) {
			root.style.backgroundColor = color;
		}
	});
}

function getRandomHexColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

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
 *
 * @param {string} color
 */
function isValidHex(color) {
	if (color.length !== 7 || color[0] !== '#') return false;

	color = color.substring(1);
	return /^[0-9A-Fa-f]{6}$/i.test(color);
}
