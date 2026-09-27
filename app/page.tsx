 "use client";
import {useState} from "react";
type Hit={project_id:string,title:string,description:string,author:string,downloads:number,project_type:string,versions:string[],categories:string[]};
export default function Home(){
 const [type,setType]=useState("mod"),[q,setQ]=useState(""),[game,setGame]=useState("1.21.11"),[loader,setLoader]=useState("fabric"),[hits,setHits]=useState<Hit[]>([]),[msg,setMsg]=useState("");
 async function search(){setMsg("Searching Modrinth...");const r=await fetch(`/api/modrinth/search?q=${encodeURIComponent(q)}&type=${type}&game=${encodeURIComponent(game)}&loader=${loader}`);const d=await r.json();setHits(d.hits||[]);setMsg(`${(d.hits||[]).length} results`)}
 async function install(x:Hit){setMsg(`Selected ${x.title}. Checking compatible versions...`);const r=await fetch(`/api/modrinth/versions?id=${x.project_id}&game=${encodeURIComponent(game)}&loader=${loader}`);const v=await r.json();if(!Array.isArray(v)||!v.length){setMsg("No compatible version found.");return}const f=v[0]?.files?.find((z:any)=>z.primary)||v[0]?.files?.[0];setMsg(`Ready to install: ${f?.filename||x.title}. A connected node-agent can download this verified Modrinth file into the server.`)}
 return <><header><b>🏴‍☠️ PIRATESNODES</b><span>Owner • Modrinth Installer</span></header><main>
 <h1>🔌 Plugin & 🧩 Mod Installer</h1><p className="muted">Search Modrinth projects and select compatible versions for a Minecraft server.</p>
 <div className="tabs"><button className={type==="mod"?"active":""} onClick={()=>setType("mod")}>🧩 Mods</button><button className={type==="plugin"?"active":""} onClick={()=>setType("plugin")}>🔌 Plugins</button></div>
 <div className="search"><input placeholder="Search Modrinth..." value={q} onChange={e=>setQ(e.target.value)} /><input className="select" value={game} onChange={e=>setGame(e.target.value)} placeholder="Minecraft version"/><select className="select" value={loader} onChange={e=>setLoader(e.target.value)}><option>fabric</option><option>forge</option><option>neoforge</option><option>paper</option><option>purpur</option></select><button onClick={search}>🔎 Search</button></div>
 <div className="msg">{msg||"Choose Mods or Plugins and search."}</div>
 <div className="grid">{hits.map(x=><div className="card" key={x.project_id}><h3>{x.title}</h3><p className="muted">{x.description}</p><span className="tag">{x.author} • {x.downloads.toLocaleString()} downloads</span><br/><button className="install" onClick={()=>install(x)}>Install / Select Version</button></div>)}</div>
 </main></>
}