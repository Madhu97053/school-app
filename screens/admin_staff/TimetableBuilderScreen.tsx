import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const TimetableBuilderScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleBuild = () => {
    Alert.alert('Timetable Saved', 'Timetable slot allocations published.');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0d2a24', '#121414']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top App Bar */}
      <BlurView intensity={30} tint="dark" style={styles.header}>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => navigation.goBack()} className="p-1 active:scale-95">
            <ChevronLeft size={24} color="#46f1c5" />
          </Pressable>
          <Text className="text-xl font-bold text-white font-display-lg">Timetable Builder</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8">
          <GlassCard className="p-5 border border-white/10 gap-4" intensity="low">
            <Text className="text-white font-bold text-base font-headline-sm">Allocated Active Slots</Text>
            <View className="gap-2">
              <View className="flex-row justify-between border-b border-white/5 pb-2">
                <Text className="text-white/60 text-xs">Math (Grade 8-A)</Text>
                <Text className="text-[#46f1c5] text-xs font-semibold font-label-lg">Mon 09:00 - 10:00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-white/60 text-xs">Science (Grade 5-B)</Text>
                <Text className="text-[#46f1c5] text-xs font-semibold font-label-lg">Mon 10:15 - 11:15</Text>
              </View>
            </View>
            <Pressable
              onPress={handleBuild}
              className="bg-[#46f1c5] w-full py-3.5 rounded-xl items-center justify-center active:scale-95 mt-2 shadow-[0_0_12px_rgba(70,241,197,0.3)]"
            >
              <Text className="text-[#0d2a24] font-bold text-xs">Publish Timetable Slots</Text>
            </Pressable>
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

export default TimetableBuilderScreen;
