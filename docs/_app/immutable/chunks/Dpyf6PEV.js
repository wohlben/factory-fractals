var On=Array.isArray,Gt=Array.prototype.indexOf,Cn=Array.from,Nn=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,Kt=Object.getOwnPropertyDescriptors,bn=Object.prototype,Pn=Array.prototype,Zt=Object.getPrototypeOf;const Fn=()=>{};function Mn(t){return t()}function Et(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,wt=4,X=8,st=16,k=32,N=64,U=128,E=256,V=512,d=1024,I=2048,b=4096,O=8192,J=16384,$t=32768,yt=65536,qn=1<<17,zt=1<<19,gt=1<<20,ct=Symbol("$state"),Ln=Symbol("legacy props"),Yn=Symbol("");function Tt(t){return t===this.v}function Wt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function At(t){return!Wt(t,this.v)}function Xt(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Jt(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Qt(t){throw new Error("https://svelte.dev/e/effect_orphan")}function tn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Hn(){throw new Error("https://svelte.dev/e/hydration_failed")}function jn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Bn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Un(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function nn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function rn(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let Q=!1;function Vn(){Q=!0}const Gn=1,Kn=2,Zn=4,$n=8,zn=16,Wn=1,Xn=2,Jn=4,Qn=8,tr=16,nr=1,rr=2,en="[",ln="[!",an="]",mt={},er=Symbol(),lr="http://www.w3.org/1999/xhtml";function xt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let i=null;function vt(t){i=t}function ar(t,n=!1,r){i={p:i,c:null,e:null,m:!1,s:t,x:null,l:null},Q&&!n&&(i.l={s:null,u:null,r1:[],r2:ut(!1)})}function sr(t){const n=i;if(n!==null){t!==void 0&&(n.x=t);const s=n.e;if(s!==null){var r=o,e=u;n.e=null;try{for(var a=0;a<s.length;a++){var l=s[a];$(l.effect),Z(l.reaction),Nt(l.fn)}}finally{$(r),Z(e)}}i=n.p,n.m=!0}return t||{}}function tt(){return!Q||i!==null&&i.l===null}function ut(t,n){var r={f:0,v:t,reactions:null,equals:Tt,rv:0,wv:0};return r}function ur(t){return sn(ut(t))}function or(t,n=!1){var e;const r=ut(t);return n||(r.equals=At),Q&&i!==null&&i.l!==null&&((e=i.l).s??(e.s=[])).push(r),r}function sn(t){return u!==null&&!w&&(u.f&y)!==0&&(T===null?yn([t]):T.push(t)),t}function fr(t,n){return u!==null&&!w&&tt()&&(u.f&(y|st))!==0&&(T===null||!T.includes(t))&&rn(),un(t,n)}function un(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=jt(),kt(t,I),tt()&&o!==null&&(o.f&d)!==0&&(o.f&(k|N))===0&&(m===null?gn([t]):m.push(t))),n}function kt(t,n){var r=t.reactions;if(r!==null)for(var e=tt(),a=r.length,l=0;l<a;l++){var s=r[l],f=s.f;(f&I)===0&&(!e&&s===o||(A(s,n),(f&(d|E))!==0&&((f&y)!==0?kt(s,b):rt(s))))}}let C=!1;function ir(t){C=t}let x;function q(t){if(t===null)throw xt(),mt;return x=t}function _r(){return q(P(x))}function cr(t){if(C){if(P(x)!==null)throw xt(),mt;x=t}}function vr(){for(var t=0,n=x;;){if(n.nodeType===8){var r=n.data;if(r===an){if(t===0)return n;t-=1}else(r===en||r===ln)&&(t+=1)}var e=P(n);n.remove(),n=e}}var pt,on,Dt,It;function pr(){if(pt===void 0){pt=window,on=/Firefox/.test(navigator.userAgent);var t=Element.prototype,n=Node.prototype;Dt=_t(n,"firstChild").get,It=_t(n,"nextSibling").get,t.__click=void 0,t.__className=void 0,t.__attributes=null,t.__style=void 0,t.__e=void 0,Text.prototype.__t=void 0}}function et(t=""){return document.createTextNode(t)}function lt(t){return Dt.call(t)}function P(t){return It.call(t)}function hr(t,n){if(!C)return lt(t);var r=lt(x);if(r===null)r=x.appendChild(et());else if(n&&r.nodeType!==3){var e=et();return r==null||r.before(e),q(e),e}return q(r),r}function dr(t,n){if(!C){var r=lt(t);return r instanceof Comment&&r.data===""?P(r):r}return x}function Er(t,n=1,r=!1){let e=C?x:t;for(var a;n--;)a=e,e=P(e);if(!C)return e;var l=e==null?void 0:e.nodeType;if(r&&l!==3){var s=et();return e===null?a==null||a.after(s):e.before(s),q(s),s}return q(e),e}function wr(t){t.textContent=""}function Rt(t){var n=y|I,r=u!==null&&(u.f&y)!==0?u:null;return o===null||r!==null&&(r.f&E)!==0?n|=E:o.f|=gt,{ctx:i,deps:null,effects:null,equals:Tt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??o}}function yr(t){const n=Rt(t);return n.equals=At,n}function St(t){var n=t.effects;if(n!==null){t.effects=null;for(var r=0;r<n.length;r+=1)S(n[r])}}function fn(t){for(var n=t.parent;n!==null;){if((n.f&y)===0)return n;n=n.parent}return null}function _n(t){var n,r=o;$(fn(t));try{St(t),n=Ut(t)}finally{$(r)}return n}function Ot(t){var n=_n(t),r=(D||(t.f&E)!==0)&&t.deps!==null?b:d;A(t,r),t.equals(n)||(t.v=n,t.wv=jt())}function Ct(t){o===null&&u===null&&Qt(),u!==null&&(u.f&E)!==0&&o===null&&Jt(),ot&&Xt()}function cn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function F(t,n,r,e=!0){var a=o,l={ctx:i,deps:null,nodes_start:null,nodes_end:null,f:t|I,first:null,fn:n,last:null,next:null,parent:a,prev:null,teardown:null,transitions:null,wv:0};if(r)try{ft(l),l.f|=$t}catch(_){throw S(l),_}else n!==null&&rt(l);var s=r&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&(gt|U))===0;if(!s&&e&&(a!==null&&cn(l,a),u!==null&&(u.f&y)!==0)){var f=u;(f.effects??(f.effects=[])).push(l)}return l}function gr(t){const n=F(X,null,!1);return A(n,d),n.teardown=t,n}function Tr(t){Ct();var n=o!==null&&(o.f&k)!==0&&i!==null&&!i.m;if(n){var r=i;(r.e??(r.e=[])).push({fn:t,effect:o,reaction:u})}else{var e=Nt(t);return e}}function Ar(t){return Ct(),vn(t)}function mr(t){const n=F(N,t,!0);return(r={})=>new Promise(e=>{r.outro?dn(n,()=>{S(n),e(void 0)}):(S(n),e(void 0))})}function Nt(t){return F(wt,t,!1)}function vn(t){return F(X,t,!0)}function xr(t,n=[],r=Rt){const e=n.map(r);return pn(()=>t(...e.map(Rn)))}function pn(t,n=0){return F(X|st|n,t,!0)}function kr(t,n=!0){return F(X|k,t,!0,n)}function bt(t){var n=t.teardown;if(n!==null){const r=ot,e=u;dt(!0),Z(null);try{n.call(null)}finally{dt(r),Z(e)}}}function Pt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;(r.f&N)!==0?r.parent=null:S(r,n),r=e}}function hn(t){for(var n=t.first;n!==null;){var r=n.next;(n.f&k)===0&&S(n),n=r}}function S(t,n=!0){var r=!1;if((n||(t.f&zt)!==0)&&t.nodes_start!==null){for(var e=t.nodes_start,a=t.nodes_end;e!==null;){var l=e===a?null:P(e);e.remove(),e=l}r=!0}Pt(t,n&&!r),W(t,0),A(t,J);var s=t.transitions;if(s!==null)for(const _ of s)_.stop();bt(t);var f=t.parent;f!==null&&f.first!==null&&Ft(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Ft(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function dn(t,n){var r=[];Mt(t,r,!0),En(r,()=>{S(t),n&&n()})}function En(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var a of t)a.out(e)}else n()}function Mt(t,n,r){if((t.f&O)===0){if(t.f^=O,t.transitions!==null)for(const s of t.transitions)(s.is_global||r)&&n.push(s);for(var e=t.first;e!==null;){var a=e.next,l=(e.f&yt)!==0||(e.f&k)!==0;Mt(e,n,l?r:!1),e=a}}}function Dr(t){qt(t,!0)}function qt(t,n){if((t.f&O)!==0){t.f^=O,(t.f&d)===0&&(t.f^=d),H(t)&&(A(t,I),rt(t));for(var r=t.first;r!==null;){var e=r.next,a=(r.f&yt)!==0||(r.f&k)!==0;qt(r,a?n:!1),r=e}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}const wn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let L=[],Y=[];function Lt(){var t=L;L=[],Et(t)}function Yt(){var t=Y;Y=[],Et(t)}function Ir(t){L.length===0&&queueMicrotask(Lt),L.push(t)}function Rr(t){Y.length===0&&wn(Yt),Y.push(t)}function ht(){L.length>0&&Lt(),Y.length>0&&Yt()}let B=!1,G=!1,K=null,R=!1,ot=!1;function dt(t){ot=t}let M=[];let u=null,w=!1;function Z(t){u=t}let o=null;function $(t){o=t}let T=null;function yn(t){T=t}let c=null,h=0,m=null;function gn(t){m=t}let Ht=1,z=0,D=!1;function jt(){return++Ht}function H(t){var v;var n=t.f;if((n&I)!==0)return!0;if((n&b)!==0){var r=t.deps,e=(n&E)!==0;if(r!==null){var a,l,s=(n&V)!==0,f=e&&o!==null&&!D,_=r.length;if(s||f){var g=t,j=g.parent;for(a=0;a<_;a++)l=r[a],(s||!((v=l==null?void 0:l.reactions)!=null&&v.includes(g)))&&(l.reactions??(l.reactions=[])).push(g);s&&(g.f^=V),f&&j!==null&&(j.f&E)===0&&(g.f^=E)}for(a=0;a<_;a++)if(l=r[a],H(l)&&Ot(l),l.wv>t.wv)return!0}(!e||o!==null&&!D)&&A(t,d)}return!1}function Tn(t,n){for(var r=n;r!==null;){if((r.f&U)!==0)try{r.fn(t);return}catch{r.f^=U}r=r.parent}throw B=!1,t}function An(t){return(t.f&J)===0&&(t.parent===null||(t.parent.f&U)===0)}function nt(t,n,r,e){if(B){if(r===null&&(B=!1),An(n))throw t;return}r!==null&&(B=!0);{Tn(t,n);return}}function Bt(t,n,r=!0){var e=t.reactions;if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];(l.f&y)!==0?Bt(l,n,!1):n===l&&(r?A(l,I):(l.f&d)!==0&&A(l,b),rt(l))}}function Ut(t){var it;var n=c,r=h,e=m,a=u,l=D,s=T,f=i,_=w,g=t.f;c=null,h=0,m=null,D=(g&E)!==0&&(w||!R||u===null),u=(g&(k|N))===0?t:null,T=null,vt(t.ctx),w=!1,z++;try{var j=(0,t.fn)(),v=t.deps;if(c!==null){var p;if(W(t,h),v!==null&&h>0)for(v.length=h+c.length,p=0;p<c.length;p++)v[h+p]=c[p];else t.deps=v=c;if(!D)for(p=h;p<v.length;p++)((it=v[p]).reactions??(it.reactions=[])).push(t)}else v!==null&&h<v.length&&(W(t,h),v.length=h);if(tt()&&m!==null&&!w&&v!==null&&(t.f&(y|b|I))===0)for(p=0;p<m.length;p++)Bt(m[p],t);return a!==null&&z++,j}finally{c=n,h=r,m=e,u=a,D=l,T=s,vt(f),w=_}}function mn(t,n){let r=n.reactions;if(r!==null){var e=Gt.call(r,t);if(e!==-1){var a=r.length-1;a===0?r=n.reactions=null:(r[e]=r[a],r.pop())}}r===null&&(n.f&y)!==0&&(c===null||!c.includes(n))&&(A(n,b),(n.f&(E|V))===0&&(n.f^=V),St(n),W(n,0))}function W(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)mn(t,r[e])}function ft(t){var n=t.f;if((n&J)===0){A(t,d);var r=o,e=i,a=R;o=t,R=!0;try{(n&st)!==0?hn(t):Pt(t),bt(t);var l=Ut(t);t.teardown=typeof l=="function"?l:null,t.wv=Ht;var s=t.deps,f}catch(_){nt(_,t,r,e||t.ctx)}finally{R=a,o=r}}}function xn(){try{tn()}catch(t){if(K!==null)nt(t,K,null);else throw t}}function Vt(){var t=R;try{var n=0;for(R=!0;M.length>0;){n++>1e3&&xn();var r=M,e=r.length;M=[];for(var a=0;a<e;a++){var l=Dn(r[a]);kn(l)}}}finally{G=!1,R=t,K=null}}function kn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if((e.f&(J|O))===0)try{H(e)&&(ft(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Ft(e):e.fn=null))}catch(a){nt(a,e,null,e.ctx)}}}function rt(t){G||(G=!0,queueMicrotask(Vt));for(var n=K=t;n.parent!==null;){n=n.parent;var r=n.f;if((r&(N|k))!==0){if((r&d)===0)return;n.f^=d}}M.push(n)}function Dn(t){for(var n=[],r=t;r!==null;){var e=r.f,a=(e&(k|N))!==0,l=a&&(e&d)!==0;if(!l&&(e&O)===0){if((e&wt)!==0)n.push(r);else if(a)r.f^=d;else{var s=u;try{u=r,H(r)&&ft(r)}catch(g){nt(g,r,null,r.ctx)}finally{u=s}}var f=r.first;if(f!==null){r=f;continue}}var _=r.parent;for(r=r.next;r===null&&_!==null;)r=_.next,_=_.parent}return n}function In(t){var n;for(ht();M.length>0;)G=!0,Vt(),ht();return n}async function Sr(){await Promise.resolve(),In()}function Rn(t){var n=t.f,r=(n&y)!==0;if(u!==null&&!w){T!==null&&T.includes(t)&&nn();var e=u.deps;t.rv<z&&(t.rv=z,c===null&&e!==null&&e[h]===t?h++:c===null?c=[t]:(!D||!c.includes(t))&&c.push(t))}else if(r&&t.deps===null&&t.effects===null){var a=t,l=a.parent;l!==null&&(l.f&E)===0&&(a.f^=E)}return r&&(a=t,H(a)&&Ot(a)),t.v}function Or(t){var n=w;try{return w=!0,t()}finally{w=n}}const Sn=-7169;function A(t,n){t.f=t.f&Sn|n}function Cr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(ct in t)at(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&ct in r&&at(r)}}}function at(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{at(t[e],n)}catch{}const r=Zt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Kt(r);for(let a in e){const l=e[a].get;if(l)try{l.call(t)}catch{}}}}}export{cr as $,Un as A,_t as B,o as C,Bn as D,Zt as E,On as F,pn as G,C as H,_r as I,yt as J,en as K,ln as L,vr as M,q as N,ir as O,Dr as P,kr as Q,dn as R,ct as S,x as T,er as U,lr as V,Kt as W,Rr as X,Yn as Y,S as Z,hr as _,sr as a,ur as a0,Z as a1,$ as a2,u as a3,pr as a4,lt as a5,P as a6,mt as a7,an as a8,xt as a9,Kn as aA,$n as aB,Mt as aC,En as aD,zn as aE,tt as aF,Hn as aa,wr as ab,Cn as ac,mr as ad,et as ae,on as af,nr as ag,rr as ah,Nt as ai,vn as aj,Ir as ak,jn as al,qn as am,Jn as an,At as ao,Qn as ap,Ln as aq,Xn as ar,Wn as as,tr as at,In as au,Sr as av,Zn as aw,O as ax,Gn as ay,un as az,gr as b,fr as c,yr as d,Nn as e,dr as f,Rn as g,i as h,Or as i,Ar as j,Mn as k,Q as l,or as m,Fn as n,Cr as o,ar as p,Rt as q,Et as r,Er as s,xr as t,Tr as u,Vn as v,Wt as w,bn as x,Pn as y,ut as z};
