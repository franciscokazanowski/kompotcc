'use client';
import { Download, X } from 'lucide-react';
import type { usePwaInstall } from '@/hooks/use-pwa-install';

export function InstallKompo({ install, persistent = false }: { install: ReturnType<typeof usePwaInstall>; persistent?: boolean }) {
  if (!install.ready || install.installed || (!persistent && !install.visible)) return null;
  return <aside className="install-card" aria-label="Instalar a Kompô">
    <img src="/icons/icon-192.png" alt="" width="48" height="48"/>
    <div className="install-copy"><h2>Instale a Kompô</h2><p>Abra pelo ícone no celular ou computador. Não precisa de login para instalar.</p></div>
    <button className="button small" onClick={() => void install.install()}><Download size={16}/>Instalar Kompô</button>
    {!persistent && <button className="icon-button install-dismiss" aria-label="Lembrar da instalação em outro momento" onClick={install.dismiss}><X size={17}/></button>}
    {install.instructions && <p className="install-instructions" role="status">{install.instructions}</p>}
  </aside>;
}
