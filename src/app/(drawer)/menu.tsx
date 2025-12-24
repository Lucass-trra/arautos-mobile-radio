import { SocialMediaCard } from "@/components/socialMediaCard";
import { globalStyles } from "@/styles/global";
import { Feather } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, View, useWindowDimensions } from "react-native";

export default function Menu() {
    const { width } = useWindowDimensions();
    const isWeb = Platform.OS === 'web' || width >= 900;

    // ajuste responsivo: aumente valores para web / telas largas
    const titleSize = isWeb ? 30 : 22;
    const subtitleSize = isWeb ? 18 : 14;
    const iconSize = isWeb ? 34 : 28;

    return (
        <View style={styles.container}>
            <View style={styles.headerWrap}>
                <Feather name="phone-call" size={iconSize} color={globalStyles.black1} />

                <View style={styles.headerTextWrap}>
                    <Text style={[styles.title, { fontSize: titleSize }]}>Conecte‑se com a gente</Text>
                    <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>Dúvidas, pedidos de oração e sugestões — estamos à disposição.</Text>
                </View>
            </View> 

            <View style={styles.cards}>
                <SocialMediaCard socialMediaName="instagram" iconColor={globalStyles.pinkInstagram} />
                <SocialMediaCard socialMediaName="facebook" iconColor={globalStyles.blueFacebook} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 30,
        gap: 18,
        alignItems: "center",
    },
    headerWrap: {
        width: "100%",
        maxWidth: 540,
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        backgroundColor: "#f5f5f7",
        padding: 14,
        borderRadius: 8,
    },

    headerTextWrap: {
        flex: 1,
        minWidth: 0,   // permite encolher corretamente no web
        flexShrink: 1,
    },

    title: {
        fontSize: 22, // valor base (será sobrescrito inline quando for web)
        fontWeight: "700",
        color: globalStyles.black1,
        overflow: 'hidden',
        flexWrap: 'wrap',
    },

    subtitle: {
        marginTop: 4,
        fontSize: 14, // valor base
        color: "#6b6b70",
        flexWrap: 'wrap',
    },

    cards: {
        width: "100%",
        maxWidth: 720,
        gap: 12,
    },
});