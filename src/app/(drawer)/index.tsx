import { globalStyles } from '@/styles/global';
import { Feather } from '@expo/vector-icons';
import React, { ComponentProps, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import { setupPlayer, addTrack } from '@/services/trackPlayerService';


export default function Player() {
    const playbackState = usePlaybackState();
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);

    useEffect(() => {
        async function setup() {
            try {
                await setupPlayer();
                await addTrack();
                setIsPlayerReady(true);
            } catch (error) {
                console.error('Error setting up player:', error);
            }
        }
        
        setup();

        return () => {
            (async () => {
                try {
                    await TrackPlayer.reset();
                } catch (error) {
                    console.error('Error resetting player:', error);
                }
            })();
        };
    }, []);

    // quando isSoundOn muda, ajusta volume no TrackPlayer
    useEffect(() => {
        (async () => {
            try {
                await TrackPlayer.setVolume(isSoundOn ? 1.0 : 0.0);
            } catch (e) { 
                console.warn(e); 
            }
        })();
    }, [isSoundOn]);

    const isPlaying = playbackState.state === State.Playing || playbackState.state === State.Buffering;
    const playOrPauseIcon: ComponentProps<typeof Feather>['name'] = isPlaying ? 'pause' : 'play';
    const soundIcon: ComponentProps<typeof Feather>['name'] = isSoundOn ? 'volume-2' : 'volume-x';

    async function playRadio() {
        try {
            await TrackPlayer.play();
        } catch (error) {
            console.error('Erro ao reproduzir o stream de rádio', error);
        }
    }

    async function stopRadio() {
        try {
            await TrackPlayer.pause();
        } catch (error) {
            console.error('Erro ao pausar o stream de rádio', error);
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
                disabled={!isPlayerReady}
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