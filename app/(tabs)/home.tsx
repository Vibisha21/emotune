import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Mic, Search } from 'lucide-react-native';

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
      <View style={styles.backgroundImages}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/e7/77/6d/e7776da19220c2437dc91dac4aeef16f.jpg' }} // Replace with your calming left image URL
          style={styles.sideImageLeft}
          resizeMode="cover"
        />
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/6a/e0/40/6ae040797ace6082a9e3196d9024359a.jpg' }} // Replace with your calming right image URL
          style={styles.sideImageRight}
          resizeMode="cover"
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>EmoTune</Text>
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
          <TouchableOpacity style={styles.button} onPress={() => console.log('Speak clicked')}>
            <Mic color="white" size={20} />
            <Text style={styles.buttonText}>Speak</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.spectButton} onPress={() => console.log('Spect clicked')}>
            <Search color="white" size={20} />
            <Text style={styles.buttonText}>Spect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede9fe',
  },
  backgroundImages: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: -2
  },
  sideImageLeft: {
    width: 250,
    height: height,
  },
  sideImageRight: {
    width: 250,
    height: height,
  },
  header: {
    backgroundColor: '#7e22ce',
    padding: 16,
    alignItems: 'center',
    elevation: 4,
    zIndex: 2
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'serif'
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imageFrame: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 9999,
    elevation: 5,
    marginBottom: -32,
    zIndex: 1
  },
  innerCircle: {
    backgroundColor: '#f3e8ff',
    height: 96,
    width: 96,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emoji: {
    fontSize: 36
  },
  sentenceBox: {
    width: width * 0.50,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#c084fc',
    marginTop: 48,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#c084fc',
    borderRadius: 12,
    opacity: 0.4,
    zIndex: -1,
    shadowColor: '#c084fc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10
  },
  sentenceText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#7e22ce',
    fontWeight: '300',
    textAlign: 'center',
    minHeight: 64
  },
  footer: {
    padding: 16,
    backgroundColor: 'white'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  button: {
    backgroundColor: '#a855f7',
    borderRadius: 9999,
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  spectButton: {
    backgroundColor: '#c084fc',
    borderRadius: 9999,
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8
  }
});
