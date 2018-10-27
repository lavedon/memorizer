// window.addEventListener('load', init);

// DOM Elements
const currentWord = document.querySelector('#current-word'); 
const modifiedSentence = document.querySelector('#modified-sentence'); 
const firstLetters = document.querySelector('#first-letters');
const firstTwoWords = document.querySelector('#first-two-words');


// Text
var myText = "";

// const randIndex = 0;


function showSentence(sentence) {
    currentWord.innerHTML = sentence;
}

function underlineReplace(sentence) {
    let underlined_sentence = sentence.replace(/\B[a-zA-Z]/g, "_");
    modifiedSentence.innerHTML = underlined_sentence;
}

function first_letters(sentence) {
    let first_letters = sentence.replace(/\B[a-zA-Z]/g, '').replace(/\s/g,'');
    firstLetters.innerHTML = first_letters; 
}    

function first_two_words(sentence) {
    let first_two_words = sentence.match(/[^\s]+\s+[^\s]+\s/);
    firstTwoWords.innerHTML = first_two_words; 
}

function change_sentence() {
    console.log("change the sentence");
    myText = document.getElementById("sentence").value;
    do_that();
}
function do_that() {
    var sentence = myText.match(/[^\.!\?]+[\.!\?]+|[^\.!\?]+$/g);
    sentence = sentence[0];
    showSentence(sentence);
    underlineReplace(sentence);
    first_letters(sentence);
    first_two_words(sentence);
}
