import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const AttendanceHistoryScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1F0A16', '#3D0A1E']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top App Bar */}
      <BlurView intensity={30} tint="dark" style={styles.header}>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => navigation.goBack()} className="p-1 active:scale-95">
            <ChevronLeft size={24} color="#ff516a" />
          </Pressable>
          <Text className="text-xl font-bold text-white font-display-lg">Attendance History</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8">
          <GlassCard className="p-6 border border-white/10" intensity="low">
            <View className="flex-row items-center gap-3 mb-4">
              <Calendar size={20} color="#ff516a" />
              <Text className="text-white font-bold text-base font-headline-sm">Monthly Attendance Summary</Text>
            </View>
            <View className="gap-3 border-t border-white/5 pt-3">
              <View className="flex-row justify-between">
                <Text className="text-white/60 text-xs">Total Working Days</Text>
                <Text className="text-white font-bold text-xs font-label-lg">22 Days</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-white/60 text-xs">Days Present</Text>
                <Text className="text-emerald-400 font-bold text-xs font-label-lg">20 Days</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-white/60 text-xs">Days Absent</Text>
                <Text className="text-red-400 font-bold text-xs font-label-lg">2 Days</Text>
              </View>
              <View className="flex-row justify-between border-t border-white/5 pt-2.5">
                <Text className="text-white/70 font-semibold text-xs">Attendance Percentage</Text>
                <Text className="text-[#ff516a] font-bold text-xs font-label-lg">90.9%</Text>
              </View>
            </View>
          </GlassCard>
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

export default AttendanceHistoryScreen;
