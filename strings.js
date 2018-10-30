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
var myCSV = new Array(); 
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

function get_text() {
    myText = myText.trim();
    sentences = myText.match(/[^\.!\?]+[\.!\?]+|[^\.!\?]+$/g);
    for (let x = 0; x < sentences.length; x++) {
        sentences[x] = sentences[x].replace("\n", "");
        sentences[x] = sentences[x].replace("|", "");
    }
}

function do_that() {
    // sentenceNumber = document.getElementById('which_number').value; 

    get_text();

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
      
    
    let words;
    let wordChunk;
    let underLinedChunk;
    let firstLetterChunk;
    let myArray = [];
    let myRow = [];
    let myRowNum = 0;

    get_text();

    words = passedSentence.split(" "); 
    i = words;

    function extractChunks() {

            underLinedChunk = underlineReplace(wordChunk); 
            myRow[0] = passedSentence.replace(wordChunk, underLinedChunk);
            myRow[1] = wordChunk; // Add to ANSWER side of row.
            // Going to have to make a version of the passedSentence without this chunk
            // Then add that to row[0];
            myArray[myRowNum] = myRow;
            myRow = [];
            myRowNum++;


            firstLetterChunk = first_letters(wordChunk);
            myRow[0] = passedSentence.replace(wordChunk, firstLetterChunk);
            myRow[1] = wordChunk;
            myArray[myRowNum] = myRow;
            myRow = [];
            myRowNum++;

            myRow[0] = passedSentence.replace(wordChunk, "{...}");
            myRow[1] = wordChunk; // Add to ANSWER side of row.
            myArray[myRowNum] = myRow; // Create a row of Question, Answer pair.
            myRow = [];
            myRowNum++; // Move to next row
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
    var tempArray = new Array();
    var num_sentence_group = 0;
    for (var sen_i = sentences.length - 1; sen_i > 0; sen_i--) {
        returned_chunks = break_up_sentence(sentences[sen_i]); 
        for (var j = 0; j < returned_chunks.length; j++) {
            myCSV.push(returned_chunks[j]);
        }
        // This works for making a 2D Array and pushing the sentences
        tempArray.push(underlineReplace(sentences[sen_i]))
        tempArray.push(sentences[sen_i]);

        tempArray.push(first_letters(sentences[sen_i]));
        tempArray.push(sentences[sen_i]);

        tempArray.push(first_two_words[sen_i]);
        tempArray.push(sentences[sen_i]);
        myCSV.push(tempArray);
        num_sentence_group++;

    if (num_sentence_group !== 1 && num_sentence_group < 6) {
         // Grab the previous sentences needed in the group.
        //  EXAMPLE: If group number is 3, grab the last 3, 
        //  the last 2, and the last 1 sentence.
        for (var y = num_sentence_group; y > 0; y--) {
            console.log("sen_i === " + sen_i);
            var which_sentence = sen_i - num_sentence_group;
            console.log("which_sentence === " + which_sentence);
            if (which_sentence > 0) {
                tempArray.push(underlineReplace(sentences[which_sentence]));
                tempArray.push(sentences[which_sentence]);

                tempArray.push(first_letters(sentences[which_sentence]));
                tempArray.push(sentences[which_sentence]);

                tempArray.push(first_two_words(sentences[which_sentence]));
                tempArray.push(sentences[which_sentence]);

                myCSV.push(tempArray);
                // num_sentence_group++;
                } 
            } 
        } else if (num_sentence_group === 6) {
            num_sentence_group = 0;
            }
  } // end for loop (var i = = sentences.length - 1; i > 0; i--) 

    downloadableCSV(myCSV);
} // end function

function downloadableCSV(rows) {
    var csv = "";
    rows.forEach(function(row) {
        csv += row.join(';');
        csv += '\n';
    });
    csv = csv.replace(/"/g, "\"\"");
    console.log(csv);
    debugger;
    var hiddenElement = document.getElementById('dummy_download');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'anki.txt';
    hiddenElement.click();
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
