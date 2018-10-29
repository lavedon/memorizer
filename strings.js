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

var randIndex = 0;


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
    // sentenceNumber = document.getElementById('which_number').value; 

    var sentences = myText.match(/[^\.!\?]+[\.!\?]+|[^\.!\?]+$/g);

    randIndex = Math.floor(Math.random() * sentence.length); 
    sentence = sentences[randIndex];
    sentenceNumber = randIndex + 1;
    sentenceNumber = "(" + sentenceNumber + ")";

    showSentence(sentence);
    underlineReplace(sentence);
    first_letters(sentence);
    first_two_words(sentence);

    every_sentence_convert(sentences);
}

function every_sentence_convert(sentences) {
    /* 

    Go through every sentence in reverse order.
    Run the covert sequence and save it to an object.
    First call a function for coverting each bit of the sentence 
    into chunks i.e. every 3rd word with stuff removed
    1. underline 2. letters squashed 3. blank cloze.

    Do not use cloze deletion but all "type answer" 
    Note type.

    After each sentence chunks (depending on length of sentence).
    Do the entire sentence (like in the demo in do_that function).
    Then return cards of two sentences together.
    Then three, then four, then 5.  No chunks larger than 5 sentences.
    Always include the sentence number.

    Save  to array or object for CSV export.
    */

}


function number_of_sentences() {
    // count the number of sentences
    myText = document.getElementById("sentence").value;
    let sentence_marks = myText.match(/[\.\!\?]/gm);
    let sentence_num = sentence_marks.length;
    console.log("The number of sentences is " + sentence_num);
    document.getElementById("sentence_number").innerHTML = sentence_num;
    return sentence_num;
}
