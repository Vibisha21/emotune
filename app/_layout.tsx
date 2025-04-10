import { Slot, router } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // set to false initially

  useEffect(() => {
    const prepare = async () => {
      try {
        // Prevent splash from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        // Simulate auth check
        const auth = await fakeAuthCheck();
        setIsAuthenticated(auth);

        if (!auth) {
          router.replace('/login'); // redirect only AFTER layout is mounted
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return <Slot />;
}

const fakeAuthCheck = async () => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(false); // change to true if testing logged-in flow
    }, 1000);
  });
};
