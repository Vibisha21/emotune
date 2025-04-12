import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#8A2BE2',
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'home') iconName = 'home';
          else if (route.name === 'ser') iconName = 'mic';
          else if (route.name === 'report') iconName = 'bar-chart';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />

      <Tabs.Screen name="ser" options={{ title: 'SER' }} />
      <Tabs.Screen name="report" options={{ title: 'Report' }} />
    </Tabs>
  );
}
