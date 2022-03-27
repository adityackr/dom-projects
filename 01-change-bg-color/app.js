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
		navigator.clipboard.writeText(output.value);
	});
}

function getRandomHexColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}
