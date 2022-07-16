const translators = [
    require('./deepl'),
    require('./googletrans')
]
const fs = require('fs');
var readlineSync = require('readline-sync');

function selectTranslator() {
    var question = "> Select a translator API to use:";
    for (let i = 0; i < translators.length; i++) {
        question += "\n  [" + (i + 1) + "] " + translators[i].name
    }
    question += "\nSelect [1-" + translators.length + "]: "
    var response = readlineSync.questionInt(question) - 1;
    if (translators[response] == null) {
        console.log("Input valid number, please.");
        response = selectTranslator();
    }
    return response;
}

var translatorIndex = selectTranslator();
console.log("Seleted: " + translators[translatorIndex].name);
var languageCode = readlineSync.question("> Language code: ");


// Now to do the translating
const source = fs.readFileSync("./source.lua", 'utf-8').toString();
var output = source;
const quoteRegex = new RegExp(/(?<=\")(.*?)(?=\")/g);
var matches = source.matchAll(quoteRegex);
for (var match of matches) {
    delete match.input;
    var word = translators[translatorIndex].translate(match[0], languageCode)
    output.replace(match[0], word);
}
console.log(output);
fs.writeFileSync("output.lua", output);