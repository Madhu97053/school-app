import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, DollarSign } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const FeeStructureScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const grades = [
    { label: 'Primary Years (Grades 1-5)', fee: '$1,200 / term' },
    { label: 'Middle Years (Grades 6-8)', fee: '$1,400 / term' },
    { label: 'Senior Years (Grades 9-12)', fee: '$1,650 / term' }
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
          <Text className="text-xl font-bold text-white font-display-lg">Fee Structure</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8">
          <Text className="text-white text-3xl font-extrabold font-display-lg leading-tight mb-2">
            Indicative Fee{"\n"}
            <Text className="text-[#8ed5ff]">Structure</Text>
          </Text>
          <Text className="text-white/60 text-sm font-body-lg leading-relaxed">
            Transparent fee structures optimized for elite academic resources, premium campus infrastructure, and global learning tracks.
          </Text>
        </View>

        <View className="px-5 mb-8">
          <GlassCard className="p-6 border border-white/10" intensity="low">
            <View className="flex-row items-center gap-3 mb-4">
              <DollarSign size={20} color="#8ed5ff" />
              <Text className="text-white font-bold text-base font-headline-sm">Tuition Fees Framework</Text>
            </View>
            <View className="gap-4">
              {grades.map((g, idx) => (
                <View key={idx} className="flex-row justify-between items-center border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <Text className="text-white/70 text-xs font-body-md flex-1 pr-4">{g.label}</Text>
                  <Text className="text-[#8ed5ff] font-bold text-xs font-label-lg">{g.fee}</Text>
                </View>
              ))}
            </View>
          </GlassCard>
        </View>

        {/* Additional details */}
        <View className="px-5 mb-8">
          <GlassCard className="p-6 border border-white/10" intensity="low">
            <Text className="text-white font-bold text-base font-headline-sm mb-4">General Terms & Policies</Text>
            <View className="gap-3">
              <Text className="text-white/60 text-xs leading-relaxed font-body-sm">
                • Security Deposit: A one-time refundable security deposit of $500 is payable at the time of admission.
              </Text>
              <Text className="text-white/60 text-xs leading-relaxed font-body-sm">
                • Transport Fees: Optional transit services are billed separately based on distance route zones.
              </Text>
              <Text className="text-white/60 text-xs leading-relaxed font-body-sm">
                • Late Fees: Payments received after the due date are subject to a late fee charge of 2.5% per month.
              </Text>
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

export default FeeStructureScreen;
