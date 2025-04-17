let SEED = "42"
import {dictionary} from "./dictionary.js";
import {words} from "./word.js";

document.set_seed(SEED);
let random = new Math.seedrandom("80");


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
    for(let i= 0; i < numWords; i++) {
        idenArray.push(dictionary[document.new_random_integer(dictionary.length)]);
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
            {variable: "Number of identifiers", treatments: ["2", "3", "4", "5", "6"]},
        ],
        repetitions:5,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["2", "3", "4", "5", "6"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{

            t.expected_answer = parseInt(t.treatment_combination[2].value);

            if (t.treatment_combination[0].value === "CC"){
                t.code = t.treatment_combination[1].value === "Newline"? generated_ccNL(t.expected_answer) : generated_ccWS(t.expected_answer);
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
