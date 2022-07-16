const translate = require('@vitalets/google-translate-api');

module.exports = {
    name: "Google Translate",
    translate: async function(word, langcode){
        return (await translate(word, {to: langcode})).text;
    }
}