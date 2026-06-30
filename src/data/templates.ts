import templateOne from "@/assets/1.png";
import templateTwo from "@/assets/2.png";
import templateThree from "@/assets/3.png";

export type Template = {
  id:string;
  name:string;
  eyebrow:string;
  background:string;
  accent:string;
  image?:string;
  imageFit?:"fill"|"cover";
  width:number;
  height:number;
  tone?:"dark"|"light";
};

export const templates: Template[] = [
  { id:"pelindo-night", name:"Pelindo Night", eyebrow:"Template 1", accent:"#00c2ff", tone:"dark", image:templateOne.src, background:"#03213c", width:1122, height:1402 },
  { id:"pelindo-celebration", name:"Pelindo Celebration", eyebrow:"Template 2", accent:"#0077c8", tone:"light", image:templateTwo.src, background:"#e8f6ff", width:1086, height:1448 },
  { id:"pelindo-emerald", name:"Pelindo Emerald", eyebrow:"Template 3", accent:"#f6c453", tone:"dark", image:templateThree.src, background:"#054b4d", width:1672, height:941 },
  { id:"night", name:"Harbor Night", eyebrow:"Dermaga malam", accent:"#00c2ff", width:1080, height:1350, background:"radial-gradient(circle at 75% 16%,rgba(0,194,255,.32),transparent 24%),linear-gradient(160deg,#020c17 5%,#063158 58%,#005bac 120%)" },
  { id:"container", name:"Container Blue", eyebrow:"Energi logistik", accent:"#f6c453", width:1080, height:1350, background:"radial-gradient(circle at 20% 20%,rgba(246,196,83,.18),transparent 25%),linear-gradient(145deg,#061b33 0%,#005bac 58%,#002b52 100%)" },
  { id:"ocean", name:"Ocean Voyage", eyebrow:"Samudra modern", accent:"#61e4ff", width:1080, height:1350, background:"radial-gradient(circle at 80% 15%,rgba(97,228,255,.42),transparent 25%),linear-gradient(165deg,#03213c 0%,#0077c8 57%,#001d3b 100%)" },
];
