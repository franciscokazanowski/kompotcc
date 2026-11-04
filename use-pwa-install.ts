'use client';
import { useEffect, useRef, useState } from 'react';

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};
const DISMISS_KEY = 'kompo-install-later';

export function usePwaInstall() {
  const pending = useRef<InstallPrompt | null>(null);
  const [ready, setReady] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    const display = matchMedia('(display-mode: standalone)');
    const syncDisplay = () => setInstalled(display.matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true);
    syncDisplay();
    try { setDismissed(Number(localStorage.getItem(DISMISS_KEY)) > Date.now()); } catch { /* A instalação funciona sem armazenamento local. */ }
    setReady(true);
    function capture(event: Event) {
      event.preventDefault();
      pending.current = event as InstallPrompt;
    }
    function completed() { pending.current = null; setInstalled(true); setInstructions(''); }
    window.addEventListener('beforeinstallprompt', capture);
    window.addEventListener('appinstalled', completed);
    display.addEventListener('change', syncDisplay);
    return () => {
      window.removeEventListener('beforeinstallprompt', capture);
      window.removeEventListener('appinstalled', completed);
      display.removeEventListener('change', syncDisplay);
    };
  }, []);

  function showInstructions() {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setInstructions(ios
      ? 'No Safari, toque em Compartilhar e depois em Adicionar à Tela de Início. Confirme em Adicionar.'
      : /Android/.test(navigator.userAgent)
        ? 'No menu ⋮ do navegador, procure Instalar aplicativo ou Adicionar à tela inicial. Se estiver dentro de outro aplicativo, abra este endereço no Chrome primeiro.'
        : 'No Chrome ou Edge, procure o ícone de instalação na barra de endereço ou a opção Instalar no menu do navegador. No celular, abra este mesmo endereço no navegador.');
  }

  async function install() {
    const event = pending.current;
    if (!event) { showInstructions(); return; }
    pending.current = null;
    try {
      await event.prompt();
      const choice = await event.userChoice;
      if (choice.outcome === 'accepted') { setInstalled(true); setInstructions(''); }
    } catch { showInstructions(); }
  }

  function dismiss() {
    setDismissed(true);
    try { localStorage.setItem(DISMISS_KEY, String(Date.now() + 7 * 24 * 60 * 60 * 1000)); } catch { /* Vale para esta visita. */ }
  }

  return { ready, installed, visible: ready && !installed && !dismissed, instructions, install, dismiss };
}
