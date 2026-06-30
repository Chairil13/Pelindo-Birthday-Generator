"use client";
import { forwardRef, PointerEvent, useRef } from "react";
import { Template } from "@/data/templates";

export type DesignState = {
  template:Template; photo:string|null; title:string; name:string; message:string; titleFont:string; nameFont:string;
  titleColor:string; nameColor:string; accent:string; titleSize:number; nameSize:number; messageSize:number;
  textShadow:boolean; glow:boolean; photoScale:number; photoX:number; photoY:number; photoRotation:number; frame:"none"|"circle"|"arch"|"rounded"; frameShadow:boolean;
  frameX:number; frameY:number;
  frameWidth:number; frameHeight:number;
  nameX:number; nameY:number;
  titleX:number; titleY:number;
  customTexts:CustomText[];
  logo:string|null; logoX:number; logoY:number; logoWidth:number;
  messageStyle:"glass"|"gold"|"minimal"|"soft";
};

export type CustomText = { id:string; text:string; font:string; color:string; size:number; x:number; y:number };

type DesignCanvasProps = { state:DesignState; onCustomTextMove?:(id:string,x:number,y:number)=>void; onFrameMove?:(x:number,y:number)=>void; onFrameTransform?:(x:number,y:number,width:number,height:number)=>void; onNameMove?:(x:number,y:number)=>void; onTitleMove?:(x:number,y:number)=>void; onLogoMove?:(x:number,y:number)=>void; onLogoResize?:(width:number)=>void };

export const DesignCanvas=forwardRef<HTMLDivElement,DesignCanvasProps>(({state,onCustomTextMove,onFrameMove,onFrameTransform,onNameMove,onTitleMove,onLogoMove,onLogoResize},ref)=> {
  const offsets=useRef<Record<string,{x:number;y:number}>>({});
  const resizeStart=useRef<{pointerX:number;pointerY:number;x:number;y:number;width:number;height:number;horizontal:-1|1;vertical:-1|1}|null>(null);
  const logoResizeStart=useRef<{pointerX:number;pointerY:number;width:number;horizontal:-1|1;vertical:-1|1}|null>(null);
  const startDrag=(event:PointerEvent<HTMLDivElement>,key:string,currentX:number,currentY:number)=>{
    const canvas=event.currentTarget.parentElement?.getBoundingClientRect();if(!canvas)return;
    offsets.current[key]={x:currentX-((event.clientX-canvas.left)/canvas.width)*100,y:currentY-((event.clientY-canvas.top)/canvas.height)*100};
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const position=(event:PointerEvent<HTMLDivElement>,key:string)=>{
    const canvas=event.currentTarget.parentElement?.getBoundingClientRect();if(!canvas)return null;
    const offset=offsets.current[key]??{x:0,y:0};
    return {x:Math.max(4,Math.min(96,((event.clientX-canvas.left)/canvas.width)*100+offset.x)),y:Math.max(4,Math.min(96,((event.clientY-canvas.top)/canvas.height)*100+offset.y))};
  };
  const stopDrag=(event:PointerEvent<HTMLDivElement>,key:string)=>{delete offsets.current[key];event.currentTarget.releasePointerCapture(event.pointerId)};
  const drag=(event:PointerEvent<HTMLDivElement>,id:string)=>{
    if(!onCustomTextMove||!event.currentTarget.hasPointerCapture(event.pointerId))return;
    const next=position(event,`text-${id}`);if(next)onCustomTextMove(id,next.x,next.y);
  };
  const dragFrame=(event:PointerEvent<HTMLDivElement>)=>{
    if(!onFrameMove||!event.currentTarget.hasPointerCapture(event.pointerId))return;
    const next=position(event,"frame");if(next)onFrameMove(next.x,next.y);
  };
  const dragName=(event:PointerEvent<HTMLDivElement>)=>{if(!onNameMove||!event.currentTarget.hasPointerCapture(event.pointerId))return;const next=position(event,"name");if(next)onNameMove(next.x,next.y)};
  const dragTitle=(event:PointerEvent<HTMLDivElement>)=>{if(!onTitleMove||!event.currentTarget.hasPointerCapture(event.pointerId))return;const next=position(event,"title");if(next)onTitleMove(next.x,next.y)};
  const dragLogo=(event:PointerEvent<HTMLDivElement>)=>{if(!onLogoMove||!event.currentTarget.hasPointerCapture(event.pointerId))return;const next=position(event,"logo");if(next)onLogoMove(next.x,next.y)};
  const startResize=(event:PointerEvent<HTMLButtonElement>,horizontal:-1|1,vertical:-1|1)=>{
    event.stopPropagation();const canvas=event.currentTarget.parentElement?.parentElement?.getBoundingClientRect();if(!canvas)return;
    resizeStart.current={pointerX:((event.clientX-canvas.left)/canvas.width)*100,pointerY:((event.clientY-canvas.top)/canvas.height)*100,x:state.frameX,y:state.frameY,width:state.frameWidth,height:state.frameHeight,horizontal,vertical};
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const resizeFrame=(event:PointerEvent<HTMLButtonElement>)=>{
    if(!onFrameTransform||!resizeStart.current||!event.currentTarget.hasPointerCapture(event.pointerId))return;
    const canvas=event.currentTarget.parentElement?.parentElement?.getBoundingClientRect();if(!canvas)return;const start=resizeStart.current;
    const pointerX=((event.clientX-canvas.left)/canvas.width)*100,pointerY=((event.clientY-canvas.top)/canvas.height)*100;
    const dx=pointerX-start.pointerX,dy=pointerY-start.pointerY;
    const width=Math.max(12,Math.min(92,start.width+2*dx*start.horizontal));
    const height=Math.max(12,Math.min(92,start.height+2*dy*start.vertical));
    const appliedDx=(width-start.width)/2*start.horizontal,appliedDy=(height-start.height)/2*start.vertical;
    onFrameTransform(Math.max(2,Math.min(98,start.x+appliedDx)),Math.max(2,Math.min(98,start.y+appliedDy)),width,height);
  };
  const stopResize=(event:PointerEvent<HTMLButtonElement>)=>{resizeStart.current=null;event.currentTarget.releasePointerCapture(event.pointerId)};
  const startLogoResize=(event:PointerEvent<HTMLButtonElement>,horizontal:-1|1,vertical:-1|1)=>{event.stopPropagation();const canvas=event.currentTarget.parentElement?.parentElement?.getBoundingClientRect();if(!canvas)return;logoResizeStart.current={pointerX:((event.clientX-canvas.left)/canvas.width)*100,pointerY:((event.clientY-canvas.top)/canvas.height)*100,width:state.logoWidth,horizontal,vertical};event.currentTarget.setPointerCapture(event.pointerId)};
  const resizeLogo=(event:PointerEvent<HTMLButtonElement>)=>{if(!onLogoResize||!logoResizeStart.current||!event.currentTarget.hasPointerCapture(event.pointerId))return;const canvas=event.currentTarget.parentElement?.parentElement?.getBoundingClientRect();if(!canvas)return;const start=logoResizeStart.current;const x=((event.clientX-canvas.left)/canvas.width)*100,y=((event.clientY-canvas.top)/canvas.height)*100;const change=((x-start.pointerX)*start.horizontal+(y-start.pointerY)*start.vertical)/2;onLogoResize(Math.max(5,Math.min(55,start.width+change)))};
  const stopLogoResize=(event:PointerEvent<HTMLButtonElement>)=>{logoResizeStart.current=null;event.currentTarget.releasePointerCapture(event.pointerId)};
  const messageCardStyle = state.messageStyle==="gold"
    ? {background:"linear-gradient(135deg,rgba(28,38,44,.94),rgba(8,21,34,.9))",border:"1px solid #f6c453",borderRadius:"16px",boxShadow:"0 8px 25px #0007, inset 0 0 18px #f6c45318",backdropFilter:"blur(10px)"}
    : state.messageStyle==="minimal"
      ? {background:"transparent",borderTop:`1px solid ${state.accent}`,borderBottom:`1px solid ${state.accent}`,borderLeft:"none",borderRight:"none",borderRadius:"0",boxShadow:"none",backdropFilter:"none"}
      : state.messageStyle==="soft"
        ? {background:"rgba(245,251,255,.9)",border:"2px solid rgba(255,255,255,.95)",borderRadius:"22px",boxShadow:"0 10px 25px #001b3344, inset 3px 3px 7px #ffffff",backdropFilter:"blur(8px)"}
        : {background:state.template.tone==="light"?"rgba(255,255,255,.62)":"rgba(3,23,45,.62)",border:state.template.tone==="light"?"1px solid rgba(0,91,172,.18)":"1px solid rgba(255,255,255,.16)",borderRadius:"14px",boxShadow:"0 8px 22px #00152b33",backdropFilter:"blur(12px)"};
  const messageColor=state.messageStyle==="gold"?"#fff4d5":state.messageStyle==="soft"?"#06335b":state.template.tone==="light"?"#06335b":"rgba(255,255,255,.88)";
  return <div ref={ref} id="design-canvas" className="relative w-full overflow-hidden bg-[#061b33] text-white" style={{background:state.template.background,aspectRatio:`${state.template.width}/${state.template.height}`}}>
  {state.template.image&&<img src={state.template.image} alt="" className="absolute inset-0 h-full w-full" style={{objectFit:state.template.imageFit??"fill"}}/>}
  {!state.template.image&&<>
    <div className="absolute inset-0 opacity-20" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.16) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)",backgroundSize:"56px 56px",maskImage:"linear-gradient(to bottom,black,transparent 60%)"}}/>
    <div className="absolute inset-x-0 bottom-0 h-[42%]" style={{background:`linear-gradient(167deg,transparent 22%,${state.accent}33 23%,#03172dea 48%,#020d19 100%)`}}/>
    <div className="absolute bottom-[31%] left-[6%] right-[6%] h-px opacity-40" style={{background:state.accent}}/>
  </>}
  {state.template.image&&<div onPointerDown={event=>startDrag(event,"title",state.titleX,state.titleY)} onPointerMove={dragTitle} onPointerUp={event=>stopDrag(event,"title")} className="absolute z-20 w-[88%] -translate-x-1/2 -translate-y-1/2 cursor-grab select-none text-center active:cursor-grabbing" style={{left:`${state.titleX}%`,top:`${state.titleY}%`,touchAction:"none",willChange:"left, top"}}>
    <h2 className="whitespace-pre-wrap leading-[1.1]" style={{fontFamily:state.titleFont,fontSize:`clamp(26px,${state.titleSize/7}vw,${state.titleSize}px)`,color:state.titleColor,textShadow:state.glow?`0 0 20px ${state.titleColor},0 4px 10px #0008`:state.textShadow?"0 4px 10px #0009":"none"}}>{state.title}</h2>
    <div className="mx-auto mt-[2%] h-[2px] w-[18%]" style={{background:state.accent,boxShadow:`0 0 12px ${state.accent}`}}/>
  </div>}
  <div onPointerDown={event=>startDrag(event,"frame",state.frameX,state.frameY)} onPointerMove={dragFrame} onPointerUp={event=>stopDrag(event,"frame")} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab overflow-visible active:cursor-grabbing ${state.frame==="none"?"":state.frame==="circle"?"rounded-full":state.frame==="arch"?"rounded-t-[50%] rounded-b-[12%]":"rounded-[18%]"}`} style={{left:`${state.frameX}%`,top:`${state.frameY}%`,width:`${state.frameWidth}%`,height:`${state.frameHeight}%`,borderColor:state.accent,boxShadow:state.frame!=="none"&&state.frameShadow?`0 12px 36px #0009,0 0 24px ${state.accent}88`:"none",background:state.frame==="none"?"transparent":"#082b4b",touchAction:"none",willChange:"left, top, width, height"}}>
    <div className={`h-full w-full overflow-hidden ${state.frame==="none"?"":state.frame==="circle"?"rounded-full border-[clamp(3px,.7vw,6px)]":state.frame==="arch"?"rounded-t-[50%] rounded-b-[12%] border-[clamp(3px,.7vw,6px)]":"rounded-[18%] border-[clamp(3px,.7vw,6px)]"}`} style={{borderColor:state.accent}}>
    {state.photo?<img draggable={false} src={state.photo} alt="Foto ulang tahun" className="pointer-events-none h-full w-full select-none object-cover" style={{transform:`translate(${state.photoX}px,${state.photoY}px) scale(${state.photoScale}) rotate(${state.photoRotation}deg)`}}/>:<div className="pointer-events-none grid h-full place-items-center text-center text-[clamp(7px,1.6vw,12px)] text-white/45"><span>UPLOAD<br/>FOTO</span></div>}
    </div>
    {([[-1,-1],[1,-1],[-1,1],[1,1]] as const).map(([horizontal,vertical])=><button data-export-ignore="true" aria-label="Ubah ukuran frame" key={`${horizontal}-${vertical}`} onPointerDown={event=>startResize(event,horizontal,vertical)} onPointerMove={resizeFrame} onPointerUp={stopResize} className="absolute z-30 size-4 rounded-full border-2 border-white bg-[#0aaee8] shadow-md" style={{left:horizontal===-1?"0%":"100%",top:vertical===-1?"0%":"100%",transform:"translate(-50%,-50%)",cursor:`${horizontal===vertical?"nwse":"nesw"}-resize`,touchAction:"none"}}/>)}
  </div>
  <div onPointerDown={event=>startDrag(event,"name",state.nameX,state.nameY)} onPointerMove={dragName} onPointerUp={event=>stopDrag(event,"name")} className="absolute z-20 w-max max-w-[90%] -translate-x-1/2 -translate-y-1/2 cursor-grab select-none text-center active:cursor-grabbing" style={{left:`${state.nameX}%`,top:`${state.nameY}%`,touchAction:"none",willChange:"left, top"}}><h3 className="uppercase leading-tight tracking-[.12em]" style={{fontFamily:state.nameFont,fontSize:`clamp(18px,${state.nameSize/7}vw,${state.nameSize}px)`,color:state.nameColor,textShadow:state.textShadow?"0 4px 12px #000":"none"}}>{state.name||"Nama Anda"}</h3></div>
  <div className="absolute bottom-[7%] left-[9%] right-[9%] px-[6%] py-[3.5%] text-center" style={messageCardStyle}><p className="leading-[1.6]" style={{fontFamily:"Lora",fontSize:`clamp(7px,${state.messageSize/7}vw,${state.messageSize}px)`,color:messageColor}}>{state.message}</p></div>
  {state.customTexts.map(item=><div key={item.id} onPointerDown={event=>startDrag(event,`text-${item.id}`,item.x,item.y)} onPointerMove={event=>drag(event,item.id)} onPointerUp={event=>stopDrag(event,`text-${item.id}`)} className="absolute z-20 w-max max-w-[90%] -translate-x-1/2 -translate-y-1/2 cursor-grab select-none whitespace-pre-wrap text-center leading-tight active:cursor-grabbing" style={{left:`${item.x}%`,top:`${item.y}%`,fontFamily:item.font,color:item.color,fontSize:`clamp(9px,${item.size/7}vw,${item.size}px)`,textShadow:state.textShadow?"0 3px 10px #000a":"none",touchAction:"none",willChange:"left, top"}}>{item.text}</div>)}
  {state.logo&&<div onPointerDown={event=>startDrag(event,"logo",state.logoX,state.logoY)} onPointerMove={dragLogo} onPointerUp={event=>stopDrag(event,"logo")} className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none active:cursor-grabbing" style={{left:`${state.logoX}%`,top:`${state.logoY}%`,width:`${state.logoWidth}%`,touchAction:"none",willChange:"left, top, width"}}><img draggable={false} src={state.logo} alt="Logo" className="pointer-events-none block h-auto w-full select-none drop-shadow-lg"/>{([[-1,-1],[1,-1],[-1,1],[1,1]] as const).map(([horizontal,vertical])=><button data-export-ignore="true" aria-label="Ubah ukuran logo" key={`${horizontal}-${vertical}`} onPointerDown={event=>startLogoResize(event,horizontal,vertical)} onPointerMove={resizeLogo} onPointerUp={stopLogoResize} className="absolute z-30 size-3.5 rounded-full border-2 border-white bg-[#f6c453] shadow-md" style={{left:horizontal===-1?"0%":"100%",top:vertical===-1?"0%":"100%",transform:"translate(-50%,-50%)",cursor:`${horizontal===vertical?"nwse":"nesw"}-resize`,touchAction:"none"}}/>)}</div>}
  {!state.template.image&&<div className="absolute bottom-[3%] left-[6%] right-[6%] flex items-center gap-2 opacity-40"><span className="h-px flex-1 bg-white"/><span className="text-[clamp(4px,.8vw,7px)] tracking-[.3em]">CONNECTIVITY • COLLABORATION • INNOVATION</span><span className="h-px flex-1 bg-white"/></div>}
</div>;
});
DesignCanvas.displayName="DesignCanvas";
