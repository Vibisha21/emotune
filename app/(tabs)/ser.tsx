import React, { useState, useRef } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, SafeAreaView,
  ScrollView, ActivityIndicator, Linking
} from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

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

  const stopRecording = () => {
    setIsRecording(false);
    setIsPredicting(true);
    
    // Simulate emotion prediction (replace with actual API call)
    setTimeout(() => {
      const emotions = ['Happy', 'Sad', 'Angry', 'Excited', 'Calm', 'Anxious'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setPredictedEmotion(randomEmotion);
      setIsPredicting(false);
    }
  };

  const renderRecommendationList = (items: { title: string, link: string }[]) => (
    items.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.recommendationItem}
        onPress={() => Linking.openURL(item.link)}
      >
        <Text style={styles.recommendationLink}>• {item.title}</Text>
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

        {/* Emotion Result */}
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
              {renderRecommendationList(recommendations.books)}
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
              {renderRecommendationList(recommendations.music)}
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
              {renderRecommendationList(recommendations.movies)}
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
    backgroundColor: '#E6E6FA',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
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
    shadowOffset: { width: 0, height: 3 },
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
    borderColor: '#8A2BE2',
  },
  recordingButton: {
    borderColor: '#FF0000',
  },
  recordButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8A2BE2',
  },
  stopButtonInner: {
    borderRadius: 5,
    backgroundColor: '#FF0000',
  },
  buttonLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B0082',
  },
  emotionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 3 },
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#9370DB',
    fontSize: 16,
  },
  emotionResultContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8BFD8',
  },
  emotionResult: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  placeholderContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8BFD8',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 16,
    color: '#9370DB',
    textAlign: 'center',
  },
  recommendationContent: {
    padding: 15,
    backgroundColor: '#F8F8FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8BFD8',
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
