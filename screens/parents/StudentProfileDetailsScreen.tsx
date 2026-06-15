import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image, Switch } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { GlassCard } from '../../components/GlassCard';
import { InteractiveButton } from '../../components/InteractiveButton';
import { LogOut, User, Settings, ShieldAlert, Moon } from 'lucide-react-native';

export const ProfileScreen: React.FC = () => {
  const { user, logout, isDarkMode, toggleTheme } = useAuthStore();

  if (!user) return null;

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View className="mb-6">
        <Text className="text-white text-3xl font-extrabold">Portal Settings</Text>
        <Text className="text-white/50 text-sm mt-1">Configure profile and session variables</Text>
      </View>

      {/* Profile summary card */}
      <GlassCard className="p-6 mb-6" intensity="high">
        <View className="items-center">
          {user.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              className="w-20 h-20 rounded-full border-2 border-white/20 mb-4"
            />
          ) : (
            <View className="w-20 h-20 bg-brand-indigo/30 rounded-full items-center justify-center mb-4 border border-white/10">
              <User size={36} color="#A78BFA" />
            </View>
          )}
          <Text className="text-white text-xl font-bold">{user.name}</Text>
          <Text className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-1">{user.role.replace('_', ' ')}</Text>
          
          <View className="w-full mt-6 pt-6 border-t border-white/5 space-y-3.5">
            <View className="flex-row justify-between">
              <Text className="text-white/40 text-xs font-semibold">Email ID</Text>
              <Text className="text-white text-xs font-bold">{user.email}</Text>
            </View>
            <View className="flex-row justify-between mt-3">
              <Text className="text-white/40 text-xs font-semibold">Contact No</Text>
              <Text className="text-white text-xs font-bold">{user.phone}</Text>
            </View>
          </View>
        </View>
      </GlassCard>

      {/* Options Panel */}
      <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">General Preferences</Text>
      <GlassCard className="p-4 mb-6" intensity="medium">
        <View className="flex-row justify-between items-center py-2.5">
          <View className="flex-row items-center">
            <Moon size={18} color="#A78BFA" />
            <Text className="text-white text-sm font-medium ml-3">Dark Theme System</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4F46E5' }}
            thumbColor={isDarkMode ? '#A78BFA' : '#94A3B8'}
          />
        </View>
      </GlassCard>

      {/* Log out CTA */}
      <InteractiveButton
        onPress={logout}
        title="Terminate Secure Session"
        variant="glass"
        style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.25)' }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
  },
});

export default ProfileScreen;
