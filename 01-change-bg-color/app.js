const root = document.getElementById('root');
const btnChange = document.getElementById('btn-change');
const heading = document.querySelector('h1');

btnChange.addEventListener('click', function () {
	let bgColor = getRandomRGBColor();
	root.style.backgroundColor = bgColor;
});

function getRandomRGBColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return `rgb(${red}, ${green}, ${blue})`;
}
