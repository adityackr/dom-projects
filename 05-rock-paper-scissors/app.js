const displayComputerChoice = document.getElementById('computer-choice');
const displayUserChoice = document.getElementById('user-choice');
const result = document.getElementById('result');
const choices = document.querySelectorAll('button');

let computerChoice;
let userChoice;

// window.onload = () => {
// 	main();
// };

main();

function main() {
	choices.forEach((choice) => {
		choice.addEventListener('click', (e) => {
			userChoice = e.target.innerText;
			displayUserChoice.innerHTML = userChoice;
			getComputerChoice();
			getResult();
		});
	});
}

function getComputerChoice() {
	const computerChoiceIndex = Math.floor(Math.random() * choices.length);

	computerChoice = choices[computerChoiceIndex].innerText;

	displayComputerChoice.innerText = computerChoice;
}

function getResult() {
	if (computerChoice === userChoice) {
		result.innerText = "It's a draw! 🎁";
	}
	if (computerChoice === 'Rock ✊' && userChoice === 'Paper ✋') {
		result.innerText = 'You Win! 🏆';
	}
	if (computerChoice === 'Rock ✊' && userChoice === 'Scissors ✌') {
		result.innerText = 'You Lose! ❌';
	}
	if (computerChoice === 'Paper ✋' && userChoice === 'Rock ✊') {
		result.innerText = 'You Lose! ❌';
	}
	if (computerChoice === 'Paper ✋' && userChoice === 'Scissors ✌') {
		result.innerText = 'You Win! 🏆';
	}
	if (computerChoice === 'Scissors ✌' && userChoice === 'Rock ✊') {
		result.innerText = 'You Win! 🏆';
	}
	if (computerChoice === 'Scissors ✌' && userChoice === 'Paper ✋') {
		result.innerText = 'You Lose! ❌';
	}
	console.log(computerChoice, userChoice);
}
