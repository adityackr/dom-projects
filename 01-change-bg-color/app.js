const root = document.getElementById('root');
const output = document.getElementById('output');
const btnChange = document.getElementById('btn-change');
const heading = document.querySelector('h1');

btnChange.addEventListener('click', function () {
	let bgColor = getRandomHexColor();
	root.style.backgroundColor = bgColor;
	output.value = bgColor;
});

function getRandomHexColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}
