const fs = require('fs');
const readline = require('readline-sync');
const keywordPath;
if (process.argv <= 3) {
    keywordPath = "/keywords/keyword.txt";
} else {
    keywordPath = process.argv[2];
}


const keywordTxt = fs.readFileSync(keywordPath, {
    encoding: 'utf8'
});
const pageFormat = fs.readFileSync('pageformats.txt', {
    encoding: 'utf8'
});
const pageType = fs.readFileSync('pagetypes.txt', {
    encoding: 'utf8'
});
const searchFunction = fs.readFileSync('searchfunctions.txt', {
    encoding: 'utf8'
});

makeDorks(keywordTxt, pageFormat, pageType, searchFunction);

function makeDorks(keyword, format, types, functions) {

    const date = new Date();

    let keyword_arr = keyword.split('\n');
    let formats_arr = format.split('\n');
    let functions_arr = functions.split('\n');
    let types_arr = types.split('\n');
    console.log(keyword_arr, formats_arr, functions_arr, types_arr);
    let dorks = [];

    keyword_arr.forEach(keys => {
        formats_arr.forEach(format => {
            functions_arr.forEach(functionz => {
                types_arr.forEach(type => {
                    var dorkLine = `${functionz}${keys}${format}${type}`;
                    dorks.push(dorkLine);
                })
            })
        })
    })

    if (readline.keyInYN('Do you want to randomize')) {
        dorks = shuffle(dorks);
    }
    fs.writeFileSync(`dorks/Generated: ${date.getFullYear()}-${date.getMonth()}-${date.getDate()} | ${date.getHours()}-${date.getMinutes()}.txt`, dorks.join('\n'));

}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}