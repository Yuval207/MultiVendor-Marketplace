import{G as f}from"./chunk-WH6TINIM-BSV8C60H.js";import{G as g}from"./chunk-T4W4USY7-kvf0YQSU.js";import{a8 as n,R as v,aU as y,av as S,j as e,b as F,r as b,ab as _,ac as w,t as h,H as Z,x as l,y as k,J as C,B as j}from"./index-DEFeRDIL.js";import"./chunk-X5VECN6S-BFaD91Xf.js";import{b as L}from"./chunk-GO6FFEFF-BydxyZZg.js";import"./chunk-OXHHPLX5-BeQnQJj9.js";import"./lodash-CjjdLKfL.js";import"./chunk-BV7MMCXV-CBSjyFz6.js";import"./chunk-QLHWURNJ-C3P-o5j4.js";import{K as E}from"./chunk-6HTZNHPT-HMeIdg7c.js";import{R as a,u as N,S as D}from"./chunk-BFJYVY5L-uaLHImxC.js";import"./chunk-NOAFLTPV-DlTTLne3.js";import"./chunk-C76H5USB-Cet_DDGf.js";import"./index-Cf2cYblr.js";import"./checkbox-Bb3g0FAy.js";import"./x-mark-mini-tIH3HTi4.js";import"./chunk-HMR2DA3X-Sh8HVWkm.js";import"./chunk-YEDAFXMB-itNofjPe.js";import"./chunk-AOFGTNG6-BapIOu2m.js";import"./chunk-WX2SMNCD-CQjaP0hQ.js";import"./plus-mini-9ktDp-rf.js";import"./command-bar-DfNauWbl.js";import"./index-D6BS3cXt.js";import"./chunk-X4PARRTU-BuL0dl-Z.js";import"./format-DxnECnkT.js";import"./date-picker-DQot2JSl.js";import"./popover-qvxgJjPJ.js";import"./triangle-left-mini-BxJvX9lk.js";import"./prompt-DO1sEl7G.js";var I=n.object({name:n.string().min(1),countries:n.array(n.object({iso_2:n.string().min(2),display_name:n.string()})).min(1)});function M({fulfillmentSet:m,type:d,location:o}){const{t:s}=F(),{handleSuccess:p}=N();b.useState(!1);const t=_({defaultValues:{name:"",countries:[]},resolver:w(I)}),{mutateAsync:u,isPending:i}=L(m.id),x=t.handleSubmit(async r=>{await u({name:r.name,geo_zones:r.countries.map(({iso_2:c})=>({country_code:c,type:"country"}))},{onSuccess:()=>{h.success(s("stockLocations.serviceZones.create.successToast",{name:r.name})),p(`/settings/locations/${o.id}`)},onError:c=>{h.error(c.message)}})});return e.jsx(a.Form,{form:t,children:e.jsxs(E,{className:"flex h-full flex-col overflow-hidden",onSubmit:x,children:[e.jsx(a.Header,{}),e.jsx(a.Body,{className:"flex flex-1 flex-col items-center overflow-auto",children:e.jsxs(D,{id:g,children:[e.jsx("div",{className:"flex flex-1 flex-col items-center",children:e.jsxs("div",{className:"flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16",children:[e.jsx(Z,{children:d==="pickup"?s("stockLocations.serviceZones.create.headerPickup",{location:o.name}):s("stockLocations.serviceZones.create.headerShipping",{location:o.name})}),e.jsx("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2",children:e.jsx(l.Field,{control:t.control,name:"name",render:({field:r})=>e.jsxs(l.Item,{children:[e.jsx(l.Label,{children:s("fields.name")}),e.jsx(l.Control,{children:e.jsx(k,{...r})}),e.jsx(l.ErrorMessage,{})]})})}),e.jsx(C,{children:s("stockLocations.serviceZones.fields.tip")}),e.jsx(f,{form:t})]})}),e.jsx(f.AreaDrawer,{form:t})]})}),e.jsx(a.Footer,{children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[e.jsx(a.Close,{asChild:!0,children:e.jsx(j,{variant:"secondary",size:"small",children:s("actions.cancel")})}),e.jsx(j,{type:"submit",size:"small",isLoading:i,children:s("actions.save")})]})})]})})}function me(){var r;const{fset_id:m,location_id:d}=v(),{stock_location:o,isPending:s,isFetching:p,isError:t,error:u}=y(d,{fields:"*fulfillment_sets"}),i=(r=o==null?void 0:o.fulfillment_sets)==null?void 0:r.find(c=>c.id===m),x=(i==null?void 0:i.type)==="pickup"?"pickup":"shipping";if(!s&&!p&&!i)throw S({message:`Fulfillment set with ID: ${m} was not found.`},404);if(t)throw u;return e.jsx(a,{prev:`/settings/locations/${d}`,children:i&&e.jsx(M,{fulfillmentSet:i,location:o,type:x})})}export{me as Component};