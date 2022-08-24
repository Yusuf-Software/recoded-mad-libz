/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
      
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */


 
 

function parseStory(rawStory) {
  const INTERNAL_TO_RENDERED_POS = {
    n: "noun",
    v: "verb",
    a: "adjective"
  }
  const myFunction = (pos) => {
    const result = INTERNAL_TO_RENDERED_POS[pos.charAt(1)]
    return result;
  }
  
  const PARSING_REGEX = /(?<word>\w+)(?<pos>\[[nva]\])?(?<punctuation>[\.,])?/


   const rawWords = rawStory.split(' ');
   const results = [];
 
   for (let index = 0; index<rawWords.length; index++){
     const rawWord = rawWords[index];
     const groups = PARSING_REGEX.exec(rawWord).groups;
     results.push(
       {
         word: groups.word,
         pos: groups.pos ? myFunction(groups.pos) : undefined,
         punctuation: groups.punctuation ? groups.punctuation : undefined
       }
     )
   }
 
 
   return results; // This line is currently wrong :)
 }


 /**
  * All your other JavaScript code goes here, inside the function. Don't worry about
  * the `then` and `async` syntax for now.
  *
  * NOTE: You should not be writing any code in the global namespace EXCEPT
  * declaring functions. All code should either:
  * 1. Be in a function.
  * 2. Be in .then() below.
  *
  * You'll want to use the results of parseStory() to display the story on the page.
  */
 getRawStory()
   .then(parseStory)
   .then((processedStory) => {

    let editPad = document.querySelector('.madLibsEdit');
    let previewPane = document.querySelector('.madLibsPreview');
    let wordList = processedStory;

    for(let i=0; i<wordList.length; i++){
      let editableInput = document.createElement('input');
      editableInput.classList = `editableLibz`;
      editableInput.type = 'text';

      let inputSpans = document.createElement('span');
      inputSpans.className = `readableLibz`;
      
      
      editableInput.addEventListener('input', (event) => {
        inputSpans.textContent = event.target.value;
        }
        )
      
      if (wordList[i].pos == undefined){
        let spans = document.createElement('span');
        let spans2 = document.createElement('span');

        let spaceAfter = wordList[i].punctuation != undefined ? '' : ' '
        spans.textContent = ` ${wordList[i].word}${spaceAfter}`;
        spans2.textContent = ` ${wordList[i].word} `;
        previewPane.append(spans);
        editPad.append(spans2);
      }

      if (wordList[i].pos != undefined) {
        editableInput.placeholder = wordList[i].pos;
        editPad.appendChild(editableInput);
        
        inputSpans.textContent = wordList[i].word;
        previewPane.appendChild(inputSpans);
      }
      if (wordList[i].punctuation != undefined){
        let spans = document.createElement('span');
        let spans2 = document.createElement('span');

        spans.textContent = `${wordList[i].punctuation} `;
        spans2.textContent = `${wordList[i].punctuation} `;

        previewPane.append(spans);
        editPad.append(spans2);
      }
      
    }

    let editableInput = document.querySelectorAll('.editableLibz');

    // for(let i=0; i<wordList.length; i++){
    // editableInput[i].addEventListener("keyup", function(event) {
    //   if (event.keyCode === 13) {
    //       console.log('Enter clicked')
    //       event.preventDefault();
    //       if (this.parentElement.nextElementSibling.querySelector('input')) {
    //           this.parentElement.nextElementSibling.querySelector('input').focus();
    //       }
    //   }})
    // }
     console.log(processedStory);
   });



// const rawStory = 'Louis[n] went[v] to the store[n], and it was fun[a]. He taught[v] the class[n]. The abbreviation[n] "n" means[v] noun. We use[v] the letter[n] "v" for verbs. And for "a", you can[v] make a good[a] guess.';
// let wordList = parseStory(rawStory);

// wordList = parseStory(wordList);