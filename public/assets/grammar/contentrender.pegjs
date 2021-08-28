
//---------start grammar-------------------------
RichContent= ((markdownSentence / reservedScript) )*

markdownSentence=ch:(!esc c:. { return c})+  {return {type:'markdown', content:(ch.join('').trim())};}

reservedScript=esc script:word _ Start _ param:scriptSentence _ End _ 
          {return  {type:script.toLowerCase(), content:param.trim()};}
scriptSentence=ch:(!End c:.  {return c})+  {return ch.join('')}


Start="{"
End="}_"
ReservedTag= esc 
Closures =  (End _ EOF)
ReservedKeyWord= Start / End / ReservedTag


/* space handling */
_ "optional whitespace"  = whitespace*
__ "mandatory whitespace"= whitespace+
whitespace  = [ \t\n\r]
Nonspacechar= !sp !nl .
nl              "newline"   = !'\r''\n' / '\r' / '\r\n'   
sp              "whitespace"= [ \t] / ' '                      
//skip_space      "spaces"    = ( nl / sp )*     
//charExcludeReserve=!ReservedKeyWord c:. { return c}
word=ch:(!ReservedKeyWord !whitespace c:. {return c})+ {return ch.join('')}
esc="\\"
EOF=!.