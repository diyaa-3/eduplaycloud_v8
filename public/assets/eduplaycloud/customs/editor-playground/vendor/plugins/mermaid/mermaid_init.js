var mermaid_help=`It is based on <a href="https://mermaidjs.github.io/">mermaid</a>.`
var mermaid_Flowchart_sample=`
        \\Plugin_flow{
          graph LR
          A-->B
        }_`

var mermaid_Sequence_diagram_sample=`
        \\Plugin_flow{
          sequenceDiagram
          A->>B: How are you?
          B->>A: Great!
        }_`
var mermaid_Gantt_diagram_sample=`
        \\Plugin_flow{
          gantt
          dateFormat YYYY-MM-DD
          section S1
          T1: 2014-01-01, 9d
          section S2
          T2: 2014-01-11, 9d
          section S3
          T3: 2014-01-02, 9d
        }_`
var flow_init = function (){
// var svg = document.getElementsByTagName("svg")[0];
// svg.removeAttribute('height');
mermaid.initialize({
  theme: 'forest',
  // themeCSS: '.node rect { fill: red; }',
  logLevel: 3,
  flowchart: { curve: 'linear' },
  gantt: { axisFormat: '%m/%d/%Y' },
  sequence: { actorMargin: 50 },
  // sequenceDiagram: { actorMargin: 300 } // deprecated
});

mermaid.init();
// divList = document.querySelectorAll(".mermaid");
//     divList.forEach(function (_div, index) {
//       mermaidAPI.render(_div.id, _div.innerHTML);
//     });
}

window.addEventListener('load', function () {
  flow_init()
  }, false)