// DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];
// global variable
// the reason we are using let here is because in the beggining we are setting it as an empty array but in the bellow getQuotes() function,
// we are actually changing the value of it to pass in the quotes.

// Show New Quote Everytime
function newQuote() {
    // newQuote() function is going to pull a single quote from our local api quotes array
    // this function is going to be triggered every time we hit the "New Quote" button in the UI

    // Pick a Random Quote from API Quotes Array
    const quote = apiQuotes.quotes[Math.floor(Math.random() * apiQuotes.quotes.length)];
    // just one quote at a time, but it will be random
    // Math.random() returns a value between 0 and 1; suppose 0.5
    // (Math.random() = 0.5) * (apiQuotes.quotes.length = 1423) = 711.5
    // Math.floor() return the largest integer less than or equal to a given number; return 711 as a index number
    // and this will repeat everytime and will generate random index number

    // Pick a Random Quote from Local File Array
    // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];

    // Check if the Author Field is Blank and Replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check Quote Length to Determine Styling
    if (quote.quote.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.quote;
}

// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://dummyjson.com/quotes?limit=0';
    try {
        const response = await fetch(apiUrl);
        // as we have used await here, so response variable will not be populated untill it has some data fetched from the API.
        // that means by default, if we do not do asynchronous and we do not await,
        // without async-await it would try to set this response value before it had a chance to fetch, and that will cause an error
        // so in this case we are only setting the response constant when we actually have data and it can be set or else it will just be undefined.

        apiQuotes = await response.json();
        // using the global variable, and we have to declare it above of this function from being availabe in every function and not just in this function.
        // we are getting json from our api as a response and we are turning that response into a json object,
        // because from a web server it is actually just a series of strings
        // and we are going to pass that into a global variable called apiQuotes()

        newQuote();
    } catch (error) {
        // Catch Error Here
        // In a production website we handle our error by passing the error in alert() function.
        // alert(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const tweeterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}  - ${authorText.textContent}`;
    window.open(tweeterUrl, '_blank');
}

//Event Listeners to Buttons
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Page(index.html) Load
getQuotes();
// newQuote();
