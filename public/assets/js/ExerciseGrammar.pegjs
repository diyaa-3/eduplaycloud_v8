Content =
  (Element / Text)*

Element =
  startTag:sTag _ attr:selfTag* "{" _ content:Content _ "}" _ {
    return {
      name:    startTag,
      attributes:attr,
      content: content
    };
    }

sTag =
  esc name:TagName { return name }


eTag =
   "}" //{ return name; }

selfTag =
  esc name:word _ { return name.join(""); }

ReservedTagName= "Q" / "A" / "img"
ReservedKeyWord=esc / "{" / "}"

TagName = c:ReservedTagName { return c }//.join(""); }
Text    = c:charExcludeReserve+  { return c.join("").trim(); }

/* space handling */
_ "optional whitespace"  = whitespace*
__ "mandatory whitespace"= whitespace+
whitespace  = [ \t\n\r]
Nonspacechar= !sp !nl .
nl              "newline"   = !'\r''\n' / '\r' / '\r\n'   
sp              "whitespace"= [ \t] / ' '                      
//skip_space      "spaces"    = ( nl / sp )*     
 
esc = "\\"
charExcludeReserve=!ReservedKeyWord c:. { return c}
charNotsp=!whitespace c:. { return c}
word=charNotsp+
