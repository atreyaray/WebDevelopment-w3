(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(13),l=t.n(r),c=t(2),u=function(e){console.log(e);var n=e.newFilter,t=e.handleFilterChange;return a.a.createElement(a.a.Fragment,null,"filter shown with ",a.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.handleSubmit,t=e.newName,o=e.handleInputChange,r=e.newNumber,l=e.handleNumberChange;return a.a.createElement("form",{onSubmit:n},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:t,onChange:o})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:r,onChange:l})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.person,t=e.handleDeletion,o=n.name,r=n.number,l=n.id;return a.a.createElement("li",null,o," ",r,a.a.createElement("button",{onClick:function(){return t(l)}},"delete"))},m=function(e){var n=e.newFilter,t=e.persons,o=e.handleDeletion,r=0===n.length?t:t.filter((function(e){return e.name.toLowerCase().slice(0,n.length)===n}));return a.a.createElement("div",null,a.a.createElement("ul",null,r.map((function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement(s,{key:e.name,person:e,handleDeletion:o}))}))))},d=t(3),f=t.n(d),g="/api/persons",h=function(e,n){console.log("inside notes services",e,n);var t=f.a.post(g,{name:e,number:n},{headers:{"Content-Type":"application/json"}});return console.log(t),t.then((function(e){return e.data}))},b=function(){return f.a.get(g).then((function(e){return e.data}))},p=function(e){return f.a.delete("".concat(g,"/").concat(e))},v=function(e,n){return f.a.put("".concat(g,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return f.a.get("".concat(g,"/").concat(e)).then((function(e){return e.data}))},w=function(e){var n=e.message,t=e.color;console.log("color",t);var o={color:t,background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return null===n?null:a.a.createElement("div",{style:o},n)},j=function(){var e=Object(o.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],l=Object(o.useState)(""),s=Object(c.a)(l,2),d=s[0],f=s[1],g=Object(o.useState)(""),j=Object(c.a)(g,2),O=j[0],C=j[1],S=Object(o.useState)(""),k=Object(c.a)(S,2),y=k[0],F=k[1],N=Object(o.useState)(null),D=Object(c.a)(N,2),I=D[0],T=D[1],P=Object(o.useState)("green"),x=Object(c.a)(P,2),B=x[0],J=x[1];Object(o.useEffect)((function(){console.log("effect"),b().then((function(e){t.concat([e]);console.log("data",e),r(t.concat(e))}))}),[]);return a.a.createElement("div",null,console.log("persons",t),a.a.createElement("h2",null,"Phonebook"),a.a.createElement(w,{message:I,color:B}),a.a.createElement(u,{newFilter:y,handleFilterChange:function(e){var n=e.target.value;console.log(n),F(n)}}),a.a.createElement("h3",null,"add a new"),console.log("reaches h3"),a.a.createElement(i,{handleSubmit:function(e){e.preventDefault(),console.log(t,d);var n={name:d,number:O};console.log(t.includes(n)),t.map((function(e){return e.name})).includes(d)?(E(t.filter((function(e){return e.name===d}))[0].id).then((function(e){window.alert("".concat(d," is already added to phonebook, replace the old number with a new one?"));var n=t.filter((function(e){return e.name===d}))[0],o=t.filter((function(e){return e.name!==d})),a={name:d,number:O,id:n.id};console.log("existingPerson",n),console.log("newPerson",a),v(n.id,a).then((function(e){return console.log("updated",e)})),r(o.concat([a])),J("green"),T("Information of ".concat(d," updated")),setTimeout((function(){return T(null)}),5e3)})).catch((function(e){J("red"),T("Information of ".concat(d," has already been removed from the server")),setTimeout((function(){return T(null)}),5e3)})),f(""),C("")):(console.log("creating"),h(d,O,Math.floor).then((function(e){console.log("data",e),J("green"),T("Added ".concat(d)),console.log("error message",I),f(""),C(""),r(t.concat([e])),setTimeout((function(){return T(null)}),5e3),console.log("error message",I)})).catch((function(e){var n=e.response.data.error;console.log("error caught",n),J("red"),T(n),setTimeout((function(){return T(null)}),5e3),f(""),C("")})))},newName:d,handleInputChange:function(e){var n=e.target.value;console.log(n),f(n)},newNumber:O,handleNumberChange:function(e){var n=e.target.value;console.log(n),C(n)}}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(m,{newFilter:y,persons:t,handleDeletion:function(e){if(window.confirm("Delete ".concat(t.filter((function(n){return n.id===e}))[0].name,"?"))){console.log("deletion id",e),p(e);var n=t.filter((function(n){return n.id!==e}));r(n)}}}))};l.a.render(a.a.createElement(j,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.0488ba2a.chunk.js.map