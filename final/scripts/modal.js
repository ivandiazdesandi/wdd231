// Simple accessible dialog wrapper
export function openModal(html){
  let dlg = document.querySelector('dialog.modal');
  if(!dlg){
    dlg = document.createElement('dialog');
    dlg.className = 'modal';
    document.body.appendChild(dlg);
  }
  dlg.innerHTML = html;
  const close = () => dlg.close();
  dlg.addEventListener('close', ()=> dlg.blur(), {once:true});
  dlg.showModal();

  // close buttons
  dlg.querySelectorAll('[data-close]').forEach(b=> b.addEventListener('click', close));
}