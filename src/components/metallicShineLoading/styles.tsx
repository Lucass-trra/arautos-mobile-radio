import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({    
    imageContainer: {
        width: 100,
        height: 100,
    },

    maskWrapper: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },

    imageBackground: {
        width: 100,
        height: 100,
    },

    shimmerTrack: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 200,
        height: 200,
        overflow: 'hidden',
    },

    gradientStrip: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 120,
        height: '100%',
    },
})