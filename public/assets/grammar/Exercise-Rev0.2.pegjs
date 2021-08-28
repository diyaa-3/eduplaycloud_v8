{  
   var Questions=[];
   var Q={};
   var Ans=[];
   var A={};
   var H={};
   var Q_Attrs=[];
   var A_Attrs=[];
      
   var Acounter=0;
   var Qcounter=0;
   var Q_Attrcounter=0;
   var A_Attrcounter=0;
   
   function AddQuestionto_Questions( ) {
      Questions.push (Object.assign({}, Q));
   }
   function AddContentto_Question(_content) {
       Q.content=_content;
    }
   function AddAttributesto_Question() {
       Q.push=Attributes;
    }
   function AddAnswersto_Question (o) {
      Q.Ans=(Object.assign([], Ans));
   }
   
   function AddHintto_Question (o) {
      Q.Hint=(Object.assign({}, H));
   }
   function AddAnswerto_Answers () {
     Ans.push ((Object.assign({}, A)));
   }
   function AddContentto_Answer ( _content) {
      A.content=_content;
   }
   function AddContentto_Hint ( _content) {
      H.content=_content;
   }
   
   function AddAttributesto_Answer ( ) {
      A.Attrs=(Object.assign([], A_Attrs));
   }
   function AddAttributeto_AAttributes (_content) {
     A_Attrs.push (_content);
   }

   function AddAttributesto_Question ( ) {
      Q.Attrs=(Object.assign([], Q_Attrs));
   }
   function AddAttributeto_QAttributes (_content) {
     Q_Attrs.push (_content);
   }
  
}

//---------start grammar-------------------------
ExcerciseSet= Question* {return Questions}

Question = _ Q_Tag _ attrs:(Q_Attr _)* _ Start _ content:Content _ End _ 
   { AddAttributesto_Question();AddHintto_Question();AddQuestionto_Questions() ; Acounter=0;Ans=[];Q_Attrcounter=0;Q_Attrs=[]}
Content =  _ Q_Txt _ Answer* _ (H_Tag _ H_Txt)? _
   {AddAnswersto_Question(Ans)}
Answer= _ A_Tag _ attrs:(A_Attr _)* _ content:A_Txt _
   {AddAttributesto_Answer(); AddAnswerto_Answers(); A_Attrcounter=0;A_Attrs; A_Attrs=[]}
Q_Tag=esc c:"Q"  {Qcounter++; }
A_Tag=esc c:"A"  { Acounter++;}
H_Tag=esc "H"


Q_Attr=c:Attr {return AddAttributeto_QAttributes(c);}
A_Attr=c:Attr {return AddAttributeto_AAttributes(c);}

Q_Txt=c:Txt_till_NextTag {return AddContentto_Question(c.trim());}
A_Txt=c:Txt_till_NextTag  {return AddContentto_Answer(c.trim());}
H_Txt=c:Txt_till_NextTag  {return AddContentto_Hint(c.trim());}
     
Txt_till_NextTag=ch:(! (Closures ) c:. { return c})+  {return ch.join('').trim()}
Txt_till_Next_Q_Tag=ch:(! ( (End _ Q_Tag) / (End _ EOF)) c:. { return c})+  {return ch.join('').trim()}

Attr= esc name:word S_Delimiter s_quote value:string_value s_quote
     {return {name:name, value:value};}
    //{return  {name: name , value:attrValue};}

string_value=ch:(! (s_quote  ) c:. { return c})+  {return ch.join('')}  //removed the double quote
s_quote="'"
d_quote='"'
S_Delimiter=":"

Start="{"
End="}"
ReservedTag= Q_Tag / A_Tag /H_Tag
Closures =  A_Tag / H_Tag /(End _ Q_Tag) /(End _ EOF)
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
word=ch:(!ReservedKeyWord !whitespace !S_Delimiter c:. {return c})+ {return ch.join('')}
esc="\\"
EOF=!.