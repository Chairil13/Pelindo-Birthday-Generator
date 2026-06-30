export type Area = { x:number; y:number; width:number; height:number };

export async function getCroppedImage(src:string, area:Area, rotation=0) {
  const image = await new Promise<HTMLImageElement>((resolve,reject) => { const img=new Image(); img.onload=()=>resolve(img); img.onerror=reject; img.src=src; });
  const radians=rotation*Math.PI/180;
  const bounds=Math.abs(Math.cos(radians))*image.width+Math.abs(Math.sin(radians))*image.height;
  const boundsH=Math.abs(Math.sin(radians))*image.width+Math.abs(Math.cos(radians))*image.height;
  const canvas=document.createElement("canvas"); canvas.width=bounds; canvas.height=boundsH;
  const ctx=canvas.getContext("2d"); if(!ctx) throw new Error("Canvas tidak tersedia");
  ctx.translate(bounds/2,boundsH/2); ctx.rotate(radians); ctx.translate(-image.width/2,-image.height/2); ctx.drawImage(image,0,0);
  const out=document.createElement("canvas"); out.width=area.width; out.height=area.height;
  out.getContext("2d")?.drawImage(canvas,area.x,area.y,area.width,area.height,0,0,area.width,area.height);
  return out.toDataURL("image/png");
}
