import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Linking,
  StyleSheet,
  Platform,
} from 'react-native';

const StickyWebBar = () => (
  <View style={styles.stickyBar}>
    <TouchableOpacity
      style={styles.stickyButton}
      onPress={() => Linking.openURL('https://ldd-codecult.vercel.app')}>
      <Text style={styles.stickyText}>Try Web Version</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  stickyBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 24 : 0,
    backgroundColor: '#181818',
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#262626',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  stickyButton: {
    paddingVertical: 8, // smaller height
    paddingHorizontal: 28, // smaller width
    backgroundColor: 'green',
    borderRadius: 24,
    shadowColor: '#2ecc71',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.13,
    shadowRadius: 6,
    elevation: 4,
  },
  stickyText: {
    color: '#f4f4f4',
    fontSize: 16, // slightly smaller text
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
    textDecorationLine: 'none',
  },
});

export default StickyWebBar;
