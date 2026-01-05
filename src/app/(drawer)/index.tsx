import { Feather } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React, { ComponentProps, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const { width, height } = Dimensions.get('window');

export default function Player() {
    const navigation = useNavigation();
    const videoRef = useRef<Video>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);
    
    // Animações para as ondas - 40 barras
    const waveAnimations = useRef(
        Array.from({ length: 40 }, () => new Animated.Value(Math.random()))
    ).current;
    
    const animationRef = useRef<any>(null);

    const radioUrl = 'https://stm1.conectastreaming.com:7016/;?type=http&nocache=3';
    const videoSource = require('../../../assets/images/background.mp4');

    useEffect(() => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DuckOthers,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        });
    }, []);

    // Anima as ondas quando está tocando
    useEffect(() => {
        if (isPlaying) {
            // Cria padrões de animação mais realistas para cada barra
            const animations = waveAnimations.map((anim, index) => {
                // Barras do meio têm mais movimento (simulando graves)
                const isCenterBar = index >= 15 && index <= 25;
                const intensityMultiplier = isCenterBar ? 1.2 : 1.0;
                
                return Animated.loop(
                    Animated.sequence([
                        // Sobe rápido (ataque)
                        Animated.timing(anim, {
                            toValue: (0.6 + Math.random() * 0.4) * intensityMultiplier,
                            duration: 50 + Math.random() * 30,
                            useNativeDriver: false,
                        }),
                        // Desce mais devagar (decay)
                        Animated.timing(anim, {
                            toValue: 0.2 + Math.random() * 0.3,
                            duration: 100 + Math.random() * 50,
                            useNativeDriver: false,
                        }),
                        // Micro pausa
                        Animated.timing(anim, {
                            toValue: 0.15 + Math.random() * 0.25,
                            duration: 30,
                            useNativeDriver: false,
                        }),
                    ])
                );
            });
            
            // Inicia com delay escalonado para parecer mais natural
            animations.forEach((anim, index) => {
                setTimeout(() => anim.start(), index * 15);
            });
            
            animationRef.current = animations;
        } else {
            // Para todas as animações imediatamente
            if (animationRef.current) {
                animationRef.current.forEach((anim: any) => anim.stop());
            }
            // Reseta todas as barras para altura mínima
            waveAnimations.forEach(anim => {
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: false,
                }).start();
            });
        }
        
        return () => {
            if (animationRef.current) {
                animationRef.current.forEach((anim: any) => anim.stop());
            }
        };
    }, [isPlaying]);

    useEffect(() => {
        (async () => {
            if (!sound) return;
            try {
                await sound.setVolumeAsync(isSoundOn ? 1.0 : 0.0);
            } catch (e) { console.warn(e); }
        })();
    }, [isSoundOn, sound]);

    useEffect(() => {
        return () => {
            (async () => {
                if (sound) {
                    try { await sound.unloadAsync(); } catch {}
                }
            })();
        };
    }, [sound]);

    const playOrPauseIcon: ComponentProps<typeof Feather>['name'] = isPlaying ? 'pause' : 'play';

    async function playRadio() {
        if (sound) {
            try {
                await sound.unloadAsync();
            } catch (error) {
                console.warn('Erro ao descarregar som anterior:', error);
            }
        }
        
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: radioUrl },
                { shouldPlay: true, volume: isSoundOn ? 1.0 : 0.0 }
            );
            
            // Monitora o status do som
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setIsPlaying(status.isPlaying);
                }
            });
            
            setSound(newSound);
            setIsPlaying(true);
        } catch (error) {
            console.error('Erro ao carregar o stream de rádio', error);
            setIsPlaying(false);
        }
    }

    async function stopRadio() {
        setIsPlaying(false); // Atualiza IMEDIATAMENTE
        
        if (sound) {
            try {
                await sound.unloadAsync();
                setSound(null);
            } catch (error) {
                console.warn('Erro ao parar rádio:', error);
            }
        }
    }

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* VÍDEO DE FUNDO LOCAL */}
            <Video
                ref={videoRef}
                source={videoSource}
                style={styles.videoBackground}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
                rate={1.0}
            />

            {/* OVERLAY ESCURO SOBRE O VÍDEO */}
            <View style={styles.videoOverlay} />

            {/* GRADIENTE PRETO NA PARTE INFERIOR */}
            <LinearGradient
                colors={['transparent', 'transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)', '#000000']}
                locations={[0, 0.3, 0.5, 0.65, 0.8, 1]}
                style={styles.bottomGradient}
            />

            {/* CONTEÚDO */}
            <View style={styles.content}>
                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <Feather name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.nowPlaying}>Agora tocando</Text>
                    <TouchableOpacity style={styles.heartButton}>
                        <Feather name="heart" size={26} color="#ff3b4f" />
                    </TouchableOpacity>
                </View>

                {/* CAPA DO ÁLBUM */}
                <View style={styles.albumContainer}>
                    <LinearGradient
                        colors={['rgba(108, 108, 108, 0.8)', 'rgba(86, 86, 86, 0.9)', 'rgba(90, 90, 90, 0.95)']}
                        style={styles.albumCover}
                    >
                        <View style={styles.albumContent}>
                            <Image 
                                source={require('../../../assets/images/image.png')} 
                                style={styles.albumImage}
                                resizeMode="cover"
                            />
                        </View>
                    </LinearGradient>
                </View>

                {/* TÍTULO E ARTISTA */}
                <View style={styles.songInfo}>
                    <Text style={styles.songTitle}>Rádio Arautos</Text>
                    <Text style={styles.artistName}>Assembleia de Deus Taquari</Text>
                </View>

                {/* ESPECTRO DE FREQUÊNCIA ANIMADO - POSICIONADO NO BOTÃO */}
                <View style={styles.spectrumButtonContainer}>
                    {/* ONDAS TRASEIRAS (ESQUERDA) */}
                    <View style={styles.waveformLeft}>
                        {waveAnimations.slice(0, 20).map((anim, i) => {
                            const maxHeights = [18, 32, 25, 42, 30, 50, 35, 58, 40, 52, 32, 48, 28, 52, 38, 62, 42, 56, 32, 45];
                            const minHeight = 8;
                            
                            const animatedHeight = anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [minHeight, maxHeights[i]],
                            });
                            
                            return (
                                <Animated.View
                                    key={i}
                                    style={[
                                        styles.waveBar,
                                        {
                                            height: animatedHeight,
                                            opacity: isPlaying ? 0.85 : 0.3,
                                        }
                                    ]}
                                />
                            );
                        })}
                    </View>

                    {/* BOTÃO PLAY/PAUSE NO CENTRO */}
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        style={styles.playButtonOuter} 
                        onPress={() => (isPlaying ? stopRadio() : playRadio())}
                    >
                        <View style={styles.playButtonMiddle}>
                            <View style={styles.playButtonInner}>
                                <Feather 
                                    name={playOrPauseIcon} 
                                    size={36} 
                                    color="#000" 
                                    style={{ marginLeft: isPlaying ? 0 : 3 }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* ONDAS FRONTAIS (DIREITA) */}
                    <View style={styles.waveformRight}>
                        {waveAnimations.slice(20, 40).map((anim, i) => {
                            const maxHeights = [45, 32, 56, 42, 62, 38, 52, 28, 48, 32, 52, 40, 58, 35, 50, 30, 42, 25, 32, 18];
                            const minHeight = 8;
                            
                            const animatedHeight = anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [minHeight, maxHeights[i]],
                            });
                            
                            return (
                                <Animated.View
                                    key={i}
                                    style={[
                                        styles.waveBar,
                                        {
                                            height: animatedHeight,
                                            opacity: isPlaying ? 0.85 : 0.3,
                                        }
                                    ]}
                                />
                            );
                        })}
                    </View>
                </View>

                {/* CONTROLES */}
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.controlBtn}>
                        <Feather name="shuffle" size={20} color="#fff" opacity={0.5} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.controlBtn}>
                        <View style={styles.skipButton}>
                            <Feather name="skip-back" size={28} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.controlBtn}
                        onPress={() => setIsSoundOn(!isSoundOn)}
                    >
                        <View style={styles.skipButton}>
                            <Feather 
                                name={isSoundOn ? "volume-2" : "volume-x"} 
                                size={28} 
                                color="#fff" 
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.controlBtn}>
                        <Feather name="repeat" size={20} color="#fff" opacity={0.5} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    videoBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },

    videoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },

    bottomGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },

    content: {
        flex: 1,
        paddingTop: 50,
    },

    // HEADER
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 30,
    },

    backButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },

    nowPlaying: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 0.3,
    },

    heartButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,59,79,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // ALBUM COVER
    albumContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },

    albumImage: {
    width: '100%',
    height: '100%',
    opacity: .9,
    borderRadius: 12,
    },

    albumCover: {
        width: width * 0.85,
        height: width * 0.85,
        borderRadius: 12,
        overflow: 'hidden',
    },

    albumContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // SONG INFO
    songInfo: {
        alignItems: 'center',
        marginBottom: 45,
    },

    songTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 6,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },

    artistName: {
        fontSize: 20,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '400',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },

    // ESPECTRO + BOTÃO
    spectrumButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        paddingHorizontal: 20,
    },

    waveformLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
        gap: 3,
        marginRight: 15,
    },

    waveformRight: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
        gap: 3,
        marginLeft: 15,
    },

    waveBar: {
        width: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
    },

    // PLAY BUTTON
    playButtonOuter: {
        width: 90,
        height: 90,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },

    playButtonMiddle: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderWidth: 2.5,
        borderColor: 'rgba(255,255,255,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    playButtonInner: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // CONTROLS
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        marginBottom: 40,
        paddingHorizontal: 40,
    },

    controlBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    skipButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },

    // LYRICS
    lyricsContainer: {
        alignItems: 'center',
        paddingHorizontal: 40,
    },

    lyricsText: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        lineHeight: 24,
    },
});