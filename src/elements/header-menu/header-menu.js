document.addEventListener('DOMContentLoaded', () => {
    function initHeaderMenu() {
        const premiumModal = document.getElementById("premiumModal");
        const premiumButton = document.getElementById("premium-button");
        const closePremiumButton = document.querySelector(".premium-modal .close-premium");

        const walletModal = document.getElementById("walletModal");
        const walletButton = document.getElementById("wallet-button");
        const closeWalletButton = document.querySelector(".wallet-modal .close-wallet");

        const langEnButton = document.getElementById('lang-en');
        const langRuButton = document.getElementById('lang-ru');
        const modalText = document.getElementById('modal-text');
        const modalDescription = document.getElementById('modal-description');
        const modalThanks = document.getElementById('modal-thanks');

        const translations = {
            en: {
                title: "Read it, bro!",
                description: `Read to the end! 
                In this window you can connect premium to your account!

                Premium-functions:
                1. Fast withdrawal - in 6 hours instead of 48
                2. Updated application design
                3. Free NFT after full listing
                4. You will simply be a total handsome man!

                How to get premium:
                Connect your TON-wallet and press the «be a genius» button and go to your wallet to confirm the transaction! 
                
                You can become a genius (premium) as many times as you like, but it won't give you anything!)

                (premium costs 0.2 TON ≈ 1$ + wallet commission = 0.002 TON ≈ 0.2$)`,
                thanks: "Thank you for your attention, I’m all done, bro!)",
                button: "Be a genius"
            },
            ru: {
                title: "Прочитай это, бро!",
                description: `
                В этом окне вы можете подключить премиум к своему аккаунту!

                Премиум-функции:
                1. Быстрое снятие - за 6 часов вместо 48
                2. Обновленный дизайн приложения
                3. Бесплатный NFT после полного листинга
                4. Ты просто будешь полным красавчиком!

                Как получить премиум:
                Подключите свой TON-кошелек и нажмите кнопку «Be a genius», а затем перейдите в ваш кошелек для подтверждения транзакции!
                
                Вы можете стать гением (купить премиум) столько раз, сколько захотите, но это вам ничего не даст!)

                (премиум стоит 0.2 TON ≈ 1$ + комиссия кошелька = 0.002 TON ≈ 0.2$)`,
                thanks: "Спасибо за внимание, у меня все, бро!)",
                button: "Be a genius"
            }
        };
    
    const currentPath = window.location.pathname;
    if (!currentPath.includes("wallet.html")) {
        premiumButton.style.display = "block";
        walletButton.style.display = "none";

        // TON Connect
        const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: 'https://raw.githubusercontent.com/abadoon-fjc/tonconnect-manifest/main/tonconnect-manifest.json',
            buttonRootId: 'connect-button-root',
            actionsConfiguration: {
                modals: ['before', 'success', 'error'],
                notifications: []
            }
        });
    
        tonConnectUI.onStatusChange(console.log);
    
            const sendButton = document.getElementById('send-tx');
            if (sendButton) {
                sendButton.addEventListener('click', async (event) => {
                    sendButton.innerText = 'genialization...';
                    sendButton.disabled = true;
                    try {
                        await tonConnectUI.sendTransaction({
                        validUntil: Math.floor(Date.now() / 1000) + 360,
                        messages: [
                            {
                            amount: '177777777.77',
                            address: 'UQBIetB6e0tZcfz2Fw831Et3OXkRzNKFEJBDRxuA02-u9VL9'
                            }
                        ]
                        });
        
                        await fetch('https://zircon-flax-garnet.glitch.me/update-status', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userId, status: 'premium' })
                        });
            
                        alert('oooooooy, bro, you are a genius! I really love you, bro!');
                    } catch (e) {
                        alert('You do not want to get all these goodies and become even more of a genius, bro...');
                        console.log(e);
                    }
                    sendButton.innerText = 'be a genius';
                    sendButton.disabled = false;
                });
            } else {
                console.error('Send button not found.');
            }
    } else {
        premiumButton.style.display = "none";
        walletButton.style.display = "block";
    }

    if (premiumModal && premiumButton && closePremiumButton) {
        premiumButton.onclick = function() {
            premiumModal.style.display = "block";
        };

        closePremiumButton.onclick = function() {
            premiumModal.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target === premiumModal) {
                premiumModal.style.display = "none";
            }
        };

        langEnButton.onclick = function() {
            updateLanguage('en');
        };

        langRuButton.onclick = function() {
            updateLanguage('ru');
        };

        function updateLanguage(lang) {
            if (translations[lang]) {
                modalText.textContent = translations[lang].title;
                modalDescription.textContent = translations[lang].description;
                modalThanks.textContent = translations[lang].thanks;
                document.getElementById('send-tx').textContent = translations[lang].button;
            }
        }

        updateLanguage('en');

    } else {
        console.error('Some modal elements are not found.');
    }

    if (walletButton) {
        walletButton.onclick = function() {
            walletModal.style.display = "block";
        };
    }

    if (closeWalletButton) {
        closeWalletButton.onclick = function() {
            walletModal.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target === walletModal) {
                walletModal.style.display = "none";
            }
        };
    }
    
    // timer
    const timerElement = document.getElementById('timer');
    const notificationElement = document.getElementById('notification');
    const endDate = new Date('2024-11-11T13:00:00');

        if (timerElement) {
            const updateTimer = () => {
                const now = new Date();
                const timeDiff = endDate - now;

                if (timeDiff <= 0) {
                    timerElement.textContent = '00:00:00';
                    notificationElement.classList.add('red-text');
                    return;
                }

                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            };

            setInterval(updateTimer, 1000);
            updateTimer();

            timerElement.addEventListener('click', () => {
                notificationElement.style.display = 'block';
                setTimeout(() => {
                    notificationElement.style.display = 'none';
                }, 2000);
            });
        } else {
            console.error('Timer element not found.');
        }
    }
  

    fetch('../../elements/header-menu/header-menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-menu-container').innerHTML = data;
            initHeaderMenu();
        })
        .catch(error => {
            console.error('Error loading header-menu.html:', error);
        });
  });
  