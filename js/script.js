
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');
const swapButton = document.getElementById('swapButton');



// Populate currency dropdowns
currencies.forEach(currency => {
    fromCurrency.add(new Option(currency, currency));
    toCurrency.add(new Option(currency, currency));
});

// Set default values
fromCurrency.value = 'USD';
toCurrency.value = 'INR';

// Function to fetch exchange rate from the API
async function getExchangeRate(from, to) {
    const url = `https://api.exchangerate-api.com/v4/latest/${from}?apikey=${apikey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.rates[to];
    } catch (error) {
        console.error('Error fetching the exchange rate:', error);
        alert('Error fetching exchange rates. Please try again later.');
    }
}

convertBtn.addEventListener('click', async () => {
    if (amount.value === '') {
        alert('Please enter an amount');
        return;
    }

    // Get live exchange rate from the API
    const rate = await getExchangeRate(fromCurrency.value, toCurrency.value);
    
    if (!rate) {
        result.textContent = 'Unable to fetch exchange rate';
        return;
    }

    const convertedAmount = (parseFloat(amount.value) * rate).toFixed(2);
    
    result.textContent = `${amount.value} ${fromCurrency.value} = ${convertedAmount} ${toCurrency.value}`;
    
    // Add animation
    result.style.animation = 'fadeIn 0.5s';
    setTimeout(() => {
        result.style.animation = '';
    }, 500);
});

swapButton.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    // Add animation
    swapButton.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        swapButton.style.transform = '';
    }, 300);
});

// Theme update function
function updateTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
}

// Call it initially
updateTheme();

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)').addListener(updateTheme);
}