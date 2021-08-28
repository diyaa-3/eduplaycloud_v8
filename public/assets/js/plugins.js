

// document.querySelector('[title=\"'+  +'\"]'.setAttribute("")

var plugIns = [
  {
    type: "markdown",
    render: function (code) {
      try {
        var res = md.render(code);
        // console.log ('results of render markdwond: \n ' + res)
        // res=code;
        return res;
      } catch (str) {
        return '<pre> There is an error in parsing Markdown:' + str + '</pre>'
      }
    }
  },
  {
    type: "mermaid",
    render: function (code) {
      try {
        mermaid.parse(code)
        return '<div class="mermaid">' + code + '</div>'
      } catch ({ str, hash }) {
        return '<pre>There is an error in parsing Mermaid: ' + str + '</pre>'
      }
    }
  },
  {
    type: "functionplot",
    render: function (code) {
      try {
        // var res = katex.renderToString(code)
        return '<div id="plot-0" class="plot">' + '</div>'
      } catch (str) {
        return '<pre> There is an error in parsing functionplot: ' + str + '</pre>'
      }
    }
  },
  {
    type: "katex",
    render: function (code) {
      try {
        var res = katex.renderToString(code)
        return res
      } catch (str) {
        return '<pre> There is an error in parsing Katex: ' + str + '</pre>'
      }
    }
  },
  {
    type: "chart",
    render: function (code) {
      try {
        //var sjson = JSON.parse(code);
        var html = '<canvas id="board" class="chartjs" width="400" height="400" code=\'' + code + '\'></canvas>'
        return html;
      } catch (str) {
        return '<pre> There is an error in parsing chart: ' + str + '</pre>'
      }
    }
  },

  {
    type: "clock",
    render: function (code) {
      try {

        var res = JSON.parse(code);
        var html = '<canvas id="clock" class="clock" style="width:250px">' + code + '</canvas>'

        return html;
      } catch (str) {
        return '<pre> There is an error in generating clock: ' + str + '</pre>'
      }
    }
  },
  {
    type: "chess",
    render: function (code) {
      try {
        // still to make the 'code' and read it separately....and make the id board-1 , board 2.
        //var res = JSON.parse(code);
        var html = '<div id="board" class="chess" style="width: 200px" code=\'' + code + '\'></div>'

        return html;
      } catch (str) {
        return '<pre> There is an error in generating chess board: ' + str + '</pre>'
      }
    }
  },
  {
    type: "music",
    render: function (code) {
      try {
        // need to make an index to make id="music-" +index
        var res = '<div id="music-0" class="music">' + code + '</div>';
        return res;
      } catch ({ str, hash }) {
        return '<pre>There is an error in parsing music abc: ' + str + '</pre>'
      }
    }
  },
  {
    type: "random",
    render: function (code) {
      try {
        var res = JSON.parse(code);

        console.log('code :' + code + ' ;res:' + res + ' ;  minimum:' + res.min);
        lvar = {};
        lvar.name = res.var;
        lvar.value = Math.floor(res.min + Math.random() * Math.floor(res.max - res.min));
        _var.push(lvar)
        return lvar.value;
      } catch (str) {
        return '<pre> There is an error in generating random number: ' + str + '</pre>'
      }
    }
  },
  {
    type: "formula",
    render: function (code) {
      try {
        // _var[]
        // return lvar.value;
      } catch (str) {
        return '<pre> There is an error in parsing formula expression: ' + str + '</pre>'
      }
    }
  },
  {
    type: "fake",
    render: function (code) {
      try {
        var randomName = faker.name.findName(); // Caitlyn Kerluke
        var randomEmail = faker.internet.email(); // Rusty@arne.info
        var randomCard = faker.helpers.createCard()
        return randomName;
      } catch (str) {
        return '<pre> There is an error in generating fake randomly: ' + str + '</pre>'
      }
    }
  }

]
