import{a8 as h,R,b as F,e4 as w,e5 as E,b8 as k,j as e,H as C,ab as I,ac as N,e6 as T,t as _,x as s,y as z,B as q,T as S}from"./index-DEFeRDIL.js";import{K as L}from"./chunk-6HTZNHPT-HMeIdg7c.js";import{b as u,u as M}from"./chunk-BFJYVY5L-uaLHImxC.js";import{S as m}from"./select-crOjzcyz.js";import{T as V}from"./textarea-DkRs1XXf.js";import"./prompt-DO1sEl7G.js";import"./triangles-mini-BUPdZsMt.js";var A=h.object({location_id:h.string(),description:h.string().optional(),quantity:h.number().min(1)}),p=({title:t,value:r})=>e.jsxs("div",{className:"grid grid-cols-2 divide-x",children:[e.jsx(S,{className:"px-2 py-1.5",size:"small",leading:"compact",children:t}),e.jsx(S,{className:"px-2 py-1.5",size:"small",leading:"compact",children:r})]}),B=t=>({quantity:t.quantity,location_id:t.location_id,description:t.description??void 0}),D=({reservation:t,item:r,locations:l})=>{const{t:i}=F(),{handleSuccess:y}=M(),o=I({defaultValues:B(t),resolver:N(A)}),{mutateAsync:a}=T(t.id),j=o.handleSubmit(async n=>{a(n,{onSuccess:()=>{_.success(i("inventory.reservation.updateSuccessToast")),y()},onError:x=>{_.error(x.message)}})}),f=o.watch("quantity"),v=o.watch("location_id"),d=r.location_levels.find(n=>n.location_id===v);return e.jsx(u.Form,{form:o,children:e.jsxs(L,{onSubmit:j,className:"flex flex-1 flex-col overflow-hidden",children:[e.jsxs(u.Body,{className:"flex flex-1 flex-col gap-y-8 overflow-auto",children:[e.jsx(s.Field,{control:o.control,name:"location_id",render:({field:{onChange:n,value:x,ref:g,...b}})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{children:i("inventory.reservation.location")}),e.jsx(s.Control,{children:e.jsxs(m,{value:x,onValueChange:c=>{n(c)},...b,children:[e.jsx(m.Trigger,{ref:g,children:e.jsx(m.Value,{})}),e.jsx(m.Content,{children:(l||[]).map(c=>e.jsx(m.Item,{value:c.id,children:c.name},c.id))})]})}),e.jsx(s.ErrorMessage,{})]})}),e.jsxs("div",{className:"text-ui-fg-subtle shadow-elevation-card-rest grid grid-rows-4 divide-y rounded-lg border",children:[e.jsx(p,{title:i("fields.title"),value:r.title??r.sku}),e.jsx(p,{title:i("fields.sku"),value:r.sku}),e.jsx(p,{title:i("fields.inStock"),value:d.stocked_quantity}),e.jsx(p,{title:i("inventory.available"),value:d.stocked_quantity-(d.reserved_quantity-t.quantity)-f})]}),e.jsx(s.Field,{control:o.control,name:"quantity",render:({field:{onChange:n,value:x,...g}})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{children:i("inventory.reservation.reservedAmount")}),e.jsx(s.Control,{children:e.jsx(z,{type:"number",min:0,max:(d.available_quantity||0)+(t.quantity||0),value:x||"",onChange:b=>{const c=b.target.value;n(c===""?null:parseFloat(c))},...g})}),e.jsx(s.ErrorMessage,{})]})}),e.jsx(s.Field,{control:o.control,name:"description",render:({field:n})=>e.jsxs(s.Item,{children:[e.jsx(s.Label,{optional:!0,children:i("fields.description")}),e.jsx(s.Control,{children:e.jsx(V,{...n})}),e.jsx(s.ErrorMessage,{})]})})]}),e.jsx(u.Footer,{children:e.jsxs("div",{className:"flex items-center justify-end gap-x-2",children:[e.jsx(u.Close,{asChild:!0,children:e.jsx(q,{variant:"secondary",size:"small",children:i("actions.cancel")})}),e.jsx(q,{type:"submit",size:"small",isLoading:!1,children:i("actions.save")})]})})]})})},J=()=>{var v;const{id:t}=R(),{t:r}=F(),{reservation:l,isPending:i,isError:y,error:o}=w(t),{inventory_item:a}=E(l==null?void 0:l.inventory_item_id,{enabled:!!l}),{stock_locations:j}=k({id:(v=a==null?void 0:a.location_levels)==null?void 0:v.map(d=>d.location_id)},{enabled:!!(a!=null&&a.location_levels)}),f=!i&&l&&a&&j;if(y)throw o;return e.jsxs(u,{children:[e.jsx(u.Header,{children:e.jsx(C,{children:r("inventory.reservation.editItemDetails")})}),f&&e.jsx(D,{locations:j,reservation:l,item:a})]})};export{J as Component};