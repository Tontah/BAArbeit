let SEED = "42"
import {dictionary} from "./dictionary.js";
import {words} from "./word.js";
import {levDisWord_DicEdit} from "./levDisWord_DicEdit.js";

let random = new Math.seedrandom("80");
let wordArr =[];
let word;


document.set_seed(SEED);


function to_positive(rand) {
    let num;
    do {
        num = Math.abs(rand.int32() % 3);
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
    const length = levDisWord_DicEdit.length;
    for(let i= 0; i < numWords; i++) {
        do {
            wordArr = levDisWord_DicEdit[document.new_random_integer(length)];
            word = wordArr[0];
            idenArray.push(word);

        } while (word.length < 4);
        /*idenArray.push(levDisWord_DicEdit[document.new_random_integer(length)][0]);*/
    }
    return idenArray;
}

function generated_ccNL(numWords) {
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

function generated_scNL(numOfCorrectIdentifiers) {
    let wordArr = generateIdentifier(to_positive(random));//.join("_");
    let distracters = shuffle_array(generate_distracter(wordArr));
    let identifier = wordArr.join("_");
    let output ;
    let choice ;
    let counter = 0;
    let distracterOrIdentifier =["distracter", "identifier"];

    output = identifier + "\n" + "\n";
    for (let i = 0; i < distracters.length; i++) {
        if(counter < numOfCorrectIdentifiers) {
            choice = distracterOrIdentifier[document.new_random_integer(2)];
        }
        else {choice = "distracter"}
        if (choice === "distracter") {
            if (i === 0){output += "\n" + "\n" + distracters[i].join("_");}
            else{output += "\n" + distracters[i].join("_");}
        } else if (choice === "identifier") {
            if(i === 0){output += "\n" + "\n" + identifier;}
            else{output += "\n" + identifier;}
            counter++;
        }
    }
    return output;
}
function generated_scWS(numOfCorrectIdentifiers) {
    let wordArr = generateIdentifier(to_positive(random));
    let distracters = shuffle_array(generate_distracter(wordArr));
    let identifier = wordArr.join("_");
    let output ;
    let choice ;
    let counter = 0;
    let distracterOrIdentifier =["distracter", "identifier"];

    output = identifier + "\n" + "\n";
    for (let i = 0; i < distracters.length; i++) {
        if(counter < numOfCorrectIdentifiers) {
            choice = distracterOrIdentifier[document.new_random_integer(2)];
        }
        else {choice = "distracter"}
        if (choice === "distracter") {
            if (i === 0){output += "\n" + "\n" + distracters[i].join("_");}
            else{output += ", " + distracters[i].join("_");}
        } else if (choice === "identifier") {
            if(i === 0){output += "\n" + "\n" + identifier;}
            else{output += ", " + identifier;}
            counter++;
        }
    }
    return output;
}



function shuffle_for_distracters(arr) {
    let array = [];
    for (let i = 1; i < arr.length; i++) {
        array[i-1] = arr[i];
    }
    for (let i = array.length-1; i > 0; i--) {
        const j = Math.abs(random.int32() % (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function shuffle_array(arr) {
    for (let i = arr.length-1; i > 0; i--) {
        const j = Math.abs(random.int32() % (i));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function split_identifier(identifier){
    //identifier.split(/(?=[A-Z])/).map(word => word.toLowerCase());
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


function getting_the_array_of_word(word){
    let output = []
    for (let i = 0; i < levDisWord_DicEdit.length; i++) {
        if(levDisWord_DicEdit[i][0] === word){
           output = levDisWord_DicEdit[i];
           break;
        }
    }
    return output
}

function generate_distracter(identifierArr){
    let distracterArr = [];
    let levDistances =[];
    let shuffled =[];
    //let additionRandom = to_positive(random)%2;
    let word;
    let distracter = "empty";
    let deleted = false;
    let changed = false;
    let added = false;
    //console.log("additionRandom = " + additionRandom);

    
    switch(identifierArr.length) {
        case 2:
            for (let b = 0; b < identifierArr.length ; b++) {
                word = identifierArr[b];
                levDistances = getting_the_array_of_word(word);
                for (let j = 1; j < levDistances.length; j++) {
                    shuffled = shuffle_for_distracters(levDistances[j]);
                    for (let i = 0; i < shuffled.length; i++) {
                        if (b === 0) {
                            if (shuffled[i][0] === word[0]) {
                                distracter = shuffled[i];
                                //changing any but first letter of word1
                                if (shuffled[i].length === word.length && changed === false) {
                                    distracterArr.push([distracter,identifierArr[b+1]]);
                                    changed = true;
                                }
                                //deleting one letter from word1
                                if ((shuffled[i].length === word.length-1 || shuffled[i].length === word.length-2) && deleted === false) {
                                    distracterArr.push([distracter,identifierArr[b+1]]);
                                    deleted = true;
                                }
                                //adding one or more letters to word1
                                if(added === false && (shuffled[i].length === word.length+1 || shuffled[i].length === word.length+2)){
                                    distracterArr.push([distracter,identifierArr[b+1]]);
                                    added = true;
                                }
                                if (deleted === true && changed === true && added === true){
                                    break;
                                }
                            }
                        }
                        else{
                            distracter = shuffled[i];
                            //adding one or more letters to word2
                            if(added === false && (distracter.length === word.length+1 || distracter.length === word.length+2)){
                                distracterArr.push([identifierArr[b-1], distracter]);
                                added = true;
                            }
                            if (shuffled[i].length === word.length) {
                                //distracter = shuffled[i];
                                //changing any but first letter of word2
                                if (shuffled[i][0] === word[0] && changed === false) {
                                    distracterArr.push([identifierArr[b-1], distracter]);
                                    changed = true;
                                }
                                //changing first letter of word2
                                if (shuffled[i][0] !== word[0] && deleted === false) {
                                    distracterArr.push([identifierArr[b-1], distracter]);
                                    deleted = true;
                                }
                                if (deleted === true && changed === true && added === true){
                                    break;
                                }
                            }
                        }
                    }
                    if (deleted === true && changed === true && added === true){
                        added = deleted = changed = false;
                        break;
                    }
                }
            }


            break;
        case 3:
            // code block
            distracterArr = [["go","for",  "it"],["get", "out", "friend"]]
            break;
        case 4:
            // code block
            distracterArr = [["code","block", "no", "disturb"], ["abeg", "yah", "tire", "sep"]]
            break;
        default:
        // code block
    }
    return distracterArr;
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
            {variable: "identifiers", treatments: ["0", "1", "2" , "3", "4", "5", "6"]},//tells how many identifiers have to be in the list, the rest are thn distracters
            {variable: "IdentifierType", treatments: ["same", "different"]},
        ],
        repetitions:2,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["0","1", "2", "3", "4", "5", "6"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
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

