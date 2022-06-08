// Globals
const d = new Date();
let hour = d.toLocaleTimeString().split(':')[0];
let minutes = d.toLocaleTimeString().split(':')[1];
let seconds = d.toLocaleTimeString().split(':')[2].split(' ')[0];
let amPm = d.toLocaleTimeString().split(':')[2].split(' ')[1];

// onload event
window.onload = () => {
	main();
};
// main();
// main function
function main() {
	setTime();
}

// event handlers

// DOM functions
function setTime() {
	const domHour = document.getElementById('hour');
	const domMinutes = document.getElementById('minutes');
	const domSeconds = document.getElementById('seconds');
	const domAmPm = document.getElementById('am-pm');

	domMinutes.innerText = minutes;

	setInterval(() => {
		seconds++;
		if (seconds === 60) {
			seconds = 0;
			minutes++;
			if (minutes === 60 && seconds === 0) {
				minutes = 0;
				++hour;
			}
			if (minutes < 10) {
				domMinutes.innerText = `0${minutes}`;
			} else {
				domMinutes.innerText = minutes;
			}
		}
		if (+seconds < 10) {
			domSeconds.innerText = `0${seconds}`;
		} else {
			domSeconds.innerText = seconds;
		}

		if (minutes === 60 && seconds === 0) {
			minutes = '00';
			++hour;
		}

		if (+hour < 10) {
			domHour.innerText = `0${hour}`;
		} else {
			domHour.innerText = hour;
		}
		if (hour === 12 && minutes === 0 && seconds === 0) {
			amPm === 'PM' ? (amPm = 'AM') : (amPm = 'PM');
		}
		if (hour === 13 && minutes === 0 && seconds === 0) {
			hour = 1;
		}
		domAmPm.innerText = amPm;
	}, 1000);
}
