var yt=Object.defineProperty;var kt=(c,r,t)=>r in c?yt(c,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[r]=t;var J=(c,r,t)=>kt(c,typeof r!="symbol"?r+"":r,t);import{c as Ne,t as I,a as g,b as Le}from"../chunks/BmHjAyxW.js";import{au as Bt,aH as wt,X as Pt,z as Rt,A as Qe,B as Tt,K as $t,J as qt,L as St,U as Et,p as Pe,f as ne,t as D,g as e,e as y,a as Re,b as _e,s as v,c as d,r as o,h as oe,M as ct,aI as Nt}from"../chunks/B-82rzdC.js";import{d as Ve,s as U,a as At}from"../chunks/D897dbaB.js";import{i as V}from"../chunks/BfA0D6Yw.js";import{s as Je,r as it,b as ut,L as nt}from"../chunks/h91-G9kU.js";import{t as Ot,s as be,c as lt,b as Ct,o as at}from"../chunks/C3CEGPiq.js";import{s as ze,a as A}from"../chunks/D2GXNv7x.js";import{D as x,e as xe,i as Ie,I as Mt}from"../chunks/gwZSL3j3.js";import{w as Be,d as X,g as De}from"../chunks/DWHFLt1U.js";import{a as ot}from"../chunks/TWcBZear.js";import{p as st}from"../chunks/Cg9itU8Q.js";function Ue(c,r,t){Qe&&Tt();var a=c,s=Et,n,i=Bt()?wt:Pt;Rt(()=>{i(s,s=r())&&(n&&$t(n),n=qt(()=>t(a)))}),Qe&&(a=St)}function Ze(c,r,t,a){var s=c.__style;if(Qe||s!==r){var n=Ot(r);(!Qe||n!==c.getAttribute("style"))&&(n==null?c.removeAttribute("style"):c.style.cssText=n),c.__style=r}return a}const jt=!1,Dt=({params:c,url:r})=>{const{id:t}=c,a=Number(t),s=r.searchParams.get("depth"),n=r.searchParams.get("targetAmount");return{recipeId:a,depth:s&&parseInt(s)||1,targetAmount:n&&parseInt(n)||1}},pa=Object.freeze(Object.defineProperty({__proto__:null,load:Dt,prerender:jt},Symbol.toStringTag,{value:"Module"})),Vt=()=>{const c=localStorage==null?void 0:localStorage.getItem("defaultTiers");if(c){const r=JSON.parse(c);return Be(r)}},ue={defaultTier:Vt()??Be({Smelt:1,Assemble:.75,Research:1,Chemical:1,Refine:1,Particle:1,Fractionate:1,Proliferator:1}),availableTiers:{Smelt:[1,2,3],Assemble:[.75,1,1.5,3],Research:[1],Refine:[1],Chemical:[1,2],Particle:[1],Fractionate:[1],Proliferator:[.125,.2,.25]},factoryItems:{Smelt:{1:2302,2:2315,3:2319},Assemble:{.75:2303,1:2304,1.5:2305,3:2318},Research:{1:2901,2:2902},Chemical:{1:2309,2:2317},Refine:{1:2308},Particle:{1:2310},Fractionate:{1:2314},Proliferator:{.125:1141,.2:1142,.25:1143}}};class zt{constructor(r,t,a,s,n,i,l){this.recipeId=r,this.itemId=t,this.targetAmount=a,this.targetInterval=s,this.tier=n,this.proliferator=i,this.timeSpend=l}}const je=(c,r)=>{const t={...c};return Object.entries(r).forEach(([a,s])=>{const n=Number(a);t[n]=(t[n]??0)+s}),t};class We extends zt{constructor(t,a,s,n,i=0,l=1,u){var G;const m=!!(a&&(x.canBeExtracted[a]||x.canBeMined[a]));!t&&!m&&(t=(G=x.alternativeRecipe[a])==null?void 0:G[0]);const p=Be(t),f=t?x.recipe[t]:void 0;let b=f==null?void 0:f.Results.findIndex(S=>a===S);const B=!a;!a&&(b??-1)>=0&&(a=f==null?void 0:f.Results[b??0]);const O=Be(a),h=Be((f==null?void 0:f.ResultCounts[b??0])??u??1),_=s?X([O,s],([S,Z])=>Z[S]):h,k=Be(f!=null&&f.Type?De(ue.defaultTier)[f.Type]:1),R=Be(De(ue.defaultTier).Proliferator),F=Be(0),w=X([p,k],([S,Z])=>{var T;return((T=x.recipe[S])==null?void 0:T.TimeSpend)/Z});n||(n=X([F,w],([S,Z])=>S>0?S:Z));super(p,O,_,n,k,R,w);J(this,"amountEditable");J(this,"manualAmount",Be());J(this,"manualInterval");J(this,"children",Be([]));J(this,"canBeMined",X(this.itemId,t=>x.canBeMined[t]));J(this,"canBeExtracted",X(this.itemId,t=>x.canBeExtracted[t]));J(this,"item",X(this.itemId,t=>x.item[t]));J(this,"recipe",X(this.recipeId,t=>x.recipe[t]));J(this,"header",X([this.itemId,this.recipe],([t,a])=>{var u;const s=t??((u=a==null?void 0:a.Results)==null?void 0:u[0]);if(!s)return;const n=x.item[s],i=n.IconPath.split("/"),l=i[i.length-1];return l&&[ot+`/dsp_sprites/${l}.png`,n.Name]}));J(this,"options",X(this.itemId,t=>x.alternativeRecipe[t]));J(this,"timeSpendChanged",X(this.timeSpend,(t,a)=>{a(!!t);const s=setTimeout(()=>a(!t),1400);return()=>clearTimeout(s)}));J(this,"relativeSpeed",X([this.targetInterval,this.timeSpend],([t,a])=>t/a));J(this,"requiredBuildings",X([this.targetAmount,this.recipe,this.itemId,this.relativeSpeed,this.proliferator],([t,a,s,n,i])=>{const l=a==null?void 0:a.Results.findIndex(m=>s===m),u=t/(a==null?void 0:a.ResultCounts[l])/n;return isNaN(u)?t:u}));J(this,"providedItemsPerInterval",X([this.recipe,this.relativeSpeed,this.requiredBuildings,this.itemId,this.targetAmount],([t,a,s,n,i])=>{if(!t&&n&&(x.canBeMined[n]||x.canBeExtracted[n]))return{[n]:i};const l={};return t==null||t.Results.forEach((u,m)=>{l[u]=t.ResultCounts[m]*a*s}),l}));J(this,"childrenProvideItemsPerInterval",X(this.children,(t,a)=>{const s=new Array(t.length),n=t.map((l,u)=>l.providedItemsPerInterval.subscribe(m=>{s[u]=m;const p=s.filter(f=>!!f).reduce((f,b)=>je(f,b),{});a(p)})),i=s.filter(l=>!!l).reduce((l,u)=>je(l,u),{});return a(i),()=>n.forEach(l=>l())}));J(this,"requiredBuildingsByRecipeId",X([this.children,this.recipeId,this.requiredBuildings],([t,a,s],n)=>{const i=new Array(t.length),l=t.map((m,p)=>m.requiredBuildingsByRecipeId.subscribe(f=>{i[p]=f;const b=i.filter(B=>!!B).reduce((B,O)=>je(B,O),{});if(a){const B=a;b[B]=(b[B]??0)+s}n(b)})),u=i.filter(m=>!!m).reduce((m,p)=>je(m,p),{});if(a){const m=a;u[m]=(u[m]??0)+s}return n(u),()=>l.forEach(m=>m())}));J(this,"fabsByType",X(this.requiredBuildingsByRecipeId,t=>Object.entries(t).reduce((a,[s,n])=>{const i=Number(s),l=x.recipe[i].Type;return a[l]=(a[l]??0)+Math.ceil(n),a},{})));J(this,"childrenByItemId",X(this.children,(t,a)=>{const s=new Array(t.length),n=t.map((l,u)=>l.itemId.subscribe(m=>{s[u]=[m,l];const p=s.filter(f=>!!f).reduce((f,[b,B])=>(f[b]=B,f),{});a(p)})),i=s.filter(l=>!!l).reduce((l,[u,m])=>(l[u]=m,l),{});return a(i),()=>n.forEach(l=>l())}));J(this,"requiredItemsPerInterval",X([this.recipe,this.relativeSpeed,this.requiredBuildings],([t,a,s])=>{const n={};return t==null||t.Items.forEach((i,l)=>n[i]=t.ItemCounts[l]*a*s),n}));J(this,"deficitRequiredItemsPerInterval",X([this.recipe,this.relativeSpeed,this.requiredBuildings],([t,a,s])=>{const n={};return t==null||t.Items.forEach((i,l)=>n[i]=-(t.ItemCounts[l]*a*s)),n}));J(this,"inputsOutputs",X([this.childrenProvideItemsPerInterval,this.requiredItemsPerInterval,this.providedItemsPerInterval],([t,a,s])=>{const n=new Set;return Object.keys(a).forEach(i=>{n.add(Number(i))}),Object.keys(t??{}).forEach(i=>{n.add(Number(i))}),Object.keys(s).forEach(i=>{n.add(Number(i))}),n}));J(this,"surplus",X([this.childrenProvideItemsPerInterval,this.requiredItemsPerInterval,this.providedItemsPerInterval,this.itemId],([t,a,s,n])=>{const i=je(t,s);return Object.entries(a).forEach(([l,u])=>i[Number(l)]=(i[Number(l)]??0)-u),Object.entries(i).filter(([,l])=>l<=0).forEach(([l])=>delete i[Number(l)]),i}));J(this,"deficit",X([this.childrenProvideItemsPerInterval,this.requiredItemsPerInterval],([t,a])=>{const s={...t};return Object.entries(a).forEach(([n,i])=>s[Number(n)]=(s[Number(n)]??0)-i),Object.entries(s).filter(([,n])=>n>=0).forEach(([n])=>delete s[Number(n)]),s}));J(this,"deficitByItemId",X([this.children,this.deficit,this.recipeId,this.itemId,this.targetAmount],([t,a,s,n,i],l)=>{const u=new Array(t.length),m=t.map((f,b)=>f.deficitByItemId.subscribe(B=>{u[b]=B;const O=u.filter(h=>!!h).reduce((h,_)=>je(h,_),s?a:{[n]:-i});l(O)})),p=u.filter(f=>!!f).reduce((f,b)=>je(f,b),s?a:{[n]:-i});return l(p),()=>m.forEach(f=>f())}));J(this,"totals",X([this.itemId,this.requiredBuildings,this.children],([t,a,s])=>{const n={};return n[t]=a,s.map(i=>i.totals).forEach(i=>{Object.entries(i).forEach(([l,u])=>{const m=Number(l);n[m]=(n[m]??0)+u})}),n}));this.depth=i,this.amountEditable=B,this.manualAmount=h,this.manualInterval=F,l>i&&this.children.set(this.dbd(l))}setAmount(t){this.manualAmount.set(t)}setRecipeId(t){this.recipeId.set(t),this.expand()}deleteChild(t){this.children.update(a=>{const s=a.findIndex(n=>De(n.itemId)===t);return a.splice(s,1),a})}setInterval(t){this.manualInterval.set(t)}expand(){this.children.set(this.dbd())}planFor(t){this.children.update(a=>(a.push(new We(void 0,t,this.requiredItemsPerInterval,this.targetInterval,this.depth+1)),a))}dbd(t){const a=[],s=De(this.recipe);return s==null||s.Items.forEach((n,i)=>{var m;if(!((m=x.alternativeRecipe[n])!=null&&m.length))return;const l=new We(void 0,n,this.requiredItemsPerInterval,this.targetInterval,this.depth+1,t);a.push(l);const u=De(l.providedItemsPerInterval);Object.entries(u).forEach(([p,f])=>{})}),a}}var Ft=I('<img class="h-6" alt="">');function we(c,r){Pe(r,!0);let t=y(()=>x.item[r.itemId]);const a=y(()=>{var u;return(u=e(t))==null?void 0:u.IconPath.split("/")}),s=y(()=>e(a)&&e(a)[e(a).length-1]),n=y(()=>e(s)&&ot+`/dsp_sprites/${e(s)}.png`);var i=Ne(),l=ne(i);Ue(l,()=>r.itemId,u=>{var m=Ft();D(()=>Je(m,"src",e(n))),g(u,m)}),g(c,i),Re()}var Lt=(c,r,t)=>r(e(t)),Jt=I("<button> <!></button>"),Ut=I('<div><span class="text-xs text-gray-400">Tier</span> <!></div>'),Gt=(c,r)=>oe(r,!0),Kt=I('<button class="text-center min-w-16 h-10 rounded-l-lg bg-slate-800 hover:bg-slate-600 py-2 px-3 flex justify-around items-end gap-2 relative "><span class="top-0 absolute left-0 scale-75 opacity-50"><!></span> <span class="text-xs text-gray-400 absolute top-0"> </span> <b class="bottom-0.5 absolute"> </b></button>');function Ht(c,r){Pe(r,!0);const[t,a]=ze(),s=()=>A(l,"$recipe",t),n=()=>A(u,"$tier",t),i=()=>A(m,"$requiredBuildings",t);let{recipe:l,tier:u,requiredBuildings:m}=r.planner,p=_e(!1);const f=_=>{r.planner.tier.set(_),oe(p,!1)};var b=Ne(),B=ne(b);{var O=_=>{var k=Ut(),R=v(d(k),2);xe(R,1,()=>ue.availableTiers[s().Type],Ie,(F,w)=>{var G=Jt();let S;G.__click=[Lt,f,w];var Z=d(G),T=v(Z);we(T,{get itemId(){var K;return ue.factoryItems[(K=s())==null?void 0:K.Type][e(w)]}}),o(G),D(K=>{S=be(G,1,"px-2 py-1 outline-slate-600 hover:bg-slate-600 text-sm  rounded",null,S,K),U(Z,`${e(w)??""} `)},[()=>({"outline-1":e(w)===n(),active:e(w)===n()})]),g(F,G)}),o(k),g(_,k)},h=_=>{var k=Kt();k.__click=[Gt,p];var R=d(k),F=d(R);we(F,{get itemId(){var T;return ue.factoryItems[(T=s())==null?void 0:T.Type][n()]}}),o(R);var w=v(R,2),G=d(w);o(w);var S=v(w,2),Z=d(S,!0);o(S),o(k),D(T=>{U(G,`tier ${n()??""}`),U(Z,T)},[()=>Math.round(i()*100)/100]),g(_,k)};V(B,_=>{e(p)?_(O):_(h,!1)})}g(c,b),Re(),a()}Ve(["click"]);var Xt=I('<div class="flex gap-1 relative"><span class="absolute w-full text-center top-0 backdrop-brightness-85"> </span> <!></div>');function pt(c,r){const t=i=>{switch(!0){case i<=6:return[[2001,1]];case i<=12:return[[2002,1]];case i<=30:return[[2003,1]];default:const l=Math.ceil(Math.ceil(i)/30),u=Math.ceil(l/4);return[[2014,u>1?4:l],[2003,u]]}};let a=y(()=>t(r.outputs));var s=Ne(),n=ne(s);xe(n,17,()=>e(a),Ie,(i,l)=>{var u=Ne(),m=ne(u);{var p=f=>{var b=Xt(),B=d(b),O=d(B,!0);o(B);var h=v(B,2);we(h,{get itemId(){return e(l)[0]}}),o(b),D(()=>U(O,e(l)[1])),g(f,b)};V(m,f=>{e(l)[1]>0&&f(p)})}g(i,u)}),g(c,s)}var Zt=(c,r)=>oe(r,!e(r)),Qt=I('<button class="flex  odd:bg-gray-950 gap-2 px-2 items-center hover:bg-gray-700 w-full group "><span><!></span> <span class="w-14 text-right"> </span> <span class="text-slate-300 text-xs">x</span> <span> </span> <span class="text-slate-400 text-xs "> </span> <em class="text-right flex-grow"> </em> <div class="flex w-18 justify-end gap-1"><!></div></button>');function Wt(c,r){Pe(r,!0);const[t,a]=ze(),s=()=>A(n,"$defaultTier",t);let{defaultTier:n}=ue,i=_e(!0),l=y(()=>x.recipe[Number(r.recipeId)]),u=y(()=>s()[e(l).Type]/e(l).TimeSpend),m=y(()=>e(l).ResultCounts.reduce(($,E)=>E+$,0)),p=y(()=>r.requiredBuildings*e(u)*e(m)*60/(e(i)?r.devisor:1)),f=y(()=>Math.round(e(p)*100)/100);var b=Qt();b.__click=[Zt,i];var B=d(b);let O;var h=d(B);{var _=$=>{var E=Le("🔓");g($,E)},k=$=>{var E=Le("🔒");g($,E)};V(h,$=>{e(i)?$(_):$(k,!1)})}o(B);var R=v(B,2),F=d(R,!0);o(R);var w=v(R,4),G=d(w,!0);o(w);var S=v(w,2),Z=d(S);o(S);var T=v(S,2),K=d(T);o(T);var de=v(T,2),W=d(de);pt(W,{get outputs(){return e(p)}}),o(de),o(b),D(($,E)=>{var se;O=be(B,1,"w-4 group-hover:opacity-100",null,O,$),U(F,E),U(G,((se=e(l))==null?void 0:se.Name)??"recipe"+r.recipeId),U(Z,`tier ${s()[e(l).Type]??""}`),U(K,`${e(f)??""}/s`)},[()=>({"opacity-0":e(i)}),()=>Math.round(r.requiredBuildings/(e(i)?r.devisor:1)*100)/100]),g(c,b),Re(),a()}Ve(["click"]);var Yt=I('<div class="flex gap-4 hover:bg-gray-700"><span> </span> <span class="text-right flex-grow"> </span></div>'),er=I('<div class="flex gap-4 hover:bg-gray-700 px-1"><span> </span></div>'),tr=I('<div><h3 class="bg-blue-800 py-2 px-4  text-center "><input type="number"> <span class="text-xs text-slate-400">x</span> <span class="w-14 text-right"> </span> <span class="text-xs text-slate-400">x</span> <span> </span></h3> <h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">Buildings</h5> <div class="mb-4 my-4 mx-auto  grid grid-cols-2 gap-x-8 justify-center px-0.5"></div> <h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">Recipes</h5> <!> <h5 class="bg-blue-900 text-center py-1 px-4 mt-4 mb-2">ingress</h5> <div class="mx-auto  grid grid-cols-2 gap-x-8 justify-center px-0.5"></div></div>');function rr(c,r){Pe(r,!0);const[t,a]=ze(),s=()=>A(b,"$requiredBuildings",t),n=()=>A(f,"$recipe",t),i=()=>A(p,"$fabsByType",t),l=()=>A(m,"$requiredBuildingsByRecipeId",t),u=()=>A(B,"$deficitByItemId",t);let{requiredBuildingsByRecipeId:m,fabsByType:p,recipe:f,requiredBuildings:b,deficitByItemId:B}=r.planner,O=_e(1),h=y(()=>!e(O)||isNaN(e(O))?1:e(O)),_=y(()=>Math.ceil(s()/e(h)));var k=tr(),R=d(k),F=d(R);it(F);var w=v(F,4),G=d(w,!0);o(w);var S=v(w,4),Z=d(S,!0);o(S),o(R);var T=v(R,4);xe(T,5,()=>Object.entries(i()),Ie,(W,$)=>{var E=Yt();const se=y(()=>{const[pe,ye]=e($);return{fabType:pe,requiredFabs:ye}});var L=d(E),ie=d(L,!0);o(L);var z=v(L,2),ve=d(z,!0);o(z),o(E),D(pe=>{U(ie,e(se).fabType),U(ve,pe)},[()=>Math.ceil(e(se).requiredFabs/e(h))]),g(W,E)}),o(T);var K=v(T,4);xe(K,1,()=>Object.entries(l()??{}),Ie,(W,$,E,se)=>{const L=y(()=>{const[ie,z]=e($);return{recipeId:ie,requiredBuildings:z}});Wt(W,{get recipeId(){return e(L).recipeId},get requiredBuildings(){return e(L).requiredBuildings},get devisor(){return e(h)}})});var de=v(K,4);xe(de,5,()=>Object.entries(u()),Ie,(W,$)=>{var E=er();const se=y(()=>{const[z]=e($);return{itemId:z}});var L=d(E),ie=d(L,!0);o(L),o(E),D(()=>U(ie,x.item[e(se).itemId].Name)),g(W,E)}),o(de),o(k),D(()=>{U(G,e(_)),U(Z,n().Name)}),lt(F,()=>e(O),W=>oe(O,W)),g(c,k),Re(),a()}var ar=I('<img class="h-6" alt="">');function vt(c,r){Pe(r,!0);const t=y(()=>r.filename.split("/")),a=y(()=>e(t)&&e(t)[e(t).length-1]),s=y(()=>e(a)&&ot+`/dsp_sprites/${e(a)}.png`);var n=ar();D(()=>Je(n,"src",e(s))),g(c,n),Re()}var nr=(c,r)=>oe(r,!1),sr=(c,r)=>oe(r,!1),ir=I('<dialog open class="max-w-2xl w-full h-full max-h-10/12 mx-auto top-1/12 bg-gray-950 z-50 md:px-5 text-amber-50 flex flex-col py-4 gap-2 fixed "><!> <button class="bg-green-800 hover:bg-green-700 py-2 rounded-xl mt-auto">close</button></dialog> <button class="fixed overscroll-contain w-screen h-screen backdrop-blur-2xl bg-black opacity-70 top-0 left-0 z-40" aria-label="close"></button>',1),lr=(c,r)=>{var t;return(t=r.deletecb)==null?void 0:t.call(r)},or=I(`<style scoped="">input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
              /* display: none; <- Crashes Chrome on hover */
              -webkit-appearance: none;
              margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
          }

          input[type=number] {
              -moz-appearance: textfield;
          }</style> <label class="flex items-center pl-2 gap-1"><!> <input type="number" class="text-left rounded-r-lg w-16 outline-none"></label>`,1),dr=I('<div class="flex items-center"><span class="pl-2">🗑️</span>️ <!> <span class="text-sm py-2 block pr-4"> </span></div>'),cr=I("<option><!> </option>"),ur=I("<option> </option>"),vr=I('<a class="bg-gray-800 hover:bg-slate-700">➡️</a>'),pr=I('<select class="my-1 truncate contain-content"><!><!></select> <!>',1),fr=I('<a class="bg-gray-800 hover:bg-slate-700">➡️</a>'),gr=(c,r)=>oe(r,!0),mr=I('<button class="py-1 rounded-xl px-4 bg-slate-800 hover:bg-slate-700">🔎</button>'),hr=I('<span class="flex-grow"> <!></span> <!>',1),_r=I('<div class="ml-auto"><!></div>'),br=(c,r,t,a)=>{var s;return e(r)<0&&((s=x.producedVia[e(t)])==null?void 0:s.length)>0&&a.planner.planFor(e(t))},xr=I('<div class="flex items-center"><span class="pl-2">📝</span>️ <!> <span class="text-sm py-2 block pr-4"> </span></div>'),Ir=I('<div class="flex items-center"><span class="px-3.5"></span>️ <!> <span class="text-sm py-2 block pr-4"> </span></div>'),yr=I("<div><!></div>"),kr=I('<div class="flex gap-2 hover:bg-gray-700"><button><!></button> <!></div>'),Br=I('<div class="flex flex-col gap-0.5 "></div>'),wr=I('<!> <div class="flex gap-1 max-w-2xl items-center hover:bg-gray-700  flex-wrap @container"><button><!></button> <div class="flex-grow px-4 "><div class="flex items-center gap-4"><!></div></div> <!></div> <!>',1);function ft(c,r){Pe(r,!0);const[t,a]=ze(),s=()=>A(T,"$targetAmount",t),n=()=>A(w,"$recipeId",t),i=()=>A(F,"$recipe",t),l=()=>A(R,"$itemId",t),u=()=>A(E,"$options",t),m=()=>A(k,"$item",t),p=()=>A(G,"$requiredBuildings",t),f=()=>A(S,"$children",t),b=()=>A($,"$inputsOutputs",t),B=()=>A(de,"$providedItemsPerInterval",t),O=()=>A(K,"$childrenProvideItemsPerInterval",t),h=()=>A(W,"$requiredItemsPerInterval",t),_=()=>A(Z,"$childrenByItemId",t);let{item:k,itemId:R,recipe:F,recipeId:w,requiredBuildings:G,children:S,childrenByItemId:Z,targetAmount:T,childrenProvideItemsPerInterval:K,providedItemsPerInterval:de,requiredItemsPerInterval:W,inputsOutputs:$,options:E,header:se}=r.planner,L=_e(st(s())),ie=_e(st(n())),z=_e(!1);ct(()=>{r.planner.amountEditable&&s()!==e(L)&&r.planner.setAmount(e(L))}),ct(()=>{e(ie)!==n()&&r.planner.setRecipeId(e(ie))});var ve=wr(),pe=ne(ve);{var ye=j=>{var C=ir(),H=ne(C),N=d(H);rr(N,{get planner(){return r.planner}});var me=v(N,2);me.__click=[nr,z],o(H);var Y=v(H,2);Y.__click=[sr,z],g(j,C)};V(pe,j=>{e(z)&&j(ye)})}var Te=v(pe,2),q=d(Te);q.__click=[lr,r];let re;var le=d(q);{var fe=j=>{var C=or(),H=v(ne(C),2),N=d(H);{var me=Q=>{vt(Q,{get filename(){return i().IconPath}})},Y=Q=>{const P=y(()=>{var M,ee;return(ee=(M=i())==null?void 0:M.Results)==null?void 0:ee[0]});we(Q,{get itemId(){return e(P)}})};V(N,Q=>{var P;(P=i())!=null&&P.IconPath?Q(me):Q(Y,!1)})}var he=v(N,2);it(he),o(H),lt(he,()=>e(L),Q=>oe(L,Q)),g(j,C)},Oe=j=>{var C=dr(),H=v(d(C),2);{var N=Q=>{vt(Q,{get filename(){return i().IconPath}})},me=Q=>{we(Q,{get itemId(){return l()}})};V(H,Q=>{var P;(P=i())!=null&&P.IconPath?Q(N):Q(me,!1)})}var Y=v(H,2),he=d(Y,!0);o(Y),o(C),D(Q=>{Ze(Y,`padding-left: ${r.planner.depth*1.1}rem`),U(he,Q)},[()=>Math.round(s()*100)/100]),g(j,C)};V(le,j=>{r.planner.amountEditable?j(fe):j(Oe,!1)})}o(q);var ae=v(q,2),te=d(ae),$e=d(te);{var qe=j=>{var C=pr(),H=ne(C),N=d(H);{var me=P=>{var M=cr();M.value=(M.__value=void 0)==null?"":void 0;var ee=d(M);{var Fe=ke=>{var Se=Le("orbital collector");g(ke,Se)},Ke=ke=>{var Se=Le("mining");g(ke,Se)};V(ee,ke=>{x.canBeExtracted[l()]?ke(Fe):ke(Ke,!1)})}var Ae=v(ee);o(M),D(()=>{ut(M,n()===void 0),U(Ae,` (${m().Name??""})`)}),g(P,M)};V(N,P=>{(x.canBeExtracted[l()]||x.canBeMined[l()])&&P(me)})}var Y=v(N);xe(Y,1,u,Ie,(P,M)=>{var ee=ur(),Fe={},Ke=d(ee,!0);o(ee),D(()=>{Fe!==(Fe=x.recipe[e(M)].ID)&&(ee.value=(ee.__value=x.recipe[e(M)].ID)==null?"":x.recipe[e(M)].ID),ut(ee,n()===x.recipe[e(M)].ID),U(Ke,x.recipe[e(M)].Name)}),g(P,ee)}),o(H);var he=v(H,2);{var Q=P=>{var M=vr();D(ee=>Je(M,"href",ee),[()=>nt.recipe(i().ID)+"?targetAmount="+Math.round(p())+"&depth=10"]),g(P,M)};V(he,P=>{!r.planner.amountEditable&&i()&&P(Q)})}Ct(H,()=>e(ie),P=>oe(ie,P)),g(j,C)},Ye=j=>{var C=hr(),H=ne(C),N=d(H),me=v(N);{var Y=P=>{var M=fr();D(ee=>Je(M,"href",ee),[()=>nt.recipe(i().ID)+"?targetAmount="+Math.round(p())+"&depth=10"]),g(P,M)};V(me,P=>{r.planner.amountEditable||P(Y)})}o(H);var he=v(H,2);{var Q=P=>{var M=mr();M.__click=[gr,z],g(P,M)};V(he,P=>{f().length>1&&!r.planner.amountEditable&&P(Q)})}D(()=>{var P;return U(N,`${((P=i())==null?void 0:P.Name)??""} `)}),g(j,C)};V($e,j=>{l()&&(u().length>1||u().length>=1&&x.canBeExtracted[l()]||x.canBeMined[l()])?j(qe):j(Ye,!1)})}o(te),o(ae);var Ge=v(ae,2);{var et=j=>{var C=_r(),H=d(C);Ht(H,{get planner(){return r.planner}}),o(C),g(j,C)};V(Ge,j=>{p()&&n()&&j(et)})}o(Te);var He=v(Te,2);{var tt=j=>{var C=Br();xe(C,5,b,Ie,(H,N)=>{var me=Ne();const Y=y(()=>{var P,M,ee;return(((P=B())==null?void 0:P[e(N)])??0)+(((M=O())==null?void 0:M[e(N)])??0)-(((ee=h())==null?void 0:ee[e(N)])??0)}),he=y(()=>_()[e(N)]);var Q=ne(me);Ue(Q,()=>e(N),P=>{var M=Ne(),ee=ne(M);{var Fe=Ae=>{ft(Ae,{get planner(){return e(he)},deletecb:()=>r.planner.deleteChild(e(N))})},Ke=Ae=>{var ke=kr(),Se=d(ke);let dt;Se.__click=[br,Y,N,r];var gt=d(Se);{var mt=ce=>{var ge=xr(),Ce=v(d(ge),2);we(Ce,{get itemId(){return e(N)}});var Ee=v(Ce,2),Me=d(Ee,!0);o(Ee),o(ge),D(Xe=>{Ze(Ee,`padding-left: ${(r.planner.depth+.5)*1.1}rem`),U(Me,Xe)},[()=>Math.round(e(Y)*100)/100]),g(ce,ge)},ht=(ce,ge)=>{{var Ce=Ee=>{var Me=Ir(),Xe=v(d(Me),2);we(Xe,{get itemId(){return e(N)}});var rt=v(Xe,2),xt=d(rt,!0);o(rt),o(Me),D(It=>{Ze(rt,`padding-left: ${(r.planner.depth+.5)*1.1}rem`),U(xt,It)},[()=>Math.round(e(Y)*100)/100]),g(Ee,Me)};V(ce,Ee=>{e(N)!==l()&&e(Y)!==0&&Ee(Ce)},ge)}};V(gt,ce=>{var ge;e(Y)<0&&((ge=x.producedVia[e(N)])==null?void 0:ge.length)>0?ce(mt):ce(ht,!1)})}o(Se);var _t=v(Se,2);{var bt=ce=>{var ge=yr();let Ce;var Ee=d(ge);Mt(Ee,{get itemId(){return e(N)}}),o(ge),D(Me=>Ce=be(ge,1,"flex gap-2 items-center ",null,Ce,Me),[()=>({"text-green-500":e(Y)>0,"text-red-500":e(Y)<0})]),g(ce,ge)};V(_t,ce=>{e(N)!==l()&&e(Y)!==0&&ce(bt)})}o(ke),D(ce=>dt=be(Se,1,"bg-slate-800  text-center rounded-r-lg",null,dt,ce),[()=>{var ce;return{"hover:bg-green-800":e(Y)<0&&((ce=x.producedVia[e(N)])==null?void 0:ce.length)>0}}]),g(Ae,ke)};V(ee,Ae=>{e(he)?Ae(Fe):Ae(Ke,!1)})}g(P,M)}),g(H,me)}),o(C),g(j,C)};V(He,j=>{var C;((C=b())==null?void 0:C.size)>0&&j(tt)})}D(j=>re=be(q,1,"bg-slate-800  text-center rounded-r-lg  outline-slate-500",null,re,j),[()=>({"hover:bg-red-700":!r.planner.amountEditable,"outline-1":r.planner.amountEditable})]),g(c,ve),Re(),a()}Ve(["click"]);var Pr=I('<div class="flex flex-col items-stretch group w-full "><a class="my-2 z-30 hover:bg-slate-700 w-xs"> </a></div>'),Rr=I('<div class="flex gap-0.5 flex-col mb-4 sticky top-0 mr-2 backdrop-blur-3xl backdrop-opacity-75  z-40"><!> <label for="recipeName">ingredient or recipe name</label><input id="recipeName"></div> <!>',1);function Tr(c,r){Pe(r,!0);let t=_e(st([])),a=at(),s=at(),n=at(),i=_e(""),l=y(()=>e(i)?x.items.filter(h=>h.Name.toLowerCase().includes(e(i).toLowerCase())).map(h=>h.ID):[]),u=y(()=>(()=>{const h=new Set;return e(l).forEach(_=>{for(const k of x.relatedRecipes[_]??[])h.add(k)}),h})()),m=y(()=>x.recipees.filter(h=>e(t).length>0?e(t).includes(h.Type):!0).filter(h=>e(i)?e(u).has(h.ID):!0).filter(h=>a.checked===null?!0:a.checked?x.buildableRecipees.has(h.ID):!x.buildableRecipees.has(h.ID)).filter(h=>s.checked===null?!0:s.checked?x.fluidRecipees.has(h.ID):!x.fluidRecipees.has(h.ID)).filter(h=>n.checked===null?!0:n.checked?x.entityRecipees.has(h.ID):!x.entityRecipees.has(h.ID)));new Set(x.recipees.map(h=>h.Type));var p=Rr(),f=ne(p),b=d(f);V(b,h=>{});var B=v(b,3);it(B),o(f);var O=v(f,2);xe(O,17,()=>e(m),Ie,(h,_)=>{var k=Pr(),R=d(k),F=d(R,!0);o(R),o(k),D(w=>{Je(R,"href",w),U(F,e(_).Name)},[()=>nt.recipe(e(_).ID)]),g(h,k)}),lt(B,()=>e(i),h=>oe(i,h)),g(c,p),Re()}Ve(["click"]);var $r=(c,r)=>oe(r,!e(r)),qr=(c,r,t,a)=>r(e(t),e(a)),Sr=I("<button><!> <span> </span></button>"),Er=I('<div><h4 class="bg-blue-900 py-2 px-4 rounded-t"> </h4> <div class="flex bg-gray-600 "></div></div>'),Nr=I("<div></div> <!>",1),Ar=I(`<button class="bg-blue-800 hover:bg-blue-700 hover:shadow-2xl  rounded-t py-5 px-4 flex">default tier for
	new factories <span class="ml-auto shadow-2xl"><!></span></button> <!>`,1);function Or(c,r){Pe(r,!0);const[t,a]=ze(),s=()=>A(n,"$defaultTierReadable",t);let n=ue.defaultTier;s();let i=_e(!1);const l=(_,k)=>{const R={...s(),[_]:k};localStorage.setItem("defaultTiers",JSON.stringify(R)),ue.defaultTier.set(R)};var u=Ar(),m=ne(u);m.__click=[$r,i];var p=v(d(m)),f=d(p);{var b=_=>{var k=Le("🔼");g(_,k)},B=_=>{var k=Le("🔽");g(_,k)};V(f,_=>{e(i)?_(b):_(B,!1)})}o(p),o(m);var O=v(m,2);{var h=_=>{var k=Nr(),R=v(ne(k),2);xe(R,1,()=>Object.keys(s()),Ie,(F,w)=>{var G=Ne(),S=ne(G);{var Z=T=>{var K=Er(),de=d(K),W=d(de,!0);o(de);var $=v(de,2);xe($,21,()=>ue.availableTiers[e(w)],Ie,(E,se)=>{var L=Sr();const ie=y(()=>ue.factoryItems[e(w)][e(se)]),z=y(()=>e(se)===s()[e(w)]);let ve;L.__click=[qr,l,w,se];var pe=d(L);we(pe,{get itemId(){return e(ie)}});var ye=v(pe,2),Te=d(ye,!0);o(ye),o(L),D(q=>{ve=be(L,1,"flex-grow shadow-xl py-2 m-4 flex items-center justify-center gap-2      rounded-lg",null,ve,q),U(Te,e(se))},[()=>({"outline-amber-100":e(z),"outline-1":e(z),active:e(z),"bg-slate-500":e(z),"hover:bg-slate-400":e(z),"text-white":e(z),"hover:bg-slate-700":!e(z),"text-gray-300":!e(z),"bg-slate-800":!e(z)})]),g(E,L)}),o($),o(K),D(()=>U(W,e(w))),g(T,K)};V(S,T=>{var K;((K=ue.availableTiers[e(w)])==null?void 0:K.length)>1&&T(Z)})}g(F,G)}),g(_,k)};V(O,_=>{e(i)&&_(h)})}g(c,u),Re(),a()}Ve(["click"]);var Cr=(c,r)=>oe(r,"bulidings"),Mr=(c,r)=>oe(r,"throughput"),jr=I('<div class="opacity-70 scale-90"><!></div>'),Dr=I('<div class="text-right justify-self-end relative w-16"><div class="absolute right-0 top-0 z-0"><!></div> <span class="w-full h-full text-right top-0 backdrop-brightness-75 z-40"> </span></div>'),Vr=I('<div class="odd:bg-gray-950 gap-3 px-2 flex "><div class="justify-self-center w-14 text-center relative p-0.5"><em class="absolute w-full h-full text-right left-0 top-0 backdrop-brightness-85 "> </em> <!></div> <span class="flex-grow"> </span> <!></div>'),zr=I('<div class="md:max-w-sm w-full flex flex-col mx-auto lg:ml-0 gap-0.5"><h4 class="px-4 py-2 bg-slate-800 rounded-t-lg flex items-center"><span class="flex-grow">required</span> <button>buildings</button> <button>conveyors</button></h4> <!></div>');function Fr(c,r){Pe(r,!0);const[t,a]=ze(),s=()=>A(u,"$itemId",t),n=()=>A(l,"$requiredBuildingsByRecipeId",t),i=()=>A(m,"$defaultTier",t);let{requiredBuildingsByRecipeId:l,itemId:u}=r.planner,{defaultTier:m}=ue,p=_e("bulidings");var f=zr(),b=d(f),B=v(d(b),2);let O;B.__click=[Cr,p];var h=v(B,2);let _;h.__click=[Mr,p],o(b);var k=v(b,2);Ue(k,s,R=>{var F=Ne(),w=ne(F);xe(w,1,()=>Object.entries(n()),Ie,(G,S)=>{var Z=Ne();const T=y(()=>{const[W,$]=e(S);return{recipeId:W,requiredBuildings:$}});var K=ne(Z);{var de=W=>{var $=Vr();const E=y(()=>x.recipe[Number(e(T).recipeId)]),se=y(()=>i()[e(E).Type]/e(E).TimeSpend),L=y(()=>e(E).ResultCounts.reduce((ae,te)=>te+ae,0)),ie=y(()=>e(T).requiredBuildings*e(se)*e(L)*60);var z=d($),ve=d(z),pe=d(ve);o(ve);var ye=v(ve,2);const Te=y(()=>{var ae,te;return(te=(ae=e(E))==null?void 0:ae.Results)==null?void 0:te[0]});we(ye,{get itemId(){return e(Te)}}),o(z);var q=v(z,2),re=d(q,!0);o(q);var le=v(q,2);{var fe=ae=>{var te=Dr();const $e=y(()=>String(Math.round(e(T).requiredBuildings*10)/10)),qe=y(()=>e($e).indexOf(".")),Ye=y(()=>e(qe)===-1?1:0);var Ge=d(te),et=d(Ge);Ue(et,i,j=>{var C=jr(),H=d(C);we(H,{get itemId(){var N;return ue.factoryItems[(N=e(E))==null?void 0:N.Type][i()[e(E).Type]]}}),o(C),g(j,C)}),o(Ge);var He=v(Ge,2),tt=d(He,!0);o(He),o(te),D(()=>{Ze(te,`padding-right: ${e(Ye)+.5}em`),U(tt,e($e))}),g(ae,te)},Oe=(ae,te)=>{{var $e=qe=>{pt(qe,{get outputs(){return e(ie)}})};V(ae,qe=>{e(p)==="throughput"&&qe($e)},te)}};V(le,ae=>{e(p)==="bulidings"?ae(fe):ae(Oe,!1)})}o($),D(ae=>{var te;U(pe,`${ae??""}/s`),U(re,((te=e(E))==null?void 0:te.Name)??"recipe"+e(T).recipeId)},[()=>Math.round(e(ie)*100)/100]),g(W,$)};V(K,W=>{e(T).recipeId&&W(de)})}g(G,Z)}),g(R,F)}),o(f),D((R,F)=>{O=be(B,1," px-4 py-2 rounded-l-lg  outline-gray-600",null,O,R),_=be(h,1,"hover:bg-slate-500 px-4 py-2  rounded-r-lg  outline-gray-600",null,_,F)},[()=>({"bg-blue-700":e(p)==="bulidings","bg-gray-700":e(p)!=="bulidings","hover:bg-blue-500":e(p)==="bulidings","hover:bg-gray-500":e(p)!=="bulidings"}),()=>({"bg-blue-700":e(p)==="throughput","bg-gray-700":e(p)!=="throughput","hover:bg-blue-500":e(p)==="throughput","hover:bg-gray-500":e(p)!=="throughput"})]),g(c,f),Re(),a()}Ve(["click"]);var Lr=I('<link rel="icon">'),Jr=(c,r)=>oe(r,!1),Ur=(c,r)=>oe(r,!1),Gr=(c,r)=>r(),Kr=(c,r)=>oe(r,!1),Hr=I('<button class="fixed overscroll-contain w-screen h-screen backdrop-blur-2xl bg-black opacity-70 top-0 left-0 z-40" aria-label="close"></button> <dialog open class="max-w-2xl w-full h-full max-h-10/12 mx-auto top-1/12 bg-gray-950 z-50 md:px-5 text-amber-50 flex flex-col py-4 gap-2 fixed outline-1 rounded-2xl outline-slate-600"><h6 class="flex items-center justify-between"><span>Factory Globals</span><button class="bg-slate-800 hover:bg-slate-700 w-12 py-2">✖️</button></h6> <!> <span class="flex-grow"></span> <button class="bg-green-800 hover:bg-green-700 w-full py-1">apply to existing</button> <button class="bg-green-800 hover:bg-green-700 w-full py-1">apply to future</button></dialog>',1),Xr=(c,r)=>e(r).setInterval(0),Zr=(c,r,t)=>e(r).setInterval(t),Qr=(c,r)=>e(r).setInterval(60),Wr=I("<button>Second</button>"),Yr=(c,r)=>oe(r,!0),ea=I(`<!> <div class="flex gap-12 flex-wrap lg:flex-nowrap"><div class="lg:max-w-sm lg:block hidden max-h-screen  ml-auto overflow-y-auto"><!></div> <div class="max-w-2xl w-full lg:mx-0 mx-auto"><div class="flex  text-sm py-1"><span class="px-3 py-1 bg-slate-800 rounded-r-lg">Items per <span class="inline-flex"><button> </button> <button>Minute</button> <!></span></span> <span class="px-3 py-3 flex-grow text-right"></span> <button class="px-3 py-3 bg-slate-800 hover:bg-slate-700 rounded-l-lg">⚙️
				Required Fabs to Process
				Items</button></div> <!></div> <!></div>`,1);function fa(c,r){Pe(r,!0);const[t,a]=ze(),s=()=>A(m,"$defaultTier",t),n=()=>A(e(O),"$header",t),i=()=>A(e(B),"$timeSpendChanged",t),l=()=>A(e(f),"$targetInterval",t),u=()=>A(e(b),"$timeSpend",t);let{defaultTier:m}=ue,p=y(()=>new We(r.data.recipeId,void 0,void 0,void 0,void 0,r.data.depth,r.data.targetAmount)),f=y(()=>e(p).targetInterval),b=y(()=>e(p).timeSpend),B=y(()=>e(p).timeSpendChanged),O=y(()=>e(p).header);const h=60*60;let _=_e(!1);const k=q=>{q||(q=e(p));const re=De(q.recipe);if(re){const le=re.Type,fe=s()[le];q.tier.set(fe)}De(q.children).forEach(le=>k(le)),oe(_,!1)};var R=ea();At(q=>{var re=Lr();D(()=>{var le,fe;Nt.title=(le=n())==null?void 0:le[1],Je(re,"href",(fe=n())==null?void 0:fe[0])}),g(q,re)});var F=ne(R);{var w=q=>{var re=Hr(),le=ne(re);le.__click=[Jr,_];var fe=v(le,2),Oe=d(fe),ae=v(d(Oe));ae.__click=[Ur,_],o(Oe);var te=v(Oe,2);Or(te,{});var $e=v(te,4);$e.__click=[Gr,k];var qe=v($e,2);qe.__click=[Kr,_],o(fe),g(q,re)};V(F,q=>{e(_)&&q(w)})}var G=v(F,2),S=d(G),Z=d(S);Tr(Z,{}),o(S);var T=v(S,2),K=d(T),de=d(K),W=v(d(de)),$=d(W);let E;$.__click=[Xr,p];var se=d($);o($);var L=v($,2);let ie;L.__click=[Zr,p,h];var z=v(L,2);{var ve=q=>{var re=Wr();let le;re.__click=[Qr,p],D(fe=>le=be(re,1,"px-1.5 py-2 multi hover:bg-slate-700",null,le,fe),[()=>({active:l()===60})]),g(q,re)};V(z,q=>{u()!==60&&q(ve)})}o(W),o(de);var pe=v(de,4);pe.__click=[Yr,_],o(K);var ye=v(K,2);Ue(ye,()=>e(p),q=>{ft(q,{get planner(){return e(p)}})}),o(T);var Te=v(T,2);Ue(Te,()=>e(p),q=>{Fr(q,{get planner(){return e(p)}})}),o(G),D((q,re,le)=>{E=be($,1,"px-1.5 py-2 multi hover:bg-slate-700",null,E,q),U(se,`Cycle (${re??""}s)`),ie=be(L,1,"px-1.5 py-2 multi hover:bg-slate-700",null,ie,le)},[()=>({"animate-flash":i(),active:l()===u()}),()=>Math.round(u()/60*100)/100,()=>({active:l()===h})]),g(c,R),Re(),a()}Ve(["click"]);export{fa as component,pa as universal};
