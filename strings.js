// window.addEventListener('load', init);

// DOM Elements
const currentWord = document.querySelector('#current-word'); 
const modifiedSentence = document.querySelector('#modified-sentence'); 
const firstLetters = document.querySelector('#first-letters');
const firstTwoWords = document.querySelector('#first-two-words');

// @TODO add selector.  Let the user choose if they want to break up by sentence
// or modify the entire text.
// Make the default be entire text.


// Text
var sentenceNumber = "";

var myText = "";

// const randIndex = 0;


function showSentence(sentence) {
    currentWord.innerHTML = sentenceNumber + " " + sentence;
}

function underlineReplace(sentence) {
    let underlined_sentence = sentence.replace(/\B[a-zA-Z]/g, "_");
    modifiedSentence.innerHTML = sentenceNumber + " " + underlined_sentence;
}

function first_letters(sentence) {
    let first_letters = sentence.replace(/\B[a-zA-Z]/g, '').replace(/\s/g,'');
    firstLetters.innerHTML = sentenceNumber + " " + first_letters; 
}    

function first_two_words(sentence) {
    let first_two_words = sentence.match(/[^\s]+\s+[^\s]+\s/);
    firstTwoWords.innerHTML = sentenceNumber + " " + first_two_words; 
}

function change_sentence() {
    console.log("change the sentence");

    myText = document.getElementById("sentence").value;
    do_that();
}
function do_that() {
    sentenceNumber = document.getElementById('which_number').value; 
    var sentence = myText.match(/[^\.!\?]+[\.!\?]+|[^\.!\?]+$/g);

    sentence = sentence[0];
    showSentence(sentence);
    underlineReplace(sentence);
    first_letters(sentence);
    first_two_words(sentence);
}
