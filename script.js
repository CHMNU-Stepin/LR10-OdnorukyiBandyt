    const main = document.querySelector('.main');
    const playerName = prompt("Введіть ваше ім'я:");
    if (!playerName) {
        alert("Ім'я не введено! Сторінка перезавантажиться.");
        location.reload();
    }
    const emojiList = ['🍒', '🍋', '⭐', '🍉', '💎', '🍇'];
    let attempts = 3;
    let win = false;
    const header = document.createElement('h2');
    header.textContent = `Вітаємо, ${playerName}! У вас ${attempts} спроби.`;
    main.appendChild(header);
    const reelContainer = document.createElement('div');
    reelContainer.classList.add('reel-container');
    main.appendChild(reelContainer);
    const reels = Array.from({ length: 3 }, () => {
        const reel = document.createElement('div');
        reel.classList.add('reel');
        reelContainer.appendChild(reel);
        return reel;
    });
    const button = document.createElement('button');
    button.textContent = "Крутити барабан";
    main.appendChild(button);
    const message = document.createElement('div');
    message.classList.add('message');
    main.appendChild(message);
    const spinReels = () => {
        reels.forEach(reel => reel.classList.add('spin')); 
        return reels.map(reel => {
            const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
            reel.textContent = randomEmoji;
            return randomEmoji;
        });
    };
    const checkWin = (symbols) => {
        return symbols.every(symbol => symbol === symbols[0]);
    };
    button.addEventListener('click', () => {
        if (attempts === 0 || win) {
            location.reload();
            return;
        }
        const currentSpin = spinReels();
        if (checkWin(currentSpin)) {
            message.textContent = `Вітаємо, ${playerName}! Ви виграли! 🎉`;
            win = true;
            button.disabled = false;
            button.textContent = "Спробувати ще раз";
            button.classList.add('won');
        } else {
            attempts--;
            header.textContent = `У вас залишилось ${attempts} спроби.`;
            if (attempts === 0) {
                message.textContent = `На жаль, ${playerName}, ви програли. 😢`;
                button.disabled = false;
                button.textContent = "Спробувати ще раз";
                button.classList.add('lost');
            }
        }
    });