import MetallicShineLoading from "@/components/metallicShineLoading";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { styles } from "./styles";

export function Loading() {
  const didHideRef = useRef(false);
  const [showShimmer, setShowShimmer] = useState(false);

  const onLayout = useCallback(() => {
    if (didHideRef.current) return;
    didHideRef.current = true;
    // Esconde a splash após o primeiro layout desta tela
    requestAnimationFrame(() => {
      SplashScreen.hideAsync().catch(() => {});
      // Aguarda um tick para garantir que a splash saiu e então monta o shimmer
      setTimeout(() => setShowShimmer(true), 30);
    });
  }, []);

  // Em hot reload, a splash já estará escondida: garanta que o shimmer apareça
  useEffect(() => {
    const id = setTimeout(() => setShowShimmer(true), 0);
    return () => clearTimeout(id);
  }, []);
  return (
    <View style={styles.container} onLayout={onLayout} collapsable={false}>
      {/* Fallback simples para o primeiro frame (antes do MaskedView renderizar) */}
      <Image
        source={require("../../../assets/images/logo-loading.png")}
        style={{ width: 100, height: 100, opacity: 0.9, marginBottom: 0, position: 'absolute' }}
        resizeMode="contain"
      />
      {showShimmer && <MetallicShineLoading />}
    </View>
  );
}