const KEY = 'sct:favorites';

export function getFavorites(){
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
  catch { return []; }
}
export function isFav(id){ return getFavorites().includes(id); }

export function toggleFav(id){
  const cur = new Set(getFavorites());
  cur.has(id) ? cur.delete(id) : cur.add(id);
  localStorage.setItem(KEY, JSON.stringify([...cur]));
  return cur.has(id);
}