const $coin = document.querySelector('#coin');
const $score = document.querySelector('#score');
const $counter2 = document.querySelector('#counter2');
const $loadingScreen = document.querySelector('#loading-screen');

const user = Telegram.WebApp ? Telegram.WebApp.initDataUnsafe.user : null;
const userId = user ? user.id : 'unknown';


let dailyLimit = 1000;
let clickBuffer = {
    score: getScore(),
    dailyClicks: getDailyClicks(),
    totalClicks: getTotalClicks(),
};

let timeoutId = null;

function fetchUserDataFarm() {
    return fetch(`https://zircon-flax-garnet.glitch.me/user-data-farm/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            const { counter, dailyClicks, totalClicks, status } = data;

            if (status === 'premium') {
                $coin.src = '../../assets/coin-premium.png';
            } else {
                $coin.src = '../../assets/coin.png';
            }

            clickBuffer.score = counter;
            setScore(counter);

            clickBuffer.dailyClicks = dailyClicks;
            setDailyClicks(dailyClicks);

            clickBuffer.totalClicks = totalClicks;
            setTotalClicks(totalClicks);

            updateCounter2();
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
}

function start() {
    fetchUserDataFarm().then(() => {
        addNameToDatabase();
        $loadingScreen.style.display = 'none';
    }).catch((error) => {
        console.error('Error during data loading:', error);
        $loadingScreen.style.display = 'none';
    });
}

function setScore(score) {
    clickBuffer.score = score;
    localStorage.setItem('score', score);
    $score.textContent = score;
    updateCounter2();
}

function getScore() {
    return Number(localStorage.getItem('score')) || 0;
}

function addOne() {
    if (clickBuffer.dailyClicks < dailyLimit) {
        clickBuffer.score += 1;
        clickBuffer.dailyClicks += 1;
        clickBuffer.totalClicks += 1;
        setScore(clickBuffer.score);
        setDailyClicks(clickBuffer.dailyClicks);
        setTotalClicks(clickBuffer.totalClicks);
    }
}

$coin.addEventListener('click', (event) => {
    if (clickBuffer.dailyClicks >= dailyLimit) {
        console.log('click limit exceeded');
        return;
    }

    const rect = $coin.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const DEG = 40;

    const tiltX = (offsetY / rect.height) * DEG;
    const tiltY = (offsetX / rect.width) * -DEG;

    $coin.style.setProperty('--tiltX', `${tiltX}deg`);
    $coin.style.setProperty('--tiltY', `${tiltY}deg`);

    setTimeout(() => {
        $coin.style.setProperty('--tiltX', '0deg');
        $coin.style.setProperty('--tiltY', '0deg');
    }, 100);

    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = '+1';
    plusOne.style.left = `${event.clientX - rect.left}px`;
    plusOne.style.top = `${event.clientY - rect.top}px`;

    $coin.parentElement.appendChild(plusOne);
    addOne();

    setTimeout(() => {
        plusOne.remove();
    }, 2000);

    updateCounter2();

    clearTimeout(timeoutId);
    timeoutId = setTimeout(sendBufferedData, 300);
});

function sendBufferedData() {
    fetch('https://zircon-flax-garnet.glitch.me/update-all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId,
            counter: clickBuffer.score,
            dailyClicks: clickBuffer.dailyClicks,
            totalClicks: clickBuffer.totalClicks,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Data sent successfully:', data);
        })
        .catch((error) => {
            console.error('Error sending buffered data:', error);
        });
}

function addNameToDatabase() {
    fetch('https://zircon-flax-garnet.glitch.me/add-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId,
            name: user?.username || 'unknown',
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Username added successfully:', data);
    })
    .catch((error) => {
        console.error('Error adding username:', error);
    });
}

function setDailyClicks(clicks) {
    localStorage.setItem('dailyClicks', clicks);
}

function setTotalClicks(clicks) {
    localStorage.setItem('totalClicks', clicks);
}

function getDailyClicks() {
    return Number(localStorage.getItem('dailyClicks')) || 0;
}

function getTotalClicks() {
    return Number(localStorage.getItem('totalClicks')) || 0;
}

function updateCounter2() {
    $counter2.textContent = `${clickBuffer.dailyClicks}/${dailyLimit}`;
}

document.addEventListener('DOMContentLoaded', start);
