const toggles = document.querySelectorAll('.faq-toggle');

toggles.forEach((toggle) => {
	toggle.addEventListener('click', () => {
		removeActiveClass();
		toggle.parentNode.classList.toggle('active');
	});
});

function removeActiveClass() {
	toggles.forEach((toggle) => toggle.parentNode.classList.remove('active'));
}
