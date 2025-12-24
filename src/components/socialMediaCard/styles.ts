import { globalStyles } from "@/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    socialMediaButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 540,
        alignSelf: 'center',
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
    },

    socialMediaAllInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    socialMediaText: {
        fontSize: 18,
        color: globalStyles.black1,
    }
});