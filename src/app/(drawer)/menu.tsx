import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
    Linking,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

export default function Menu() {
    const { width } = useWindowDimensions();
    const isWeb = Platform.OS === "web" || width >= 900;
    const navigation = useNavigation();

    const titleSize = isWeb ? 32 : 26;
    const subtitleSize = isWeb ? 17 : 15;

    const handleContact = (type: "whatsapp" | "website" | "email") => {
        const contacts = {
            whatsapp: "https://wa.me/5551999999999",
            website: "https://adtaquari.com.br",
            email: "mailto:contato@adtaquari.com.br",
        };

        Linking.openURL(contacts[type]);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent />

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
                {/* HEADER */}
                <View style={styles.header}>
                    <Pressable
                        style={styles.menuButton}
                        onPress={() =>
                            navigation.dispatch(DrawerActions.openDrawer())
                        }
                    >
                        <Feather name="menu" size={28} color="#fff" />
                    </Pressable>

                    <Text style={styles.headerTitle}>Contato</Text>
                    
                    <View style={styles.menuButtonSpacer} />

                </View>

                {/* HERO */}
                <View style={styles.heroSection}>
                    <View style={styles.iconContainer}>
                        <View style={styles.iconCircle}>
                            <Feather
                                name="message-circle"
                                size={36}
                                color="#fff"
                            />
                        </View>
                    </View>

                    <Text style={[styles.title, { fontSize: titleSize }]}>
                        Conecte-se com a gente
                    </Text>

                    <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
                        Estamos aqui para ouvir você. Dúvidas, pedidos de oração ou
                        sugestões — entre em contato!
                    </Text>
                </View>

                {/* CONTEÚDO */}
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>CANAIS DE CONTATO</Text>

                    <Pressable
                        style={styles.contactCard}
                        onPress={() => handleContact("whatsapp")}
                    >
                        <View
                            style={[
                                styles.iconBg,
                                { backgroundColor: "rgba(37,211,102,0.15)" },
                            ]}
                        >
                            <Feather
                                name="message-circle"
                                size={24}
                                color="#25D366"
                            />
                        </View>

                        <View style={styles.contactInfo}>
                            <Text style={styles.contactTitle}>WhatsApp</Text>
                            <Text style={styles.contactDescription}>
                                Resposta rápida
                            </Text>
                        </View>

                        <Feather name="chevron-right" size={20} color="#9ca3af" />
                    </Pressable>

                    <Pressable
                        style={styles.contactCard}
                        onPress={() => handleContact("website")}
                    >
                        <View
                            style={[
                                styles.iconBg,
                                { backgroundColor: "rgba(99,102,241,0.15)" },
                            ]}
                        >
                            <Feather name="globe" size={24} color="#6366f1" />
                        </View>

                        <View style={styles.contactInfo}>
                            <Text style={styles.contactTitle}>Website</Text>
                            <Text style={styles.contactDescription}>
                                Visite nosso site
                            </Text>
                        </View>

                        <Feather name="chevron-right" size={20} color="#9ca3af" />
                    </Pressable>

                    <Pressable
                        style={styles.contactCard}
                        onPress={() => handleContact("email")}
                    >
                        <View
                            style={[
                                styles.iconBg,
                                { backgroundColor: "rgba(239,68,68,0.15)" },
                            ]}
                        >
                            <Feather name="mail" size={24} color="#ef4444" />
                        </View>

                        <View style={styles.contactInfo}>
                            <Text style={styles.contactTitle}>E-mail</Text>
                            <Text style={styles.contactDescription}>
                                Mensagem detalhada
                            </Text>
                        </View>

                        <Feather name="chevron-right" size={20} color="#9ca3af" />
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

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
        height: Platform.OS === "web" ? 320 : 340,
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

    contactCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
    },

    iconBg: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },

    contactInfo: {
        flex: 1,
    },

    contactTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111",
    },


    menuButtonSpacer: {
    width: 48,
    height: 48,
    },

    contactDescription: {
        fontSize: 13,
        color: "#9ca3af",
    },
});
