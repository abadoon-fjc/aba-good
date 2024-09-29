// // TON Connect
// const tonConnectUIWallet = new TON_CONNECT_UI.TonConnectUI({
//     manifestUrl: 'https://raw.githubusercontent.com/abadoon-fjc/tonconnect-manifest/main/tonconnect-manifest.json',
//     buttonRootId: 'connect-button-root-wallet'
// });

// tonConnectUIWallet.onStatusChange(wallet => {
        
//     const Img = document.getElementById('HeaderWalletImage');
//     if (wallet) {
//         Img.src = wallet.imageUrl;
//     } else {
//         Img.src = '';
//     }
    
//     const WalletName = document.getElementById('HeaderWalletName');
//     if (wallet) {
//         WalletName.innerText = wallet.name;
//     } else {
//         WalletName.innerText = '';
//     }

//     const AppVersion = document.getElementById('HeaderWalletAppVersion');
//     if (wallet) {
//         AppVersion.innerHTML = `App version: ${wallet.device.appVersion}`;
//     } else {
//         AppVersion.innerText = '';
//     }

//     const AboutWalletUrl = document.getElementById('HeaderWalletUrl');
//     if (wallet && wallet.aboutUrl) {
//         AboutWalletUrl.innerHTML = `About wallet: <a href="${wallet.aboutUrl}" target="_blank">${wallet.aboutUrl}</a>`;
//     } else {
//         AboutWalletUrl.innerText = '';
//     }
// });

// document.addEventListener('DOMContentLoaded', function() {
//     setTimeout(() => {
//         const langSelect = document.getElementById('lang-select');
//         const themeSelect = document.getElementById('theme-select');
//         const brSelect = document.getElementById('border-radius-select');

//         const savedLanguage = localStorage.getItem('selectedLanguage');
//         const savedTheme = localStorage.getItem('selectedTheme');
//         const savedBorderRadius = localStorage.getItem('selectedBorderRadius');

//         if (langSelect && savedLanguage) {
//             langSelect.value = savedLanguage;
//             tonConnectUIWallet.uiOptions = {
//                 language: savedLanguage
//             };
//         }

//         if (themeSelect && savedTheme) {
//             themeSelect.value = savedTheme;
//             tonConnectUIWallet.uiOptions = {
//                 uiPreferences: {
//                     theme: savedTheme
//                 }
//             };
//         }

//         if (brSelect && savedBorderRadius) {
//             brSelect.value = savedBorderRadius;
//             tonConnectUIWallet.uiOptions = {
//                 uiPreferences: {
//                     borderRadius: savedBorderRadius
//                 }
//             };
//         }

//         if (langSelect) {
//             langSelect.onchange = function() {
//                 const selectedLanguage = langSelect.value;
//                 localStorage.setItem('selectedLanguage', selectedLanguage);

//                 tonConnectUIWallet.uiOptions = {
//                     language: selectedLanguage
//                 };
//             };
//         }

//         if (themeSelect) {
//             themeSelect.onchange = function() {
//                 const selectedTheme = themeSelect.value;
//                 localStorage.setItem('selectedTheme', selectedTheme);

//                 tonConnectUIWallet.uiOptions = {
//                     uiPreferences: {
//                         theme: selectedTheme
//                     }
//                 };
//             };
//         }

//         if (brSelect) {
//             brSelect.onchange = function() {
//                 const selectedBorderRadius = brSelect.value;
//                 localStorage.setItem('selectedBorderRadius', selectedBorderRadius);

//                 tonConnectUIWallet.uiOptions = {
//                     uiPreferences: {
//                         borderRadius: selectedBorderRadius
//                     }
//                 };
//             };
//         }
//     }, 200);
// });