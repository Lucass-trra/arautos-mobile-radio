import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './src/services/trackPlayerService';

// Register the playback service
TrackPlayer.registerPlaybackService(() => playbackService);

// This is required for expo-router
import 'expo-router/entry';
