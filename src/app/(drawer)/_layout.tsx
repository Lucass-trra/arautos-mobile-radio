import { globalStyles } from '@/styles/global';
import { Feather } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Layout() {
    return (
        <Drawer
            screenOptions={{
                headerShown: true,
                drawerType: 'front',
                drawerStyle: {
                    backgroundColor: globalStyles.white2,
                    width: 295,
                },

                headerStyle: {
                    borderWidth: 0,
                    backgroundColor: globalStyles.black2,
                },
                
                headerTintColor: globalStyles.white1, 
                headerTitleStyle: {
                    fontWeight: '600'
                },

                drawerActiveTintColor: globalStyles.enphaisisColor,
                drawerInactiveTintColor: '#555',
                drawerLabelStyle: {
                    fontSize: 18,
                },
            }}
            drawerContent={(props) => (
                <DrawerContentScrollView {...props}>
                    <View style={styles.header}>
                        <Image
                            source={require('../../../assets/images/favicon.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <View>
                            <Text style={styles.headerTitle}>Web Rádio </Text>
                            <Text style={styles.headerTitle}>Arautos AD Taquari</Text>
                        </View>
                    </View>

                    <View style={styles.headerSeparator}></View>

                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            )}>
                
            <Drawer.Screen
                name="index"
                options={{ 
                    title: 'Player',
                    drawerIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />
                }}  
            />
            <Drawer.Screen
                name="menu"
                options={{ 
                    title: 'Menu',
                    drawerIcon: ({ color, size }) => <Feather name="users" size={size} color={color} />
                }}
            />

             <Drawer.Screen
                name="rateApp"
                options={{ 
                    title: 'Avaliar app',
                    drawerIcon: ({ color, size }) => <Feather name="star" size={size} color={color} />
                }}
            />

              <Drawer.Screen
                name="moreInfo"
                options={{ 
                    title: 'Mais',
                    drawerIcon: ({ color, size }) => <Feather name="more-horizontal" size={size} color={color} />
                }}
            />

            <Drawer.Screen
                name="share"
                options={{ 
                    title: 'Compartilhar',
                    drawerIcon: ({ color, size }) => <Feather name="share-2" size={size} color={color} />
                }}
            />

             <Drawer.Screen
                name="privatePolicy"
                options={{ 
                    title: 'Política de Privacidade',
                    drawerIcon: ({ color, size }) => <Feather name="lock" size={size} color={color} />
                }}
            />

            <Drawer.Screen
                name="addictionalPermission"
                options={{ 
                    title: 'Permissão Adicional',
                    drawerIcon: ({ color, size }) => <Feather name="shield" size={size} color={color} />
                }}
            />

            <Drawer.Screen
                name="about"
                options={{ 
                    title: 'Sobre',
                    drawerIcon: ({ color, size }) => <Feather name="info" size={size} color={color} />
                }}
            />
        </Drawer>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        gap: 20,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: globalStyles.white2,
    },

    headerSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#cbcbcbff',
        marginTop: 8,
        marginBottom: 8,
    },

    logo: {
        width: 40,
        height: 40,
        marginBottom: 8,
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: globalStyles.black2,
    },
});