import{j as M,Z as A,_ as O,y as P,$ as Y,v as L,a0 as E,a1 as $,H as j,a2 as B,a3 as T,G as g,F as D,B as C,L as v,a4 as q,a5 as F,a6 as G,a7 as J,a8 as W,a9 as Z,aa as z,J as K,A as b,p as Q,N as U,a as X}from"./DKDpRE7g.js";import{d as x}from"./e-TftYpV.js";const aa=["touchstart","touchmove"];function ra(a){return aa.includes(a)}const H=new Set,N=new Set;function na(a){for(var r=0;r<a.length;r++)H.add(a[r]);for(var t of N)t(a)}function m(a){var R;var r=this,t=r.ownerDocument,c=a.type,i=((R=a.composedPath)==null?void 0:R.call(a))||[],e=i[0]||a.target,d=0,_=a.__root;if(_){var u=i.indexOf(_);if(u!==-1&&(r===document||r===window)){a.__root=r;return}var h=i.indexOf(r);if(h===-1)return;u<=h&&(d=u)}if(e=i[d]||a.target,e!==r){M(a,"currentTarget",{configurable:!0,get(){return e||t}});var w=Y,o=L;A(null),O(null);try{for(var s,n=[];e!==null;){var f=e.assignedSlot||e.parentNode||e.host||null;try{var l=e["__"+c];if(l!=null&&(!e.disabled||a.target===e))if(P(l)){var[V,...k]=l;V.apply(e,[a,...k])}else l.call(e,a)}catch(y){s?n.push(y):s=y}if(a.cancelBubble||f===r||f===null)break;e=f}if(s){for(let y of n)queueMicrotask(()=>{throw y});throw s}}finally{a.__root=r,delete a.currentTarget,A(w),O(o)}}}function oa(a,r){var t=r==null?"":typeof r=="object"?r+"":r;t!==(a.__t??(a.__t=a.nodeValue))&&(a.__t=t,a.nodeValue=t+"")}function ea(a,r){return I(a,r)}function ia(a,r){E(),r.intro=r.intro??!1;const t=r.target,c=b,i=v;try{for(var e=$(t);e&&(e.nodeType!==8||e.data!==j);)e=B(e);if(!e)throw T;g(!0),D(e),C();const d=I(a,{...r,anchor:e});if(v===null||v.nodeType!==8||v.data!==q)throw F(),T;return g(!1),d}catch(d){if(d===T)return r.recover===!1&&G(),E(),J(t),g(!1),ea(a,r);throw d}finally{g(c),D(i)}}const p=new Map;function I(a,{target:r,anchor:t,props:c={},events:i,context:e,intro:d=!0}){E();var _=new Set,u=o=>{for(var s=0;s<o.length;s++){var n=o[s];if(!_.has(n)){_.add(n);var f=ra(n);r.addEventListener(n,m,{passive:f});var l=p.get(n);l===void 0?(document.addEventListener(n,m,{passive:f}),p.set(n,1)):p.set(n,l+1)}}};u(W(H)),N.add(u);var h=void 0,w=Z(()=>{var o=t??r.appendChild(z());return K(()=>{if(e){Q({});var s=U;s.c=e}i&&(c.$$events=i),b&&x(o,null),h=a(o,c)||{},b&&(L.nodes_end=v),e&&X()}),()=>{var f;for(var s of _){r.removeEventListener(s,m);var n=p.get(s);--n===0?(document.removeEventListener(s,m),p.delete(s)):p.set(s,n)}N.delete(u),o!==t&&((f=o.parentNode)==null||f.removeChild(o))}});return S.set(h,w),h}let S=new WeakMap;function fa(a,r){const t=S.get(a);return t?(S.delete(a),t(r)):Promise.resolve()}export{na as d,ia as h,ea as m,oa as s,fa as u};
