import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Settings, Shield, RefreshCw, LogOut } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useAuthStore } from '../../store/useAuthStore';
import { GlassCard } from '../../components/GlassCard';

export const PortalToolsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const logout = useAuthStore((state) => state.logout);

  const handleBackup = () => {
    Alert.alert('Backup Triggered', 'System backup initiated successfully.');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1d2022', '#101415']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top App Bar */}
      <BlurView intensity={30} tint="dark" style={styles.header}>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => navigation.goBack()} className="p-1 active:scale-95">
            <ChevronLeft size={24} color="#ffe5a0" />
          </Pressable>
          <Text className="text-xl font-bold text-white font-display-lg">Portal Settings</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8 gap-5">
          <GlassCard className="p-5 border border-white/10" intensity="low">
            <View className="flex-row items-center gap-3 mb-4">
              <Shield size={20} color="#ffe5a0" />
              <Text className="text-white font-bold text-base font-headline-sm">Security Standards</Text>
            </View>
            <Text className="text-white/60 text-xs font-body-sm leading-relaxed mb-4">
              Portal operations are encrypted using AES-256 protocols. Daily automatic database snapshot backups are performed at 00:00 UTC.
            </Text>
            <Pressable
              onPress={handleBackup}
              className="bg-white/5 border border-white/10 py-3 rounded-xl items-center justify-center flex-row gap-2 active:scale-95"
            >
              <RefreshCw size={14} color="#ffe5a0" />
              <Text className="text-[#ffe5a0] text-xs font-bold font-label-lg">Backup Database Now</Text>
            </Pressable>
          </GlassCard>

          <GlassCard className="p-5 border border-white/10" intensity="low">
            <View className="flex-row items-center gap-3 mb-4">
              <Settings size={20} color="#ffe5a0" />
              <Text className="text-white font-bold text-base font-headline-sm">Configuration Tools</Text>
            </View>
            <Text className="text-white/60 text-xs font-body-sm leading-relaxed mb-1">
              • Academic Year: 2024 - 2025
            </Text>
            <Text className="text-white/60 text-xs leading-relaxed font-body-sm mb-1">
              • System Version: v2.4.0 (Expo SDK 56)
            </Text>
            <Text className="text-white/60 text-xs leading-relaxed font-body-sm">
              • Campus Server Status: Online
            </Text>
          </GlassCard>

          <Pressable 
            onPress={logout}
            className="border border-red-500/30 bg-red-500/10 p-5 rounded-[24px] flex-row items-center justify-center gap-3 active:scale-95"
          >
            <LogOut size={18} color="#f87171" />
            <Text className="text-red-400 font-bold text-sm font-label-lg">Sign Out of Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101415',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 35,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 50,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 100 : 85,
    paddingBottom: 40,
  },
});

export default PortalToolsScreen;
