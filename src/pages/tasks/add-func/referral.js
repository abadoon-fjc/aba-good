document.addEventListener("DOMContentLoaded", function() {
    const inviteModal = document.getElementById("invite-modal");
    const inviteBtn = document.getElementById("invite-friend");
    const span = document.getElementsByClassName("close-invite-modal")[0];
    const shareBtn = document.getElementById("share-referral");
    const copyBtn = document.getElementById("copy-referral");
    const referralCodeElement = document.getElementById("referral-code");

    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const username = window.Telegram.WebApp.initDataUnsafe.user.username

    inviteBtn.onclick = function() {
        inviteModal.style.display = "block";
        referralCodeElement.textContent = userId;
    };

    span.onclick = function() {
        inviteModal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == inviteModal) {
            inviteModal.style.display = "none";
        }
    };

    const appUrl = 'https://t.me/aba_coin_bot/aba_coin_app'

    shareBtn.onclick = function() {
        const shareData = {
            title: 'My referral code',
            text: `OH MY GOD, BRO! Your friend, ${username}, just shared with you something you've never seen! Your friend code: ${userId}. Just launch the application, enter your friend's code in tasks and get starting bonuses! COME ON, BRO, DO THIS DIRT! Let's go to farm ABA-coins, bro: ${appUrl}`,
            url: appUrl
        };

        navigator.share(shareData).then(() => {
            alert('Referral code shared successfully, bro');
        }).catch(err => {
            console.error('Error sharing referral code:', err);
        });
    };

    copyBtn.onclick = function() {
        navigator.clipboard.writeText(userId).then(() => {
            const notification = document.getElementById('copy-notification');
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.classList.add('hidden');
        }, 2000);
        }).catch(err => {
            console.error('Error copying referral code:', err);
        });
    };

    referralCodeElement.onclick = function() {
        navigator.clipboard.writeText(userId).then(() => {
            const notification = document.getElementById('copy-notification');
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.classList.add('hidden');
        }, 2000);
        }).catch(err => {
            console.error('Error copying referral code:', err);
        });
    };

    const doThisBtn = document.getElementById("btn-ref-code-do-this");
    const userIdInput = document.getElementById("ref-code-input");

    doThisBtn.onclick = function() {
        const enteredUserId = userIdInput.value.trim();
    
        if (isNaN(enteredUserId) || enteredUserId.length === 0) {
            alert("This is not a referral code, who are you trying to cheat, bro?");
            return;
        }
    
        fetch('https://zircon-flax-garnet.glitch.me/check-referral-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                referralCode: enteredUserId
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'codeActivated') {
                alert("Yes, bro, this is real dirt! You are a real genius, bro!");
            } else if (data.result === 'codeNotFound') {
                alert("COME ON, BRO, this is non-existent code");
            } else if (data.result === 'codeAlreadyUsed') {
                alert("Oooooh are you serious? You already activated this code, bro");
            }
        })
        .catch(error => {
            console.error("Error checking referral code:", error);
            alert("Some problems, bro... Please, try again!");
        });
    };
});
