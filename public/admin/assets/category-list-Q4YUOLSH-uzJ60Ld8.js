import{u as z}from"./chunk-VLR7AHHG-DZ9Jlumi.js";import{g as P,a as N,b as w}from"./chunk-54IEHX46-DWMq7yL7.js";import{T as c,a as E}from"./chunk-OI7BBNYW-ChZbpW68.js";import{a as S,j as e,b as p,aj as D,k as H,H as I,T as u,B as x,L as h,r as v,m as f,I as q,am as A,A as R}from"./index-DEFeRDIL.js";import{S as j}from"./chunk-ADOCJB6L-CL5SfXv2.js";import{S as k}from"./chunk-2RQLKDBF-fPF6GiYf.js";import{u as L,D as M}from"./chunk-OXHHPLX5-BeQnQJj9.js";import"./lodash-CjjdLKfL.js";import{u as B}from"./chunk-C76H5USB-Cet_DDGf.js";import"./chunk-BV7MMCXV-CBSjyFz6.js";import"./chunk-QLHWURNJ-C3P-o5j4.js";import{P as O}from"./pencil-square-Tj9O38EM.js";import{T as Q}from"./trash-s8WO4VTP.js";import{C as $}from"./container-DxC93x08.js";import{c as b}from"./index-Cf2cYblr.js";import"./use-prompt-6wuxDf0h.js";import"./prompt-DO1sEl7G.js";import"./chunk-P3UUX2T6-BeXLR_Qd.js";import"./Trans-CZb6R4yh.js";import"./x-mark-mini-tIH3HTi4.js";import"./chunk-YEDAFXMB-itNofjPe.js";import"./chunk-AOFGTNG6-BapIOu2m.js";import"./chunk-WX2SMNCD-CQjaP0hQ.js";import"./plus-mini-9ktDp-rf.js";import"./command-bar-DfNauWbl.js";import"./index-D6BS3cXt.js";import"./chunk-X4PARRTU-BuL0dl-Z.js";import"./format-DxnECnkT.js";import"./date-picker-DQot2JSl.js";import"./popover-qvxgJjPJ.js";import"./triangle-left-mini-BxJvX9lk.js";var d=b(),G=()=>{const{t}=p();return v.useMemo(()=>[d.accessor("name",{header:()=>e.jsx(c,{text:t("fields.name")}),cell:({getValue:s,row:a})=>{const i=a.getToggleExpandedHandler();if(a.original.parent_category!==void 0){const r=P(a.original);return e.jsx("div",{className:"flex size-full items-center gap-1 overflow-hidden",children:r.map((o,l)=>e.jsxs("div",{className:f("overflow-hidden",{"text-ui-fg-muted flex items-center gap-x-1":l!==r.length-1}),children:[e.jsx(u,{size:"small",leading:"compact",className:"truncate",children:o.name}),l!==r.length-1&&e.jsx(u,{size:"small",leading:"compact",children:"/"})]},o.id))})}return e.jsxs("div",{className:"flex size-full items-center gap-x-3 overflow-hidden",children:[e.jsx("div",{className:"flex size-7 items-center justify-center",children:a.getCanExpand()?e.jsx(q,{type:"button",onClick:r=>{r.stopPropagation(),r.preventDefault(),i()},size:"small",variant:"transparent",className:"text-ui-fg-subtle",children:e.jsx(A,{className:f({"rotate-90 transition-transform will-change-transform":a.getIsExpanded()})})}):null}),e.jsx("span",{className:"truncate",children:s()})]})}}),d.accessor("handle",{header:()=>e.jsx(c,{text:t("fields.handle")}),cell:({getValue:s})=>e.jsx(E,{text:`/${s()}`})}),d.accessor("is_active",{header:()=>e.jsx(c,{text:t("fields.status")}),cell:({getValue:s})=>{const{color:a,label:i}=N(s(),t);return e.jsx(j,{color:a,children:i})}}),d.accessor("is_internal",{header:()=>e.jsx(c,{text:t("categories.fields.visibility.label")}),cell:({getValue:s})=>{const{color:a,label:i}=w(s(),t);return e.jsx(j,{color:a,children:i})}})],[t])},W=({pageSize:t=20,prefix:s})=>{const a=B(["q","offset","order"],s),i={q:a.q,limit:t,offset:a.offset?Number(a.offset):0,order:a.order};return{raw:a,searchParams:i}},m=20,Z=()=>{const{t}=p(),{raw:s,searchParams:a}=W({pageSize:m}),i=s.q?{include_ancestors_tree:!0,fields:"id,name,handle,is_active,is_internal,parent_category",...a}:{include_descendants_tree:!0,parent_category_id:"null",fields:"id,name,category_children,handle,is_internal,is_active",...a},{product_categories:r,count:o,isLoading:l,isError:y,error:C}=D({...i},{placeholderData:H}),g=K(),{table:_}=L({data:r||[],columns:g,count:o,getRowId:n=>n.id,getSubRows:n=>n.category_children,enableExpandableRows:!0,pageSize:m}),T=!!r&&r.length>0;if(y)throw C;return e.jsxs($,{className:"divide-y p-0",children:[e.jsxs("div",{className:"flex items-center justify-between px-6 py-4",children:[e.jsxs("div",{children:[e.jsx(I,{children:t("categories.domain")}),e.jsx(u,{className:"text-ui-fg-subtle",size:"small",children:t("categories.subtitle")})]}),e.jsxs("div",{className:"flex items-center gap-x-2",children:[T&&e.jsx(x,{size:"small",variant:"secondary",asChild:!0,children:e.jsx(h,{to:"organize",children:t("categories.organize.action")})}),e.jsx(x,{size:"small",variant:"secondary",asChild:!0,children:e.jsx(h,{to:"create",children:t("actions.create")})})]})]}),e.jsx(M,{table:_,columns:g,count:o,pageSize:m,isLoading:l,navigateTo:n=>n.id,queryObject:s,search:!0,pagination:!0})]})},F=({category:t})=>{const{t:s}=p(),a=z(t);return e.jsx(R,{groups:[{actions:[{label:s("actions.edit"),icon:e.jsx(O,{}),to:`${t.id}/edit`}]},{actions:[{label:s("actions.delete"),icon:e.jsx(Q,{}),onClick:a}]}]})},J=b(),K=()=>{const t=G();return v.useMemo(()=>[...t,J.display({id:"actions",cell:({row:s})=>e.jsx(F,{category:s.original})})],[t])},Ne=()=>{const{getWidgets:t}=S();return e.jsx(k,{widgets:{after:t("product_category.list.after"),before:t("product_category.list.before")},hasOutlet:!0,children:e.jsx(Z,{})})};export{Ne as Component};