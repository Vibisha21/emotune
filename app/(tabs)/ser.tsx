import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

export default function SimpleVoiceEmotionScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictedEmotion, setPredictedEmotion] = useState<string | null>(null);

  const startRecording = () => {
    // In a real app, implement actual recording logic here
    setIsRecording(true);
    setPredictedEmotion(null);
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
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Voice Emotion Detector</Text>
        
        {/* Simple Recorder Section */}
        <View style={styles.recorderContainer}>
          <TouchableOpacity 
            style={[styles.recordButton, isRecording && styles.recordingButton]} 
            onPress={isRecording ? stopRecording : startRecording}
          >
            <View style={[styles.recordButtonInner, isRecording && styles.stopButtonInner]} />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </View>
        
        {/* Emotion Prediction Section */}
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
              <Text style={styles.placeholderText}>
                Record your voice to predict emotion
              </Text>
            </View>
          )}
        </View>
        
        {/* Book Recommendations Section */}
        <View style={styles.recommendationContainer}>
          <Text style={styles.sectionTitle}>Book Recommendations</Text>
          
          {predictedEmotion ? (
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationText}>
                Book recommendations will appear here based on your emotion.
              </Text>
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                Waiting for emotion prediction...
              </Text>
            </View>
          )}
        </View>
        
        {/* Music Recommendations Section */}
        <View style={styles.recommendationContainer}>
          <Text style={styles.sectionTitle}>Music Recommendations</Text>
          
          {predictedEmotion ? (
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationText}>
                Music recommendations will appear here based on your emotion.
              </Text>
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                Waiting for emotion prediction...
              </Text>
            </View>
          )}
        </View>

         {/* Movie Recommendations Section */}
         <View style={styles.recommendationContainer}>
          <Text style={styles.sectionTitle}>Movie Recommendations</Text>
          
          {predictedEmotion ? (
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationText}>
                Music recommendations will appear here based on your emotion.
              </Text>
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                Waiting for emotion prediction...
              </Text>
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
});