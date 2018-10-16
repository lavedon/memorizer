window.addEventListener('load', init);

// DOM Elements
const currentWord = document.querySelector('#current-word'); 
const modifiedSentence = document.querySelector('#modified-sentence'); 
const firstLetters = document.querySelector('#first-letters');
const firstTwoWords = document.querySelector('#first-two-words');


// Text
const myText = 
   `In a capitalist economy, the wealth of the rich is in the form of capital,
i.e., wealth employed in the production of goods and services for sale.
This wealth is the foundation both of
the supply of products that people buy
and of the demand for the labor that people sell.
The greater the wealth of the capitalists, the higher are real wages,
both because of a more abundant supply of products produced
and a greater demand for the labor of wage earners.
Diverting funds used to purchase capital goods and pay wages into spending for consumers goods,
which is the effect of virtually all taxation that falls on the rich,
and also of government borrowing,
reduces both the demand for and production of capital goods and the demand for labor.
In other words, it serves to hold down production, keep up prices, and hold down wages.
`;

const sentences = myText.match(/[^\.!\?]+[\.!\?]+|[^\.!\?]+$/g);
const randIndex = Math.floor(Math.random() * sentences.length);


function showSentence(sentences) {
    currentWord.innerHTML = sentences[randIndex];
}

function underlineReplace(sentences) {
    var underlined_sentence = sentences[randIndex].replace(/\B[a-zA-Z]/g, "_");
    modifiedSentence.innerHTML = underlined_sentence;
}

function first_letters(sentences) {
    var first_letters = sentences[randIndex].replace(/\B[a-zA-Z]/g, '').replace(/\s/g,'');
    firstLetters.innerHTML = first_letters; 
}    

function first_two_words(sentences) {
    var first_two_words = sentences[randIndex].match(/[^\s]+\s+[^\s]+\s/);
    firstTwoWords.innerHTML = first_two_words; 
}


function init() {
    showSentence(sentences);
    underlineReplace(sentences);
    first_letters(sentences);
    first_two_words(sentences);
}
