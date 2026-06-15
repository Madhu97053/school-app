import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const ExamScheduleScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const list = [
    { subject: 'Mathematics (Grade 8-A)', date: 'Jun 22, 2026', time: '09:00 AM - 12:00 PM', hall: 'Exam Hall 1' },
    { subject: 'Natural Sciences (Grade 5-B)', date: 'Jun 24, 2026', time: '09:00 AM - 12:00 PM', hall: 'Exam Hall 2' }
  ];

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
          <Text className="text-xl font-bold text-white font-display-lg">Exam Schedule</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8 gap-5">
          {list.map((item, idx) => (
            <GlassCard key={idx} className="p-5 border border-white/10 gap-3" intensity="low">
              <View className="flex-row items-center justify-between border-b border-white/5 pb-2.5">
                <Text className="text-white font-bold text-sm font-headline-sm">{item.subject}</Text>
                <Calendar size={16} color="#46f1c5" />
              </View>
              <View className="gap-1">
                <Text className="text-white/60 text-xs font-body-sm">• Date: {item.date}</Text>
                <Text className="text-[#46f1c5] text-xs font-semibold font-label-lg">• Time: {item.time}</Text>
                <Text className="text-white/60 text-xs font-body-sm">• Venue: {item.hall}</Text>
              </View>
            </GlassCard>
          ))}
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

export default ExamScheduleScreen;
