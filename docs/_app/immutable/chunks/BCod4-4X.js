import{ab as n,x as u,A as d,ac as l,ad as v,ae as h}from"./DKDpRE7g.js";let i=!1;function p(){i||(i=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var r;if(!e.defaultPrevented)for(const s of e.target.elements)(r=s.__on_r)==null||r.call(s)})},{capture:!0}))}const A=Symbol("is custom element"),g=Symbol("is html");function S(e){if(d){var r=!1,s=()=>{if(!r){if(r=!0,e.hasAttribute("value")){var t=e.value;f(e,"value",null),e.value=t}if(e.hasAttribute("checked")){var o=e.checked;f(e,"checked",null),e.checked=o}}};e.__on_r=s,v(s),p()}}function y(e,r){r?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function f(e,r,s,t){var o=m(e);d&&(o[r]=e.getAttribute(r),r==="src"||r==="srcset"||r==="href"&&e.nodeName==="LINK")||o[r]!==(o[r]=s)&&(r==="loading"&&(e[h]=s),s==null?e.removeAttribute(r):typeof s!="string"&&L(e).includes(r)?e[r]=s:e.setAttribute(r,s))}function m(e){return e.__attributes??(e.__attributes={[A]:e.nodeName.includes("-"),[g]:e.namespaceURI===n})}var _=new Map;function L(e){var r=_.get(e.nodeName);if(r)return r;_.set(e.nodeName,r=[]);for(var s,t=e,o=Element.prototype;o!==t;){s=l(t);for(var c in s)s[c].set&&r.push(c);t=u(t)}return r}const a="/factory-fractals",E={recipes:()=>a+"/recipes",recipe:e=>a+"/recipes/"+e,item:e=>a+"/items/"+e};export{E as L,p as a,y as b,S as r,f as s};
