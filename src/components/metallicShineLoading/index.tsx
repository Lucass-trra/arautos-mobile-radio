import { globalStyles } from "@/styles/global";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef } from "react";
import { Animated, AppState, Easing, Image, StyleSheet, View } from "react-native";
import { styles } from "./styles";

export default function MetallicShineLoading() {
    const shimmer = useRef(new Animated.Value(0)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);
    const appStateRef = useRef(AppState.currentState);

    const translateX = useMemo(
        () => shimmer.interpolate({
            inputRange: [0, 1],
            outputRange: [-120, 120],
        }),
        [shimmer]
    );

    useEffect(() => {
        const startAnim = () => {
            shimmer.setValue(0);
            const anim = Animated.loop(
                Animated.timing(shimmer, {
                    toValue: 1,
                    duration: 1600,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );
            animationRef.current = anim;
            anim.start();
        };

        const stopAnim = () => {
            animationRef.current?.stop();
            animationRef.current = null;
        };

        startAnim();

        const sub = AppState.addEventListener('change', (next) => {
            appStateRef.current = next;
            if (next === 'active') {
                if (!animationRef.current) startAnim();
            } else {
                stopAnim();
            }
        });

        return () => {
            sub.remove();
            stopAnim();
        };
    }, [shimmer]);

    return(
        <MaskedView
            style={styles.imageContainer}
            maskElement={
                <View style={styles.maskWrapper}>
                    <Image 
                        source={require("../../../assets/images/logo-loading.png")} 
                        style={styles.image}
                    />
                </View>
            }
        >
            <View style={styles.imageBackground}>
                <Image 
                    source={require("../../../assets/images/logo-loading.png")} 
                    style={[styles.image, { tintColor: globalStyles.gray2 }]}
                />
            </View>
            <View style={styles.shimmerTrack} collapsable={false} renderToHardwareTextureAndroid>
                <Animated.View style={[styles.gradientStrip, { transform: [{ translateX }] }]}>
                    <LinearGradient
                        colors={['transparent', 'rgba(255, 255, 255, 1)', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFillObject}
                    />
                </Animated.View>
            </View>
        </MaskedView>
    )
}


