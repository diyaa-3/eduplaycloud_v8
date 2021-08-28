
function writeSectionHead(mtext) {
  mtext = '<div class="SectionHeaderDiv"><span class="SectionHeader">' + mtext + '<span></div>';
  return mtext;
}

function HtmlPagination(n) {
  var _Html = '';

  _Html += '<nav aria-label="Page navigation example">';
  _Html += '<ul class="pagination">';
  _Html += '  <li class="page-item">';
  _Html += '    <a class="page-link" href="#" aria-label="Previous">';
  _Html += '      <span aria-hidden="true">&laquo;</span>';
  _Html += '      <span class="sr-only">Previous</span>';
  _Html += '    </a>';
  _Html += '  </li>';
  for (i = 1; i <= n; i++) {
    _Html += '  <li class="page-item"><a class="page-link" href="#' + i + '">' + i + '</a></li>';
  }
  _Html += '  <li class="page-item">';
  _Html += '    <a class="page-link" href="#" aria-label="Next">';
  _Html += '      <span aria-hidden="true">&raquo;</span>';
  _Html += '      <span class="sr-only">Next</span>';
  _Html += '    </a>';
  _Html += '  </li>';
  _Html += '</ul>';
  _Html += '</nav>';
  return _Html;
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
    _Html += '<div class="QuestionItem">' //Problem:
    _Html += '<div class="Question">'
    _Html += writeSectionHead('Problem Description:');
    _Html += ToHtmlSections(parsedQuestion.Problem_Description.Sections);
    _Html += '</div>' // close Question
  } else {
    _Html += '<div class="QuestionItem">' //IndQuestion:
  }
  //question  sections
  parsedQuestion.Questions.forEach(function (item) {
    _Html += '<div class="QuestionContainer">'
    var QSections = item.Question_Description.Sections;
    _Html += '<div class="Question">' //Q:
    _Html += writeSectionHead('Question Description:');
    _Html += ToHtmlSections(QSections);
    _Html += '</div>' //close Question

    _Html += '<div class="Answers">'
    _Html += '<div>Answers: choose one answer</div>'
    i = 0;
    item.Answers.Choices.forEach(function (C) {
      i += 1;
      _Html += '<div class="Answer">' //A:
      _Html += writeSectionHead('Answer ' + i);
      _Html += ToHtmlSections(C.Sections)
      _Html += '</div>' //close Answer
    });
    _Html += '</div>' // close Answers
    _Html += '<div class="Hints">'
    _Html += '<div>Hints:</div>'
    i = 0
    item.Hints.HintList.forEach(function (H) {
      i += 1;
      _Html += '<div class="Hint">' //H:
      _Html += writeSectionHead('Hint ' + i);
      _Html += ToHtmlSections(H.Sections)
      _Html += '</div>' // close Hint
    });
    _Html += '</div>' // for Hints
    _Html += '</div>' // for questionContainer
  });
  _Html += '</div>' // for question item
  return _Html;;
}

var QNumber;
function renderToHtml_E(parsedStaticExerciseSet) {
  console.log(parsedStaticExerciseSet);
  var _Html = '';
  // <!-- The dots/circles -->
  var i = 1;
  var n = parsedStaticExerciseSet.length;
  //  document.getElementById("pages").innerHTML =HtmlPagination(n);

  //   _Html +='<div id="myCarousel" class="carousel slide" data-ride="carousel">'
  // _Html +='<ol class="carousel-indicators">'
  //   for (i = 0; i < n; i++) {
  //     _Html +='   <li data-target="#myCarousel" data-slide-to="'+ i + '"' ;
  //   if (i==0) {_Html +='class="active"'}
  //   _Html +='></li>'
  // }
  //   _Html +=' </ol>'

  //   _Html += '<div class="carousel-inner">'
  i = 0;
  parsedStaticExerciseSet.forEach(function (parsedQuestion) {
    _Html += '<div id="page' + (i + 1) + '" class="mpage">';

    _Html += renderToHtml_Q(parsedQuestion);
    _Html += '</div>' // for item active
    i += 1;
  })
  // _Html += '</div>' // for carousel-inner

  // _Html += '</div>' // for mycarousel

  //_Html += '<ul id="pagination-demo" class="pagination-lg pull-right"></ul>'
  QNumber=i
  return _Html;
}

function initiate_pagination() {
  var n=QNumber;
  var v=QNumber
  if (QNumber>10) {parseInt(QNumber/10)};
  if (QNumber>10) {v=10};
  
  $('#pagination-demo').twbsPagination({
    
    totalPages: n,
    
    // the current page that show on start
    startPage: 1,
    // maximum visible pages
    visiblePages: v,
    initiateStartPageClick: true,
    // template for pagination links
    href: false,
    // variable name in href template for page number
    hrefVariable: '{{number}}',
    // Text labels
    first: 'First',
    prev: 'Previous',
    next: 'Next',
    last: 'Last',

    // carousel-style pagination
    loop: false,

    // callback function
    onPageClick: function (event, page) {
      // $( "#page" + page).scroll();
      $('.page-active').removeClass('page-active');
      $('#page' + page).addClass('page-active');
    },

    // pagination Classes
    paginationClass: 'pagination',
    nextClass: 'next',
    prevClass: 'prev',
    lastClass: 'last',
    firstClass: 'first',
    pageClass: 'page',
    activeClass: 'active',
    disabledClass: 'disabled'

  });

}