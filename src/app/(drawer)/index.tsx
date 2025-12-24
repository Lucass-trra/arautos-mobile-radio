import { globalStyles } from '@/styles/global';
import { Feather } from '@expo/vector-icons';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import React, { ComponentProps, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Player() {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);

    const radioUrl = 'https://stm1.conectastreaming.com:7016/;?type=http&nocache=3';

    useEffect(() => {
        // configura áudio para background e comportamento em silêncio
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true, // mantém audio em background
            interruptionModeIOS: InterruptionModeIOS.DuckOthers, // abaixa volume de outros apps no IOS
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers, // abaixa volume de outros apps no Android
        });
    }, []);

    // quando isSoundOn muda, ajusta volume no objeto sound
    useEffect(() => {
        (async () => {
            if (!sound) return;
            try {
                await sound.setVolumeAsync(isSoundOn ? 1.0 : 0.0);
            } catch (e) { console.warn(e); }
        })();
    }, [isSoundOn, sound]);

    // cleanup correto ao desmontar
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
    const soundIcon: ComponentProps<typeof Feather>['name'] = isSoundOn ? 'volume-2' : 'volume-x';

    async function playRadio() {
        if (sound) {
        // Se já houver um som carregado, apenas o reproduz
        await sound.playAsync();
        setIsPlaying(true);
        } else {
        // Carrega o som a partir da URL
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: radioUrl },
            { shouldPlay: true }
            );
            setSound(newSound);
            setIsPlaying(true);
        } catch (error) {
            console.error('Erro ao carregar o stream de rádio', error);
        }
        }
    }

    async function stopRadio() {
        if (sound) {
        await sound.pauseAsync(); // Pausa a reprodução
        setIsPlaying(false);
        }
    }

    return(
        <View style={[styles.BaseStyles, styles.container]}>

            <View style={[styles.BaseStyles, styles.conteinerTitles]}>
                <Text style={styles.title}>Web Radio Arautos AD</Text>
                <Text style={styles.title}>Taquari</Text>
                <Text style={styles.subTitle}>Seja bem vindo!</Text>
            </View>

            <View style={[styles.BaseStyles, styles.containerPlayer]}>
                <TouchableOpacity 
                activeOpacity={0.7}
                style={styles.buttonPlayer} 
                onPress={() => (isPlaying ? stopRadio() : playRadio())}
                >
                    <Feather name={playOrPauseIcon} size={45} color={globalStyles.white1}/>
                </TouchableOpacity>

                <TouchableOpacity 
                activeOpacity={0.7}
                style={styles.buttonSound} 
                onPress={() => (isSoundOn ? setIsSoundOn(false) : setIsSoundOn(true))}
                >
                    <Feather name={soundIcon} size={30} color={globalStyles.white1}/>
                </TouchableOpacity>
            </View>
        </View>
    )   
}

const styles = StyleSheet.create({
    BaseStyles: {
        justifyContent: 'center',
        alignItems: 'center',
    }, 

    container: {
        flex: 1,
        width: '100%',
        backgroundColor: globalStyles.black1,
        gap: 12,
    },

    conteinerTitles: {
        marginBottom: 40,
        gap: 8,
    },

    containerPlayer: {
        flexDirection: 'column',
        width: '30%',
        gap: 40,
    },

    buttonPlayer: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: globalStyles.enphaisisColor,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonSound: {

    },

    title: {
        fontSize: 26,
        color: globalStyles.white2,
        fontWeight: 'bold',
    },

    subTitle: {
        fontSize: 20,
        color: globalStyles.white2,
        fontWeight: 'medium',
    }
});