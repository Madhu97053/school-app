import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const StudentPerformanceScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const list = [
    { name: 'Vamshi (Grade 8-A)', gpa: '3.8 GPA', status: 'Excellent' },
    { name: 'Sneha (Grade 5-B)', gpa: '3.6 GPA', status: 'Excellent' }
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
          <Text className="text-xl font-bold text-white font-display-lg">Performance</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8 gap-5">
          {list.map((item, idx) => (
            <GlassCard key={idx} className="p-5 border border-white/10 flex-row items-center justify-between" intensity="low">
              <View className="gap-1 flex-1 pr-4">
                <Text className="text-white font-bold text-sm font-headline-sm">{item.name}</Text>
                <Text className="text-[#46f1c5] text-xs font-semibold font-label-lg">{item.gpa}</Text>
              </View>
              <View className="bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-xl">
                <Text className="text-emerald-400 font-bold text-xs">{item.status}</Text>
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

export default StudentPerformanceScreen;
