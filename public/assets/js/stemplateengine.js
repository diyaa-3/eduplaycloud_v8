var sTemplateEngine_render = function(tpl, data) {
    // var re = /{{([^}}]+)?}}/g;
    var re=/{{([^#\/^}}]+)?}}/g;
    // var re_formula=/{{%([^#\/^%}}]+)?%}}/g;
    
    var match;
    while(match = re.exec(tpl)) {
        tpl = tpl.replace(match[0], data[match[1]])
    }

    // var match;
    // while(match = re_formula.exec(tpl)) {
        
    //     tpl = tpl.replace(match[0], data[match[1]])
    // }
    
    return tpl;
}

