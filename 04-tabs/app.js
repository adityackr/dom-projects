const tabContents = document.querySelectorAll('.tab-content');
const tabLinks = document.querySelectorAll('.tab-link');
const dhaka = document.getElementById('Dhaka');
const paris = document.getElementById('Paris');
const tokyo = document.getElementById('Tokyo');
const btnDhaka = document.querySelector('.btn-dhaka');
const btnParis = document.querySelector('.btn-paris');
const btnTokyo = document.querySelector('.btn-tokyo');

// btnDhaka.addEventListener('click', openCity(event, dhaka));

function openCity(e, cityName) {
	for (let i = 0; i < tabContents.length; i++) {
		const tabContent = tabContents[i];
		tabContent.style.display = 'none';
	}

	for (let i = 0; i < tabLinks.length; i++) {
		const tabLink = tabLinks[i];
		tabLink.className = tabLink.className.replace(' active', '');
	}
	document.getElementById(cityName).style.display = 'block';
	e.currentTarget.className += ' active';
}
