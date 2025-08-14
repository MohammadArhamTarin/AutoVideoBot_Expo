import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    try {
      setLoading(true);
      setStatus('Generating random video...');

      // Simple example: creating a text file as "video placeholder"
      const fileUri = FileSystem.documentDirectory + 'sample-video.txt';
      await FileSystem.writeAsStringAsync(fileUri, 'This is your generated video content.');

      setStatus(`Video saved at: ${fileUri}`);
    } catch (error) {
      setStatus('Error generating video: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎥 Auto Video Bot</Text>
      <Button title="Generate Video" onPress={generateVideo} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  status: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center'
  }
});
