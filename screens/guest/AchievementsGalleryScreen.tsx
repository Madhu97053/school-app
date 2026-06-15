import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Award, Newspaper } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const AchievementsGalleryScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const toppers = [
    { name: 'Elena Rodriguez', stream: 'Science Stream', score: '99.2%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaJRRUcA28cxQosr7uKPRNB3IhTl-dlnQ6_DpZiexIAAc_0P0JmsnYSVMA8aiBFT8rC3nCuwQFtb2AcEQIuToDiq0-8Tlf6EZ_YKmTLVOP-oHoq4XYuqmb6cAMMmd8Hy9zPmavw_taHz-yYOs4ZfsBtYjYgzw0qdqYpG0MR-3DQdXgwK5UkbPyy1aLEjek-ifsBSND4XdlAydQ9ttz3HaiPtfqE_qqqbyyFo-lry8dc5yJqqEs0_Cagii9CQQ1ctTgA30f9iFCx0kV' },
    { name: 'Marcus Chen', stream: 'Humanities Stream', score: '98.8%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3J6LDmm46WVp_sAC5EGTsSAh9PchG1ki2dwCeQtqZ7lpQBury9NJHl96lY3FQbIRz0E3zz09MRlxOvEYRIf6qSSZ_BLSE3kq00LJJRpfYuQNZMqYPAoe6fDXVAHEjN76N-6bX_LxY0BANHHc3MzUONiJVkMoc0IWzSrHLQk8kv4bWJXS_Ltnh35hHjQu3boAWdw1oqhoKO_fv8FVr7E5BvGpAHpsdcHF89lo5SDiAyeBV4TEU-yLhF6XaX_OyzIuYPSy8PZDt5g9W' },
    { name: 'Amara Okafor', stream: 'Commerce Stream', score: '98.5%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBby4ECDQvtbfjhIoFNAlrPOAuEb-_GjNSgR44IrHBvJigak7RPXOsVP6jJzlJ6gpV3g9Q7f5mI1gOGd2Dj4txEfMm6hV16lFJgnZEPqt7EKxZt9dDvx5CPj_5_7SvhtbWgt70mvXjGLjEz4ke7-4Rqy_2Cq2ABqC5LeC8D5mpO6zq_cxCea2GsagNzQhuN_3xpciyBAuh5J_63ERT20B21mx_aslDfjNMCx0RuNdy9A55d40tkT_6Dfdk61Kp51q9hZEvmJr8Bz_6D' }
  ];

  const newsList = [
    { source: 'Financial Times • Oct 2024', headline: 'The Future of Hybrid Learning: EduVision leads the way.' },
    { source: 'National Geographic • Sep 2024', headline: "Sustainable Campuses: EduVision's Zero-Waste Success." },
    { source: 'Tech Today • Aug 2024', headline: 'AI in the Classroom: How Visionaries are born.' }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a2a3a', '#101415']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top App Bar */}
      <BlurView intensity={30} tint="dark" style={styles.header}>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => navigation.goBack()} className="p-1 active:scale-95">
            <ChevronLeft size={24} color="#8ed5ff" />
          </Pressable>
          <Text className="text-xl font-bold text-white font-display-lg">Gallery & Awards</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8 items-center text-center">
          <Text className="text-white text-3xl font-extrabold font-display-lg leading-tight mb-2">
            Honoring Visionary <Text className="text-[#8ed5ff]">Milestones</Text>
          </Text>
          <Text className="text-white/60 text-sm font-body-lg leading-relaxed text-center">
            Celebrate the academic brilliance, athletic triumphs, and global recognition that define the EduVision community.
          </Text>
        </View>

        {/* Global Impact Award Card */}
        <View className="px-5 mb-8">
          <GlassCard className="p-6 border border-white/10 gap-4" intensity="low">
            <View className="flex-row items-center gap-3">
              <Award size={24} color="#8ed5ff" />
              <Text className="text-white font-bold text-lg font-headline-md">Innovation in Education 2024</Text>
            </View>
            <Text className="text-white/70 text-sm leading-relaxed font-body-md">
              Recognized by the World Education Forum for our groundbreaking 'EduVision Connect' digital curriculum and sustainable campus initiatives.
            </Text>
            <View className="flex-row gap-3">
              <View className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <Text className="text-[#8ed5ff] text-[10px] font-bold">Global Ranking #14</Text>
              </View>
              <View className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <Text className="text-[#8ed5ff] text-[10px] font-bold">Sustainability Gold</Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* Board Toppers */}
        <View className="px-5 mb-8">
          <Text className="text-[#8ed5ff] text-xs font-bold uppercase tracking-widest mb-4">Board Exam Toppers</Text>
          <View className="gap-5">
            {toppers.map((t, idx) => (
              <GlassCard key={idx} className="p-4 border border-white/10 flex-row gap-4 items-center" intensity="low">
                <Image 
                  source={{ uri: t.img }}
                  className="w-16 h-16 rounded-xl border border-white/10"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-white font-bold text-sm">{t.name}</Text>
                  <Text className="text-white/50 text-[10px]">{t.stream}</Text>
                </View>
                <View className="bg-[#38bdf8]/20 border border-[#38bdf8]/40 px-3 py-1.5 rounded-xl">
                  <Text className="text-[#8ed5ff] font-bold text-sm">{t.score}</Text>
                </View>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* News Coverage */}
        <View className="px-5 mb-8">
          <GlassCard className="p-6 border border-white/10" intensity="low">
            <View className="flex-row items-center gap-3 mb-4">
              <Newspaper size={20} color="#8ed5ff" />
              <Text className="text-white font-bold text-base font-headline-sm">News Coverage</Text>
            </View>
            <View className="gap-4">
              {newsList.map((n, idx) => (
                <View key={idx} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <Text className="text-[#8ed5ff] text-[10px] font-bold font-label-md mb-1">{n.source}</Text>
                  <Text className="text-white/70 text-xs font-body-sm leading-relaxed">{n.headline}</Text>
                </View>
              ))}
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

export default AchievementsGalleryScreen;
