const texts = {
    en: {
        header: "Here's very important information, bro! Please read it, bro!",
        content: `First of all, you must to connect your wallet. Click the «connect wallet» button and follow the instructions of your TON-wallet. After this, you can change your wallet-address as many times as you like. I need this so you can cash your ABA-coins!)
        When you open the «Withdraw money» form to receive ABA-coins, you will see only one field: «How many, bro».
        In this window you must indicate the number of ABA-coins you want to receive, but keep in mind that you will not be able to withdraw coins until you connect your TON-wallet.
        And now the most important part! After clicking the button «Take cash, bro», you must wait for one notification and only then close the window! And from this moment on, I undertake to send your ABA-coins within 48 hours (including nights, weekends, all kinds of floods, fires and all other incidents that may distract me from sending your ABA-coins). If you haven’t received coins during this time, then check whether you connected the right TON-wallet, and if everything is correct, then you can start swearing and cursing me. But remember that I love you and will never leave you without your coins, bro!)`,
        thanks: "Thank you for your attention, I’m all done, bro!)"
    },
    ru: {
        header: "Здесь очень важная информация, бро! Пожалуйста, прочитай её!",
        content: `Прежде всего, ты должен подключить свой кошелек. Нажми кнопку «connect wallet» и следуй инструкциям твоего кошелька. После этого ты сможешь изменить адрес своего кошелька столько раз, сколько захочешь. Мне это нужно, чтобы ты мог залутать свои ABA-coins!)
        Когда ты откроешь форму «Withdraw money», чтобы получить ABA-coins, ты увидишь только одно поле: «How many, bro».
        В этом окне ты должен указать количество ABA-coins, которое ты хочешь получить, но имей в виду, что ты не сможешь вывести монеты, пока не подключишь свой кошелек.
        А теперь самое главное! После нажатия кнопки «Take cash, bro» необходимо дождаться одного уведомления и только после этого закрыть окно! И с этого момента я обязуюсь отправить твои ABA-coins в течение 48 часов (включая ночи, выходные, всевозможные наводнения, пожары и все другие происшествия, которые могут отвлечь меня от отправки твоих ABA-coins). Если за это время ты не получил монеты, то проверь, подключил ли ты правильный кошелек, и если все правильно, то можешь начинать ругаться и проклинать меня. Но помни, что я люблю тебя и никогда не оставлю без твоих монет, бро!)`,
        thanks: "Спасибо за внимание, у меня всё, бро!)"
    }
};

const modalHeader = document.getElementById('modal-content-info');
const modalText = document.getElementById('modal-text-info');
const modalThanks = document.getElementById('modal-thanks-info');

function setModalText(language) {
    modalHeader.textContent = texts[language].header;
    modalText.textContent = texts[language].content;
    modalThanks.textContent = texts[language].thanks;
}

function saveLanguage(language) {
    localStorage.setItem('preferredLanguage', language);
}

function loadLanguage() {
    return localStorage.getItem('preferredLanguage') || 'en';
}


const infoModal = document.getElementById("infoModal");
const infoButton = document.getElementById("info-button");
const closeButton = document.querySelector(".modal-info .close-info");

infoButton.onclick = function() {
    const savedLanguage = loadLanguage();
    setModalText(savedLanguage);
    infoModal.style.display = "block";
}

closeButton.onclick = function() {
    infoModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == infoModal) {
        infoModal.style.display = "none";
    }
}


const enBtn = document.getElementById('en-btn-info');
const ruBtn = document.getElementById('ru-btn-info');

enBtn.onclick = function() {
    setModalText('en');
    saveLanguage('en');
}

ruBtn.onclick = function() {
    setModalText('ru');
    saveLanguage('ru');
}


// TON Connect
const tonConnectUIWallet = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://raw.githubusercontent.com/abadoon-fjc/tonconnect-manifest/main/tonconnect-manifest.json',
    buttonRootId: 'connect-button-root-wallet'
});

tonConnectUIWallet.onStatusChange(wallet => {
    const Img = document.getElementById('HeaderWalletImage');
    const WalletName = document.getElementById('HeaderWalletName');
    const AppVersion = document.getElementById('HeaderWalletAppVersion');
    const AboutWalletUrl = document.getElementById('HeaderWalletUrl');

    if (wallet) {
        Img.src = wallet.imageUrl;
        WalletName.innerText = wallet.name;
        AppVersion.innerHTML = `App version: ${wallet.device.appVersion}`;
        AboutWalletUrl.innerHTML = `About wallet: <a href="${wallet.aboutUrl}" target="_blank">${wallet.aboutUrl}</a>`;

        const userId = Telegram.WebApp.initDataUnsafe.user.id;
        const walletAddress = wallet.account.address;
        const walletName = wallet.name;

        const savedWalletName = localStorage.getItem('walletName');
        const savedWalletAddress = localStorage.getItem('walletAddress');

        if (savedWalletName !== walletName || savedWalletAddress !== walletAddress) {
            localStorage.setItem('walletName', walletName);
            localStorage.setItem('walletAddress', walletAddress);

            fetch('https://zircon-flax-garnet.glitch.me/update-wallet-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    wallet: walletName,
                    walletAddress: walletAddress
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Wallet data updated:', data);
            })
            .catch(error => {
                console.error('Error updating wallet data:', error);
            });
        }

    } else {
        Img.src = '';
        WalletName.innerText = '';
        AppVersion.innerText = '';
        AboutWalletUrl.innerText = '';

        localStorage.removeItem('walletName');
        localStorage.removeItem('walletAddress');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const langSelect = document.getElementById('lang-select');
        const themeSelect = document.getElementById('theme-select');
        const brSelect = document.getElementById('border-radius-select');

        const savedLanguage = localStorage.getItem('selectedLanguage');
        const savedTheme = localStorage.getItem('selectedTheme');
        const savedBorderRadius = localStorage.getItem('selectedBorderRadius');

        if (langSelect && savedLanguage) {
            langSelect.value = savedLanguage;
            tonConnectUIWallet.uiOptions = {
                language: savedLanguage
            };
        }

        if (themeSelect && savedTheme) {
            themeSelect.value = savedTheme;
            tonConnectUIWallet.uiOptions = {
                uiPreferences: {
                    theme: savedTheme
                }
            };
        }

        if (brSelect && savedBorderRadius) {
            brSelect.value = savedBorderRadius;
            tonConnectUIWallet.uiOptions = {
                uiPreferences: {
                    borderRadius: savedBorderRadius
                }
            };
        }

        if (langSelect) {
            langSelect.onchange = function() {
                const selectedLanguage = langSelect.value;
                localStorage.setItem('selectedLanguage', selectedLanguage);

                tonConnectUIWallet.uiOptions = {
                    language: selectedLanguage
                };
            };
        }

        if (themeSelect) {
            themeSelect.onchange = function() {
                const selectedTheme = themeSelect.value;
                localStorage.setItem('selectedTheme', selectedTheme);

                tonConnectUIWallet.uiOptions = {
                    uiPreferences: {
                        theme: selectedTheme
                    }
                };
            };
        }

        if (brSelect) {
            brSelect.onchange = function() {
                const selectedBorderRadius = brSelect.value;
                localStorage.setItem('selectedBorderRadius', selectedBorderRadius);

                tonConnectUIWallet.uiOptions = {
                    uiPreferences: {
                        borderRadius: selectedBorderRadius
                    }
                };
            };
        }
    }, 200);
});



// for withdraw
const modal = document.getElementById("withdrawMoneyModal");
const btn = document.getElementById("withdrawMoneyButton");
const span = document.getElementsByClassName("withdraw-money-close")[0];
const takeCashButton = document.getElementById("takeCashButton");
const message = document.getElementById("message");
const countdownNotification = document.getElementById("countdownNotification");
const withdrawMoneyAmountInput = document.getElementById("withdrawMoneyAmount")


function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const endTime = new Date("2024-10-10T00:00:00Z").getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
        clearInterval(countdownInterval);
        btn.textContent = "Withdraw this money, bro";
        btn.onclick = function() {
            modal.style.display = "block";
        };
    } else {
        btn.textContent = `${formatTime(distance)}`;
    }
}, 1000);


btn.onclick = function() {
    if (new Date().getTime() < endTime) {
        countdownNotification.style.display = 'block';
        setTimeout(() => {
            countdownNotification.style.display = 'none';
        }, 2000);
    } else {
        withdrawMoneyAmountInput.value = '';
        message.textContent = '';
        modal.style.display = "block";
    }
};

span.onclick = function() {
    modal.style.display = "none";
    withdrawMoneyAmountInput.value = '';
    message.textContent = '';
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        withdrawMoneyAmountInput.value = '';
        message.textContent = '';
    }
}


takeCashButton.onclick = async function() {
    const walletName = localStorage.getItem('walletName');
    const walletAddress = localStorage.getItem('walletAddress');

    if (!walletName || !walletAddress) {
        message.style.color = "red";
        message.textContent = "You need to connect your wallet before making a withdrawal, bro!";
        return;
    }

    const amount = parseFloat(document.getElementById("withdrawMoneyAmount").value);

    if (amount <= 0 || isNaN(amount)) {
        message.style.color = "red";
        message.textContent = "Enter the correct value (1 or more), bro";
        return;
    }

    const userId = Telegram.WebApp.initDataUnsafe.user.id;
    try {
        const response = await fetch('https://zircon-flax-garnet.glitch.me/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                amount: amount,
                walletAddress: walletAddress,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            message.style.color = "green";
            message.textContent = `Withdrawal successful, bro! Transaction ID: ${result.transactionId}`;

            const currentDateTime = new Date().toISOString();
            let withdrawals = JSON.parse(localStorage.getItem('withdrawals')) || [];
            withdrawals.push({ id: result.transactionId, dateTime: currentDateTime });
            localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
        } else {
            message.style.color = "red";
            message.textContent = result.message || "Error processing your request.";
        }
    } catch (error) {
        message.style.color = "red";
        message.textContent = "Error connecting to the server.";
        console.error("Error:", error);
    }
};



// for withdrawal history
const withdrawHistoryButton = document.getElementById('withdrawHistoryButton');
const withdrawHistoryModal = document.getElementById('withdrawHistoryModal');
const withdrawHistoryClose = document.querySelector('.withdraw-history-close');
const withdrawHistoryTable = document.getElementById('withdrawHistoryTable').getElementsByTagName('tbody')[0];
const copyNotification = document.getElementById('copyNotification');

withdrawHistoryButton.onclick = async function() {
    const userId = Telegram.WebApp.initDataUnsafe.user.id;
    let withdrawals = JSON.parse(localStorage.getItem('withdrawals'));

    withdrawHistoryTable.innerHTML = '';

    if (withdrawals && withdrawals.length > 0) {
        withdrawals.forEach(withdrawal => {
            const row = withdrawHistoryTable.insertRow();
            const idCell = row.insertCell(0);
            const dateTimeCell = row.insertCell(1);

            idCell.textContent = withdrawal.id;
            idCell.style.cursor = 'pointer';
            idCell.onclick = function() {
                navigator.clipboard.writeText(withdrawal.id).then(() => {
                    copyNotification.style.display = 'block';
                    setTimeout(() => {
                        copyNotification.style.display = 'none';
                    }, 2000);
                }).catch(err => {
                    console.error('Error copying ID:', err);
                });
            };

            dateTimeCell.textContent = new Date(withdrawal.dateTime).toLocaleString();
        });

        withdrawHistoryModal.style.display = 'block';
    } else {
        try {
            const response = await fetch(`https://zircon-flax-garnet.glitch.me/get-withdrawals/${userId}`);
            const serverWithdrawals = await response.json();

            if (serverWithdrawals.length > 0) {
                serverWithdrawals.forEach(withdrawal => {
                    const row = withdrawHistoryTable.insertRow();
                    const idCell = row.insertCell(0);
                    const dateTimeCell = row.insertCell(1);

                    idCell.textContent = withdrawal.id;
                    idCell.style.cursor = 'pointer';
                    idCell.onclick = function() {
                        navigator.clipboard.writeText(withdrawal.id).then(() => {
                            copyNotification.style.display = 'block';
                            setTimeout(() => {
                                copyNotification.style.display = 'none';
                            }, 2000);
                        }).catch(err => {
                            console.error('Error copying ID:', err);
                        });
                    };

                    dateTimeCell.textContent = withdrawal.formattedDateTime;
                });
            } else {
                const row = withdrawHistoryTable.insertRow();
                const noDataCell = row.insertCell(0);
                noDataCell.colSpan = 2;
                noDataCell.textContent = `No transactions yet, bro`;
                noDataCell.style.textAlign = "center";
                noDataCell.style.color = "#aaa";
            }

            withdrawHistoryModal.style.display = 'block';
        } catch (error) {
            console.error('Error fetching withdrawal history:', error);
        }
    }
}

withdrawHistoryClose.onclick = function() {
    withdrawHistoryModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == withdrawHistoryModal) {
        withdrawHistoryModal.style.display = 'none';
    }
}