import { initNav } from './nav.js';
initNav('/final/contact.html');

const params = new URLSearchParams(location.search);
const out = document.querySelector('#results');

const fields = [
  ['First name','first'],
  ['Last name','last'],
  ['Email','email'],
  ['Message','message'],
  ['Timestamp','ts']
];

out.innerHTML = `<ul>` + fields.map(([label,key])=>{
  const v = params.get(key) || '—';
  return `<li><strong>${label}:</strong> ${v}</li>`;
}).join('') + `</ul>`;