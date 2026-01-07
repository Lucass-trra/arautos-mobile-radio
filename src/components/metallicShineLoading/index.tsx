import { globalStyles } from "@/styles/global";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";
import { styles } from "./styles";

export default function MetallicShineLoading() {
    const shimmerAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        shimmerAnimation.setValue(0);
        Animated.loop(
            Animated.timing(shimmerAnimation, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ).start();
    }, [shimmerAnimation]);

    const translateX = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-120, 200]
    });

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


