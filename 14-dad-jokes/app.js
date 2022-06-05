const jokeEL = document.getElementById('joke');
const btnJoke = document.getElementById('btn-joke');

const generateJoke = async () => {
	const res = await fetch('https://icanhazdadjoke.com/', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	});
	const data = await res.json();
	jokeEL.innerHTML = data.joke;
};

btnJoke.addEventListener('click', generateJoke);

generateJoke();
