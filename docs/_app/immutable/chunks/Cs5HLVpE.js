import{Z as b,_ as g,$ as E,v as L,A as v,P as q,as as w,at as N,au as A,h as m,g as f,b as k,e as O}from"./DKDpRE7g.js";import{a as M}from"./BCod4-4X.js";import{i as V,p as y}from"./BlFFt1pI.js";function B(e){var a=E,t=L;b(null),g(null);try{return e()}finally{b(a),g(t)}}function d(e,a,t,r=t){e.addEventListener(a,()=>B(t));const l=e.__on_r;l?e.__on_r=()=>{l(),r(!0)}:e.__on_r=()=>r(!0),M()}const S=[...` 	
\r\f \v\uFEFF`];function F(e,a,t){var r=e==null?"":""+e;if(t){for(var l in t)if(t[l])r=r?r+" "+l:l;else if(r.length)for(var n=l.length,u=0;(u=r.indexOf(l,u))>=0;){var i=u+n;(u===0||S.includes(r[u-1]))&&(i===r.length||S.includes(r[i]))?r=(u===0?"":r.substring(0,u))+r.substring(i+1):u=i}}return r===""?null:r}function x(e,a){return e==null?null:String(e)}function z(e,a,t,r,l,n){var u=e.__className;if(v||u!==t){var i=F(t,r,n);(!v||i!==e.getAttribute("class"))&&(i==null?e.removeAttribute("class"):e.className=i),e.__className=t}else if(n&&l!==n)for(var o in n){var h=!!n[o];(l==null||h!==!!l[o])&&e.classList.toggle(o,h)}return n}function D(e,a,t=a){var r=N();d(e,"input",l=>{var n=l?e.defaultValue:e.value;if(n=s(e)?_(n):n,t(n),r&&n!==(n=a())){var u=e.selectionStart,i=e.selectionEnd;e.value=n??"",i!==null&&(e.selectionStart=u,e.selectionEnd=Math.min(i,e.value.length))}}),(v&&e.defaultValue!==e.value||q(a)==null&&e.value)&&t(s(e)?_(e.value):e.value),w(()=>{var l=a();s(e)&&l===_(e.value)||e.type==="date"&&!l&&!e.value||l!==e.value&&(e.value=l??"")})}function G(e,a,t=a){d(e,"change",r=>{var l=r?e.defaultChecked:e.checked;t(l)}),(v&&e.defaultChecked!==e.checked||q(a)==null)&&t(e.checked),w(()=>{var r=a();e.checked=!!r})}function s(e){var a=e.type;return a==="number"||a==="range"}function _(e){return e===""?null:+e}function C(e,a,t){if(e.multiple)return P(e,a);for(var r of e.options){var l=c(r);if(V(l,a)){r.selected=!0;return}}(!t||a!==void 0)&&(e.selectedIndex=-1)}function I(e,a){A(()=>{var t=new MutationObserver(()=>{var r=e.__value;C(e,r)});return t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),()=>{t.disconnect()}})}function H(e,a,t=a){var r=!0;d(e,"change",l=>{var n=l?"[selected]":":checked",u;if(e.multiple)u=[].map.call(e.querySelectorAll(n),c);else{var i=e.querySelector(n)??e.querySelector("option:not([disabled])");u=i&&c(i)}t(u)}),A(()=>{var l=a();if(C(e,l,r),r&&l===void 0){var n=e.querySelector(":checked");n!==null&&(l=c(n),t(l))}e.__value=l,r=!1}),I(e)}function P(e,a){for(var t of e.options)t.selected=~a.indexOf(c(t))}function c(e){return"__value"in e?e.__value:e.value}function J(){let e=k(null),a=k(!1),t=O(()=>f(e)===!0?f(a):null);return{get active(){return f(e)},get checked(){return f(t)},set checked(r){m(e,y(r===null?!1:f(e)!==null)),m(a,y(r))}}}export{G as a,H as b,D as c,J as o,z as s,x as t};
