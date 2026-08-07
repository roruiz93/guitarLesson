import { Tabs } from 'expo-router';
import { Text } from 'react-native';

const TAB_ICONS: Record<string, string> = {
  index: '🏠',
  tuner: '🎸',
  lessons: '📚',
  leaderboard: '🏆',
  profile: '👤',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111',
          borderTopColor: '#222',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: '#555',
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>
            {TAB_ICONS[route.name] ?? '●'}
          </Text>
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="lessons" options={{ title: 'Lecciones' }} />
      <Tabs.Screen name="tuner" options={{ title: 'Afinador' }} />
      <Tabs.Screen name="leaderboard" options={{ title: 'Ranking' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
