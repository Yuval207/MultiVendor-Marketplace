import{u as re,a as se,b as te}from"./chunk-QPWKRRZN-CAWokS5h.js";import{r as x,q as M,d as ie,g as ae,a as ne,j as s,dF as oe,el as ce,em as le,k as ue,l as de,en as B,b as _,H,A as k,Y as pe,ei as me,T as p,Z as ge,t as f}from"./index-DEFeRDIL.js";import{S as xe}from"./chunk-ADOCJB6L-CL5SfXv2.js";import{S as fe}from"./chunk-2RQLKDBF-fPF6GiYf.js";import{u as he,D as ve}from"./chunk-OXHHPLX5-BeQnQJj9.js";import"./lodash-CjjdLKfL.js";import"./chunk-BV7MMCXV-CBSjyFz6.js";import"./chunk-QLHWURNJ-C3P-o5j4.js";import{P as ye}from"./pencil-square-Tj9O38EM.js";import{X as _e}from"./x-circle-BTBq8-lp.js";import{T as je}from"./trash-s8WO4VTP.js";import{u as Y}from"./use-prompt-6wuxDf0h.js";import{C as K}from"./container-DxC93x08.js";import{C as h}from"./command-bar-DfNauWbl.js";import{C as Q}from"./checkbox-Bb3g0FAy.js";import{c as Ce}from"./index-Cf2cYblr.js";import"./chunk-OI7BBNYW-ChZbpW68.js";import"./chunk-P3UUX2T6-BeXLR_Qd.js";import"./chunk-C76H5USB-Cet_DDGf.js";import"./Trans-CZb6R4yh.js";import"./x-mark-mini-tIH3HTi4.js";import"./chunk-YEDAFXMB-itNofjPe.js";import"./chunk-AOFGTNG6-BapIOu2m.js";import"./chunk-WX2SMNCD-CQjaP0hQ.js";import"./plus-mini-9ktDp-rf.js";import"./chunk-X4PARRTU-BuL0dl-Z.js";import"./format-DxnECnkT.js";import"./date-picker-DQot2JSl.js";import"./popover-qvxgJjPJ.js";import"./index-D6BS3cXt.js";import"./triangle-left-mini-BxJvX9lk.js";import"./prompt-DO1sEl7G.js";var Se=Object.defineProperty,y=Object.getOwnPropertySymbols,F=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable,W=(r,e,t)=>e in r?Se(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,be=(r,e)=>{for(var t in e||(e={}))F.call(e,t)&&W(r,t,e[t]);if(y)for(var t of y(e))G.call(e,t)&&W(r,t,e[t]);return r},we=(r,e)=>{var t={};for(var i in r)F.call(r,i)&&e.indexOf(i)<0&&(t[i]=r[i]);if(r!=null&&y)for(var i of y(r))e.indexOf(i)<0&&G.call(r,i)&&(t[i]=r[i]);return t};const J=x.forwardRef((r,e)=>{var t=r,{color:i="currentColor"}=t,o=we(t,["color"]);return x.createElement("svg",be({xmlns:"http://www.w3.org/2000/svg",width:15,height:15,fill:"none",ref:e},o),x.createElement("path",{stroke:i,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M7.5 13.945a6.444 6.444 0 1 0 0-12.89 6.444 6.444 0 0 0 0 12.89"}),x.createElement("path",{stroke:i,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"m4.611 7.722 2 2.223 3.778-4.89"}))});J.displayName="CheckCircle";var Pe=()=>({queryKey:ce.details(),queryFn:async()=>le()}),lr=async()=>{const r=Pe();return M.getQueryData(r.queryKey)??await M.fetchQuery(r)},w=10,ke=({store:r})=>{var I,O,N,R,D,z,A,q;const[e,t]=x.useState({}),{searchParams:i,raw:o}=re({pageSize:w}),{currencies:c,count:a,isPending:m,isError:j,error:C}=se({code:(I=r.supported_currencies)==null?void 0:I.map(n=>n.currency_code),...i},{placeholderData:ue,enabled:!!((O=r.supported_currencies)!=null&&O.length)}),{price_preferences:g,isPending:v,isError:d,error:u}=de({attribute:"currency_code",value:(N=r.supported_currencies)==null?void 0:N.map(n=>n.currency_code)},{enabled:!!((R=r.supported_currencies)!=null&&R.length)}),T=Ee(),E=x.useMemo(()=>new Map(g==null?void 0:g.map(n=>[n.value,n])),[g]),U=c==null?void 0:c.map(n=>{var S;return{...n,is_tax_inclusive:(S=E.get(n.code))==null?void 0:S.is_tax_inclusive}}),{table:V}=he({data:U??[],columns:T,count:a,getRowId:n=>n.code,rowSelection:{state:e,updater:t},enablePagination:!0,enableRowSelection:!0,pageSize:w,meta:{storeId:r.id,supportedCurrencies:r.supported_currencies,defaultCurrencyCode:(z=(D=r.supported_currencies)==null?void 0:D.find(n=>n.is_default))==null?void 0:z.currency_code,preferencesMap:E}}),{mutateAsync:X}=B(r.id),{t:l}=_(),Z=Y(),$=async()=>{var L;const n=Object.keys(e);await Z({title:l("general.areYouSure"),description:l("store.removeCurrencyWarning",{count:n.length}),confirmText:l("actions.remove"),cancelText:l("actions.cancel")})&&await X({supported_currencies:((L=r.supported_currencies)==null?void 0:L.filter(b=>!n.includes(b.currency_code)))??[]},{onSuccess:()=>{t({}),f.success(l("store.toast.currenciesRemoved"))},onError:b=>{f.error(b.message)}})};if(j)throw C;if(d)throw u;const ee=m||v;return s.jsxs(K,{className:"divide-y p-0",children:[s.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[s.jsx(H,{level:"h2",children:l("store.currencies")}),s.jsx(k,{groups:[{actions:[{icon:s.jsx(pe,{}),label:l("actions.add"),to:"currencies"}]}]})]}),s.jsx(ve,{orderBy:[{key:"name",label:l("fields.name")},{key:"code",label:l("fields.code")}],search:!0,pagination:!0,table:V,pageSize:w,columns:T,count:(A=r.supported_currencies)!=null&&A.length?a:0,isLoading:(q=r.supported_currencies)!=null&&q.length?ee:!1,queryObject:o}),s.jsx(h,{open:!!Object.keys(e).length,children:s.jsxs(h.Bar,{children:[s.jsx(h.Value,{children:l("general.countSelected",{count:Object.keys(e).length})}),s.jsx(h.Seperator,{}),s.jsx(h.Command,{action:$,shortcut:"r",label:l("actions.remove")})]})})]})},Te=({storeId:r,currency:e,supportedCurrencies:t,defaultCurrencyCode:i,preferencesMap:o})=>{var g,v;const{mutateAsync:c}=B(r),{t:a}=_(),m=Y(),j=async()=>{await m({title:a("general.areYouSure"),description:a("store.removeCurrencyWarning",{count:1}),verificationInstruction:a("general.typeToConfirm"),verificationText:e.name,confirmText:a("actions.remove"),cancelText:a("actions.cancel")})&&await c({supported_currencies:t.filter(u=>u.currency_code!==e.code)},{onSuccess:()=>{f.success(a("store.toast.currenciesRemoved"))},onError:u=>{f.error(u.message)}})},C=async()=>{await c({supported_currencies:t.map(d=>{const u=o.get(d.currency_code);return{...d,is_tax_inclusive:d.currency_code===e.code?!(u!=null&&u.is_tax_inclusive):void 0}})},{onSuccess:()=>{f.success(a("store.toast.updatedTaxInclusivitySuccessfully"))},onError:d=>{f.error(d.message)}})};return s.jsx(k,{groups:[{actions:[{icon:(g=o.get(e.code))!=null&&g.is_tax_inclusive?s.jsx(_e,{}):s.jsx(J,{}),label:(v=o.get(e.code))!=null&&v.is_tax_inclusive?a("store.disableTaxInclusivePricing"):a("store.enableTaxInclusivePricing"),onClick:C}]},{actions:[{icon:s.jsx(je,{}),label:a("actions.remove"),onClick:j,disabled:e.code===i}]}]})},P=Ce(),Ee=()=>{const r=te(),{t:e}=_();return x.useMemo(()=>[P.display({id:"select",header:({table:t})=>s.jsx(Q,{checked:t.getIsSomePageRowsSelected()?"indeterminate":t.getIsAllPageRowsSelected(),onCheckedChange:i=>t.toggleAllPageRowsSelected(!!i)}),cell:({row:t})=>s.jsx(Q,{checked:t.getIsSelected(),onCheckedChange:i=>t.toggleSelected(!!i),onClick:i=>{i.stopPropagation()}})}),...r,P.accessor("is_tax_inclusive",{header:e("fields.taxInclusivePricing"),cell:({getValue:t})=>{const i=t();return s.jsx(xe,{color:i?"green":"grey",children:e(i?"fields.true":"fields.false")})}}),P.display({id:"actions",cell:({row:t,table:i})=>{const{supportedCurrencies:o,storeId:c,defaultCurrencyCode:a,preferencesMap:m}=i.options.meta;return s.jsx(Te,{storeId:c,currency:t.original,supportedCurrencies:o,defaultCurrencyCode:a,preferencesMap:m})}})],[r,e])},Ie=({store:r})=>{var o,c,a;const{t:e}=_(),{region:t}=me(r.default_region_id,void 0,{enabled:!!r.default_region_id}),i=(o=r.supported_currencies)==null?void 0:o.find(m=>m.is_default);return s.jsxs(K,{className:"divide-y p-0",children:[s.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[s.jsxs("div",{children:[s.jsx(H,{children:e("store.domain")}),s.jsx(p,{className:"text-ui-fg-subtle",size:"small",children:e("store.manageYourStoresDetails")})]}),s.jsx(k,{groups:[{actions:[{icon:s.jsx(ye,{}),label:e("actions.edit"),to:"edit"}]}]})]}),s.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 px-6 py-4",children:[s.jsx(p,{size:"small",leading:"compact",weight:"plus",children:e("fields.name")}),s.jsx(p,{size:"small",leading:"compact",children:r.name})]}),s.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 px-6 py-4",children:[s.jsx(p,{size:"small",leading:"compact",weight:"plus",children:e("store.defaultCurrency")}),i?s.jsxs("div",{className:"flex items-center gap-x-2",children:[s.jsx(ge,{size:"2xsmall",children:(c=i.currency_code)==null?void 0:c.toUpperCase()}),s.jsx(p,{size:"small",leading:"compact",children:(a=i.currency)==null?void 0:a.name})]}):s.jsx(p,{size:"small",leading:"compact",children:"-"})]}),s.jsxs("div",{className:"text-ui-fg-subtle grid grid-cols-2 px-6 py-4",children:[s.jsx(p,{size:"small",leading:"compact",weight:"plus",children:e("store.defaultRegion")}),s.jsx("div",{className:"flex items-center gap-x-2",children:s.jsx(p,{size:"small",leading:"compact",children:(t==null?void 0:t.name)||"-"})})]})]})},ur=()=>{const r=ie(),{store:e,isPending:t,isError:i,error:o}=ae(void 0,{initialData:r}),{getWidgets:c}=ne();if(t||!e)return s.jsx(oe,{sections:2,showJSON:!0,showMetadata:!0});if(i)throw o;return s.jsxs(fe,{widgets:{before:c("store.details.before"),after:c("store.details.after")},data:e,hasOutlet:!0,showMetadata:!0,showJSON:!0,children:[s.jsx(Ie,{store:e}),s.jsx(ke,{store:e})]})};export{ur as Component,lr as loader};