let SEED = "42"
import {dictionary} from "./dictionary.js";
import {words} from "./word.js";

let random = new Math.seedrandom("80");
let dictionaryLength = dictionary.length;
console.log(generated_ccNL(4))

document.set_seed(SEED);



function generate_distracters(word, dictionary){
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const results = [];

    // Generate all possible edits that are 1 character away
    for (let i = 0; i <= word.length; i++) {
        const left = word.slice(0, i);
        const right = word.slice(i);

        // Deletion
        if (right) results.push(left + right.slice(1));

        // Insertion
        for (let i = 0; i < letters.length; i++) {
            const currentLetter = letters[i];
            results.push(left + currentLetter + right);
        }

        // Replacement
        if (right) {
            for (let i = 0; i < letters.length; i++) {
                const currentLetter = letters[i];
                if (currentLetter !== right[0]) {
                    results.push(left + currentLetter + right.slice(1));
                }
            }
        }
    }
    // Filter results that are valid words in the dictionary and not the original word
    return Array.from(results).filter(w => w !== word && dictionary.includes(w));
}
function to_positive(rand) {
    let num;
    do {
        num = Math.abs(rand.int32() % 5);
    } while (num === 0 || num === 1);
    return num;
}


function uppercase(identArray) {
    let output = [identArray[0]];
    for(let i = 1; i < identArray.length; i++) {
        output.push((identArray[i][0]).toUpperCase() + identArray[i].slice(1, identArray[i].length));
    }
    return output;
}


function generateIdentifier(numWords) {
    let idenArray = [];
    let word;
    for(let i= 0; i < numWords; i++) {
        do {
            word = words[document.new_random_integer(words.length)];
            idenArray.push(word)
        } while (word.length < 4);
        idenArray.push(words[document.new_random_integer(words.length)]);
    }
    return idenArray;
}

function
generated_ccNL(numWords) {
    let output;
    for (let i = 0; i < numWords; i++) {
        if( i === 0) {
            output = uppercase(generateIdentifier(to_positive(random))).join("");
        }
        else{
            output += ", " + "\n" + uppercase(generateIdentifier(to_positive(random))).join("");
        }
    }
    return output;
}
function generated_ccWS(numWords) {
    let output;
    for (let i = 0; i < numWords; i++) {
        if (i === 0) {
            output = uppercase(generateIdentifier(to_positive(random))).join("");
        }
        else {
            output += ", " + uppercase(generateIdentifier(to_positive(random))).join("");
        }
    }
    return output;
}

function generated_scNL(numWords) {
    let output ;
    for (let i = 0; i < numWords; i++) {
        if( i === 0) {
            output = generateIdentifier(to_positive(random)).join("_");
        }
        else {
            output += ", " + "\n" + generateIdentifier(to_positive(random)).join("_");
        }
    }
    return output;
}
function generated_scWS(numWords) {
    let output;
    for (let i = 0; i < numWords; i++) {
        if (i === 0) {
         output = generateIdentifier(to_positive(random)).join("_");
        }
        else {
            output += ", " + generateIdentifier(to_positive(random)).join("_");
        }
    }
    return output;
}



function shuffle_array(arr) {
    for (let i = arr.length; i >0; i--) {
        const j =  Math.abs(random.int32() % (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function insertion(identifierWord) {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let results = [] ;
    let leftside;
    let rightside;
    let distracterWord;

    for (let i = 0; i <= identifierWord.length; i++) {
        leftside = identifierWord.slice(0, i);
        rightside = identifierWord.slice(i);
        for (let i = 0; i < letters.length; i++) {
            const currentLetter = letters[i];
            distracterWord = leftside + currentLetter + rightside;
            if (dictionary.includes(distracterWord)){
                results.push(distracterWord);
            }
        }
    }
    return results;
}

function deletion(identifier) {// offers an array with each word having a length of -1 from the original array
    let results = [];
    let leftside;
    let rightside;
    let distracterWord;
    for (let j = 0; j <= identifier.length; j++) {
        leftside = identifier.slice(0, j);
        rightside = identifier.slice(j);
        if (rightside) {
            distracterWord = leftside + rightside.slice(1);
            if (dictionary.includes(distracterWord)) {
                results.push(distracterWord);
            }
        }
    }
    return results;
}


function replacement(identifier){
    let results = [];
    let currentLetter;
    let leftside;
    let rightside;
    let distracterWord;
    const letters = "abcdefghijklmnopqrstuvwxyz";
    for (let j = 0; j <= identifier.length; j++) {
        leftside = identifier.slice(0, j);
        rightside = identifier.slice(j);
        if (rightside) {
            for (let k = 0; k < letters.length; k++) {
                currentLetter = letters[k];
                if (currentLetter !== rightside[0]) {
                    distracterWord = leftside + currentLetter + rightside.slice(1);
                }
                if (dictionary.includes(distracterWord)) {
                    results.push(distracterWord);
                }
            }
        }
    }
    return results;
}

function split_identifier(identifier){
    let identifierArr = [];
    let returnArray = [];
    if(identifier.includes("_")){
        returnArray.push("snakecase");
        identifierArr = identifier.split("_");
        returnArray.push(identifierArr);
        return returnArray;
    }
    else {
        returnArray.push("camelcase");
        identifierArr = identifier.split(/(?=[A-Z])/);
        for (let i = 0; i < identifierArr.length; i++) {
            identifierArr[i] = identifierArr[i].toLowerCase();
        }
        returnArray.push(identifierArr);
        return  returnArray;
    }
}


function join_identifier(identifierArr, style){
    switch (style) {
        case "camelcase":
           return uppercase(identifierArr).join("");
        case "snakecase":
            return identifierArr.join("_");
        default:
    }
}

function words_starting_with_same_letter(word1, word2) {
    return word1.charAt(0) === word2.charAt(0);
}

function position_in_array(array, word){
    let position;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === word){
            position = i;
            break;
        }
    }
    return position;
}

function deletion_and_replacement(word){
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let currentLetter;
    let distracter ;
    let replacement;
    let results = [];
    for(let i= 2; i< word.length; i++){
        replacement = word.slice(i-2, i);
        for(let j= 0; j< letters.length; j++){
            currentLetter = letters.charAt(j);
            distracter = word.replace(replacement, currentLetter);
            if (dictionary.includes(distracter)){
                results.push(distracter);
            }
        }
        distracter = word.replace(replacement, "")
        if (dictionary.includes(distracter)){
            results.push(distracter);
        }
    }
    return results;
}

function replacement_distance_two_three(word,array){
    let wordLength = word.length;
    let results = [[], [], [], [], []];
    let distance = 0;
    let length;
    let difference;
    for (let i = 0; i < array.length; i++) {
        if (words_starting_with_same_letter(word, array[i])){
            length = array[i].length;
            if(length === wordLength || length === (wordLength+1) || length === (wordLength+2) || length === (wordLength-1) || length === (wordLength-2)){
                difference = wordLength-length;
                for (let j = 0; j < word.length; j++) {
                   if (array[i].includes(word.charAt(j))){}
                    else{distance++;}
                }
                if (distance === 2 || distance === 3){
                    switch (difference) {
                        case 0:
                            results[0].push(array[i])
                            break;
                        case 1:
                            results[1].push(array[i])
                            break;
                        case -1:
                            results[2].push(array[i])
                            break;
                        case 2:
                            results[3].push(array[i])
                            break;
                        case -2:
                            results[4].push(array[i])
                            break;
                        default:
                            break;

                    }
                    results.push(array[i]);
                }
                distance = 0;
            }
        }
    }
    return results;
}
function two_word_distracter(identifier){
    let splitIdentifier = split_identifier(identifier);
    let style = splitIdentifier[0];
    let identifierArr = splitIdentifier[1];
    let distracterArr = [];
    let preresults = [];
    let length;
    let distracterWordUsed = [];
    let foundWordStartingWithSameLetter = false;

    for (let i = 0; i < identifierArr.length; i++) {
        preresults = replacement(identifierArr[i]);
        length = preresults.length;
        if (length === 0){
            preresults = replacement_distance_two_three(identifierArr[i], dictionary);
        }
        if (length === 1){
            if (i === 0) {
                distracterArr.push(join_identifier([preresults[0], identifierArr[1]], style));
            }
            else {
                distracterArr.push(join_identifier([identifierArr[0], preresults[0]]), style);
            }
            preresults = replacement_distance_two_three(identifierArr[i], dictionary);
        }
        length = preresults.length;
        switch (length) {
            case 0:
                distracterArr.push("It cannot go");
                break;
            case 1:
                distracterWordUsed.push(preresults[0]);
                if (i === 0) {
                    distracterArr.push(join_identifier([preresults[0], identifierArr[1]], style));
                }
                else {
                    distracterArr.push(join_identifier([identifierArr[0], preresults[0]]), style);
                }
                break;
            default:
                if (i === 0) {
                    while (length !== 0) {
                        let word = shuffle_array(preresults)[0];
                        distracterWordUsed.push(word);
                        if (words_starting_with_same_letter(word, identifierArr[i])) {
                        distracterArr.push(join_identifier([word, identifierArr[1]], style));
                        foundWordStartingWithSameLetter = true;
                        break;
                        }
                        length--;
                    }
                    if(foundWordStartingWithSameLetter){foundWordStartingWithSameLetter = false;}
                    else{distracterArr.push(join_identifier([(shuffle_array(preresults)[0]), identifierArr[1]], style));}
                    distracterWordUsed.push(preresults[0]);
                }
                else {
                    while (length !== 0) {
                        let word = shuffle_array(preresults)[0];
                        distracterWordUsed.push(word);
                        preresults.splice(0, 1);
                        if (words_starting_with_same_letter(word, identifierArr[i])) {
                            distracterArr.push(join_identifier([identifierArr[0], word], style));
                            foundWordStartingWithSameLetter = true;
                            break;
                        }
                        length--;
                    }
                    if(foundWordStartingWithSameLetter){foundWordStartingWithSameLetter = false;}
                    else{distracterArr.push(join_identifier([identifierArr[0], (shuffle_array(preresults)[0])], style));
                        distracterWordUsed.push(preresults[0]);
                        preresults.splice(0,1);
                    }
                    distracterWordUsed.push(preresults[0]);
                    preresults.splice(0,1);
                    distracterArr.push(join_identifier([identifierArr[0], (shuffle_array(preresults))[0]], style));
                    distracterWordUsed.push(preresults[0]);
                }
                break;
        }
    }
    for (let i = 0; i < identifierArr.length; i++) {
        preresults = deletion(identifierArr[i]);
        if (preresults.length === 0){
            preresults = insertion(identifierArr[i]);
            if (preresults.length === 0){
                preresults = replacement(identifierArr[i]);
                if (preresults.length > 1){
                    for (let j = 0; j < distracterWordUsed.length; j++) {
                        for (let k = 0; k < preresults.length; k++) {
                            if (preresults[k] === distracterWordUsed[j]){
                                preresults.splice(k, 1);
                            }
                        }

                    }
                }
            }
        }
        switch (preresults.length) {
            case 1:
                if (i === 0) {
                    distracterArr.push(join_identifier([preresults[0], identifierArr[1]], style));
                }
                else {
                    distracterArr.push(join_identifier([identifierArr[0], preresults[0]]), style);
                }
                break;
            default:
                let startingWithSameLetters = [];
                for (let j = 0; j < preresults.length; j++) {
                    if (words_starting_with_same_letter(identifierArr[i].charAt(0), preresults[j].charAt(0))){
                        startingWithSameLetters.push(preresults[j]);
                    }
                }
                if (startingWithSameLetters.length > 0) {
                    switch (startingWithSameLetters.length) {
                        case 1:
                            if (i === 0) {
                                distracterArr.push(join_identifier([startingWithSameLetters[0], identifierArr[1]], style));
                            } else {
                                distracterArr.push(join_identifier([identifierArr[0], startingWithSameLetters[0]], style));
                            }
                            break;
                        default:
                            if (i === 0) {
                                distracterArr.push(join_identifier([shuffle_array(startingWithSameLetters)[0], identifierArr[1]], style));
                            } else {
                                distracterArr.push(join_identifier([identifierArr[0], shuffle_array(startingWithSameLetters)[0]], style));
                            }
                            break;
                    }
                }
                else {
                    if (i === 0) {
                        distracterArr.push(join_identifier([shuffle_array(preresults)[0], identifierArr[1]], style));
                    }
                    else {
                        distracterArr.push(join_identifier([identifierArr[0], shuffle_array(preresults)[0]], style));
                    }
                }
                break;

        }

    }
    return distracterArr;
}


function generate_distracter(identifier){
    let identifierArr = identifier.split(/(?=[A-Z])/).map(word => word.toLowerCase());
    let distracterArr = [];

    
    switch(identifierArr.length) {
        case 2:

            break;
        case 3:
            // code block
            break;
        case 4:
            // code block
            break;
        default:
        // code block
    }
}

function generate_ccILSame(numWords){
    let output;
    let identifierLength = to_positive(random);
    output = uppercase(generateIdentifier(identifierLength)).join("") +"\n\n\n\n";
    return output;
}



document.experiment_definition(
    {
        experiment_name:"Camel case Vs Underscore",
        seed:"42",
        introduction_pages:["This is a camelCase vs under_score identifier experiment.\n\n" +
                            "Please read till the end.\n\n" +
                            "This experiment is constructed as follows.\n\n" +
                            "You are expected to count the number of identifiers shown and type the counted number.\n\n" +
                            "The name of the identifiers are not of any importance.\n\n" +
                            "Follow the instructions that come as you proceed.\n\n" +
                            "You are expected to be concentrated.\n\n" +
                            "Press [Return]/[ENTER] to enter the training phase.\n\n" +
                            "The training phase can be ended at any time by pressing [ESC].\n\n" +
                            "So you can end the training when you think you have understood what is required.\n\n" +
                            "Thanks for your participation."],

        pre_run_instruction:"Be prepared - experimentatin starts soon.",

        finish_pages:["Thanks for participating. Pressing [ENTER] downloads the csv data file.\n\n" +
                        "Please send this file to nikitatchana@gmail.com"],
        layout:[
            {variable:"Notation", treatments:["CC", "SC"]},
            {variable:"Separator", treatments:["Newline", "Whitespace"]},
            {variable: "identifiers", treatments: ["2", "3", "4", "5", "6"]},
            {variable: "IdentifierType", treatments: ["same", "different"]},
        ],
        repetitions:5,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["2", "3", "4", "5", "6"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{

            t.expected_answer = parseInt(t.treatment_combination[2].value);

            if (t.treatment_combination[3].value === "same") {
                if (t.treatment_combination[0].value === "CC") {
                    t.code = t.treatment_combination[1].value === "Newline" ? generated_ccNL(t.expected_answer) : generated_ccWS(t.expected_answer);
                }
            }
            else{
                t.code = t.treatment_combination[1].value === "Newline"? generated_scNL(t.expected_answer) : generated_scWS(t.expected_answer);
            }


            t.after_task_string = ()=>"The correct answer was: " + t.expected_answer +
            "\n" + "press [ENTER] to proceed\n" +
            "OR TAKE A BREAK IF NEEDED BEFORE PRESSING [ENTER] to proceed";
        }
    }
);

