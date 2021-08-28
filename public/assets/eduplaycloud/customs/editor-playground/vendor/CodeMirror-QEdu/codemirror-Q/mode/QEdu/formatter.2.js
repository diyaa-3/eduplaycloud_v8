//#!/usr/bin/env node

/**
 * Manual formatter taken straight from https://github.com/umbrae/QTextlintdotcom
 **/

/*jslint white: true, devel: true, onevar: true, browser: true, undef: true, nomen: true, regexp: true, plusplus: false, bitwise: true, newcap: true, maxerr: 50, indent: 4 */

/**
 * jsl.format - Provide QText reformatting in a character-by-character approach, so that even invalid QText may be reformatted (to the best of its ability).
 *
 **/


function repeat(s, count) {
    return new Array(count + 1).join(s);
}
function eatword(QText,pos){
var word="";
currentChar = QText.charAt(pos+1);

if ((currentChar != " ") && (currentChar != "\n") && (currentChar != "\t")) {
    word = word + currentChar;
}
return {word: word,pos: pos};
}

function formatQText(QText, indentChars) {
    var i = 0,
        il = QText.length,
        tab = (typeof indentChars !== "undefined") ? indentChars : "    ",
        newQText = "",
        indentLevel = 0,
        indentQLevel=0,
        currentChar = null,
        mWord = "",
        isPreviousWordKey=false;
        pos=0;
        s={word:"",pos:0};

        
        
    while (s.pos < il) {
        s=eatword(QText,pos);
            switch (s.word) {
                case 'Problem:':
                case 'IndQuestion:':
                    indentLevel = 0;
                
                    newQText += "\n"+ repeat(tab, indentLevel)+mWord ;
                    isPreviousWordKey=true;
                    indentLevel+=1;
                    break;
                case 'P:':
                    indentLevel = 1;
                    newQText += "\n"+ repeat(tab, indentLevel)+mWord ;
                    isPreviousWordKey=true;
                    indentLevel+=1;
                    break;
                case 'Question:':
                    indentLevel = 1;
                    indentQLevel=indentLevel;
                    newQText += "\n"+ repeat(tab, indentLevel)+mWord ;
                    isPreviousWordKey=true;
                    indentLevel+=1;
                    break;
                case 'Parameters:':
                case '\Attr':
                case 'Answers:':
                case 'Hints:':
                    indentLevel = indentQLevel+1;
                    newQText += "\n"+ repeat(tab, indentLevel)+mWord ;
                    isPreviousWordKey=true;
                    indentLevel+=1;
                    break;
                case '+A:':
                case '-A:':
                case '-H:':
                    indentLevel = indentQLevel+2;
                    newQText += "\n"+ repeat(tab, indentLevel)+mWord ;
                    isPreviousWordKey=true;
                    indentLevel+=1;
                    break;
                    //case ' ':
                case "\n":
                case "\t":
                    break;

                default:
                    if (isPreviousWordKey) {
                        newQText +="\n" + repeat(tab, indentLevel)+ mWord+" ";
                    }
                    else {
                        newQText +=mWord+" ";
                    }
                    isPreviousWordKey=false;
                    break;
            }
            mWord="";
        }
        // i=+1;
    }

    return newQText;
}