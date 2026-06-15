import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Banknote } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const FeeCollectionScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const list = [
    { name: 'Vamshi (Grade 8-A)', due: '$1,200', date: 'Due Jun 30, 2026', status: 'Pending' },
    { name: 'Sneha (Grade 5-B)', due: '$1,200', date: 'Paid Jun 10, 2026', status: 'Paid' }
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
          <Text className="text-xl font-bold text-white font-display-lg">Fee Collection</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8 gap-5">
          {list.map((item, idx) => (
            <GlassCard key={idx} className="p-5 border border-white/10 flex-row items-center justify-between" intensity="low">
              <View className="gap-1 flex-1 pr-4">
                <Text className="text-white font-bold text-sm font-headline-sm">{item.name}</Text>
                <Text className="text-white/50 text-[10px]">{item.date}</Text>
              </View>
              <View className="items-end gap-1.5">
                <Text className="text-white font-bold text-sm font-label-lg">{item.due}</Text>
                <View className={`px-2 py-0.5 rounded ${item.status === 'Paid' ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-amber-500/20 border border-amber-500/30'}`}>
                  <Text className={`text-[9px] font-bold ${item.status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'}`}>{item.status}</Text>
                </View>
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

export default FeeCollectionScreen;
