import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

export default function About() {
    const { width } = useWindowDimensions();
    const isWeb = Platform.OS === "web" || width >= 900;
    const navigation = useNavigation();

    const titleSize = isWeb ? 32 : 26;
    const subtitleSize = isWeb ? 17 : 15;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent />

            {/* Background Gradient */}
            <LinearGradient
                colors={["#1db954", "#17a34a", "#0f7a38"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        style={styles.menuButton}
                        onPress={() =>
                            navigation.dispatch(DrawerActions.openDrawer())
                        }
                    >
                        <Feather name="menu" size={28} color="#fff" />
                    </Pressable>

                    <Text style={styles.headerTitle}>Sobre</Text>

                    {/* Spacer invisível para centralizar o título */}
                    <View style={styles.menuButtonSpacer} />
                </View>

                {/* Hero */}
                <View style={styles.heroSection}>
                    <View style={styles.iconContainer}>
                        <View style={styles.iconCircle}>
                            <Feather name="info" size={36} color="#fff" />
                        </View>
                    </View>

                    <Text style={[styles.title, { fontSize: titleSize }]}>
                        Rádio Arautos
                    </Text>

                    <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
                        Uma rádio cristã dedicada a anunciar o Evangelho,
                        fortalecer a fé e proclamar a volta do Senhor Jesus
                        Cristo.
                    </Text>
                </View>

                {/* Conteúdo */}
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>NOSSA MISSÃO</Text>

                    <View style={styles.infoCard}>
                        <Feather name="radio" size={22} color="#1db954" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.infoTitle}>
                                Evangelismo e edificação
                            </Text>
                            <Text style={styles.infoText}>
                                Levar a Palavra de Deus através da música,
                                mensagens, louvores e programações que edificam
                                vidas.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <Feather name="heart" size={22} color="#1db954" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.infoTitle}>
                                Comunhão e cuidado
                            </Text>
                            <Text style={styles.infoText}>
                                Criar um espaço de comunhão, oração e apoio
                                espiritual para todos que nos acompanham.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <Feather name="globe" size={22} color="#1db954" />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.infoTitle}>
                                Alcance sem fronteiras
                            </Text>
                            <Text style={styles.infoText}>
                                Através da internet, alcançar pessoas em
                                qualquer lugar, levando esperança e fé.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

/* =======================
   STYLES
======================= */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },

    gradientBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: Platform.OS === "web" ? 320 : 365,
    },

    scrollContent: {
        paddingBottom: 40,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
        marginBottom: 20,
    },

    menuButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.25)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
    },

    menuButtonSpacer: {
        width: 48,
        height: 48,
    },

    headerTitle: {
        flex: 1,
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },

    heroSection: {
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 40,
    },

    iconContainer: {
        marginBottom: 20,
    },

    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(255,255,255,0.25)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.35)",
    },

    title: {
        color: "#fff",
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 12,
    },

    subtitle: {
        color: "rgba(255,255,255,0.95)",
        textAlign: "center",
        lineHeight: 24,
        maxWidth: 520,
    },

    content: {
        paddingHorizontal: 20,
        marginTop: 24,
    },

    sectionTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#9ca3af",
        marginBottom: 16,
        letterSpacing: 1,
    },

    infoCard: {
        flexDirection: "row",
        gap: 16,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        marginBottom: 12,
    },

    infoTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 6,
        color: "#111",
    },

    infoText: {
        fontSize: 14,
        color: "#6b7280",
        lineHeight: 22,
    },
});
