import{b as o,j as s,H as c,Q as x,B as i,T as u,t as a}from"./index-DEFeRDIL.js";import{u as m,a as h}from"./chunk-M45EGGOK-DGXN9EdJ.js";import{D as j}from"./chunk-BV7MMCXV-CBSjyFz6.js";import"./chunk-QLHWURNJ-C3P-o5j4.js";import{b as t,u as f}from"./chunk-BFJYVY5L-uaLHImxC.js";import"./chunk-C76H5USB-Cet_DDGf.js";import"./lodash-CjjdLKfL.js";import"./chunk-X4PARRTU-BuL0dl-Z.js";import"./format-DxnECnkT.js";import"./date-picker-DQot2JSl.js";import"./popover-qvxgJjPJ.js";import"./index-D6BS3cXt.js";import"./x-mark-mini-tIH3HTi4.js";import"./triangle-left-mini-BxJvX9lk.js";import"./prompt-DO1sEl7G.js";var v=()=>{const{t:r}=o(),e=h();return s.jsxs("div",{children:[s.jsx(c,{level:"h2",children:r("products.export.filters.title")}),s.jsx(u,{size:"small",className:"text-ui-fg-subtle",children:r("products.export.filters.description")}),s.jsx("div",{className:"mt-4",children:s.jsx(j,{filters:e,readonly:!0})})]})},S=()=>{const{t:r}=o();return s.jsxs(t,{children:[s.jsxs(t.Header,{children:[s.jsx(t.Title,{asChild:!0,children:s.jsx(c,{children:r("products.export.header")})}),s.jsx(t.Description,{className:"sr-only",children:r("products.export.description")})]}),s.jsx(y,{})]})},y=()=>{const{t:r}=o(),{searchParams:e}=m({}),{mutateAsync:n}=x(e),{handleSuccess:l}=f(),d=async()=>{await n({},{onSuccess:()=>{a.info(r("products.export.success.title"),{description:r("products.export.success.description")}),l()},onError:p=>{a.error(p.message)}})};return s.jsxs(s.Fragment,{children:[s.jsx(t.Body,{children:s.jsx(v,{})}),s.jsx(t.Footer,{children:s.jsxs("div",{className:"flex items-center gap-x-2",children:[s.jsx(t.Close,{asChild:!0,children:s.jsx(i,{size:"small",variant:"secondary",children:r("actions.cancel")})}),s.jsx(i,{onClick:d,size:"small",children:r("actions.export")})]})})]})};export{S as Component};