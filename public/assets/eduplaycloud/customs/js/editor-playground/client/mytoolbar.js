// var $=require('jquery')

var getSampleText = function getSampleText(event) {
  var text = editor.getSelection();
  var btn=event.currentTarget.id;
  text= eval(btn+"_sample");
      // text = $(event.currentTarget).data("sample");
  
  return text;
};

// var promptForValue = (key, action) => {
//   $(document).on('opened', '#' + key + '-modal', () => {
//     $('#' + key + '-code').focus()
//   })
//   $('#' + key + '-code').keyup((e) => {
//     if (e.which === 13) { // press enter to confirm
//       $('#' + key + '-confirm').click()
//     }
//   })
//   $(document).on('confirmation', '#' + key + '-modal', () => {
//     const value = $('#' + key + '-code').val().trim()
//     if (value.length > 0) {
//       action(value)
//       $('#' + key + '-code').val('')
//     }
//   })
// }


var registerToolBarEvents = function registerToolBarEvents() {

  // $('.heading-icon').click(function(event) {
  //     var level = $(event.currentTarget).data('level')
  //     var cursor = editor.getCursor()
  //     editor.setCursor(cursor.line, 0)
  //     editor.replaceSelection('#'.repeat(level) + ' ')
  //     editor.focus()
  //   })


  // $('.question-icon').click(function (event) {
  //   var start_modifier = $(event.currentTarget).data('start-modifier')
  //   var end_modifier = $(event.currentTarget).data('end-modifier')
  //   if (!editor.somethingSelected()) {
  //     var word = editor.findWordAt(editor.getCursor())
  //     editor.setSelection(word.anchor, word.head)
  //   }
  //   editor.replaceSelection(start_modifier + editor.getSelection() + end_modifier)
  //   editor.focus()
  // })

  // // styling icons
  // $('.styling-icon').click(function(event) {
  //   var modifier = $(event.currentTarget).data('modifier')
  //   if (!editor.somethingSelected()) {
  //     var word = editor.findWordAt(editor.getCursor())
  //     editor.setSelection(word.anchor, word.head)
  //   }
  //   editor.replaceSelection(modifier + editor.getSelection() + modifier)
  //   editor.focus()
  // })

  // // <hr/>
  // $('#horizontal-rule').click(function(event) {
  //   var cursor = editor.getCursor()
  //   if (cursor.ch === 0) { // cursor is at line start
  //     editor.replaceSelection('\n---\n\n')
  //   } else {
  //     editor.setCursor({ line: cursor.line }) // navigate to end of line
  //     editor.replaceSelection('\n\n---\n\n')
  //   }
  //   editor.focus()
  // })

  // list icons
  // $('.list-icon').click(function (event) {
  //   var prefix = $(event.currentTarget).data('prefix')
  //   var selection = editor.listSelections()[0]
  //   var minLine = Math.min(selection.head.line, selection.anchor.line)
  //   var maxLine = Math.max(selection.head.line, selection.anchor.line)
  //   for (let i = minLine; i <= maxLine; i++) {
  //     editor.setCursor(i, 0)
  //     editor.replaceSelection(prefix)
  //   }
  //   editor.focus()
  // })

  // $('#link-icon').click(function(event) {
  //   let text = getSampleText(event)
  //   var url = $(event.currentTarget).data('sample-url')
  //   editor.replaceSelection(`[${text}](${url})`)
  //   editor.focus()
  // })
  // $('#math-icon').click((event) => {
  //   let text = getSampleText(event)
  //   editor.replaceSelection(`\n\\katex{\n${text}\n}_\n`)
  //   editor.focus()
  // })
  // $('.sample-icon').click(function (event) {
  //   var text = getSampleText(event)
  //   editor.replaceSelection(`${text}\n`)
  //   editor.focus()
  // })
  $('.help-icon').click(function (event) {
    var helpID=event.currentTarget.id;
    var htitle=event.currentTarget.title;

    $('#helpTitle').html(htitle);
    $('#helpbody').html(eval(helpID));
    
    $('#helpDialog').modal('show');
   
  })

  $('.plugin-icon').click(function (event) {
    var text = getSampleText(event)
    $('.btn-active').removeClass('btn-active');
    $('.subtoolbar-active').removeClass('subtoolbar-active');
    $('.subsubtoolbar-active').removeClass('subsubtoolbar-active');
    
    editor.replaceSelection(`${text}\n`)
    editor.focus()
  })

  
  $('.toolbarbtn').click(function (event) {
    event.stopPropagation();
    var Tags = $(this).find( 'annotation' );
    // check if its. code
    // if (Tags.type=='code') {ok }
    // for (let index = 0; index < Tags.length; index++) {
    //   const element = Tags[index];
      
    // }
    text=Tags[0].innerHTML;
    
      // if (element.tagName=='code') { text=Tags[1].innerText;}
      // else {text=''}
    // });
   
    editor.replaceSelection(`${text}\n`)
    editor.focus()
  })

  $('.m-plugin-icon').click(function (event) {
    var text = getSampleText(event)
    // $('.subtoolbar-active').removeClass('subtoolbar-active');
    // $('.subsubtoolbar-active').removeClass('subsubtoolbar-active');
    
    //$('.btn-active').removeClass('btn-active');

    editor.replaceSelection(`${text}\n`)
    editor.focus()
  })

  $('.subtoolbar-tab').click(function (event) {
    var toolbarID=event.currentTarget.id;
    $('.subsubtoolbar-active').removeClass('subsubtoolbar-active');
    $('.btn-active').removeClass('btn-active');
    $(this).addClass('btn-active')
    $('#sub-' + toolbarID).addClass('subsubtoolbar-active');
    editor.focus()
  })
  $('.toolbar-tab').click(function (event) {
    var toolbarID=event.currentTarget.id;
    $('.subtoolbar-active').removeClass('subtoolbar-active');
    $('.subsubtoolbar-active').removeClass('subsubtoolbar-active');
    $('.btn-active').removeClass('btn-active');
 
    $(this).addClass('btn-active')
    $('#sub-' + toolbarID).addClass('subtoolbar-active');
    editor.focus()
  })

  $('.item-icon').click(function (event) {
    var text = getSampleText(event)
    $('.subtoolbar-active').removeClass('subtoolbar-active');
  
    editor.setCursor(editor.lineCount(), 0);
    editor.replaceSelection(`${text}\n`)
    editor.focus()
    var _mPos=[];
    var searchQuery =/(Problem|IndQuestion):/
    var cursor = editor.getSearchCursor(searchQuery)
        
    while (cursor.findNext()) {
          _mPos.push(cursor.from())
    }
    var searchQuery =/item#[123456789]+/
    var cursor = editor.getSearchCursor(searchQuery)
    var i=0;
    while (cursor.findNext()) {
      i+=1;
      editor.setSelection(cursor.from(),cursor.to())
      editor.replaceSelection('item#'+i)
    }
    for (let index = 0; index < _mPos.length-1; index++) {
      editor.foldCode(_mPos[index],{rangeFinder: CodeMirror.fold.indent},'fold');
    }
  })

  
  $('#RTL').click(function (event) {
    previewFrame.dir = "rtl";
    previewFrame.align = "right";
    // editor.setOption("direction",  "rtl" );
    //editor.setOption("align",  "right" );
    // editor.setOption("rtlMoveVisually",true);
  })
  $('#LTR').click(function (event) {
    // editor.setOption("direction",  "ltr" );
    previewFrame.dir = "ltr";
    previewFrame.align = "left";

  })


}