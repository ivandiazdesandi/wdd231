// Data access with robust error handling
export async function loadTrails(){
  try{
    const res = await fetch('data/trails.json');
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if(!Array.isArray(data)) throw new Error('Bad JSON shape');
    return data;
  }catch(err){
    console.error('Failed to load trails:', err);
    return [];
  }
}