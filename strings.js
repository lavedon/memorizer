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
var sentences;
var myText = "";

var randIndex = 0;
var myCSV = [["", ""], ["", ""]];
var rowNum = 0;
var row = [];

function showSentence(sentence) {
    var showSentence = sentenceNumber + " " + sentence;
    currentWord.innerHTML = showSentence;
    return showSentence;

}

function underlineReplace(sentence) {
    let underlined_sentence = sentence.replace(/\B[a-zA-Z]/g, "_");
    modifiedSentence.innerHTML = sentenceNumber + " " + underlined_sentence;
    return underlined_sentence;
}

function first_letters(sentence) {
    let first_letters = sentence.replace(/\B[a-zA-Z]/g, '').replace(/\s/g,'');
    firstLetters.innerHTML = sentenceNumber + " " + first_letters; 
    return first_letters;
}    

function first_two_words(sentence) {
    let first_two_words = sentence.match(/[^\s]+\s+[^\s]+\s/);
    firstTwoWords.innerHTML = sentenceNumber + " " + first_two_words; 
    first_two_words = first_two_words[0];
    return first_two_words;
}

function change_sentence() {
    console.log("change the sentence");

    myText = document.getElementById("sentence").value;
    do_that();
}

function do_that() {
    // sentenceNumber = document.getElementById('which_number').value; 

    sentences = myText.match(/[^\.!\?]+[\.!\?]+|[^\.!\?]+$/g);

    randIndex = Math.floor(Math.random() * sentences.length); 
    sentence = sentences[randIndex];
    sentenceNumber = randIndex + 1;
    sentenceNumber = "(" + sentenceNumber + ")";

    showSentence(sentence);
    underlineReplace(sentence);
    first_letters(sentence);
    first_two_words(sentence);

}


function break_up_sentence(passedSentence) {
    /*
     * Divide up the passedSentence into groups of 3, 4, and 5 words.
     * Divide run the underlineReplace(), first_letters() , 
     * NOT first_two_words()
     *
     * Add to a CSV the files.
     *
     * Remember, the first card only has the chunk removed.
     * Or removed and replace with a hint.
     *
     * Then answer side will only have the chunk.
     */
      
    // TODO inawer {...} where text removed
    
    let words;
    let wordChunk;
    let underLinedChunk;
    let firstLetterChunk;
    let myArray = [];
    let myRow = [];
    let myRowNum = 0;

    // TODO CHANGE THE USER OF SENTENCE HERE.  
    // passedSentence is the passed in argument AND
    // a global variable.  Very confusing.


    // 3 word chunk
    words = passedSentence.split(" "); 
    i = words;
    // Decide how you want to do this.  
    // 3 or 4 for loops taking 3, 4, 5 word chunks?
    // Should there be a split passedSentence in two?
    function extractChunks() {
            myRow[0] = passedSentence.replace(wordChunk, "{...}");
            myRow[1] = wordChunk; // Add to ANSWER side of row.
            console.log("Word chunk is " + wordChunk);
            myArray[myRowNum] = myRow; // Create a row of Question, Answer pair.
            myRow = [];
            myRowNum++; // Move to next row


            underLinedChunk = underlineReplace(wordChunk); 
            myRow[0] = passedSentence.replace(wordChunk, underLinedChunk);
            myRow[1] = wordChunk; // Add to ANSWER side of row.
            // Going to have to make a version of the passedSentence without this chunk
            // Then add that to row[0];
            console.log("Underline chunk " + underLinedChunk);
            myArray[myRowNum] = myRow;
            myRow = [];
            myRowNum++;


            firstLetterChunk = first_letters(wordChunk);
            myRow[0] = passedSentence.replace(wordChunk, firstLetterChunk);
            myRow[1] = wordChunk;
            console.log("First Letter Chunk " + firstLetterChunk);
            myArray[myRowNum] = myRow;
            myRow = [];
            myRowNum++;

        }

    for (i = words.length; i > 1; i = i - 3) {
        wordChunk = words[i - 3] + " " + words[i - 2] + " " + words[i - 1];
        extractChunks(); 
    }

    for (i = words.length; i > 1; i = 1 - 4) {
        wordChunk = words[i - 4] + " " + words[i - 3] + " " + words[i - 2] + " " + words[i - 1];
        extractChunks();
    }

    for ( i = words.length; i > 1; i = 1 - 5) {
        wordChunk = words[i - 5] + " " + words[i - 4] + " " + words[i - 3] + " " + words[i - 2] + " " + words[i - 1];
        extractChunks();
    }
    return myArray;

}


// @TODO apply the shunks and full sentences to a 2D array myCSV
// Use two for loops to cycle through 1.) The return of each
//  break_up_sentence() 
//  Then have every_sentence return 2d array
//  Keep track of 'group number'
//  increment + 1 each full sentence
//  if group_number > 1 
//  add together  the previous sentences
//  i.e.  
//      if (groupNum !=  0 && < 5) {
//          for (var i = 0; i < sentences.length; i--) 
//           sentences.length - to group_num 
//           convert these sentences as a group of cards
//           }
//   
//
//   update the CSV with something like this

/*
 *
@TODO use this approach:
var myCSV = new Array();

for (var i = 0; i < return_stuff.length; i++) {
		myCSV.push(return_stuff[i]);
    }
*/


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
    let num_sentence_group = 0;

    var underlinedArray = [];
    var firstLettersArray = [];
    var sentenceChunksArray = [];
    

    underlinedArray = sentences.map(underlineReplace);
    firstLettersArray = sentences.map(first_letters);
    for (i = 0; i < sentences.length; i++) {
        sentenceChunksArray[i] = sentences[i];
        let tempChunks = extractChunks(sentences[i]);
        sentences[i][0] = tempChunks;
    }     


    for (i = sentences.length; -i > 0; i--) {
        if (num_sentence_group === sentences.length) {
            extractChunks(sentences[i]);
            row[0] = sentences[i];
            row[1] = underlinedArray[i];
            myCSV[rowNum] = row;
            rowNum++;
            row = [];

            row[0] = sentences[i];
            row[1] = firstLettersArray[i];
            myCSV[rowNum] = row;
            rowNum++;
            row = [];
            }
        // OR do this with a 2D array
        // that has each sentence and all of it's chunks.
        }
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
