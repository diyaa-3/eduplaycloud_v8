 
  var textArea = document.getElementById('exerciseSet-editor')

  var previewFrame = document.getElementById('preview')
  var parserOutput = document.getElementById('parser-output')
  var HTMLOutput = document.getElementById('HTML-output')
  var previewFooter = document.getElementById('previewfooter')
  var editorFooter = document.getElementById('editorfooter')


  var evt = document.createEvent('Event');
  evt.initEvent('load', false, false);

  
  

  function buildErrorMessage(e) {
    return e.location !== undefined ?
      "Line " + e.location.start.line + ", column " + e.location.start.column + ": " + e.message :
      e.message;
  }

  function pRun() {
    var convertToStatic = mylib.convertToStatic_E
    var exerciseSetInput = editor.getValue()
    try {
      var parserOutputObj = compile.parse(exerciseSetInput);
      console.log(parserOutputObj);
      var result = true;
      editorFooter.innerHTML = "Parsing succeeded. Ctrl-Y: foldAll, Ctrl-I: unfoldAll. folding follow indentation.";
      parserOutput.innerHTML = JSON.stringify(parserOutputObj, null, 4)
      clearmarksErrorInEditor();

    } catch (e) {
      var errMsg = buildErrorMessage(e);
      editorFooter.innerHTML = errMsg;
      parserOutput.innerHTML = errMsg;
      previewFooter.innerHTML = "This reflect old rendering before the error in input occurs";
      markErrorInEditor(e.location.start.line, e.location.start.column);

      var result = false;
    }
    if (result) {
      var static_parserOutputObj = convertToStatic(parserOutputObj);
      var static_plugin_parserOutputObj = renderPluginsinObj(static_parserOutputObj);
      var finalObj = static_plugin_parserOutputObj
      HTMLOutput.innerHTML = JSON.stringify(static_plugin_parserOutputObj, null, 4);
      previewFrame.innerHTML = renderToHtml_E(finalObj);
      previewFooter.innerHTML = "up to date rendering";
      // initiate_pagination();
    }
  }

  function reInitiate() {
    plugIns.forEach(function (plugIn) {
      if (plugIn.init) {
        eval(plugIn.init);
      };
    })
  }

  pRun()

  // to do the lazy change we lodash script to get the debounce function
  // var lazyChange = debounce(() => {   // lodash
  //   // if (layout.panes.east.outerWidth() < 8) { // preview is hidden
  //   //   return // no need to update preview if it's hidden
  //   // }
  //   pRun()
  //   window.dispatchEvent(evt);
  // }, 1024, false)
  var lazyChange = function () {
    // actually this is not lazy  but just for testing.
    pRun()
    reInitiate();
    console.log("change happened");
    //window.dispatchEvent(evt);
  }

  editor.refresh()
  editor.on('change', function (e) {
    lazyChange();
  })

  registerToolBarEvents();


  $(window).resize(function(){
   
  var previewheight=$('#previewContent').height()-100;
  $('#preview').height(previewheight);
    
 })
 $( document ).ready(function() {
  console.log( "ready!" );
  $(window).resize(); //on page load
});
 

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function saveTextAsFile()
{
  saveTextAsFile1(editor.doc.getValue())
  saveTextAsFile1(parserOutput.value)
 // var textToSave  //document.getElementById("inputTextToSave").value;
}
function saveTextAsFile1(textToSave)
{
    
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}
 
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}
 
function loadFileAsText()
{
    var fileToLoad = document.getElementById("fileToLoad").files[0];
 
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        editor.getDoc().setValue( textFromFileLoaded);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}
 
var CSVFiles=[];

function handleFileSelect(evt) {
  CSVFiles=[];
  var output = [];
  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    // if (!f.type.match('image.*')) {
    //   continue;
    // }
    output.push('<li>', escape(f.name),'</li>')
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        //  span.innerHTML = ['<img class="thumb" src="', e.target.result,
        //                   '" title="', escape(theFile.name), '"/>'].join('');
        var csvFile={}
        csvFile.fileContent=e.target.result
        csvFile.fileName=theFile.name
        CSVFiles.push(csvFile)
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsText(f, "UTF-8");
    
  }
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>'
}

document.getElementById('csvfiles').addEventListener('change', handleFileSelect, false);