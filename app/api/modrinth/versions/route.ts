export async function GET(req:Request){
 const u=new URL(req.url), id=u.searchParams.get("id")||"", game=u.searchParams.get("game")||"", loader=u.searchParams.get("loader")||"";
 if(!id)return Response.json({error:"Missing project id"},{status:400});
 const p=new URL("https://api.modrinth.com/v2/project/"+encodeURIComponent(id)+"/version");
 if(game)p.searchParams.set("game_versions",JSON.stringify([game]));
 if(loader)p.searchParams.set("loaders",JSON.stringify([loader]));
 const r=await fetch(p); if(!r.ok)return Response.json({error:"Version lookup failed"},{status:502});
 return Response.json(await r.json());
}