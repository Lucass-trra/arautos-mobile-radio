# External Media Control Implementation

## Overview
This implementation replaces `expo-av` with `react-native-track-player` to enable external media controls in the notification bar for both Android and iOS platforms.

## Changes Made

### 1. Dependencies
- **Added**: `react-native-track-player@4.1.1` - Provides native media control support
- **Kept**: `expo-av` - Kept for backward compatibility if needed

### 2. Configuration Files

#### app.json
- Added `react-native-track-player` plugin
- Added Android permissions:
  - `FOREGROUND_SERVICE` - Required for background audio
  - `FOREGROUND_SERVICE_MEDIA_PLAYBACK` - Required for media playback in foreground service
  - `WAKE_LOCK` - Keeps device awake during playback

#### package.json
- Updated main entry point from `expo-router/entry` to `index.js`
- Added `react-native-track-player` to expo doctor exclusions

### 3. New Files

#### index.js
Entry point that registers the TrackPlayer playback service before loading the expo-router entry.

#### src/services/trackPlayerService.ts
Service layer that provides:
- `setupPlayer()` - Initializes TrackPlayer with notification capabilities
- `addTrack()` - Adds the radio stream with metadata
- `playbackService()` - Handles remote control events (play, pause, stop)

### 4. Modified Files

#### src/app/(drawer)/index.tsx
- Replaced expo-av Audio with TrackPlayer
- Uses `usePlaybackState()` hook to track playback state
- Properly handles player setup and cleanup
- Maintains volume control functionality

## Features

### Internal Controls (In-App)
- Play/Pause button
- Volume control (mute/unmute)
- Real-time playback state updates

### External Controls (Notification Bar)
- **Android**: Media notification with play/pause controls
- **iOS**: Lock screen and control center integration
- Track information display:
  - Title: "Web Radio Arautos AD Taquari"
  - Artist: "Rádio Arautos"
  - Artwork: App icon

### Background Playback
- Continues playing when app is in background
- Maintains playback state across app lifecycle
- Supports system audio interruptions

## Testing Recommendations

### In-App Testing
1. Open the app
2. Press play button - audio should start
3. Press pause button - audio should stop
4. Toggle volume control - audio should mute/unmute
5. Navigate away from player screen - audio should continue

### External Controls Testing (Android)
1. Start playing audio in the app
2. Press home button or switch to another app
3. Pull down notification shade
4. Verify media notification appears with:
   - App icon
   - "Web Radio Arautos AD Taquari" title
   - Play/Pause button
5. Test play/pause from notification - should control playback
6. Test closing notification - should stop playback

### Background Playback Testing
1. Start playing audio
2. Lock device screen
3. Verify audio continues playing
4. Unlock device and verify UI reflects correct state

### External Controls Testing (iOS)
1. Start playing audio in the app
2. Lock device or go to home screen
3. Open Control Center (swipe down from top-right)
4. Verify media controls appear
5. Test play/pause from Control Center
6. Test from lock screen media controls

## Important Notes

### Development vs Production
- **Expo Go**: External controls will NOT work. The app must be built as a standalone app.
- **Development Build**: Run `npx expo prebuild` then `npx expo run:android` or `npx expo run:ios`
- **Production Build**: External controls will work in EAS builds or standalone APK/IPA

### Platform Differences
- **Android**: Requires foreground service permissions (already configured)
- **iOS**: Background audio modes already configured in app.json

### Troubleshooting
1. **No notification appears**: 
   - Verify you're not using Expo Go
   - Check that Android permissions are granted
   - Rebuild the app after changes

2. **Audio stops when backgrounded**:
   - Verify FOREGROUND_SERVICE permission is granted
   - Check battery optimization settings (Android)

3. **Controls don't respond**:
   - Verify playbackService is properly registered
   - Check console for errors during setup

## Migration from expo-av

The key differences:
- No need to manually configure audio mode (handled by TrackPlayer)
- Player setup is asynchronous and happens once on mount
- Use `usePlaybackState()` hook instead of local state
- Volume control via `TrackPlayer.setVolume()` instead of `sound.setVolumeAsync()`
- Automatic notification and remote control support

## Future Enhancements

Possible improvements:
1. Add skip forward/backward controls (if needed for multi-track)
2. Add artwork loading from remote URL
3. Add metadata updates for song information (if streaming provides it)
4. Add playback speed controls
5. Add buffering state UI feedback
6. Add network error handling and retry logic
