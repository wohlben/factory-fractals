var _t=Object.defineProperty;var bt=(p,a,e)=>a in p?_t(p,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):p[a]=e;var O=(p,a,e)=>bt(p,typeof a!="symbol"?a+"":a,e);import{c as be,a as g,t as I}from"../chunks/e-TftYpV.js";import{at as xt,aG as It,Q as yt,z as $t,A as Me,B as Bt,K as kt,J as wt,L as Pt,U as Tt,p as Pe,f as ee,g as t,b as we,a as Te,s as f,c,r as o,h as ce,t as M,e as z,M as We}from"../chunks/DKDpRE7g.js";import{d as je,s as q}from"../chunks/CQBbwnrn.js";import{i as Q}from"../chunks/PbJpwx8q.js";import{t as qt,s as Ee,c as Ye,b as Rt,o as Ke}from"../chunks/Cs5HLVpE.js";import{s as Ne,a as $}from"../chunks/DSW42VuP.js";import{D as _,e as me,i as fe,I as St}from"../chunks/CRa7tc_X.js";import{w as ve,d as j,g as ke}from"../chunks/DRXOzK2u.js";import{r as et,L as tt,s as rt,b as Xe}from"../chunks/BCod4-4X.js";import{p as Ze}from"../chunks/BlFFt1pI.js";import{i as Et}from"../chunks/CaJYm0qw.js";function Ve(p,a,e){Me&&Bt();var r=p,n=Tt,s,i=xt()?It:yt;$t(()=>{i(n,n=a())&&(s&&kt(s),s=wt(()=>e(r)))}),Me&&(r=Pt)}function Qe(p,a,e,r){var n=p.__style;if(Me||n!==a){var s=qt(a);(!Me||s!==p.getAttribute("style"))&&(s==null?p.removeAttribute("style"):p.style.cssText=s),p.__style=a}return r}const Nt=!1,At=({params:p,url:a})=>{const{id:e}=p,r=Number(e),n=a.searchParams.get("depth"),s=a.searchParams.get("targetAmount");return{recipeId:r,depth:n&&parseInt(n)||1,targetAmount:s&&parseInt(s)||1}},Kr=Object.freeze(Object.defineProperty({__proto__:null,load:At,prerender:Nt},Symbol.toStringTag,{value:"Module"})),Ot=()=>{const p=localStorage==null?void 0:localStorage.getItem("defaultTiers");if(p){const a=JSON.parse(p);return ve(a)}},pe={defaultTier:Ot()??ve({Smelt:1,Assemble:.75,Research:1,Chemical:1,Refine:1,Particle:1,Fractionate:1,Proliferator:1}),availableTiers:{Smelt:[1,2],Assemble:[.75,1,1.5,3],Research:[1],Refine:[1],Chemical:[1,2],Particle:[1],Fractionate:[1],Proliferator:[.125,.2,.25]}};class Ct{constructor(a,e,r,n,s,i,l){this.recipeId=a,this.itemId=e,this.targetAmount=r,this.targetInterval=n,this.tier=s,this.proliferator=i,this.timeSpend=l}}const Be=(p,a)=>{const e={...p};return Object.entries(a).forEach(([r,n])=>{const s=Number(r);e[s]=(e[s]??0)+n}),e};class ze extends Ct{constructor(e,r,n,s,i=0,l=1,m){var R;const d=!!(r&&(_.canBeExtracted[r]||_.canBeMined[r]));!e&&!d&&(e=(R=_.alternativeRecipe[r])==null?void 0:R[0]);const h=ve(e),u=e?_.recipe[e]:void 0;let b=u==null?void 0:u.Results.findIndex(w=>r===w);const B=!r;!r&&(b??-1)>=0&&(r=u==null?void 0:u.Results[b??0]);const N=ve(r),v=ve((u==null?void 0:u.ResultCounts[b??0])??m??1),x=n?j([N,n],([w,C])=>C[w]):v,y=ve(u!=null&&u.Type?ke(pe.defaultTier)[u.Type]:1),P=ve(ke(pe.defaultTier).Proliferator),L=ve(0),k=j([h,y],([w,C])=>{var F;return((F=_.recipe[w])==null?void 0:F.TimeSpend)/C});s||(s=j([L,k],([w,C])=>w>0?w:C));super(h,N,x,s,y,P,k);O(this,"amountEditable");O(this,"manualAmount",ve());O(this,"manualInterval");O(this,"children",ve([]));O(this,"canBeMined",j(this.itemId,e=>_.canBeMined[e]));O(this,"canBeExtracted",j(this.itemId,e=>_.canBeExtracted[e]));O(this,"item",j(this.itemId,e=>_.item[e]));O(this,"recipe",j(this.recipeId,e=>_.recipe[e]));O(this,"options",j(this.itemId,e=>_.alternativeRecipe[e]));O(this,"timeSpendChanged",j(this.timeSpend,(e,r)=>{r(!!e);const n=setTimeout(()=>r(!e),1400);return()=>clearTimeout(n)}));O(this,"relativeSpeed",j([this.targetInterval,this.timeSpend],([e,r])=>e/r));O(this,"requiredBuildings",j([this.targetAmount,this.recipe,this.itemId,this.relativeSpeed,this.proliferator],([e,r,n,s,i])=>{const l=r==null?void 0:r.Results.findIndex(d=>n===d),m=e/(r==null?void 0:r.ResultCounts[l])/s;return isNaN(m)?e:m}));O(this,"providedItemsPerInterval",j([this.recipe,this.relativeSpeed,this.requiredBuildings,this.itemId,this.targetAmount],([e,r,n,s,i])=>{if(!e&&s&&(_.canBeMined[s]||_.canBeExtracted[s]))return{[s]:i};const l={};return e==null||e.Results.forEach((m,d)=>{l[m]=e.ResultCounts[d]*r*n}),l}));O(this,"childrenProvideItemsPerInterval",j(this.children,(e,r)=>{const n=new Array(e.length),s=e.map((l,m)=>l.providedItemsPerInterval.subscribe(d=>{n[m]=d;const h=n.filter(u=>!!u).reduce((u,b)=>Be(u,b),{});r(h)})),i=n.filter(l=>!!l).reduce((l,m)=>Be(l,m),{});return r(i),()=>s.forEach(l=>l())}));O(this,"requiredBuildingsByRecipeId",j([this.children,this.recipeId,this.requiredBuildings],([e,r,n],s)=>{const i=new Array(e.length),l=e.map((d,h)=>d.requiredBuildingsByRecipeId.subscribe(u=>{i[h]=u;const b=i.filter(B=>!!B).reduce((B,N)=>Be(B,N),{});if(r){const B=r;b[B]=(b[B]??0)+n}s(b)})),m=i.filter(d=>!!d).reduce((d,h)=>Be(d,h),{});if(r){const d=r;m[d]=(m[d]??0)+n}return s(m),()=>l.forEach(d=>d())}));O(this,"fabsByType",j(this.requiredBuildingsByRecipeId,e=>Object.entries(e).reduce((r,[n,s])=>{const i=Number(n),l=_.recipe[i].Type;return r[l]=(r[l]??0)+Math.round(s),r},{})));O(this,"childrenByItemId",j(this.children,(e,r)=>{const n=new Array(e.length),s=e.map((l,m)=>l.itemId.subscribe(d=>{n[m]=[d,l];const h=n.filter(u=>!!u).reduce((u,[b,B])=>(u[b]=B,u),{});r(h)})),i=n.filter(l=>!!l).reduce((l,[m,d])=>(l[m]=d,l),{});return r(i),()=>s.forEach(l=>l())}));O(this,"requiredItemsPerInterval",j([this.recipe,this.relativeSpeed,this.requiredBuildings],([e,r,n])=>{const s={};return e==null||e.Items.forEach((i,l)=>s[i]=e.ItemCounts[l]*r*n),s}));O(this,"deficitRequiredItemsPerInterval",j([this.recipe,this.relativeSpeed,this.requiredBuildings],([e,r,n])=>{const s={};return e==null||e.Items.forEach((i,l)=>s[i]=-(e.ItemCounts[l]*r*n)),s}));O(this,"inputsOutputs",j([this.childrenProvideItemsPerInterval,this.requiredItemsPerInterval,this.providedItemsPerInterval],([e,r,n])=>{const s=new Set;return Object.keys(r).forEach(i=>{s.add(Number(i))}),Object.keys(e??{}).forEach(i=>{s.add(Number(i))}),Object.keys(n).forEach(i=>{s.add(Number(i))}),s}));O(this,"surplus",j([this.childrenProvideItemsPerInterval,this.requiredItemsPerInterval,this.providedItemsPerInterval,this.itemId],([e,r,n,s])=>{const i=Be(e,n);return Object.entries(r).forEach(([l,m])=>i[Number(l)]=(i[Number(l)]??0)-m),Object.entries(i).filter(([,l])=>l<=0).forEach(([l])=>delete i[Number(l)]),i}));O(this,"deficit",j([this.childrenProvideItemsPerInterval,this.requiredItemsPerInterval],([e,r])=>{const n={...e};return Object.entries(r).forEach(([s,i])=>n[Number(s)]=(n[Number(s)]??0)-i),Object.entries(n).filter(([,s])=>s>=0).forEach(([s])=>delete n[Number(s)]),n}));O(this,"deficitByItemId",j([this.children,this.deficit,this.recipeId,this.itemId,this.targetAmount],([e,r,n,s,i],l)=>{const m=new Array(e.length),d=e.map((u,b)=>u.deficitByItemId.subscribe(B=>{m[b]=B;const N=m.filter(v=>!!v).reduce((v,x)=>Be(v,x),n?r:{[s]:-i});l(N)})),h=m.filter(u=>!!u).reduce((u,b)=>Be(u,b),n?r:{[s]:-i});return l(h),()=>d.forEach(u=>u())}));O(this,"totals",j([this.itemId,this.requiredBuildings,this.children],([e,r,n])=>{const s={};return s[e]=r,n.map(i=>i.totals).forEach(i=>{Object.entries(i).forEach(([l,m])=>{const d=Number(l);s[d]=(s[d]??0)+m})}),s}));this.depth=i,this.amountEditable=B,this.manualAmount=v,this.manualInterval=L,l>i&&this.children.set(this.dbd(l))}setAmount(e){this.manualAmount.set(e)}setRecipeId(e){this.recipeId.set(e),this.expand()}deleteChild(e){this.children.update(r=>{const n=r.findIndex(s=>ke(s.itemId)===e);return r.splice(n,1),r})}setInterval(e){this.manualInterval.set(e)}expand(){this.children.set(this.dbd())}planFor(e){this.children.update(r=>(r.push(new ze(void 0,e,this.requiredItemsPerInterval,this.targetInterval,this.depth+1)),r))}dbd(e){const r=[],n=ke(this.recipe);return n==null||n.Items.forEach((s,i)=>{var d;if(!((d=_.alternativeRecipe[s])!=null&&d.length))return;const l=new ze(void 0,s,this.requiredItemsPerInterval,this.targetInterval,this.depth+1,e);r.push(l);const m=ke(l.providedItemsPerInterval);Object.entries(m).forEach(([h,u])=>{})}),r}}var jt=(p,a,e)=>a(t(e)),Dt=I("<button> </button>"),Mt=I('<div><span class="text-xs text-gray-400">Tier</span> <!></div>'),Vt=(p,a)=>ce(a,!0),zt=I('<button class="text-center min-w-16 h-10 rounded-l-lg bg-slate-800 hover:bg-slate-600 py-2 px-3 flex justify-around items-end gap-2 relative "><span class="text-xs text-gray-400 absolute top-0"> </span> <b class="bottom-0.5 absolute"> </b></button>');function Ft(p,a){Pe(a,!0);const[e,r]=Ne(),n=()=>$(l,"$recipe",e),s=()=>$(m,"$tier",e),i=()=>$(d,"$requiredBuildings",e);let{recipe:l,tier:m,requiredBuildings:d}=a.planner,h=we(!1);const u=x=>{a.planner.tier.set(x),ce(h,!1)};var b=be(),B=ee(b);{var N=x=>{var y=Mt(),P=f(c(y),2);me(P,1,()=>pe.availableTiers[n().Type],fe,(L,k)=>{var R=Dt();let w;R.__click=[jt,u,k];var C=c(R,!0);o(R),M(F=>{w=Ee(R,1,"px-2 py-1 outline-slate-600 hover:bg-slate-600 text-sm  rounded",null,w,F),q(C,t(k))},[()=>({"outline-1":t(k)===s(),active:t(k)===s()})]),g(L,R)}),o(y),g(x,y)},v=x=>{var y=zt();y.__click=[Vt,h];var P=c(y),L=c(P);o(P);var k=f(P,2),R=c(k,!0);o(k),o(y),M(w=>{q(L,`tier ${s()??""}`),q(R,w)},[()=>Math.round(i()*100)/100]),g(x,y)};Q(B,x=>{t(h)?x(N):x(v,!1)})}g(p,b),Te(),r()}je(["click"]);var Lt=I('<div class="flex gap-4 hover:bg-gray-700"><span> </span> <span class="text-right flex-grow"> </span></div>'),Jt=I('<div class="flex odd:bg-gray-950 gap-2 px-2 items-center hover:bg-gray-700"><span class="w-14 text-right"> </span> <span class="text-slate-300 text-xs">x</span> <span> </span> <span class="text-slate-400 text-xs"> </span> <em class="text-right flex-grow"> </em></div>'),Ut=I('<div class="flex gap-4 hover:bg-gray-700 px-1"><span> </span> <span class="text-right flex-grow"> </span></div>'),Gt=I('<div><h3 class="bg-blue-800 py-2 px-4  text-center "><span class="w-14 text-right"> </span> <span class="text-xs text-slate-400">x</span> </h3> <h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">Buildings</h5> <div class="mb-4 my-4 mx-auto  grid grid-cols-2 gap-x-8 justify-center"></div> <h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">Recipes</h5> <!> <h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">ingress</h5> <div class="mx-auto  grid grid-cols-2 gap-x-8 justify-center"></div></div>');function Kt(p,a){Pe(a,!0);const[e,r]=Ne(),n=()=>$(B,"$requiredBuildings",e),s=()=>$(b,"$recipe",e),i=()=>$(u,"$fabsByType",e),l=()=>$(h,"$requiredBuildingsByRecipeId",e),m=()=>$(v,"$defaultTier",e),d=()=>$(N,"$deficitByItemId",e);let{requiredBuildingsByRecipeId:h,fabsByType:u,recipe:b,requiredBuildings:B,deficitByItemId:N}=a.planner,{defaultTier:v}=pe;var x=Gt(),y=c(x),P=c(y),L=c(P,!0);o(P);var k=f(P,3);o(y);var R=f(y,4);me(R,5,()=>Object.entries(i()),fe,(F,J)=>{var T=Lt();const U=z(()=>{const[H,W]=t(J);return{fabType:H,requiredFabs:W}});var Y=c(T),G=c(Y,!0);o(Y);var se=f(Y,2),oe=c(se,!0);o(se),o(T),M(()=>{q(G,t(U).fabType),q(oe,t(U).requiredFabs)}),g(F,T)}),o(R);var w=f(R,4);me(w,1,()=>Object.entries(l()??{}),fe,(F,J,T,U)=>{var Y=be();const G=z(()=>{const[H,W]=t(J);return{recipeId:H,requiredBuildings:W}});var se=ee(Y);{var oe=H=>{var W=Jt();const ne=z(()=>_.recipe[Number(t(G).recipeId)]),ge=z(()=>m()[t(ne).Type]/t(ne).TimeSpend),S=z(()=>t(ne).ResultCounts.reduce((xe,Le)=>Le+xe,0)),X=z(()=>t(G).requiredBuildings*t(ge)*t(S)*60);var Z=c(W),ue=c(Z,!0);o(Z);var he=f(Z,4),qe=c(he,!0);o(he);var Ae=f(he,2),Fe=c(Ae);o(Ae);var De=f(Ae,2),Oe=c(De);o(De),o(W),M(()=>{var xe;q(ue,t(G).requiredBuildings),q(qe,((xe=t(ne))==null?void 0:xe.Name)??"recipe"+t(G).recipeId),q(Fe,`tier ${m()[t(ne).Type]??""}`),q(Oe,`${t(X)??""}/s`)}),g(H,W)};Q(se,H=>{t(G).recipeId&&H(oe)})}g(F,Y)});var C=f(w,4);me(C,5,()=>Object.entries(d()),fe,(F,J)=>{var T=Ut();const U=z(()=>{const[H,W]=t(J);return{itemId:H,missing:W}});var Y=c(T),G=c(Y,!0);o(Y);var se=f(Y,2),oe=c(se,!0);o(se),o(T),M(H=>{q(G,_.item[t(U).itemId].Name),q(oe,H)},[()=>Math.abs(t(U).missing)]),g(F,T)}),o(C),o(x),M(()=>{q(L,n()),q(k,` ${s().Name??""}`)}),g(p,x),Te(),r()}var Qt=(p,a)=>ce(a,!1),Zt=(p,a)=>ce(a,!1),Ht=I('<dialog open class="max-w-2xl w-full h-full max-h-10/12 mx-auto top-1/12 bg-gray-950 z-50 md:px-5 text-amber-50 flex flex-col py-4 gap-2 fixed "><!> <button class="bg-green-800 hover:bg-green-700 py-2 rounded-xl mt-auto">close</button></dialog> <button class="fixed overscroll-contain w-screen h-screen backdrop-blur-2xl bg-black opacity-70 top-0 left-0 z-40" aria-label="close"></button>',1),Wt=(p,a)=>a.deletecb(),Xt=I(`<style scoped="">input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
              /* display: none; <- Crashes Chrome on hover */
              -webkit-appearance: none;
              margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
          }

          input[type=number] {
              -moz-appearance: textfield;
          }</style> <input type="number" class="text-left rounded-r-lg w-16">`,1),Yt=I('<div class="flex items-center"><span class="pl-2">🗑️</span>️ <span class="text-sm py-2 block pr-4"> </span></div>'),er=I("<option>extraction/mining</option>"),tr=I("<option> </option>"),rr=I(" <select><!><!></select>",1),ar=(p,a)=>ce(a,!0),sr=I('<button class="py-1 rounded-xl px-4 bg-slate-800 hover:bg-slate-700">🔎</button>'),nr=I('<span class="flex-grow"> <a class="bg-gray-800 hover:bg-slate-700">➡️</a></span> <!>',1),ir=(p,a,e,r)=>{var n;return t(a)<0&&((n=_.producedVia[t(e)])==null?void 0:n.length)>0&&r.planner.planFor(t(e))},lr=I('<div class="flex items-center"><span class="pl-2">📝</span>️ <span class="text-sm py-2 block pr-4"> </span></div>'),or=I('<div class="flex items-center"><span class="px-3.5"></span>️ <span class="text-sm py-2 block pr-4"> </span></div>'),dr=I("<div><!></div>"),cr=I('<div class="flex gap-2 hover:bg-gray-700"><button><!></button> <!></div>'),ur=I('<div class="flex flex-col gap-0.5 "></div>'),vr=I('<!> <div class="flex gap-1 max-w-2xl items-center hover:bg-gray-700"><button class="bg-slate-800 hover:bg-red-700  text-center rounded-r-lg  "><!></button> <div class="flex-grow px-4"><h5 class="flex"><!></h5></div> <!></div> <!>',1);function at(p,a){Pe(a,!0);const[e,r]=Ne(),n=()=>$(T,"$targetAmount",e),s=()=>$(k,"$recipeId",e),i=()=>$(P,"$itemId",e),l=()=>$(H,"$options",e),m=()=>$(y,"$item",e),d=()=>$(L,"$recipe",e),h=()=>$(C,"$requiredBuildings",e),u=()=>$(F,"$children",e),b=()=>$(se,"$inputsOutputs",e),B=()=>$(Y,"$providedItemsPerInterval",e),N=()=>$(U,"$childrenProvideItemsPerInterval",e),v=()=>$(G,"$requiredItemsPerInterval",e),x=()=>$(J,"$childrenByItemId",e);let{item:y,itemId:P,recipe:L,recipeId:k,targetInterval:R,relativeSpeed:w,requiredBuildings:C,children:F,childrenByItemId:J,targetAmount:T,childrenProvideItemsPerInterval:U,providedItemsPerInterval:Y,requiredItemsPerInterval:G,inputsOutputs:se,deficit:oe,options:H,tier:W}=a.planner,ne=we(Ze(n())),ge=we(Ze(s())),S=we(!1);We(()=>{a.planner.amountEditable&&n()!==t(ne)&&a.planner.setAmount(t(ne))}),We(()=>{t(ge)!==s()&&a.planner.setRecipeId(t(ge))});var X=vr(),Z=ee(X);{var ue=A=>{var D=Ht(),K=ee(D),E=c(K);Kt(E,{get planner(){return a.planner}});var de=f(E,2);de.__click=[Qt,S],o(K);var te=f(K,2);te.__click=[Zt,S],g(A,D)};Q(Z,A=>{t(S)&&A(ue)})}var he=f(Z,2),qe=c(he);qe.__click=[Wt,a];var Ae=c(qe);{var Fe=A=>{var D=Xt(),K=f(ee(D),2);et(K),Ye(K,()=>t(ne),E=>ce(ne,E)),g(A,D)},De=A=>{var D=Yt(),K=f(c(D),2),E=c(K,!0);o(K),o(D),M(de=>{Qe(K,`padding-left: ${a.planner.depth*1.1}rem`),q(E,de)},[()=>Math.round(n()*100)/100]),g(A,D)};Q(Ae,A=>{a.planner.amountEditable?A(Fe):A(De,!1)})}o(qe);var Oe=f(qe,2),xe=c(Oe),Le=c(xe);{var st=A=>{var D=rr(),K=ee(D),E=f(K),de=c(E);{var te=re=>{var V=er();V.value=(V.__value=void 0)==null?"":void 0,M(()=>Xe(V,s()===void 0)),g(re,V)};Q(de,re=>{(_.canBeExtracted[i()]||_.canBeMined[i()])&&re(te)})}var Re=f(de);me(Re,1,l,fe,(re,V)=>{var le=tr(),Ie={},Je=c(le,!0);o(le),M(()=>{Ie!==(Ie=_.recipe[t(V)].ID)&&(le.value=(le.__value=_.recipe[t(V)].ID)==null?"":_.recipe[t(V)].ID),Xe(le,k===_.recipe[t(V)].ID),q(Je,_.recipe[t(V)].Name)}),g(re,le)}),o(E),M(()=>q(K,`${m().Name??""}: `)),Rt(E,()=>t(ge),re=>ce(ge,re)),g(A,D)},nt=A=>{var D=nr(),K=ee(D),E=c(K),de=f(E);o(K);var te=f(K,2);{var Re=re=>{var V=sr();V.__click=[ar,S],g(re,V)};Q(te,re=>{u().length>1&&!a.planner.amountEditable&&re(Re)})}M(re=>{var V;q(E,`${((V=d())==null?void 0:V.Name)??""} `),rt(de,"href",re)},[()=>tt.recipe(d().ID)+"?targetAmount="+Math.round(h())+"&depth=10"]),g(A,D)};Q(Le,A=>{i()&&(l().length>1||l().length>=1&&_.canBeExtracted[i()]||_.canBeMined[i()])?A(st):A(nt,!1)})}o(xe),o(Oe);var it=f(Oe,2);{var lt=A=>{Ft(A,{get planner(){return a.planner}})};Q(it,A=>{h()&&s()&&A(lt)})}o(he);var ot=f(he,2);{var dt=A=>{var D=ur();me(D,5,b,fe,(K,E)=>{var de=be();const te=z(()=>{var V,le,Ie;return(((V=B())==null?void 0:V[t(E)])??0)+(((le=N())==null?void 0:le[t(E)])??0)-(((Ie=v())==null?void 0:Ie[t(E)])??0)}),Re=z(()=>x()[t(E)]);var re=ee(de);Ve(re,()=>t(E),V=>{var le=be(),Ie=ee(le);{var Je=Se=>{at(Se,{get planner(){return t(Re)},deletecb:()=>a.planner.deleteChild(t(E))})},ct=Se=>{var Ue=cr(),Ce=c(Ue);let He;Ce.__click=[ir,te,E,a];var ut=c(Ce);{var vt=ae=>{var ie=lr(),_e=f(c(ie),2),ye=c(_e,!0);o(_e),o(ie),M($e=>{Qe(_e,`padding-left: ${(a.planner.depth+.5)*1.1}rem`),q(ye,$e)},[()=>Math.round(t(te)*100)/100]),g(ae,ie)},pt=(ae,ie)=>{{var _e=ye=>{var $e=or(),Ge=f(c($e),2),ht=c(Ge,!0);o(Ge),o($e),M(gt=>{Qe(Ge,`padding-left: ${(a.planner.depth+.5)*1.1}rem`),q(ht,gt)},[()=>Math.round(t(te)*100)/100]),g(ye,$e)};Q(ae,ye=>{t(E)!==i()&&t(te)!==0&&ye(_e)},ie)}};Q(ut,ae=>{var ie;t(te)<0&&((ie=_.producedVia[t(E)])==null?void 0:ie.length)>0?ae(vt):ae(pt,!1)})}o(Ce);var mt=f(Ce,2);{var ft=ae=>{var ie=dr();let _e;var ye=c(ie);St(ye,{get itemId(){return t(E)}}),o(ie),M($e=>_e=Ee(ie,1,"flex gap-2 items-center ",null,_e,$e),[()=>({"text-green-500":t(te)>0,"text-red-500":t(te)<0})]),g(ae,ie)};Q(mt,ae=>{t(E)!==i()&&t(te)!==0&&ae(ft)})}o(Ue),M(ae=>He=Ee(Ce,1,"bg-slate-800  text-center rounded-r-lg",null,He,ae),[()=>{var ae;return{"hover:bg-green-800":t(te)<0&&((ae=_.producedVia[t(E)])==null?void 0:ae.length)>0}}]),g(Se,Ue)};Q(Ie,Se=>{t(Re)?Se(Je):Se(ct,!1)})}g(V,le)}),g(K,de)}),o(D),g(A,D)};Q(ot,A=>{var D;((D=b())==null?void 0:D.size)>0&&A(dt)})}g(p,X),Te(),r()}je(["click"]);var pr=I('<div class="flex flex-col items-stretch group w-full "><a class="my-2 z-30 hover:bg-slate-700 w-xs"> </a></div>'),mr=I('<div class="flex gap-0.5 flex-col mb-4 sticky top-0 mr-2 backdrop-blur-3xl backdrop-opacity-75  z-40"><!> <label for="recipeName">ingredient or recipe name</label><input id="recipeName"></div> <!>',1);function fr(p,a){Pe(a,!0);let e=we(Ze([])),r=Ke(),n=Ke(),s=Ke(),i=we(""),l=z(()=>t(i)?_.items.filter(v=>v.Name.toLowerCase().includes(t(i).toLowerCase())).map(v=>v.ID):[]),m=z(()=>(()=>{const v=new Set;return t(l).forEach(x=>{for(const y of _.relatedRecipes[x]??[])v.add(y)}),v})()),d=z(()=>_.recipees.filter(v=>t(e).length>0?t(e).includes(v.Type):!0).filter(v=>t(i)?t(m).has(v.ID):!0).filter(v=>r.checked===null?!0:r.checked?_.buildableRecipees.has(v.ID):!_.buildableRecipees.has(v.ID)).filter(v=>n.checked===null?!0:n.checked?_.fluidRecipees.has(v.ID):!_.fluidRecipees.has(v.ID)).filter(v=>s.checked===null?!0:s.checked?_.entityRecipees.has(v.ID):!_.entityRecipees.has(v.ID)));new Set(_.recipees.map(v=>v.Type));var h=mr(),u=ee(h),b=c(u);Q(b,v=>{});var B=f(b,3);et(B),o(u);var N=f(u,2);me(N,17,()=>t(d),fe,(v,x)=>{var y=pr(),P=c(y),L=c(P,!0);o(P),o(y),M(k=>{rt(P,"href",k),q(L,t(x).Name)},[()=>tt.recipe(t(x).ID)]),g(v,y)}),Ye(B,()=>t(i),v=>ce(i,v)),g(p,h),Te()}je(["click"]);var hr=(p,a,e,r)=>a(t(e),t(r)),gr=I('<button class="flex-grow shadow-xl py-2 m-4 outline-amber-100 outline-1 active bg-slate-500 hover:bg-slate-400  text-white rounded-lg"> </button>'),_r=(p,a,e,r)=>a(t(e),t(r)),br=I('<button class="flex-grow shadow-xl py-2 m-4	bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg"> </button>'),xr=I('<div><h4 class="bg-blue-900 py-2 px-4 rounded-t"> </h4> <div class="flex bg-gray-600 "></div></div>'),Ir=I('<h3 class="bg-blue-800  rounded-t py-5 px-4">default tier for new factories</h3> <!>',1);function yr(p,a){Pe(a,!1);const[e,r]=Ne(),n=()=>$(s,"$defaultTierReadable",e);let s=pe.defaultTier;n();const i=(d,h)=>{const u={...n(),[d]:h};localStorage.setItem("defaultTiers",JSON.stringify(u)),pe.defaultTier.set(u)};Et();var l=Ir(),m=f(ee(l),2);me(m,1,()=>Object.keys(n()),fe,(d,h)=>{var u=be(),b=ee(u);{var B=N=>{var v=xr(),x=c(v),y=c(x,!0);o(x);var P=f(x,2);me(P,5,()=>pe.availableTiers[t(h)],fe,(L,k)=>{var R=be(),w=ee(R);{var C=J=>{var T=gr();T.__click=[hr,i,h,k];var U=c(T,!0);o(T),M(()=>q(U,t(k))),g(J,T)},F=J=>{var T=br();T.__click=[_r,i,h,k];var U=c(T,!0);o(T),M(()=>q(U,t(k))),g(J,T)};Q(w,J=>{t(k)===n()[t(h)]?J(C):J(F,!1)})}g(L,R)}),o(P),o(v),M(()=>q(y,t(h))),g(N,v)};Q(b,N=>{var v;((v=pe.availableTiers[t(h)])==null?void 0:v.length)>1&&N(B)})}g(d,u)}),g(p,l),Te(),r()}je(["click"]);var $r=I('<div class="flex odd:bg-gray-950 gap-2 px-2"><span class="flex-grow"> </span> <span> </span> <em> </em></div>'),Br=I('<div class="max-w-sm flex flex-col mr-auto gap-0.5"><h4 class="px-4 py-2 bg-slate-800 rounded-t-lg">all required buildings</h4> <!></div>');function kr(p,a){Pe(a,!0);const[e,r]=Ne(),n=()=>$(m,"$itemId",e),s=()=>$(l,"$requiredBuildingsByRecipeId",e),i=()=>$(d,"$defaultTier",e);let{requiredBuildingsByRecipeId:l,itemId:m}=a.planner,{defaultTier:d}=pe;var h=Br(),u=f(c(h),2);Ve(u,n,b=>{var B=be(),N=ee(B);me(N,1,()=>Object.entries(s()),fe,(v,x)=>{var y=be();const P=z(()=>{const[R,w]=t(x);return{recipeId:R,requiredBuildings:w}});var L=ee(y);{var k=R=>{var w=$r();const C=z(()=>_.recipe[Number(t(P).recipeId)]),F=z(()=>i()[t(C).Type]/t(C).TimeSpend),J=z(()=>t(C).ResultCounts.reduce((W,ne)=>ne+W,0)),T=z(()=>t(P).requiredBuildings*t(F)*t(J)*60);var U=c(w),Y=c(U,!0);o(U);var G=f(U,2),se=c(G,!0);o(G);var oe=f(G,2),H=c(oe);o(oe),o(w),M(()=>{var W;q(Y,((W=t(C))==null?void 0:W.Name)??"recipe"+t(P).recipeId),q(se,t(P).requiredBuildings),q(H,`${t(T)??""}/s`)}),g(R,w)};Q(L,R=>{t(P).recipeId&&R(k)})}g(v,y)}),g(b,B)}),o(h),g(p,h),Te(),r()}var wr=(p,a)=>a(),Pr=(p,a)=>ce(a,!1),Tr=I('<dialog open class="max-w-2xl w-full h-full max-h-10/12 mx-auto top-1/12 bg-gray-950 z-50 md:px-5 text-amber-50 flex flex-col py-4 gap-2"><!> <span class="flex-grow"></span> <button class="bg-green-800 hover:bg-green-700 w-full py-1">apply to existing</button> <button class="bg-green-800 hover:bg-green-700 w-full py-1">apply to future</button></dialog>'),qr=(p,a)=>t(a).setInterval(0),Rr=(p,a,e)=>t(a).setInterval(e),Sr=(p,a)=>t(a).setInterval(60),Er=I("<button>Second</button>"),Nr=(p,a)=>ce(a,!0),Ar=I(`<!> <div class="flex gap-12"><div class="max-w-sm lg:block hidden max-h-screen  ml-auto overflow-y-auto"><!></div> <div class="max-w-2xl w-full lg:mx-0 mx-auto"><div class="flex  text-sm py-1"><span class="px-3 py-1 bg-slate-800 rounded-r-lg">Items per <span class="inline-flex"><button> </button> <button>Minute</button> <!></span></span> <span class="px-3 py-3 flex-grow text-right"></span> <button class="px-3 py-3 bg-slate-800 hover:bg-slate-700 rounded-l-lg">⚙️
				Required Fabs to Process
				Items</button></div> <!></div> <!></div>`,1);function Qr(p,a){Pe(a,!0);const[e,r]=Ne(),n=()=>$(m,"$defaultTier",e),s=()=>$(t(b),"$timeSpendChanged",e),i=()=>$(t(h),"$targetInterval",e),l=()=>$(t(u),"$timeSpend",e);let{defaultTier:m}=pe,d=z(()=>new ze(a.data.recipeId,void 0,void 0,void 0,void 0,a.data.depth,a.data.targetAmount)),h=z(()=>t(d).targetInterval),u=z(()=>t(d).timeSpend),b=z(()=>t(d).timeSpendChanged);const B=60*60;let N=we(!1);const v=S=>{S||(S=t(d));const X=ke(S.recipe);if(X){const Z=X.Type,ue=n()[Z];S.tier.set(ue)}ke(S.children).forEach(Z=>v(Z)),ce(N,!1)};var x=Ar(),y=ee(x);{var P=S=>{var X=Tr(),Z=c(X);yr(Z,{});var ue=f(Z,4);ue.__click=[wr,v];var he=f(ue,2);he.__click=[Pr,N],o(X),g(S,X)};Q(y,S=>{t(N)&&S(P)})}var L=f(y,2),k=c(L),R=c(k);fr(R,{}),o(k);var w=f(k,2),C=c(w),F=c(C),J=f(c(F)),T=c(J);let U;T.__click=[qr,d];var Y=c(T);o(T);var G=f(T,2);let se;G.__click=[Rr,d,B];var oe=f(G,2);{var H=S=>{var X=Er();let Z;X.__click=[Sr,d],M(ue=>Z=Ee(X,1,"px-1.5 py-2 multi hover:bg-slate-700",null,Z,ue),[()=>({active:i()===60})]),g(S,X)};Q(oe,S=>{l()!==60&&S(H)})}o(J),o(F);var W=f(F,4);W.__click=[Nr,N],o(C);var ne=f(C,2);Ve(ne,()=>t(d),S=>{at(S,{get planner(){return t(d)}})}),o(w);var ge=f(w,2);Ve(ge,()=>t(d),S=>{kr(S,{get planner(){return t(d)}})}),o(L),M((S,X,Z)=>{U=Ee(T,1,"px-1.5 py-2 multi hover:bg-slate-700",null,U,S),q(Y,`Cycle (${X??""}s)`),se=Ee(G,1,"px-1.5 py-2 multi hover:bg-slate-700",null,se,Z)},[()=>({"animate-flash":s(),active:i()===l()}),()=>Math.round(l()/60*100)/100,()=>({active:i()===B})]),g(p,x),Te(),r()}je(["click"]);export{Qr as component,Kr as universal};
