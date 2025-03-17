var ut=Object.defineProperty;var vt=(u,s,e)=>s in u?ut(u,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):u[s]=e;var S=(u,s,e)=>vt(u,typeof s!="symbol"?s+"":s,e);import{c as he,a as _,t as y,b as mt}from"../chunks/e-TftYpV.js";import{at as pt,aG as ft,Q as ht,z as _t,A as ye,B as bt,K as gt,J as It,L as xt,U as yt,p as _e,f as Q,g as a,b as de,a as be,s as x,c as m,r as d,h as le,t as T,M as Ve,e as X}from"../chunks/DKDpRE7g.js";import{d as ge,s as F}from"../chunks/CQBbwnrn.js";import{i as j}from"../chunks/PbJpwx8q.js";import{t as kt,s as fe,c as Le,b as Pt,o as Oe}from"../chunks/Cs5HLVpE.js";import{s as Pe,a as R}from"../chunks/DSW42VuP.js";import{D as h,e as ue,i as ve,I as $t}from"../chunks/Bl5k3TW9.js";import{w as J,d as N,g as pe}from"../chunks/DRXOzK2u.js";import{r as Ke,b as ze,L as wt,s as St}from"../chunks/BCod4-4X.js";import{p as De}from"../chunks/BlFFt1pI.js";import{i as Et}from"../chunks/CaJYm0qw.js";function Ue(u,s,e){ye&&bt();var t=u,i=yt,r,l=pt()?ft:ht;_t(()=>{l(i,i=s())&&(r&&gt(r),r=It(()=>e(t)))}),ye&&(t=xt)}function Te(u,s,e,t){var i=u.__style;if(ye||i!==s){var r=kt(s);(!ye||r!==u.getAttribute("style"))&&(r==null?u.removeAttribute("style"):u.style.cssText=r),u.__style=s}return t}const Rt=!1,At=({params:u})=>{const{id:s}=u;return{recipeId:Number(s)}},wr=Object.freeze(Object.defineProperty({__proto__:null,load:At,prerender:Rt},Symbol.toStringTag,{value:"Module"})),ee=(u,s)=>{const e=localStorage==null?void 0:localStorage.getItem(`dt.${u}`);return e?J(parseFloat(e)):J(s)},ce={defaultTier:{Smelt:ee("Smelt",1),Assemble:ee("Assemble",.75),Research:ee("Research",1),Chemical:ee("Chemical",1),Refine:ee("Refine",1),Particle:ee("Particle",1),Fractionate:ee("Fractionate",1),Proliferator:ee("Proliferator",1)},availableTiers:{Smelt:[1,2],Assemble:[.75,1,1.5,3],Research:[1],Refine:[1],Chemical:[1],Particle:[1],Fractionate:[1],Proliferator:[.125,.2,.25]}};class Bt{constructor(s,e,t,i,r,l,n){this.recipeId=s,this.itemId=e,this.targetAmount=t,this.targetInterval=i,this.tier=r,this.proliferator=l,this.timeSpend=n}}const Ce=(u,s)=>{const e={...u};return Object.entries(s).forEach(([t,i])=>{const r=Number(t);e[r]=i}),e};class ke extends Bt{constructor(e,t,i,r,l=0){var E;const n=!!(t&&(h.canBeExtracted[t]||h.canBeMined[t]));!e&&!n&&(e=(E=h.alternativeRecipe[t])==null?void 0:E[0]);const f=J(e),v=e?h.recipe[e]:void 0;let k=v==null?void 0:v.Results.findIndex(p=>t===p);const I=!t;!t&&(k??-1)>=0&&(t=v==null?void 0:v.Results[k??0]);const P=J(t),q=J((v==null?void 0:v.ResultCounts[k??0])??1),C=i?N([P,i],([p,c])=>c[p]):q,o=J(v!=null&&v.Type?pe(ce.defaultTier[v.Type]):1),b=J(pe(ce.defaultTier.Proliferator)),g=J(0),A=N([f,o],([p,c])=>{var B;return((B=h.recipe[p])==null?void 0:B.TimeSpend)/c});r||(r=N([g,A],([p,c])=>p>0?p:c));super(f,P,C,r,o,b,A);S(this,"amountEditable");S(this,"manualAmount",J());S(this,"manualInterval");S(this,"children",J([]));S(this,"canBeMined",N(this.itemId,e=>h.canBeMined[e]));S(this,"canBeExtracted",N(this.itemId,e=>h.canBeExtracted[e]));S(this,"item",N(this.itemId,e=>h.item[e]));S(this,"recipe",N(this.recipeId,e=>h.recipe[e]));S(this,"options",N(this.itemId,e=>h.alternativeRecipe[e]));S(this,"timeSpendChanged",N(this.timeSpend,(e,t)=>{t(!!e);const i=setTimeout(()=>t(!e),1400);return()=>clearTimeout(i)}));S(this,"relativeSpeed",N([this.targetInterval,this.timeSpend],([e,t])=>e/t));S(this,"requiredBuildings",N([this.targetAmount,this.recipe,this.itemId,this.relativeSpeed,this.proliferator],([e,t,i,r,l])=>{const n=t==null?void 0:t.Results.findIndex(v=>i===v),f=e/(t==null?void 0:t.ResultCounts[n])/r;return isNaN(f)?e:f}));S(this,"providedItemsPerInterval",N([this.recipe,this.relativeSpeed,this.requiredBuildings,this.itemId,this.targetAmount],([e,t,i,r,l])=>{if(!e&&r&&(h.canBeMined[r]||h.canBeExtracted[r]))return{[r]:l};const n={};return e==null||e.Results.forEach((f,v)=>{n[f]=e.ResultCounts[v]*t*i}),n}));S(this,"childrenProvideItemsPerInterval",N(this.children,(e,t)=>{const i=new Array(e.length),r=e.map((n,f)=>n.providedItemsPerInterval.subscribe(v=>{i[f]=v;const k=i.filter(I=>!!I).reduce((I,P)=>Ce(I,P),{});t(k)})),l=i.filter(n=>!!n).reduce((n,f)=>Ce(n,f),{});return t(l),()=>r.forEach(n=>n())}));S(this,"childrenByItemId",N(this.children,(e,t)=>{const i=new Array(e.length),r=e.map((n,f)=>n.itemId.subscribe(v=>{i[f]=[v,n];const k=i.filter(I=>!!I).reduce((I,[P,q])=>(I[P]=q,I),{});t(k)})),l=i.filter(n=>!!n).reduce((n,[f,v])=>(n[f]=v,n),{});return t(l),()=>r.forEach(n=>n())}));S(this,"requiredItemsPerInterval",N([this.recipe,this.relativeSpeed,this.requiredBuildings],([e,t,i])=>{const r={};return e==null||e.Items.forEach((l,n)=>r[l]=e.ItemCounts[n]*t*i),r}));S(this,"inputsOutputs",N([this.childrenProvideItemsPerInterval,this.requiredItemsPerInterval,this.providedItemsPerInterval],([e,t,i])=>{const r=new Set;return Object.keys(t).forEach(l=>{r.add(Number(l))}),Object.keys(e??{}).forEach(l=>{r.add(Number(l))}),Object.keys(i).forEach(l=>{r.add(Number(l))}),r}));S(this,"surplus",N([this.childrenProvideItemsPerInterval,this.requiredItemsPerInterval,this.providedItemsPerInterval,this.itemId],([e,t,i,r])=>{const l=Ce(e,i);return Object.entries(t).forEach(([n,f])=>l[Number(n)]=(l[Number(n)]??0)-f),Object.entries(l).filter(([,n])=>n<=0).forEach(([n])=>delete l[Number(n)]),l}));S(this,"deficit",N([this.childrenProvideItemsPerInterval,this.requiredItemsPerInterval],([e,t])=>{const i={...e};return Object.entries(t).forEach(([r,l])=>i[Number(r)]=(i[Number(r)]??0)-l),Object.entries(i).filter(([,r])=>r>=0).forEach(([r])=>delete i[Number(r)]),Object.keys(i).forEach(r=>{var n;const l=Number(r);(n=h.producedVia[l])!=null&&n.length||delete i[l]}),i}));S(this,"totals",N([this.itemId,this.requiredBuildings,this.children],([e,t,i])=>{const r={};return r[e]=t,i.map(l=>l.totals).forEach(l=>{Object.entries(l).forEach(([n,f])=>{const v=Number(n);r[v]=(r[v]??0)+f})}),r}));this.depth=l,this.amountEditable=I,this.manualAmount=q,this.manualInterval=g,i||this.children.set(this.dbd())}setAmount(e){this.manualAmount.set(e)}setRecipeId(e){this.recipeId.set(e),this.expand()}deleteChild(e){this.children.update(t=>{const i=t.findIndex(r=>pe(r.itemId)===e);return t.splice(i,1),t})}setInterval(e){this.manualInterval.set(e)}expand(){this.children.set(this.dbd())}planFor(e){this.children.update(t=>(t.push(new ke(void 0,e,this.requiredItemsPerInterval,this.targetInterval,this.depth+1)),t))}dbd(){const e=[],t=pe(this.recipe);return t==null||t.Items.forEach((i,r)=>{var f;if(!((f=h.alternativeRecipe[i])!=null&&f.length))return;const l=new ke(void 0,i,this.requiredItemsPerInterval,this.targetInterval,this.depth+1);e.push(l);const n=pe(l.providedItemsPerInterval);Object.entries(n).forEach(([v,k])=>{})}),e}}var Nt=(u,s,e)=>s(a(e)),qt=y("<button> </button>"),Ot=y('<div><span class="text-xs text-gray-400">Tier</span> <!></div>'),Tt=(u,s)=>le(s,!0),Ct=y('<button class="text-center min-w-16 h-10 rounded-l-lg bg-slate-800 py-2 px-3 flex justify-around items-end gap-2 relative "><span class="text-xs text-gray-400 absolute top-0"> </span> <b class="bottom-0.5 absolute"> </b></button>');function Dt(u,s){_e(s,!0);const[e,t]=Pe(),i=()=>R(n,"$recipe",e),r=()=>R(f,"$tier",e),l=()=>R(v,"$requiredBuildings",e);let{recipe:n,tier:f,requiredBuildings:v}=s.planner,k=de(!1);const I=b=>{s.planner.tier.set(b),le(k,!1)};var P=he(),q=Q(P);{var C=b=>{var g=Ot(),A=x(m(g),2);ue(A,1,()=>ce.availableTiers[i().Type],ve,(E,p)=>{var c=qt();let B;c.__click=[Nt,I,p];var Z=m(c,!0);d(c),T(ie=>{B=fe(c,1,"px-2 py-1 outline-slate-600 text-sm  rounded",null,B,ie),F(Z,a(p))},[()=>({"outline-1":a(p)===r(),active:a(p)===r()})]),_(E,c)}),d(g),_(b,g)},o=b=>{var g=Ct();g.__click=[Tt,k];var A=m(g),E=m(A);d(A);var p=x(A,2),c=m(p,!0);d(p),d(g),T(B=>{F(E,`tier ${r()??""}`),F(c,B)},[()=>Math.round(l()*100)/100]),_(b,g)};j(q,b=>{a(k)?b(C):b(o,!1)})}_(u,P),be(),t()}ge(["click"]);var Mt=y('<input type="number" class="text-left rounded-r-lg w-16">'),jt=(u,s)=>s.deletecb(),Ft=y('<button class="flex items-center"><span class="pl-2">🗑</span>️ <span class="text-sm py-2 block pr-4"> </span></button>'),Vt=y("<option>extraction/mining</option>"),zt=y("<option> </option>"),Lt=y(" <select><!><!></select>",1),Kt=(u,s,e)=>s.planner.planFor(a(e)),Ut=y('<button class="flex items-center"><span class="pl-2">📝</span>️ <span class="text-sm py-2 block pr-4"> </span></button>'),Gt=y('<div class="flex items-center"><span class="pl-4"></span>️ <span class="text-sm py-2 block pr-4"> </span></div>'),Jt=y("<div><!></div>"),Qt=y('<div class="flex gap-2"><div class="bg-slate-800  text-center rounded-r-lg "><!></div> <!></div>'),Zt=y('<div class="flex flex-col gap-0.5"></div>'),Ht=y('<div class="flex gap-1 max-w-2xl items-center"><div class="bg-slate-800  text-center rounded-r-lg  "><!></div> <div class="flex-grow px-4"><h5><!></h5></div> <!></div> <!>',1);function Ge(u,s){_e(s,!0);const[e,t]=Pe(),i=()=>R(ie,"$targetAmount",e),r=()=>R(E,"$recipeId",e),l=()=>R(g,"$itemId",e),n=()=>R(Se,"$options",e),f=()=>R(b,"$item",e),v=()=>R(A,"$recipe",e),k=()=>R(c,"$requiredBuildings",e),I=()=>R(we,"$inputsOutputs",e),P=()=>R(me,"$providedItemsPerInterval",e),q=()=>R($e,"$childrenProvideItemsPerInterval",e),C=()=>R(Ie,"$requiredItemsPerInterval",e),o=()=>R(Z,"$childrenByItemId",e);let{item:b,itemId:g,recipe:A,recipeId:E,targetInterval:p,requiredBuildings:c,children:B,childrenByItemId:Z,targetAmount:ie,childrenProvideItemsPerInterval:$e,providedItemsPerInterval:me,requiredItemsPerInterval:Ie,inputsOutputs:we,deficit:Me,options:Se,tier:je}=s.planner,D=de(De(i())),V=de(De(r()));Ve(()=>{s.planner.amountEditable&&i()!==a(D)&&s.planner.setAmount(a(D))}),Ve(()=>{a(V)!==r()&&s.planner.setRecipeId(a(V))});var U=Ht(),te=Q(U),Ee=m(te),Je=m(Ee);{var Qe=$=>{var w=Mt();Ke(w),Le(w,()=>a(D),L=>le(D,L)),_($,w)},Ze=$=>{var w=Ft();w.__click=[jt,s];var L=x(m(w),2),O=m(L,!0);d(L),d(w),T(re=>{Te(L,`padding-left: ${s.planner.depth*1.5}rem`),F(O,re)},[()=>Math.round(i()*100)/100]),_($,w)};j(Je,$=>{s.planner.amountEditable?$(Qe):$(Ze,!1)})}d(Ee);var Re=x(Ee,2),Fe=m(Re),He=m(Fe);{var We=$=>{var w=Lt(),L=Q(w),O=x(L),re=m(O);{var H=W=>{var M=Vt();M.value=(M.__value=void 0)==null?"":void 0,T(()=>ze(M,r()===void 0)),_(W,M)};j(re,W=>{(h.canBeExtracted[l()]||h.canBeMined[l()])&&W(H)})}var xe=x(re);ue(xe,1,n,ve,(W,M)=>{var K=zt(),ae={},Ae=m(K,!0);d(K),T(()=>{ae!==(ae=h.recipe[a(M)].ID)&&(K.value=(K.__value=h.recipe[a(M)].ID)==null?"":h.recipe[a(M)].ID),ze(K,E===h.recipe[a(M)].ID),F(Ae,h.recipe[a(M)].Name)}),_(W,K)}),d(O),T(()=>F(L,`${f().Name??""}: `)),Pt(O,()=>a(V),W=>le(V,W)),_($,w)},Xe=$=>{var w=mt();T(()=>{var L;return F(w,(L=v())==null?void 0:L.Name)}),_($,w)};j(He,$=>{l()&&(n().length>1||n().length>=1&&h.canBeExtracted[l()]||h.canBeMined[l()])?$(We):$(Xe,!1)})}d(Fe),d(Re);var Ye=x(Re,2);{var et=$=>{Dt($,{get planner(){return s.planner}})};j(Ye,$=>{k()&&r()&&$(et)})}d(te);var tt=x(te,2);{var rt=$=>{var w=Zt();ue(w,5,I,ve,(L,O)=>{var re=he();const H=X(()=>{var M,K,ae;return(((M=P())==null?void 0:M[a(O)])??0)+(((K=q())==null?void 0:K[a(O)])??0)-(((ae=C())==null?void 0:ae[a(O)])??0)}),xe=X(()=>o()[a(O)]);var W=Q(re);Ue(W,()=>a(O),M=>{var K=he(),ae=Q(K);{var Ae=oe=>{Ge(oe,{get planner(){return a(xe)},deletecb:()=>s.planner.deleteChild(a(O))})},at=oe=>{var Be=Qt(),Ne=m(Be),st=m(Ne);{var nt=G=>{var z=Ut();z.__click=[Kt,s,O];var Y=x(m(z),2),se=m(Y,!0);d(Y),d(z),T(ne=>{Te(Y,`padding-left: ${(s.planner.depth+1)*1.5}rem`),F(se,ne)},[()=>Math.round(a(H)*100)/100]),_(G,z)},lt=(G,z)=>{{var Y=se=>{var ne=Gt(),qe=x(m(ne),2),ct=m(qe,!0);d(qe),d(ne),T(dt=>{Te(qe,`padding-left: ${(s.planner.depth+1)*1.5}rem`),F(ct,dt)},[()=>Math.round(a(H)*100)/100]),_(se,ne)};j(G,se=>{a(O)!==l()&&a(H)!==0&&se(Y)},z)}};j(st,G=>{var z;a(H)<0&&((z=h.producedVia[a(O)])==null?void 0:z.length)>0?G(nt):G(lt,!1)})}d(Ne);var it=x(Ne,2);{var ot=G=>{var z=Jt();let Y;var se=m(z);$t(se,{get itemId(){return a(O)}}),d(z),T(ne=>Y=fe(z,1,"flex gap-2 items-center",null,Y,ne),[()=>({"text-green-500":a(H)>0,"text-red-500":a(H)<0})]),_(G,z)};j(it,G=>{a(O)!==l()&&a(H)!==0&&G(ot)})}d(Be),_(oe,Be)};j(ae,oe=>{a(xe)?oe(Ae):oe(at,!1)})}_(M,K)}),_(L,re)}),d(w),_($,w)};j(tt,$=>{var w;((w=I())==null?void 0:w.size)>0&&$(rt)})}_(u,U),be(),t()}ge(["click"]);var Wt=y('<div class="flex flex-col items-stretch group w-full "><div class="my-2 z-30"><a class="w-xs"> </a></div></div>'),Xt=y('<div class="flex gap-0.5 flex-col mb-4 sticky top-0 mr-2 backdrop-blur-3xl backdrop-opacity-75  z-50"><!> <label for="recipeName">ingredient or recipe name</label><input id="recipeName"></div> <!>',1);function Yt(u,s){_e(s,!0);let e=de(De([])),t=Oe(),i=Oe(),r=Oe(),l=de(""),n=X(()=>a(l)?h.items.filter(o=>o.Name.toLowerCase().includes(a(l).toLowerCase())).map(o=>o.ID):[]),f=X(()=>(()=>{const o=new Set;return a(n).forEach(b=>{for(const g of h.relatedRecipes[b]??[])o.add(g)}),o})()),v=X(()=>h.recipees.filter(o=>a(e).length>0?a(e).includes(o.Type):!0).filter(o=>a(l)?a(f).has(o.ID):!0).filter(o=>t.checked===null?!0:t.checked?h.buildableRecipees.has(o.ID):!h.buildableRecipees.has(o.ID)).filter(o=>i.checked===null?!0:i.checked?h.fluidRecipees.has(o.ID):!h.fluidRecipees.has(o.ID)).filter(o=>r.checked===null?!0:r.checked?h.entityRecipees.has(o.ID):!h.entityRecipees.has(o.ID)));new Set(h.recipees.map(o=>o.Type));var k=Xt(),I=Q(k),P=m(I);j(P,o=>{});var q=x(P,3);Ke(q),d(I);var C=x(I,2);ue(C,17,()=>a(v),ve,(o,b)=>{var g=Wt(),A=m(g),E=m(A),p=m(E,!0);d(E),d(A),d(g),T(c=>{St(E,"href",c),F(p,a(b).Name)},[()=>wt.recipe(a(b).ID)]),_(o,g)}),Le(q,()=>a(l),o=>le(l,o)),_(u,k),be()}ge(["click"]);var er=y('<button class="flex-grow shadow-xl py-2 m-4 outline-amber-100 outline-1 active bg-slate-500  text-white rounded-lg"> </button>'),tr=y('<button class="flex-grow shadow-xl py-2 m-4	bg-slate-800 text-gray-300 rounded-lg"> </button>'),rr=y('<button class="flex-grow shadow-xl py-2 m-4 outline-amber-100 outline-1 active rounded-lg bg-slate-500  text-white"> </button>'),ar=y('<button class="flex-grow shadow-xl py-2 m-4 bg-slate-800 text-gray-300 rounded-lg"> </button>'),sr=y('<h3 class="bg-blue-800  rounded-t py-5 px-4">default tier for new factory of type</h3> <div><h4 class="bg-blue-900 py-2 px-4 rounded-t">Smelting</h4> <div class="flex bg-gray-600 "></div></div> <div><h4 class="bg-blue-900 py-2 px-4 rounded-t">Assembler</h4> <div class="flex bg-gray-600 "></div></div>',1);function nr(u,s){_e(s,!1);const[e,t]=Pe(),i=()=>R(l,"$Smelt",e),r=()=>R(n,"$Assemble",e);let{Smelt:l,Assemble:n}=ce.defaultTier;const f=(C,o,b)=>{localStorage.setItem(`dt.${C}`,o),b.set(o)};Et();var v=sr(),k=x(Q(v),2),I=x(m(k),2);ue(I,5,()=>ce.availableTiers.Smelt,ve,(C,o)=>{var b=he(),g=Q(b);{var A=p=>{var c=er();c.__click=()=>f("Smelt",a(o),l);var B=m(c,!0);d(c),T(()=>F(B,a(o))),_(p,c)},E=p=>{var c=tr();c.__click=()=>f("Smelt",a(o),l);var B=m(c,!0);d(c),T(()=>F(B,a(o))),_(p,c)};j(g,p=>{a(o)===i()?p(A):p(E,!1)})}_(C,b)}),d(I),d(k);var P=x(k,2),q=x(m(P),2);ue(q,5,()=>ce.availableTiers.Assemble,ve,(C,o)=>{var b=he(),g=Q(b);{var A=p=>{var c=rr();c.__click=()=>f("Assemble",a(o),n);var B=m(c,!0);d(c),T(()=>F(B,a(o))),_(p,c)},E=p=>{var c=ar();c.__click=()=>f("Assemble",a(o),n);var B=m(c,!0);d(c),T(()=>F(B,a(o))),_(p,c)};j(g,p=>{a(o)===r()?p(A):p(E,!1)})}_(C,b)}),d(q),d(P),_(u,v),be(),t()}ge(["click"]);var lr=(u,s)=>le(s,!1),ir=y('<dialog open class="max-w-2xl w-full h-full max-h-10/12 mx-auto top-1/12 bg-gray-950 z-50 md:px-5 text-amber-50 flex flex-col py-4 gap-2"><!> <span class="flex-grow"></span> <button class="bg-green-800 w-full py-1">OK</button></dialog>'),or=(u,s)=>a(s).setInterval(0),cr=(u,s,e)=>a(s).setInterval(e),dr=(u,s)=>a(s).setInterval(60),ur=y("<button>Second</button>"),vr=(u,s)=>le(s,!0),mr=y('<!> <div class="flex gap-12"><div class="max-w-sm lg:block hidden max-h-screen  ml-auto overflow-y-auto"><!></div> <div class="max-w-2xl w-full mr-auto ml-auto lg:ml-0"><div class="flex  text-sm py-1"><span class="px-3 py-3 bg-slate-800 rounded-r-lg">Items per <span class="inline-flex"><button> </button> <button>Minute</button> <!></span></span> <span class="px-3 py-3 flex-grow text-right"></span> <button class="px-3 py-3 bg-slate-800 rounded-l-lg">⚙️ Required Fabs to Process Items</button></div> <!></div></div>',1);function Sr(u,s){_e(s,!0);const[e,t]=Pe(),i=()=>R(a(k),"$timeSpendChanged",e),r=()=>R(a(f),"$targetInterval",e),l=()=>R(a(v),"$timeSpend",e);let n=X(()=>new ke(s.data.recipeId)),f=X(()=>a(n).targetInterval),v=X(()=>a(n).timeSpend),k=X(()=>a(n).timeSpendChanged);const I=60*60;let P=de(!1);var q=mr(),C=Q(q);{var o=D=>{var V=ir(),U=m(V);nr(U,{});var te=x(U,4);te.__click=[lr,P],d(V),_(D,V)};j(C,D=>{a(P)&&D(o)})}var b=x(C,2),g=m(b),A=m(g);Yt(A,{}),d(g);var E=x(g,2),p=m(E),c=m(p),B=x(m(c)),Z=m(B);let ie;Z.__click=[or,n];var $e=m(Z);d(Z);var me=x(Z,2);let Ie;me.__click=[cr,n,I];var we=x(me,2);{var Me=D=>{var V=ur();let U;V.__click=[dr,n],T(te=>U=fe(V,1,"px-1.5 multi",null,U,te),[()=>({active:r()===60})]),_(D,V)};j(we,D=>{l()!==60&&D(Me)})}d(B),d(c);var Se=x(c,4);Se.__click=[vr,P],d(p);var je=x(p,2);Ue(je,()=>a(n),D=>{Ge(D,{get planner(){return a(n)}})}),d(E),d(b),T((D,V,U)=>{ie=fe(Z,1,"px-1.5 multi",null,ie,D),F($e,`Cycle (${V??""}s)`),Ie=fe(me,1,"px-1.5 multi",null,Ie,U)},[()=>({"animate-flash":i(),active:r()===l()}),()=>Math.round(l()/60*100)/100,()=>({active:r()===I})]),_(u,q),be(),t()}ge(["click"]);export{Sr as component,wr as universal};
