import TrackPlayer, { Capability, Event, RepeatMode } from 'react-native-track-player';

export async function setupPlayer() {
    try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.Stop,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
            ],
            notificationCapabilities: [
                Capability.Play,
                Capability.Pause,
            ],
        });
    } catch (error) {
        console.error('Error setting up player:', error);
    }
}

export async function addTrack() {
    await TrackPlayer.add({
        id: 'arautos-radio-stream',
        url: 'https://stm1.conectastreaming.com:7016/;?type=http&nocache=3',
        title: 'Web Radio Arautos AD Taquari',
        artist: 'Rádio Arautos',
        artwork: require('../../assets/images/icon.png'),
        isLiveStream: true,
    });
}

export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemoteStop, () => {
        TrackPlayer.stop();
    });
}
