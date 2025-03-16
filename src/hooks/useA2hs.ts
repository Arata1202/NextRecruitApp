import { useEffect, useState } from 'react';
import { BeforeInstallPromptEvent, Config } from '@/types/a2hs';

const isIOS = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

export const useA2hs = (
  config?: Config,
): [BeforeInstallPromptEvent | null, () => void, boolean] => {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOSUser, setIsIOSUser] = useState<boolean>(false);

  const promptToInstall = () => {
    if (promptEvent) promptEvent.prompt();
  };

  useEffect(() => {
    if (isIOS()) {
      setIsIOSUser(true);
      return;
    }

    const listener = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptEvent(e);
      e.userChoice
        .then((result) => {
          if (result.outcome === 'accepted') {
            if (config?.onAccepted) config.onAccepted();
          } else {
            if (config?.onDismissed) config.onDismissed();
          }
          return;
        })
        .catch(console.error);
    };

    window.addEventListener('beforeinstallprompt', listener as any);

    return () => {
      window.removeEventListener('beforeinstallprompt', listener as any);
    };
  }, [config]);

  return [promptEvent, promptToInstall, isIOSUser];
};
