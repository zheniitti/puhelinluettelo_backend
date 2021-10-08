(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{41:function(e,n,t){"use strict";t.r(n);var c=t(16),r=t.n(c),a=t(7),o=t(3),i=t(1),u=t(0),s=function(e){var n=e.handleFilterChange;return Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{children:"filter shown with "}),Object(u.jsx)("input",{onChange:n})]})},l=function(e){var n=e.addPerson,t=e.handleNameChange,c=e.handleNumberChange,r=e.newName,a=e.newNumber;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{children:"name: "}),Object(u.jsx)("input",{type:"text",value:r,onChange:t})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{children:"number: "}),Object(u.jsx)("input",{type:"text",value:a,onChange:c})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.persons,t=e.filter,c=e.deletePerson;return n.filter((function(e){return e.name.includes(t)})).map((function(e){return Object(u.jsxs)("div",{children:[e.name," ",e.number,Object(u.jsx)("button",{onClick:function(){c(e.id)},children:"delete"})]},e.name)}))},b=t(4),j=t.n(b),f="api/persons",h=function(){return j.a.get(f)},m=function(e){return j.a.post(f,e)},O=function(e,n){return j.a.put("".concat(f,"/").concat(e),n)},g=function(e){return j.a.delete("".concat(f,"/").concat(e))},p=function(e){var n=e.isSuccesful,t=e.message,c={color:n?"green":"red",borderColor:n?"green":"red",background:"lightgrey",fontSize:20,bordertyle:"solid",borderRadius:5,padding:10};return null===t?(console.log("Notification message is null"),null):Object(u.jsx)("div",{style:c,children:t})},v=function(){var e=Object(i.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(i.useState)(""),b=Object(o.a)(r,2),j=b[0],f=b[1],v=Object(i.useState)(""),x=Object(o.a)(v,2),w=x[0],y=x[1],S=Object(i.useState)(""),C=Object(o.a)(S,2),N=C[0],k=C[1],P=Object(i.useState)(null),D=Object(o.a)(P,2),E=D[0],F=D[1],T=Object(i.useState)(!0),I=Object(o.a)(T,2),J=I[0],z=I[1],A=Object(i.useState)(null),B=Object(o.a)(A,2),R=B[0],U=B[1];Object(i.useEffect)((function(){h().then((function(e){c(e.data)}))}),[]);var q=function(e,n){z(e),F(n),clearTimeout(R);var t=setTimeout((function(){console.log("Timeout: ".concat(n)),F(null)}),6e3);U(t)};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(s,{handleFilterChange:function(e){k(e.target.value),console.log("filter changed",N)}}),Object(u.jsx)("h3",{children:"Add a new person"}),Object(u.jsx)(l,{addPerson:function(e){if(e.preventDefault(),""!==w&&""!==j){var n=!0;if(t.every((function(e){return e.name!==j||(n=!1,!1)})),n)m({name:j,number:w}).then((function(e){q(!0,"Successfully added ".concat(j," to server")),c(t.concat(e.data)),f(""),y("")})).catch((function(e){q(!1,"Failed. Error: ".concat(e))}));else if(window.confirm("".concat(j," is alredy in the phonebook, replace the number with new one?"))){var r=t.find((function(e){return e.name===j}));O(r.id,Object(a.a)(Object(a.a)({},r),{},{number:w})).then((function(e){q(!0,"Successfully changed ".concat(e.data.name,"'s number.")),h().then((function(e){c(e.data),f(""),y("")})).catch((function(e){return alert("Persons number updated in the server but error in updating UI. ".concat(e))}))})).catch((function(e){404===e.response.status&&(q(!1,"".concat(r.name," doesn't exist or it is deleted.")),h().then((function(e){c(e.data)})))}))}}else q(!1,"Name or number is empty")},handleNameChange:function(e){f(e.target.value)},handleNumberChange:function(e){y(e.target.value)},newName:j,newNumber:w}),Object(u.jsx)(p,{isSuccesful:J,message:E}),Object(u.jsx)("h3",{children:"Numbers"}),Object(u.jsx)(d,{persons:t,filter:N,deletePerson:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," id:").concat(e,"?"))&&(console.log("Deleting ".concat(n.name)),g(e).then((function(r){q(!0,"Successfully deleted ".concat(n.name," from server.")),console.log("Deleted person: ".concat(n.name)),c(t.filter((function(n){return n.id!==e})))})).catch((function(e){404===e.response.status&&(q(!1,"".concat(n.name," is already deleted from server.")),h().then((function(e){c(e.data)})))})))}})]})};r.a.render(Object(u.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.fce7581c.chunk.js.map