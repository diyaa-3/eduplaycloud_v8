var getSampleText = function getSampleText(event) {
    var text = editor.getSelection();
    if (text.trim() === "") {
      text =$(event.currentTarget).data("sample");
    }
    return text;
  };

  
var registerToolBarEvents = function registerToolBarEvents() {

  // should open a dialog box to get all parameters
    $('.heading-icon').click(function(event) {
        var level = $(event.currentTarget).data('level')
        var cursor = editor.getCursor()
        editor.setCursor(cursor.line, 0)
        editor.replaceSelection('#'.repeat(level) + ' ')
        editor.focus()
      })
    
      //
      $('.question-icon').click(function(event) {
        var start_modifier = $(event.currentTarget).data('start-modifier')
        var end_modifier = $(event.currentTarget).data('end-modifier')
        if (!editor.somethingSelected()) {
          var word = editor.findWordAt(editor.getCursor())
          editor.setSelection(word.anchor, word.head)
        }
        editor.replaceSelection(start_modifier + editor.getSelection()  + end_modifier)
        editor.focus()
      })

      // styling icons
      $('.styling-icon').click(function(event) {
        var modifier = $(event.currentTarget).data('modifier')
        if (!editor.somethingSelected()) {
          var word = editor.findWordAt(editor.getCursor())
          editor.setSelection(word.anchor, word.head)
        }
        editor.replaceSelection(modifier + editor.getSelection() + modifier)
        editor.focus()
      })
    
      // <hr/>
      $('#horizontal-rule').click(function(event) {
        var cursor = editor.getCursor()
        if (cursor.ch === 0) { // cursor is at line start
          editor.replaceSelection('\n---\n\n')
        } else {
          editor.setCursor({ line: cursor.line }) // navigate to end of line
          editor.replaceSelection('\n\n---\n\n')
        }
        editor.focus()
      })

      // list icons
  $('.list-icon').click(function(event) {
    var prefix = $(event.currentTarget).data('prefix')
    var selection = editor.listSelections()[0]
    var minLine = Math.min(selection.head.line, selection.anchor.line)
    var maxLine = Math.max(selection.head.line, selection.anchor.line)
    for (let i = minLine; i <= maxLine; i++) {
      editor.setCursor(i, 0)
      editor.replaceSelection(prefix)
    }
    editor.focus()
  })

  $('#link-icon').click(function(event) {
    let text = getSampleText(event)
    var url = $(event.currentTarget).data('sample-url')
    editor.replaceSelection(`[${text}](${url})`)
    editor.focus()
  })

  $('#image-icon').click(function(event) {
    let text = getSampleText(event)
    var url = $(event.currentTarget).data('sample-url')
    editor.replaceSelection(`![${text}](${url})`)
    editor.focus()
  })

  $('#code-icon').click(() => {
    editor.replaceSelection(`\n\`\`\`\n${editor.getSelection()}\n\`\`\`\n`)
    editor.focus()
  })

  $('#table-icon').click(function(event) {
    var sample = $(event.currentTarget).data('sample')
    var cursor = editor.getCursor()
    if (cursor.ch === 0) { // cursor is at line start
      editor.replaceSelection(`\n${sample}\n\n`)
    } else {
      editor.setCursor({ line: cursor.line }) // navigate to line end
      editor.replaceSelection(`\n\n${sample}\n`)
    }
    editor.focus()
  })
  $('#math-icon').click((event) => {
    let text = getSampleText(event)
    editor.replaceSelection(`\n\\katex{\n${text}\n}_\n`)
    editor.focus()
  })
  $('.mermaid-icon').click(function(event) {
    var text = getSampleText(event)
    editor.replaceSelection(`\n\\mermaid{${text}}_\n`)
    editor.focus()
  })
  $('.plugin-icon').click(function(event) {
    var text = getSampleText(event)
    editor.replaceSelection(`${text}\n`)
    editor.focus()
  })

 }