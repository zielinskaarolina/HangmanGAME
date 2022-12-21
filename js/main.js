//SEKCJA PRZYWITANIE
const mainGame = document.querySelector('.wrapper')
const sectionWelcome = document.querySelector('.welcome');
const welcome = document.querySelector('.welcomeH');
const buttonWelcome = document.querySelector('.welcomeB');
const categoryPlace = document.querySelector('.category');
const start = document.querySelector('.start');

let welcomeText = 'Do u wanna play handman?';
let welcomeArray = [...welcomeText];


let letter = 0;
let catArray = []


const chooseCategory = () => {
	sectionWelcome.classList.add('none');
	document.querySelector('.category').classList.remove('none');
    document.querySelectorAll('.categoryName').forEach((name)=>{
        name.addEventListener("click", (e) => {
            catArray.push(e.target.textContent)
            console.log(catArray);
            categoryPlace.classList.add('none')
            mainGame.classList.remove('none')
            start.addEventListener("click",()=>{
		    startGame()
	    })
        })
    })
};



const showText = () => {
	welcome.textContent += welcomeArray[letter];
	letter++;

	if (letter === welcomeArray.length) {
		clearInterval(stopInterval);
		setTimeout(() => {
			buttonWelcome.classList.remove('none');
		}, 1000);

		buttonWelcome.addEventListener('click', chooseCategory);
	}
};

const stopInterval = setInterval(showText, 100);

//DOM
const alphabetPlace = document.querySelector('.alpa');
const secondPhoto = document.querySelector('.secondPhoto');
const hasloPlace = document.querySelector('.haslo');
const mainPhoto = document.querySelector('.mainPhoto');
const resultText = document.querySelector('.result');
const refresh = document.querySelector('.refresh');
const wins = document.querySelector('.winSpan');
const loses = document.querySelector('.losesSpan');
const mainGameWrapper = document.querySelector('.wrapper');

//TABLICE
const alphabetArray = [
	'A',
	'Ą',
	'B',
	'C',
	'Ć',
	'D',
	'E',
	'Ę',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'Ł',
	'M',
	'N',
	'Ń',
	'O',
	'Ó',
	'P',
	'R',
	'S',
	'Ś',
	'T',
	'U',
	'W',
	'Y',
	'Z',
	'Ż',
	'Ź',
];
const randomWords = ['KOT', 'PIES', 'PAPUGA', 'SŁOŃ', 'CHOMIK'];
let animalsArray = ['PIES','KOT','ŻÓŁW']
let colorsArray = ['ŻÓŁTY','ZIELONY','NIEBIESKI']
let alcoArray = ['WHISKEY','WÓDKA','WINO']
let plantArray = ['JEMIOŁA','RÓŻA','FIOŁEK']
let christmasArray = ['PIEROGI','PREZENTY','MIKOŁAJ']

const imagesHangman = [
	'./img/wisielec0.png',
	'./img/Wisielec2.png',
	'./img/Wisielec3.png',
	'./img/Wisielec4.png',
	'./img/Wisielec5.png',
	'./img/Wisielec6.png',
	'./img/Wisielec7.png',
	'./img/Wisielec8.png',
	'./img/Wisielec9.png',
	'./img/Wisielec10.png',
	'./img/Wisielec11.png',
];

//STWORZENIE <P> Z CAŁYM ALFABETEM
const createAlphabet = () => {
	for (let i = 0; i < alphabetArray.length; i++) {
		const p = document.createElement('p');
		p.textContent = alphabetArray[i];
		alphabetPlace.appendChild(p);
	}
};
createAlphabet();

const letters = document.querySelectorAll('.alpa p');

let countPhoto = 0;
let randomWord = undefined;
let randomWordArray = undefined;
let emptyWordLetter = [];
let winsGame = 0;
let losesGame = 0;
let categoryName = ''


const resetGame = () => {
	
	refresh.classList.add('animation');
	setTimeout(() => {
		refresh.classList.remove('animation');
	}, 500);
	start.classList.remove('none');
	mainPhoto.src = imagesHangman[0]
	randomWord = undefined;
	emptyWordLetter = [];
	hasloPlace.textContent = '';
	countPhoto = 0;
	winsGame--;

	for (let i = 0; i < alphabetArray.length; i++) {
		letters.forEach((letter) => {
			letter.textContent = alphabetArray[i++];
		});
	}
	resultText.textContent = '';
};
//ANIMACJA ZDJECIA PO WCISNIECIU PRZYCISKU START
const photoAnimation = () => {
	secondPhoto.style.animation = 'startGameAnimation 1s linear forwards';
};
//WYLOSOWANIE RANDOMOWEGO SLOWA NA RUNDE Z TABLICY SLOW
const getRandomWord = () => {
    if(catArray[0]==='ZWIERZĘTA'){
        return animalsArray[Math.floor(Math.random() * animalsArray.length)];
    }
	else if(catArray[0] === 'KOLORY'){
        return colorsArray[Math.floor(Math.random() * colorsArray.length)];
    }else if(catArray[0]==='ALKOHOLE'){
        return alcoArray[Math.floor(Math.random() * alcoArray.length)];
    }else if(catArray[0]==='ROŚLINY'){
        return plantArray[Math.floor(Math.random() * plantArray.length)];
    }else if(catArray[0]==='ŚWIĘTA'){
        return christmasArray[Math.floor(Math.random() * christmasArray.length)];
    }
};

const checkLetter = (rand, lett) => {
	if (!rand.indexOf(lett)) {
		mainPhoto.src = imagesHangman[countPhoto];
		countPhoto++;
	} else {
		let indexes = [];
		for (let i = 0; i < rand.length; i++) {
			if (rand[i] === lett) {
				indexes.push(i);
			}
		}
	}
};



const startGame = () => {

    console.log("start");
	start.classList.add('none');
	photoAnimation();
	//RANDOMOWE SLOWO
	randomWord = getRandomWord();
	//RANDOMOWE SLOWO W TABLICY
	randomWordArray = [...randomWord];
	//SLOWO PODZIELONE NA LITERY KAZDA Z LITER ZAMIENIONA NA PODKRESLENIE ['_','_','_','_']

	randomWordArray.forEach((letter) => {
		letter = '_ ';
		emptyWordLetter.push(letter);
	});
	emptyWordLetter.forEach((empty) => {
		hasloPlace.textContent += empty;
	});

	letters.forEach((letter) => {
		letter.addEventListener('click', () => {
			const letterContent = letter.textContent;
			if (randomWord.includes(letterContent)) {
				let indexes = [];
				for (let i = 0; i < randomWord.length; i++)
					if (randomWord[i] === letterContent) indexes.push(i);

				indexes.forEach((index) => {
					emptyWordLetter[index] = letterContent;
				});

				hasloPlace.textContent = '';

				emptyWordLetter.forEach((word) => {
					hasloPlace.textContent += word;
				});
				console.log(hasloPlace.textContent);
				console.log(randomWord);

				if (hasloPlace.textContent === randomWord) {
					
					resultText.textContent = 'BRAWO WYGRYWASZ!'
                    			resultText.style.color = '#7CFC00';
					setTimeout(resetGame, 1000);
					return;
				}
			} else {
				mainPhoto.src = imagesHangman[countPhoto];
				countPhoto++;

				if (countPhoto === imagesHangman.length) {
					resultText.textContent = 'NIESTETY PRZEGRYWASZ!'
					resultText.style.color = 'red';
					setTimeout(resetGame, 1000);
					return;
				}
			}

			letter.textContent = '';
		});
	});
};

//EVENTY
refresh.addEventListener('click', resetGame);

