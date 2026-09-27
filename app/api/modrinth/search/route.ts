export async function GET(req:Request){
 const u=new URL(req.url), q=u.searchParams.get("q")||"", type=u.searchParams.get("type")||"mod", game=u.searchParams.get("game")||"", loader=u.searchParams.get("loader")||"";
 const facets:string[][]=[["project_type:"+type]];
 if(game) facets.push(["versions:"+game]);
 if(loader) facets.push(["categories:"+loader]);
 const api="https://api.modrinth.com/v2/search?query="+encodeURIComponent(q)+"&limit=20&facets="+encodeURIComponent(JSON.stringify(facets));
 const r=await fetch(api,{next:{revalidate:30}}); if(!r.ok)return Response.json({error:"Modrinth search failed"},{status:502});
 return Response.json(await r.json());
}