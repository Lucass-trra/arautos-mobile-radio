import { Loading } from '@/screens/Loading';
import { globalStyles } from '@/styles/global';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

// Previne que a splash screen nativa feche automaticamente
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [fontsLoaded, fontError] = useFonts(Feather.font);
  const hasHiddenSplashRef = useRef(false);

  useEffect(() => {
    if (fontError) {
      console.warn('Erro ao carregar fontes', fontError);
    }
  }, [fontError]);

  // Inicia temporizador para tempo mínimo do loading (ex.: 1200ms)
  useEffect(() => {
    const MIN_LOADING_MS = 5000;
    const id = setTimeout(() => setMinTimeDone(true), MIN_LOADING_MS);
    return () => clearTimeout(id);
  }, []);

  // Prepara assets essenciais (ex.: fontes) em paralelo ao temporizador mínimo
  useEffect(() => {
    let isMounted = true;

    async function prepare() {
      if (!fontsLoaded) return;

      try {
        const assetPromises: Promise<unknown>[] = [];
        await Promise.all(assetPromises);
      } catch (e) {
        console.warn('Erro ao preparar assets', e);
      } finally {
        if (isMounted) setAssetsReady(true);
      }
    }

    prepare();
    return () => {
      isMounted = false;
    };
  }, [fontsLoaded]);

  // Libera o app somente quando tempo mínimo e assets estiverem prontos
  useEffect(() => {
    if (assetsReady && minTimeDone) {
      setAppIsReady(true);
    }
  }, [assetsReady, minTimeDone]);

  const onLayoutRootView = useCallback(async () => {
    // Deixe a tela de Loading esconder a splash no cold start.
    // Se já estivermos prontos (sem Loading), esconda aqui como fallback.
    if (appIsReady && !hasHiddenSplashRef.current) {
      try {
        await SplashScreen.hideAsync();
      } finally {
        hasHiddenSplashRef.current = true;
      }
    }
  }, [appIsReady]);

  return (
    <View style={{ flex: 1, backgroundColor: globalStyles.black1 }} onLayout={onLayoutRootView} collapsable={false}>
      {appIsReady ? (
        <Stack>
          <Stack.Screen
            name="(drawer)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      ) : (
        <Loading />
      )}
    </View>
  );
}
