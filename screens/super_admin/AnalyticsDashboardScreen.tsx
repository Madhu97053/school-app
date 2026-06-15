import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, BarChart, TrendingUp, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const AnalyticsDashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();

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
          <Text className="text-xl font-bold text-white font-display-lg">Portal Analytics</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-6">
          <Text className="text-white text-3xl font-extrabold font-display-lg leading-tight mb-2">
            Institutional <Text className="text-[#ffe5a0]">Overview</Text>
          </Text>
          <Text className="text-white/60 text-sm font-body-lg leading-relaxed">
            Real-time analytics dashboard presenting key performance indicators, financial parameters, and enrollment tracking metrics.
          </Text>
        </View>

        <View className="px-5 gap-4 mb-8">
          <GlassCard className="p-5 border border-white/10" intensity="low">
            <View className="flex-row items-center gap-3 mb-4">
              <Users size={20} color="#ffe5a0" />
              <Text className="text-white font-bold text-base font-headline-sm">Enrollment Tracker</Text>
            </View>
            <Text className="text-white/50 text-xs font-body-sm leading-relaxed mb-4">Total Active Students: 1,240</Text>
            <View className="bg-white/5 h-2 w-full rounded-full overflow-hidden">
              <View className="bg-[#f0c110] h-full" style={{ width: '85%' }} />
            </View>
          </GlassCard>

          <GlassCard className="p-5 border border-white/10" intensity="low">
            <View className="flex-row items-center gap-3 mb-4">
              <TrendingUp size={20} color="#ffe5a0" />
              <Text className="text-white font-bold text-base font-headline-sm">Financial Revenue</Text>
            </View>
            <Text className="text-white/50 text-xs font-body-sm leading-relaxed mb-4">Fee Collection Rate: 92%</Text>
            <View className="bg-white/5 h-2 w-full rounded-full overflow-hidden">
              <View className="bg-emerald-500 h-full" style={{ width: '92%' }} />
            </View>
          </GlassCard>

          <GlassCard className="p-5 border border-white/10" intensity="low">
            <View className="flex-row items-center gap-3 mb-4">
              <BarChart size={20} color="#ffe5a0" />
              <Text className="text-white font-bold text-base font-headline-sm">Academic Standings</Text>
            </View>
            <Text className="text-white/50 text-xs font-body-sm leading-relaxed mb-4">Average GPA: 3.42 / 4.0</Text>
            <View className="bg-white/5 h-2 w-full rounded-full overflow-hidden">
              <View className="bg-[#38bdf8] h-full" style={{ width: '78%' }} />
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

export default AnalyticsDashboardScreen;
