let pipCount = 0;
let pipsPerClick = 1;

let clickerLvl = 0;
let botLvl = 0;
let factoryLvl = 0;
let quantumLvl = 0;

let clickerCost = 15;
let botCost = 50;
let factoryCost = 300;
let quantumCost = 2000;

let secretClickCount = 0;
let isGoldenMode = false;

function clickPip(event) {
    pipCount += pipsPerClick;
    
    createFloatingText(event, "+" + pipsPerClick);
    updateUI();
}

setInterval(function() {
    let autoPips = (botLvl * 1) + (factoryLvl * 10) + (quantumLvl * 50);
    if (isGoldenMode) {
        autoPips *= 2; 
    }
    pipCount += autoPips;
    updateUI();
}, 1000);

setInterval(function() {
    saveGame();
}, 10000);

function buyClickUpgrade() {
    if (pipCount >= clickerCost) {
        pipCount -= clickerCost;
        clickerLvl++;
        pipsPerClick += 1;
        clickerCost = Math.floor(clickerCost * 1.5);
        updateUI();
    }
}

function buyBot() {
    if (pipCount >= botCost) {
        pipCount -= botCost;
        botLvl++;
        botCost = Math.floor(botCost * 1.4);
        updateUI();
    }
}

function buyFactory() {
    if (pipCount >= factoryCost) {
        pipCount -= factoryCost;
        factoryLvl++;
        factoryCost = Math.floor(factoryCost * 1.35);
        updateUI();
    }
}

function buyQuantum() {
    if (pipCount >= quantumCost) {
        pipCount -= quantumCost;
        quantumLvl++;
        quantumCost = Math.floor(quantumCost * 1.3);
        updateUI();
    }
}

function updateUI() {
    document.getElementById('pip-count').innerText = Math.floor(pipCount);
    
    let pps = (botLvl * 1) + (factoryLvl * 10) + (quantumLvl * 50);
    if (isGoldenMode) pps *= 2;
    document.getElementById('pps-count').innerText = pps;
    document.getElementById('ppc-count').innerText = pipsPerClick;

    document.getElementById('lvl-clicker').innerText = clickerLvl;
    document.getElementById('lvl-bot').innerText = botLvl;
    document.getElementById('lvl-factory').innerText = factoryLvl;
    document.getElementById('lvl-quantum').innerText = quantumLvl;

    document.getElementById('cost-clicker').innerText = clickerCost;
    document.getElementById('cost-bot').innerText = botCost;
    document.getElementById('cost-factory').innerText = factoryCost;
    document.getElementById('cost-quantum').innerText = quantumCost;

    document.getElementById('btn-clicker').disabled = pipCount < clickerCost;
    document.getElementById('btn-bot').disabled = pipCount < botCost;
    document.getElementById('btn-factory').disabled = pipCount < factoryCost;
    document.getElementById('btn-quantum').disabled = pipCount < quantumCost;
}

function createFloatingText(event, text) {
    const btn = document.getElementById('pip-button');
    const rect = btn.getBoundingClientRect();
    
    const el = document.createElement('div');
    el.className = 'floating-text';
    el.innerText = text;

    const x = (event.clientX || rect.left + rect.width / 2) - rect.left + (Math.random() * 40 - 20);
    const y = (event.clientY || rect.top + rect.height / 2) - rect.top - 20;

    el.style.left = x + 'px';
    el.style.top = y + 'px';

    btn.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 800);
}

document.getElementById('game-title').addEventListener('click', function() {
    secretClickCount++;
    if (secretClickCount === 7) {
        isGoldenMode = true;
        document.body.classList.add('golden-mode');
        document.getElementById('game-title').innerText = "✨ Golden Pip Clicker ✨";
        alert("🎉 EASTER EGG FREIGESCHALTET!\n\nDu hast den Gold-Modus entdeckt! Alle Auto-Pips zählen ab sofort 2x so schnell!");
    }
});

function saveGame() {
    const saveState = {
        pipCount, pipsPerClick,
        clickerLvl, botLvl, factoryLvl, quantumLvl,
        clickerCost, botCost, factoryCost, quantumCost,
        isGoldenMode
    };
    localStorage.setItem('pipClickerSave', JSON.stringify(saveState));
}

function loadGame() {
    const saved = localStorage.getItem('pipClickerSave');
    if (saved) {
        const data = JSON.parse(saved);
        pipCount = data.pipCount || 0;
        pipsPerClick = data.pipsPerClick || 1;
        
        clickerLvl = data.clickerLvl || 0;
        botLvl = data.botLvl || 0;
        factoryLvl = data.factoryLvl || 0;
        quantumLvl = data.quantumLvl || 0;

        clickerCost = data.clickerCost || 15;
        botCost = data.botCost || 50;
        factoryCost = data.factoryCost || 300;
        quantumCost = data.quantumCost || 2000;

        isGoldenMode = data.isGoldenMode || false;
        if (isGoldenMode) {
            document.body.classList.add('golden-mode');
            document.getElementById('game-title').innerText = "✨ Golden Pip Clicker ✨";
        }
    }
    updateUI();
}

function resetGame() {
    if (confirm("Möchtest du deinen Spielstand wirklich komplett zurücksetzen?")) {
        localStorage.removeItem('pipClickerSave');
        location.reload();
    }
}

window.onload = function() {
    loadGame();
};