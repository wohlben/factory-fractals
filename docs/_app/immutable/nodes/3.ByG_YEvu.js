import{t as c,a as v,b as U}from"../chunks/e-TftYpV.js";import{p as F,f as G,t as w,a as H,s as d,c as i,r as t,g as a,e as j}from"../chunks/DKDpRE7g.js";import{s as D}from"../chunks/CQBbwnrn.js";import{i as h}from"../chunks/PbJpwx8q.js";import{D as f,e as L,I as J,i as O}from"../chunks/Bl5k3TW9.js";import{L as Q,s as W}from"../chunks/BCod4-4X.js";import{R as X}from"../chunks/CoIP9PvN.js";const Y=({params:y})=>{const{id:g}=y;return{itemId:Number(g)}},ma=Object.freeze(Object.defineProperty({__proto__:null,load:Y},Symbol.toStringTag,{value:"Module"}));var Z=c('<span class="w-6 inline-block"></span>'),$=c('<div class="group"><div class="z-10"><!> <!> <!></div> <div class="group-hover:block hidden h-0 overflow-visible z-40"><!></div></div>'),aa=c('<div class="py-2 px-4 max-w-xl"><h6 class="py-2 px-4 bg-slate-700 rounded-t-lg">Upgradable</h6> <div class="py-2 px-4 bg-slate-800"></div></div>'),ea=c('<div class="py-2 px-4 max-w-xl"><h6 class="py-2 px-4 bg-slate-700 rounded-t-lg">Name</h6> <div class="py-2 px-4 bg-slate-800"> </div></div>'),ta=c("<a> </a>"),ra=c('<div class="py-2 px-4 max-w-xl"><h6 class="py-2 px-4 bg-slate-700 rounded-t-lg">Related Recipes</h6> <div class="py-2 px-4 bg-slate-800 flex flex-col gap-1"></div></div>'),sa=c('<div class="py-2 px-4 max-w-xl"><h6 class="py-2 px-4 bg-slate-700 rounded-t-lg">Description</h6> <div class="py-2 px-4 bg-slate-800"> </div></div> <!> <!>',1);function _a(y,g){F(g,!0);let m=j(()=>g.data.itemId),b=j(()=>f.item[a(m)]);var R=sa(),I=G(R),N=d(i(I),2),P=i(N,!0);t(N),t(I);var z=d(I,2);{var K=r=>{var e=aa(),o=d(i(e),2);L(o,21,()=>a(b).Upgrades,O,(_,p)=>{var l=$(),n=i(l),u=i(n);{var q=s=>{var x=U("➡");v(s,x)},A=s=>{var x=Z();v(s,x)};h(u,s=>{a(m)===a(p)?s(q):s(A,!1)})}var S=d(u,2);J(S,{get itemId(){return a(p)}});var B=d(S,2);{var C=s=>{var x=U("👈");v(s,x)};h(B,s=>{a(m)===a(p)&&s(C)})}t(n);var k=d(n,2),E=i(k);X(E,{get recipeId(){return f.producedVia[a(p)][0].ID}}),t(k),t(l),v(_,l)}),t(o),t(e),v(r,e)},M=r=>{var e=ea(),o=d(i(e),2),_=i(o,!0);t(o),t(e),w(()=>D(_,a(b).Name)),v(r,e)};h(z,r=>{a(b).Upgrades.length>0?r(K):r(M,!1)})}var T=d(z,2);{var V=r=>{var e=ra(),o=d(i(e),2);L(o,21,()=>f.relatedRecipes[a(m)],O,(_,p)=>{var l=ta(),n=i(l,!0);t(l),w(u=>{W(l,"href",u),D(n,f.recipe[a(p)].Name)},[()=>Q.recipe(a(p))]),v(_,l)}),t(o),t(e),v(r,e)};h(T,r=>{var e;((e=f.relatedRecipes[a(m)])==null?void 0:e.size)>0&&r(V)})}w(()=>D(P,a(b).Description)),v(y,R),H()}export{_a as component,ma as universal};
