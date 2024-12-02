'use client';

import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

export const OneSignalInitial = () => {
  useEffect(() => {
    const oneSignalInit = async () => {
      await OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || '',
        notifyButton: {
          enable: true,
        },
      }).then(() => {
        OneSignal.Slidedown.promptPush();
      });
    };
    oneSignalInit();
  }, []);
  return null;
};
