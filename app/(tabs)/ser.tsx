import React, { useState, useRef } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, SafeAreaView,
  ScrollView, ActivityIndicator
} from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import { Linking } from 'react-native';

export default function SimpleVoiceEmotionScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictedEmotion, setPredictedEmotion] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const startRecording = async () => {
    try {
      setPredictedEmotion(null);
      setRecommendations(null);
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        alert('Permission to access microphone is required!');
        return;
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (err) {
      console.error('Recording error:', err);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setIsPredicting(true);
      const recording = recordingRef.current;
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (!uri) return;

      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'audio.wav',
        type: 'audio/wav',
      } as any);

      const response = await axios.post('http://192.168.1.15:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setPredictedEmotion(response.data.emotion);
      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error('Prediction error:', err);
      alert('Something went wrong while processing the audio.');
    } finally {
      setIsPredicting(false);
    }
  };

const renderList = (items: string[]) => (
  items.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.recommendationItem}
      onPress={() => Linking.openURL(`https://www.google.com/search?q=${encodeURIComponent(item)}`)}
    >
      <Text style={styles.recommendationLink}>• {item}</Text>
    </TouchableOpacity>
  ))
);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Voice Emotion Detector</Text>

        {/* Recorder */}
        <View style={styles.recorderContainer}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={isRecording ? stopRecording : startRecording}>
            <View style={[styles.recordButtonInner, isRecording && styles.stopButtonInner]} />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </View>

        {/* Emotion */}
        <View style={styles.emotionContainer}>
          <Text style={styles.sectionTitle}>Predicted Emotion</Text>
          {isPredicting ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#8A2BE2" />
              <Text style={styles.loadingText}>Analyzing your voice...</Text>
            </View>
          ) : predictedEmotion ? (
            <View style={styles.emotionResultContainer}>
              <Text style={styles.emotionResult}>{predictedEmotion}</Text>
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>Record your voice to predict emotion</Text>
            </View>
          )}
        </View>

        {/* Book Recommendations */}
        <View style={styles.recommendationContainer}>
          <Text style={styles.sectionTitle}>Book Recommendations</Text>
          {recommendations?.books ? (
            <View style={styles.recommendationContent}>
              {renderList(recommendations.books)}
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>Waiting for emotion prediction...</Text>
            </View>
          )}
        </View>

        {/* Music Recommendations */}
        <View style={styles.recommendationContainer}>
          <Text style={styles.sectionTitle}>Music Recommendations</Text>
          {recommendations?.music ? (
            <View style={styles.recommendationContent}>
              {renderList(recommendations.music)}
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>Waiting for emotion prediction...</Text>
            </View>
          )}
        </View>

        {/* Movie Recommendations */}
        <View style={styles.recommendationContainer}>
          <Text style={styles.sectionTitle}>Movie Recommendations</Text>
          {recommendations?.movies ? (
            <View style={styles.recommendationContent}>
              {renderList(recommendations.movies)}
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>Waiting for emotion prediction...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA', // Light lavender background
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082', // Indigo
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  recorderContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#8A2BE2', // Blue violet
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  recordingButton: {
    borderColor: '#FF0000', // Red border when recording
  },
  recordButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8A2BE2', // Blue violet
  },
  stopButtonInner: {
    borderRadius: 5,
    backgroundColor: '#FF0000', // Red when recording
  },
  buttonLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B0082', // Indigo
  },
  emotionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  recommendationContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082', // Indigo
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#9370DB', // Medium purple
    fontSize: 16,
  },
  emotionResultContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8FF', // Ghost white
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8BFD8', // Thistle (light purple)
  },
  emotionResult: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8A2BE2', // Blue violet
  },
  placeholderContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8FF', // Ghost white
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8BFD8', // Thistle (light purple)
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 16,
    color: '#9370DB', // Medium purple
    textAlign: 'center',
  },
  recommendationContent: {
    padding: 15,
    backgroundColor: '#F8F8FF', // Ghost white
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8BFD8', // Thistle (light purple)
  },
  recommendationText: {
    fontSize: 16,
    color: '#696969', // Dim gray
    textAlign: 'center',
  },
  recommendationItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#EEE6FA',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D8BFD8',
    elevation: 2,
  },
  
  recommendationLink: {
    fontSize: 16,
    color: '#4B0082',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  
});