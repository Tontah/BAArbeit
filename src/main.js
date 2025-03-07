let SEED = "42"
import {dictionary} from "./dictionary.js";
import {words} from "./word.js";

document.set_seed(SEED);

function generateMethodName(numWords) {
    let ret = [];
    for(let i= 0; i < numWords; i++) {
        ret.push(words[document.new_random_integer(words.length)]);
    }
    return ret;
}

function generateIdentifier(numWords) {
    let idenArray = [];
    for(let i= 0; i < numWords; i++) {
        idenArray.push(dictionary[document.new_random_integer(dictionary.length)]);
    }
    return idenArray;
}

function generateLeadingBlanks(numBlanks) {
    let output = "";
    while (numBlanks!==0){
        output = output + '&nbsp;';
        numBlanks--;
    }
    return output;
}

function generated_ccNL(numWords) {
    let numberOfLoops = numWords+1;
    let outputArr = [];
    let output = "";
    while (numberOfLoops !== 0){

            outputArr.push(generateMethodName(numWords).join(""));
            numberOfLoops--;
    }
    for (let i = 0; i < numWords+1; i++) {
        if( i === 0){
            output = outputArr[i]+ " = (\n";
        }
        else if( i === (numWords)){
            output += outputArr[i]+ "){" + generateMethodName(numWords).join("") + " = x*8;}";
        }
        else {
               let numSpaces = outputArr[0].length+5;
                output += generateLeadingBlanks(numSpaces);
                output += outputArr[i] + ",\n";
        }
    }
    return output;
}
function generated_ccIL(numWords) {
    return generateMethodName(numWords).join("");
}

function generated_scNL(numWords) {
    return generateMethodName(numWords).join("_") + " = (";
}
function generated_scIL(numWords
) {
    return generateMethodName(numWords).join("_") + " = (";
}


// Das hier ist die eigentliche Experimentdefinition
document.experiment_definition(
    {
        experiment_name:"Camel case Vs Underscore",
        seed:"42",
        introduction_pages:["This is a camelCase vs under_score identifier experiment.\n\n" +
                            "Please read till the end\n\n" +
                            "This experiment is constructed as follows.\n\n" +
                            "Press ENTER to go to the training phase of the experiment.\n\n" +
                            "You are expected to count the number of identifiers that appear in the method declaration.\n\n" +
                            "The name of the identifiers and method are not of any importance.\n\n" +
                            "Follow the instructions that come as you proceed.\n\n" +
                            "You are expected to be concentrated.\n\n" +
                            "Press [Return] to enter the training phase."],

        pre_run_instruction:"Be prepared - experimentation starts soon.",

        finish_pages:["Thanks for participating. Send me your csv file - Nikita"],
        layout:[
            {variable:"Notation", treatments:["nl & cc", "il & cc", "nl & sc", "il & sc"]},
            {variable: "Occurances", treatments: ["2", "4", "6"]}
        ],
        repetitions:1,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["2", "4", "6"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{

            t.expected_answer = parseInt(t.treatment_combination[1].value);

            if (t.treatment_combination[0].value === "nl & cc") // fragt, ob die erste Variable (die einzige) den Wert "indented" hat
                t.code = generated_ccNL(t.expected_answer);
            else
            if (t.treatment_combination[0].value === "il & cc") // fragt, ob die erste Variable (die einzige) den Wert "indented" hat
                t.code = generated_ccIL(t.expected_answer);
            else
            if (t.treatment_combination[0].value === "nl & sc") // fragt, ob die erste Variable (die einzige) den Wert "indented" hat
                t.code = generated_scNL(t.expected_answer);
            else
                t.code = generated_scIL(t.expected_answer);


            t.after_task_string = ()=>"The correct answer was: " + t.expected_answer;
        }
    }
);
function next_random_int_0_to_9() {
    return document.new_random_integer(10);
}
