// app/(tabs)/report.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ReportScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <Text style={styles.subtitle}>Here you can view your activity reports.</Text>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Emotion Summary</Text>
        <Text style={styles.reportDetail}>😊 Happy: 45%</Text>
        <Text style={styles.reportDetail}>😐 Neutral: 35%</Text>
        <Text style={styles.reportDetail}>😢 Sad: 20%</Text>
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Top Recommendations</Text>
        <Text style={styles.reportDetail}>🎵 Music: "Good Vibes" by XYZ</Text>
        <Text style={styles.reportDetail}>📖 Book: "Atomic Habits"</Text>
        <Text style={styles.reportDetail}>🎬 Movie: "Inside Out"</Text>
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Recent Activity</Text>
        <Text style={styles.reportDetail}>3 sessions analyzed this week</Text>
        <Text style={styles.reportDetail}>Last recorded emotion: 😊 Happy</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#F9F9FF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 10,
  },
  reportDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
});
