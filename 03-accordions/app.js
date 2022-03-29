const accordions = document.querySelectorAll('.accordion');

for (let i = 0; i < accordions.length; i++) {
	accordions[i].addEventListener('click', function () {
		this.classList.toggle('active');
		const panel = this.nextElementSibling;
		if (panel.style.maxHeight || panel.style.padding) {
			panel.style.maxHeight = null;
			panel.style.padding = null;
		} else {
			panel.style.maxHeight = `${panel.scrollHeight}px`;
			panel.style.padding = `1rem`;
		}
	});
}
