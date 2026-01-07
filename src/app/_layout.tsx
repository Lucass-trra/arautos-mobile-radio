import { Loading } from '@/screens/Loading';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

// Previne que a splash screen nativa feche automaticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts(Feather.font);

  useEffect(() => {
    if (fontError) {
      console.warn('Erro ao carregar fontes', fontError);
    }
  }, [fontError]);

  useEffect(() => {
    let isMounted = true;

    async function prepare() {
      if (!fontsLoaded) return;

      try {
        // Coloque aqui outros assets que precisam estar prontos antes de sair do loading
        const assetPromises: Promise<unknown>[] = [];

        await Promise.all(assetPromises);
      } catch (e) {
        console.warn('Erro ao preparar assets', e);
      } finally {
        if (isMounted) {
          setAppIsReady(true);
        }
      }
    }

    prepare();

    return () => {
      isMounted = false;
    };
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Mostre a tela de loading customizada enquanto o app não está pronto
  if (!appIsReady) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack>
        <Stack.Screen 
          name="(drawer)" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
