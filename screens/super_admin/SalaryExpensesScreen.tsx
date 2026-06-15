import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, DollarSign, BarChart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const SalaryExpensesScreen: React.FC = () => {
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
          <Text className="text-xl font-bold text-white font-display-lg">Budget & Salary</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8 gap-5">
          <GlassCard className="p-5 border border-white/10" intensity="low">
            <View className="flex-row items-center gap-3 mb-4">
              <DollarSign size={20} color="#ffe5a0" />
              <Text className="text-white font-bold text-base font-headline-sm">Financial Outflow Summary</Text>
            </View>
            <Text className="text-white/50 text-xs font-body-sm leading-relaxed mb-4">
              Monthly Institutional Operating Budget: $124,500
            </Text>
            <View className="gap-3 border-t border-white/5 pt-3">
              <View className="flex-row justify-between">
                <Text className="text-white/60 text-xs">Faculty Salary</Text>
                <Text className="text-white font-bold text-xs font-label-lg">$78,000</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-white/60 text-xs">Campus Maintenance</Text>
                <Text className="text-white font-bold text-xs font-label-lg">$24,500</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-white/60 text-xs">Academic Resources</Text>
                <Text className="text-white font-bold text-xs font-label-lg">$22,000</Text>
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

export default SalaryExpensesScreen;
