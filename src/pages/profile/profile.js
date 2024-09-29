window.Telegram.WebApp.ready();

async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://zircon-flax-garnet.glitch.me/user-data/${userId}`);
        if (response.ok) {
            const data = await response.json();
            return {
                status: data.status || "not a premium...",
                counter: data.counter || 0,
                totalClicks: data.totalClicks || 0,
                wallet: data.wallet || "No wallet, bro",
            };
        } else {
            console.error('Failed to fetch user data:', response.statusText);
            return {
                status: "some problems, bro",
                counter: "some problems, bro",
                totalClicks: "some problems, bro",
                wallet: "some problems, bro",
            };
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            status: "some problems, bro",
            counter: "some problems, bro",
            totalClicks: "some problems, bro",
            wallet: "some problems, bro",
        };
    }
}

function copyWallet(wallet) {
    navigator.clipboard.writeText(wallet).then(() => {
        const notification = document.getElementById('copy-notification');
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 2000);
    });
}

async function displayUserInfo() {
    try {
        const user = window.Telegram.WebApp.initDataUnsafe.user;

        if (!user) {
            document.getElementById('user-info').innerText = "ooooops, bro, I'm so embarrassed, I can't find any information about you. Please, sorry me, bro!)";
            return;
        }

        const { status, counter, totalClicks, wallet } = await fetchUserData(String(user.id));

        const profileHTML = `
            <img src="${user.photo_url || '../../assets/aba_circle.png'}" alt="User Image" class="stub-image">
            <ul class="user-details">
                <li>
                    <strong></strong> ${
                        user.first_name && user.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : user.first_name
                        ? user.first_name
                        : user.last_name
                        ? user.last_name
                        : "you are noname, bro"
                    }
                </li>
                <li><strong></strong> @${user.username || "you are noname, bro"}</li>
                <li><strong>Status:</strong> ${status}</li>
                <li><strong>You can cash now:</strong> ${counter}</li>
                <li><strong>Total score:</strong> ${totalClicks}</li>
                <li><strong>Wallet:</strong> <span class="wallet-address-info" onclick="copyWallet('${wallet}')">${wallet}</span></li>
            </ul>
            <div id="copy-notification" class="hidden">Copied, bro!</div>
        `;
        
        document.getElementById('user-info').innerHTML = profileHTML;

    } catch (error) {
        console.error("Error displaying user info:", error);
        document.getElementById('user-info').innerText = "no information about user";
    }
}

displayUserInfo();
