import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Mic, Search } from 'lucide-react-native';
import { Route,useRouteNode } from 'expo-router/build/Route';
import { router, useRouter } from 'expo-router';

const calmingSentences = [
  "Breathe deeply, find your center.",
  "You are exactly where you need to be.",
  "This moment is your own, embrace it.",
  "Let go of what you cannot change.",
  "Find peace in the present moment.",
  "Your thoughts are clouds passing in the sky.",
  "Inhale calm, exhale tension.",
  "You are stronger than you know.",
  "Each breath brings new beginnings.",
  "Be gentle with yourself today."
];

export default function HomePage() {
  const [currentSentence, setCurrentSentence] = useState(calmingSentences[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * calmingSentences.length);
      setCurrentSentence(calmingSentences[randomIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EmoTune</Text> 
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
            
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style={styles.imageFrame}>
          <View style={styles.innerCircle}>
            <Text style={styles.emoji}>😌</Text>
          </View>
        </View>

        <View style={styles.sentenceBox}>
          <View style={styles.glow} />
          <Text style={styles.sentenceText}>"{currentSentence}"</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/ser')}>
            <Mic size={20} color="white" />
            <Text style={styles.buttonText}>Speak</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.spectButton} onPress={() => router.push('/report')}>
            <Search size={20} color="white" />
            <Text style={styles.buttonText}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'System'
  },
  header: {
    backgroundColor: '#7e22ce',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    
    shadowOffset: { width: 0, height: 2 }
    
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif'
  },
  logout:{
    alignContent:'flex-end',
    justifyContent:'center'
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ede9fe'
  },
  imageFrame: {
    borderRadius: 100,
    backgroundColor: 'white',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: -32,
    zIndex: 10
  },
  innerCircle: {
    borderRadius: 100,
    backgroundColor: '#f3e8ff',
    height: 96,
    width: 96,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: {
    fontSize: 48
  },
  sentenceBox: {
    width: '90%',
    maxWidth: 450,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    marginTop: 80,
    borderWidth: 4,
    borderColor: '#c084fc',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  glow: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    borderRadius: 12,
    backgroundColor: '#c084fc',
    opacity: 0.5,
    zIndex: -1,
    shadowRadius: 10
  },
  sentenceText: {
    fontSize: 20,
    color: '#7e22ce',
    fontStyle: 'italic',
    fontWeight: '300',
    textAlign: 'center'
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: '#a855f7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 999,
    gap: 8
  },
  spectButton: {
    backgroundColor: '#c084fc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 999,
    gap: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16
  }
});
