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


function underlineReplace(sentence) {
	try {
    	let underlined_sentence = sentence.replace(/\B[a-zA-Z]/g, "_");
    	return underlined_sentence;
	} catch(err) {
		console.log("underlineReplace() error");
		console.log(err.message);
		return "";
	}
}

function first_letters(sentence) {
	try {
    	let first_letters = sentence.replace(/\B[a-zA-Z]/g, '').replace(/\s/g,'');
	    return first_letters;
	} catch(err) {
		console.log("first_letters() error");
		console.log(err.message);
		return ""
	}
}    

function first_two_words(sentence) {
    try {
        let first_two_words = sentence.match(/[^\s]+\s+[^\s]+\s/);
        first_two_words = first_two_words[0];
        return first_two_words; 
    } 
    catch(err) {
		console.log("first_two_words() error");
        console.log(err.message);
        return "";
    }

}



function change_sentence() {
    console.log("change the sentence");
    do_that();
}

function get_text() {
    myText = document.getElementById("sentence").value;
    myText = myText.replace(/[\n\r]/g, "");
    myText = myText.replace(/\s{2,10}/g, " ");
    myText = myText.trim();
    sentences = myText.match(/[^\.!\?]+[\.!\?]+|[^\.!\?]+$/g);
    for (let x = 0; x < sentences.length; x++) {
        sentences[x] = sentences[x].replace(/[\n\r]/g, "");
        sentences[x] = sentences[x].replace(";", "");
    }
    if (sentences[sentences.length - 1].length < 4) {
        sentences.pop(sentences.length - 1);
        console.log("Cut off tiny last sentence");
    }
}

function do_that() {
    // sentenceNumber = document.getElementById('which_number').value; 

    get_text();

    randIndex = Math.floor(Math.random() * sentences.length); 
    sentence = sentences[randIndex];
    sentenceNumber = randIndex + 1;
    sentenceNumber = "(" + sentenceNumber + ")";

    currentWord.innerHTML = sentenceNumber + " " + sentence;
    modifiedSentence.innerHTML = sentenceNumber + " " + underlineReplace(sentence);
    firstLetters.innerHTML = sentenceNumber + " " + first_letters(sentence);
    firstTwoWords.innerHTML = sentenceNumber + " " + first_two_words(sentence);

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
    var num_sentence_group = 0;
   
    for (var sen_i = sentences.length - 1; sen_i > 0; sen_i--) {
        returned_chunks = break_up_sentence(sentences[sen_i]); 
        for (var j = 0; j < returned_chunks.length; j++) {
            myCSV.push(returned_chunks[j]);
        }
        // This works for making a 2D Array and pushing the sentences
        // @TODO problem:  it is returning every sentence
        
        let sentenceArray = [];
        sentenceArray = pull_sentences(sentences[sen_i]);
        update_myCSV(sentenceArray);
        num_sentence_group++;

    if (num_sentence_group !== 1 && num_sentence_group < 6) {
         // Grab the previous sentences needed in the group.
        //  EXAMPLE: If group number is 3, grab the last 3, 
        //  the last 2, and the last 1 sentence.

        //  SOMETHING IS WRONG HERE.
        for (var y = num_sentence_group; y > 0; y--) {
            var groupArray = [];
            var quesAnswer = [];
            // This should really call a function.
                // @TODO make one function that does this
            if (sen_i - num_sentence_group > 0) {
                for (var which_sentence = sen_i - num_sentence_group; which_sentence !== sen_i; which_sentence++) {
                    groupArray.push(pull_sentences(sentences[which_sentence]));
                }
            } else {
                break;
            }
				
				// Something like this but use a loop
				//	quesAnswer.push([groupArray[arrayI][0][0] + " " + groupArray[arrayI + 1][0][0], groupArray[arrayI][0][1] + " " + groupArray[arrayI + 1][0][1]]);
				for (let arrayI = 0; arrayI < groupArray.length - 1; arrayI++) {
			   //  quesAnswer.push([groupArray[arrayI][0][0] + " " + groupArray[arrayI + 1][0][0], groupArray[arrayI][0][1] + " " + groupArray[arrayI + 1][0][1]]);
					

					    let strX = "";
						let strY = "";

						for (let x = 0; x < groupArray.length - 1; x++) {
							strX += groupArray[x][0][0] + "<br />";
							strY += groupArray[x][0][1] + "<br />";
							}
						
					quesAnswer.push([strX, strY]);
					
						strX = "";
						for (let x = 0; x < groupArray.length - 1; x++) {
							strX += groupArray[x][1][0] + "<br />";
						}
					quesAnswer.push([strX, strY]);
						strX = "";
						for (let x = 0; x < groupArray.length - 1; x++) {
							strX += groupArray[x][2][0] + "<br />";
						}

					}
				update_myCSV(quesAnswer);
				}
					
					debugger;
                    
                    
                 
            // update_myCSV(groupArray);
		update_myCSV(quesAnswer);
        console.log("quesAnswer array is : " + quesAnswer + " hope it is FLAT ENOUGH");

        } else if (num_sentence_group === 6) {
            num_sentence_group = 0;
            }

  } // end for loop (var i = = sentences.length - 1; i > 0; i--) 



function pull_sentences(mySentence) {
        let tempArray = [];
        let tempRow = [];
        tempRow.push(underlineReplace(mySentence));
        tempRow.push(mySentence);
        tempArray.push(tempRow);
        tempRow = [];

        tempRow.push(first_letters(mySentence));
        tempRow.push(mySentence);
        tempArray.push(tempRow);
        tempRow = [];

        tempRow.push(first_two_words(mySentence));
        tempRow.push(mySentence);
        tempArray.push(tempRow);
        tempRow = [];
        
        return (tempArray);
}

        function update_myCSV(tempArray) {
        for (let tempI = 0; tempI < tempArray.length; tempI++) {
            myCSV.push(tempArray[tempI]);
            }
        }
    downloadableCSV(myCSV);
} // end function every_sentence_convert(sentences) 

function downloadableCSV(rows) {
    var csv = "";
    rows.forEach(function(row) {
        csv += row.join(';');
        csv += '\n';
    });
    csv = csv.replace(/"/g, "\"\"");

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
