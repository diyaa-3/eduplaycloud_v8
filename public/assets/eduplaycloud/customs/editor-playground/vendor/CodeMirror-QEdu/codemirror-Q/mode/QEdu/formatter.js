
//var sectionskeyWords=['Problem:','IndQuestion:','Q:','P:','Question:','Parameters:','\Attr','Answers:','Hints:','+A:','-A:','-H:'];


function repeat(s, count) {
    return new Array(count + 1).join(s);
}

function eatWord(QText, pos) {

    var mloop = true;
    mWord = "";
    while (mloop) {
        currentChar = QText.charAt(pos);
        if ((currentChar != " ") && (currentChar != "\n") && (currentChar != "\t")) {
            mWord = mWord + currentChar;
            pos += 1;
        } else {
            mloop = false
        }
    }
    return { word: mWord, pos: pos }
}
function eatAllSpace(QText, pos) {

    var mloop = true;
    mWord = " ";
    while (mloop) {
        currentChar = QText.charAt(pos);
        if ((currentChar == " ") || (currentChar == "\n") || (currentChar == "\t")) {

            pos += 1;
        } else {
            mloop = false
        }
    }
    return { word: mWord, pos: pos }
}
function eatSpace(QText, pos) {

    var mloop = true;
    mWord = QText.charAt(pos);
    if ((mWord == " ") || (mWord == "\t")) {
        while (mloop) {
            currentChar = QText.charAt(pos);
            if ((currentChar == " ") || (currentChar == "\t")) {

                pos += 1;
            } else {
                mloop = false
            }
        }
    }
    else {
        if (mWord == "\n") {
            mloop = true;
            while (mloop) {
                currentChar = QText.charAt(pos);
                if (currentChar == "\n") {

                    pos += 1;
                } else {
                    mloop = false
                }
            }
        }

    }
    return { word: mWord, pos: pos }
}

// function getNextWord(QText,pos){

// }

// function getNextSection((QText, pos){
    
// }
function formatQText(QText, indentChars) {
    var i = 0,
        il = QText.length,
        tab = (typeof indentChars !== "undefined") ? indentChars : "    ",
        newQText = "",
        indentLevel = 0,
        indentQLevel = 0,
        currentChar = null,
        mStream = {},
        mWord = "",
        isPreviousWordKey = false;
        var lastChar = "";
        var section = {};
        section.type = "NonContent";


        //var nextsection={};
       
    for (i = 0; i < il; i += 1) {
        currentChar = QText.charAt(i);
        if ((currentChar != " ") && (currentChar != "\n") && (currentChar != "\t")) {
            mStream = eatWord(QText, i)
        }
        else {
            if (section.type == "NonContent") {
                mStream = eatAllSpace(QText, i)
            }
            else {
                mStream = eatSpace(QText, i)
            }
        }

        mWord = mStream.word
        
        i = mStream.pos - 1
        

        console.log("word:" + mWord)
        lastChar = newQText.charAt(newQText.length - 1);
        switch (mWord) {
            case 'Problem:': 
            case 'IndQuestion:':
                indentLevel = 0;

                if (lastChar != "\n") { newQText += "\n" }
                newQText += repeat(tab, indentLevel) + mWord;
                isPreviousWordKey = true;
                indentLevel += 1;
                section.name = mWord
                section.type = "NonContent";
                section.pos=i+1
                break;
            case 'Q:':
            case 'P:':
                indentLevel = 1;
                if (lastChar != "\n") { newQText += "\n" }
                newQText += repeat(tab, indentLevel) + mWord;
                isPreviousWordKey = true;
                indentLevel += 1;
                section.name = mWord;
                section.type = "Content";
                section.pos=i+1
                break;
            case 'Question:':
                indentLevel = 1;
                indentQLevel = indentLevel;
                if (lastChar != "\n") { newQText += "\n" }
                newQText += repeat(tab, indentLevel) + mWord;
                isPreviousWordKey = true;
                indentLevel += 1;
                section.name = mWord;
                section.type = "NonContent";
                section.pos=i+1
                break;
            case 'Parameters:':
            case '\Attr':
            case 'Answers:':
            case 'Hints:':
                indentLevel = indentQLevel + 1;
                if (lastChar != "\n") { newQText += "\n" }
                newQText += repeat(tab, indentLevel) + mWord;
                isPreviousWordKey = true;
                indentLevel += 1;
                section.name = mWord;
                section.type = "NonContent";
                section.pos=i+1
                break;
            case '+A:':
            case '-A:':
            case '-H:':
                indentLevel = indentQLevel + 2;
                if (lastChar != "\n") { newQText += "\n" }
                newQText += repeat(tab, indentLevel) + mWord;
                isPreviousWordKey = true;
                indentLevel += 1;
                section.name = mWord;
                section.type = "Content";
                section.pos=i+1
                break;
            case ' ':
                newQText += mWord
                break;
            case '\n':
              //  mStream = eatSpace(QText, i)
                // mWord=mStream.word
               // if (lastChar != "\n") { newQText += repeat(tab, indentLevel)+ mWord}
                // i = mStream.pos - 1
                break;

            default:
                // var addchar = ""
                // if (section.type == "Content" && (currentChar == "\n")) {
                //     if (lastChar != "\n") { addchar = "\n" }
                //     else { addchar = "" }
                // }
                // else {
                //     if ((lastChar != "\n")) { addchar = " " }
                // }

                if (isPreviousWordKey) {
                    if (lastChar != "\n") { newQText += "\n" }
                    newQText += repeat(tab, indentLevel) + mWord + " ";
                }
                else {
                    // if ((lastChar = "\n")) {
                    //     newQText += repeat(tab, indentLevel) + mWord + addchar;
                    // }
                    // else {
                    // newQText += mWord + addchar;
                    // }
                    newQText += mWord
                    //if (section.type == "Content") newQText += currentChar;
                }


                isPreviousWordKey = false;

                break;
        }
        mWord = "";

    }

    return newQText;
}