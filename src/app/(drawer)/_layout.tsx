import { Feather } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { Drawer } from 'expo-router/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Layout() {
    return (
        <Drawer
            screenOptions={{
                headerShown: false,
                drawerType: 'slide',
                drawerStyle: {
                    backgroundColor: '#0a0a0a',
                    width: 310,
                },
                overlayColor: 'rgba(0,0,0,0.7)',
                
                headerStyle: {
                    borderWidth: 0,
                    backgroundColor: '#121212',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                
                headerTintColor: '#ffffff', 
                headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 20,
                    letterSpacing: -0.3,
                },

                headerStatusBarHeight: 0,
                
                drawerActiveTintColor: '#1db954',
                drawerInactiveTintColor: '#a7a7a7',
                drawerActiveBackgroundColor: 'rgba(29, 185, 84, 0.12)',
                
                drawerLabelStyle: {
                    fontSize: 15,
                    fontWeight: '600',
                    letterSpacing: 0.2,
                },
                
                drawerItemStyle: {
                    borderRadius: 10,
                    marginHorizontal: 16,
                    paddingLeft: 12,
                    paddingVertical: 4,
                    marginVertical: 2,
                },
            }}
            drawerContent={(props) => (
                <DrawerContentScrollView 
                    {...props}
                    contentContainerStyle={styles.drawerContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.headerContainer}>
                        <View style={styles.headerTop}>
                            <View style={styles.logoWrapper}>
                                <LinearGradient
                                    colors={['#1db954', '#17a34a']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.logoGradient}
                                >
                                    <Image
                                        source={require('../../../assets/images/favicon.png')}
                                        style={styles.logo}
                                        resizeMode="cover"
                                    />
                                </LinearGradient>
                            </View>
                        </View>

                        <View style={styles.headerContent}>
                            <Text style={styles.headerTitle}>Rádio Arautos</Text>
                            <Text style={styles.headerSubtitle}>AD Taquari</Text>
                            <View style={styles.liveBadge}>
                                <View style={styles.liveDot} />
                                <Text style={styles.liveText}>AO VIVO</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.menuSection}>
                        <Text style={styles.sectionTitle}>NAVEGAÇÃO</Text>
                        <DrawerItemList {...props} />
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.footerDivider} />
                        <Text style={styles.footerText}>Rádio Arautos</Text>
                        <Text style={styles.footerVersion}>v1.0.0</Text>
                    </View>
                </DrawerContentScrollView>
            )}>
                
            <Drawer.Screen
                name="index"
                options={{ 
                    title: 'Player',
                    drawerIcon: ({ color, size }) => <Feather name="radio" size={20} color={color} />,
                    headerShown: false,
                }}  
            />
            <Drawer.Screen
                name="menu"
                options={{ 
                    title: 'Contato',
                    drawerIcon: ({ color, size }) => <Feather name="message-circle" size={20} color={color} />
                }}
            />

            <Drawer.Screen
                name="about"
                options={{ 
                    title: 'Sobre',
                    drawerIcon: ({ color, size }) => <Feather name="help-circle" size={20} color={color} />
                }}
            />
        </Drawer>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    
    headerContainer: {
        backgroundColor: '#121212',
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 24,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderRadius: 20,
    },

    headerTop: {
        alignItems: 'center',
        marginBottom: 20,
    },

    logoWrapper: {
        shadowColor: '#1db954',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 12,
    },

    logoGradient: {
        width: 90,
        height: 90,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },

    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 20
    },

    headerContent: {
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
        letterSpacing: -0.5,
        textAlign: 'center',
    },

    headerSubtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#a7a7a7',
        marginTop: 4,
        textAlign: 'center',
        letterSpacing: 0.3,
    },

    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(29, 185, 84, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: 'rgba(29, 185, 84, 0.3)',
    },

    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#1db954',
        marginRight: 6,
    },

    liveText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#1db954',
        letterSpacing: 0.8,
    },

    menuSection: {
        flex: 1,
        paddingTop: 16,
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6a6a6a',
        letterSpacing: 1.2,
        paddingHorizontal: 28,
        paddingBottom: 12,
        paddingTop: 8,
    },

    footer: {
        paddingHorizontal: 24,
        paddingVertical: 28,
        marginTop: 'auto',
    },

    footerDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        marginBottom: 20,
    },

    footerText: {
        fontSize: 11.5,
        color: '#7a7a7a',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 17,
        letterSpacing: 0.2,
    },

    footerVersion: {
        fontSize: 10.5,
        color: '#4a4a4a',
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});