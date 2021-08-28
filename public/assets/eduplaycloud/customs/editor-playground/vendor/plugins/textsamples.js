
var problem_sample=
`Problem:  // item#1 - EduPlayCloud: Write your comment here about Question.
    Parameters:
        { f: readfile('test') }
    P:
        Write here...
    Question:
        \\Attr {Difficulty: 'easy' Time: '10' Tag: 'math, numbers' Type: 'mutlichoice'}
        Q:
            Write here...
        Answers:
            +A:
                Write here...
            -A:
                Write here...
            -A:
                Write here...
            -A:
                Write here...
        Hints:
            -H:
                Write here...
            -H:
                Write here...
`

var indQuestion_sample=
`IndQuestion:  // item#1 - EduPlayCloud: Write your comment here about Question.
    Parameters:
        { f: readfile('test') }
    Question:
        \\Attr {Difficulty: 'easy' Time: '10' Tag: 'math, numbers' Type: 'mutlichoice'}
        Q:
            Write here...
        Answers:
            +A:
                Write here...
            -A:
                Write here...
            -A:
                Write here...
            -A:
                Write here...
        Hints:
            -H:
                Write here...
            -H:
                Write here...`

var QuestionBodyMultiChoice_sample=
`    Question:
        \\Attr {Difficulty: 'easy' Time: '10' Tag: 'math, numbers' Type: 'mutlichoice'}
        Q:
            Write here...
        Answers:
            +A:
                Write here...
            -A:
                Write here...
            -A:
                Write here...
            -A:
                Write here...
        Hints:
            -H:
                Write here...
            -H:
                Write here...`

var indQuestionHeader_sample=
`IndQuestion:   // item#1 - EduPlayCloud: Write your comment here about Question.
                // put the body of the question at the end
    Parameters:
        { f: readfile('test') }`
var problemHeader_sample=
`Problem:   // item#1 - EduPlayCloud: Write your comment here about Question.
            // put the body of the question at the end
    Parameters:
        { f: readfile('test') }
    P:
        Write here...`
var QuestionBodyInput_sample=
`    Question:
        \\Attr {Difficulty: 'easy' Time: '10' Tag: 'math, numbers' Type: 'input'}
        Q:
            fill the value in the text box.
        Answers:
            +A:
                Write here the question and put the textboxed needed...
                \\Plugin_textBox \\Attr {display:'inline' caption:'result: ' } {write correct answer here..}_
        Hints:
            -H:
                Write here...
            -H:
                Write here...`
    

var parameters_sample=`
    Parameters:{
        name: random.string(name)
        city: random.string(city)
        k: random.fromlist(['sds',1,'sdsd'])
        a: random.number(1,6,Dec)
        c: random.number(1,10,Int)
        b: math('3*a+2*sin(c)')
        d:joinstring(k,1,'klk')
        f:readfile('test')
        k:readfile('test')
        }`
var image_sample=`  
                \\Plugin_image \\Attr {display:'block' caption:'(fig.1)' repeat:'1'}  { src:eduplay_logo.png }_`
var audio_sample=`
                \\Plugin_audio \\Attr{ display:'inline' caption:'audio 1'} {  src:test.mp3}_`
var video_sample=`
                \\Plugin_video{ https://www.youtube.com/embed/YFD2PPAqNbw }_`

var textBox_sample=`
                \\Plugin_textBox \\Attr {display:'inline' caption:'result: ' } {dffdfs}_`
var attributes_sample=`\\Attr {display:'inline' caption:'(caption)' height:'300'}`

var ContainerTable_sample=`
                \\Plugin_ContainerTable \\Attr {class:'normalBTable' caption:'(table 1)'} 
                t_{
                      x1_1   x1_2   x1_3 |;
                    | ---- | ---- | ---- |;
                      x2_1   x2_2   x2_3 |;
                      x3_1   x3_2   x3_3 |;

                     x1_1 : { x11  }__
                    x1_2 : { x1_2 }__
                    x1_3 : { x1_2 }__
                    x2_1 : { x1_2 }__
                    x2_2 : { x1_2 }__
                    x2_3 : { x1_2 }__
                }_t
`