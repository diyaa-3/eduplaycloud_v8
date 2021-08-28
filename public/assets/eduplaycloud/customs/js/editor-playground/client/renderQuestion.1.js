function writeSectionHead(mtext)
{
  mtext='<div class="SectionHeaderDiv"><span class="SectionHeader">' +mtext + '<span></div>';
   return mtext;   
}
  function ToHtmlSections(sections) {
    var _Html = '';
    sections.forEach(function (s) {
      _Html += s.Value;
    });
    return _Html;
  }

  function renderToHtml_Q(parsedQuestion) {
    var _Html = '';
    //problem sections

    if (parsedQuestion.ItemType == "Problem") {
      _Html += '<div class="QuestionItem">'  //Problem:
      _Html += '<div class="Question">'
      _Html += writeSectionHead('Problem Description:');
      _Html += ToHtmlSections(parsedQuestion.Problem_Description.Sections);
      _Html += '</div>'  // close Question
    } else {
      _Html += '<div class="QuestionItem">'  //IndQuestion:
    }
    //question  sections
    parsedQuestion.Questions.forEach(function (item) {
      _Html += '<div class="QuestionContainer">'
      var QSections = item.Question_Description.Sections;
      _Html += '<div class="Question">'  //Q:
      _Html +=writeSectionHead('Question Description:'); 
      _Html += ToHtmlSections(QSections);
      _Html += '</div>'  //close Question

      _Html += '<div class="Answers">'
      _Html += '<div>Answers: choose one answer</div>'
      i = 0;
      item.Answers.Choices.forEach(function (C) {
        i += 1;
        _Html += '<div class="Answer">' //A:
        _Html += writeSectionHead('Answer ' + i );
        _Html += ToHtmlSections(C.Sections)
        _Html += '</div>' //close Answer
      });
      _Html += '</div>' // close Answers
      _Html += '<div class="Hints">'
      _Html += '<div>Hints:</div>'
      i = 0
      item.Hints.HintList.forEach(function (H) {
        i += 1;
        _Html += '<div class="Hint">'  //H:
        _Html += writeSectionHead('Hint ' + i );
        _Html += ToHtmlSections(H.Sections)
        _Html += '</div>' // close Hint
      });
      _Html += '</div>' // for Hints
      _Html += '</div>' // for questionContainer
    });
    _Html += '</div>' // for question item
    return _Html;;
  }

  function renderToHtml_E(parsedStaticExerciseSet) {
    
    var _Html = '';
    // <!-- The dots/circles -->
    _Html +=' <div style="text-align:center">'
    for (i = 0; i < n; i++) {
      _Html +='   <span class="dot" onclick="currentSlide(' +i +')"></span>';
    }
    _Html +=' </div>'
    _Html +='<br>';
    _Html += '<div class="slideshow-container">'
    var i=1;
    var n=parsedStaticExerciseSet.length;
    parsedStaticExerciseSet.forEach(function (parsedQuestion) {
      _Html += '<div class="mySlides fade">'
      _Html += ' <div class="numbertext">' + i +'/'+ n +'</div>'
 
      _Html += renderToHtml_Q(parsedQuestion);
      _Html += '</div>' // for mySlides fade  
    })
    _Html +='<a class="prev" onclick="plusSlides(-1)">&#10094;</a>';
    _Html +='<a class="next" onclick="plusSlides(1)">&#10095;</a>';
    _Html += '</div>' // for slideshow-container
    
    

    return _Html;
  }
// <!-- Slideshow container -->
// <div class="slideshow-container">

//   <!-- Full-width images with number and caption text -->
//   <div class="mySlides fade">
//     <div class="numbertext">1 / 3</div>
//     <img src="img1.jpg" style="width:100%">
//     <div class="text">Caption Text</div>
//   </div>
//   <!-- Next and previous buttons -->
//   <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
//   <a class="next" onclick="plusSlides(1)">&#10095;</a>
// </div>
// <br>

// <!-- The dots/circles -->
// <div style="text-align:center">
//   <span class="dot" onclick="currentSlide(1)"></span> 
//   <span class="dot" onclick="currentSlide(2)"></span> 
//   <span class="dot" onclick="currentSlide(3)"></span> 
// </div>