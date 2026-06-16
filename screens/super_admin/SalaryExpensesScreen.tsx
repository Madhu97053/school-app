import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { 
  ChevronLeft, Landmark, DollarSign, TrendingUp, HelpCircle, 
  BookOpen, Shield, Users, HardHat, FlaskConical, Bolt, 
  Library, Plus, Search, Filter 
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const SalaryExpensesScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [expenses, setExpenses] = useState([
    { 
      id: '1', 
      title: 'Science Lab Equipment', 
      category: 'Academic Infrastructure', 
      amount: '$12,450.00', 
      date: 'Oct 24, 2023', 
      addedBy: 'Dr. Amari', 
      initials: 'DA', 
      icon: FlaskConical,
      color: '#41eec2'
    },
    { 
      id: '2', 
      title: 'Monthly Utility Bill', 
      category: 'Maintenance', 
      amount: '$3,120.50', 
      date: 'Oct 22, 2023', 
      addedBy: 'S. Collins', 
      initials: 'SC', 
      icon: Bolt,
      color: '#ffe5a0'
    },
    { 
      id: '3', 
      title: 'Library New Arrivals', 
      category: 'Academic Resources', 
      amount: '$890.00', 
      date: 'Oct 20, 2023', 
      addedBy: 'L. Wong', 
      initials: 'LW', 
      icon: Library,
      color: '#e0bdff'
    }
  ]);

  const salaryCategories = [
    { label: 'Academic', cost: '$142k', staff: '48 Staff', icon: BookOpen, color: '#ffe5a0' },
    { label: 'Admin', cost: '$84k', staff: '22 Staff', icon: Shield, color: '#41eec2' },
    { label: 'Support', cost: '$36k', staff: '15 Staff', icon: Users, color: '#e0bdff' },
    { label: 'Contract', cost: '$22k', staff: '8 Staff', icon: HardHat, color: '#f5c518' },
  ];

  const handleAddExpense = () => {
    Alert.prompt(
      "Add Expense",
      "Enter new expense details (Format: Title, Amount, Category):",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Add",
          onPress: (text?: string) => {
            if (!text) return;
            const parts = text.split(',');
            if (parts.length < 2) {
              Alert.alert("Error", "Please enter at least Title and Amount, separated by comma.");
              return;
            }
            const newExp = {
              id: `exp_${Date.now()}`,
              title: parts[0].trim(),
              amount: parts[1].trim().startsWith('$') ? parts[1].trim() : `$${parts[1].trim()}`,
              category: parts[2] ? parts[2].trim() : 'General operating',
              date: 'Today',
              addedBy: 'Dr. Aris',
              initials: 'DA',
              icon: DollarSign,
              color: '#ffe5a0'
            };
            setExpenses([newExp, ...expenses]);
            Alert.alert("Success", "Expense log successfully created.");
          }
        }
      ],
      "plain-text"
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#1d2022', '#101415']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header with Custom Glow Shadow */}
      <View style={{ zIndex: 50 }}>
        {/* Top App Bar */}
        <BlurView intensity={30} tint="dark" style={[styles.header, { paddingTop: insets.top + (Platform.OS === 'android' ? 28 : 20) }]}>
          <View className="flex-row items-center gap-3">
            <Pressable onPress={() => navigation.goBack()} className="p-1 active:scale-95">
              <ChevronLeft size={24} color="#ffe5a0" />
            </Pressable>
            <Text className="text-xl font-bold text-white font-display-lg">Salary & Expenses</Text>
          </View>
        </BlurView>
        
        {/* The glowing shadow below the line */}
        <LinearGradient 
          colors={['rgba(245, 197, 24, 0.15)', 'transparent']} 
          style={{ position: 'absolute', bottom: -15, left: 0, right: 0, height: 15 }}
          pointerEvents="none"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Section 1: Monthly Payroll Summary */}
        <View className="px-5 mb-8">
          <Text className="text-[#ffe5a0] text-[10px] font-bold uppercase tracking-widest mb-4">Payroll Overview</Text>
          
          <View className="flex-row justify-between mb-4">
            {/* Total Disbursed Card */}
            <GlassCard className="w-[48%] p-4 border border-white/10" intensity="low">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Total Disbursed</Text>
                <View className="w-8 h-8 rounded-lg bg-[#ffe5a0]/10 border border-[#ffe5a0]/20 items-center justify-center">
                  <Landmark size={14} color="#ffe5a0" />
                </View>
              </View>
              <Text className="text-[#ffe5a0] text-lg font-bold mt-1">$284,500.00</Text>
              <View className="flex-row items-center gap-1 mt-1.5">
                <TrendingUp size={10} color="#41eec2" />
                <Text className="text-[#41eec2] text-[9px] font-bold">+4.2% vs last month</Text>
              </View>
            </GlassCard>

            {/* Pending Card */}
            <GlassCard className="w-[48%] p-4 border border-white/10" intensity="low">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Pending Clearance</Text>
                <View className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 items-center justify-center">
                  <HelpCircle size={14} color="#ffb4ab" />
                </View>
              </View>
              <Text className="text-[#ffb4ab] text-lg font-bold mt-1">$12,420.00</Text>
              <Text className="text-white/40 text-[9px] mt-1.5">Scheduled: 28th Oct</Text>
            </GlassCard>
          </View>

          {/* Pending clearance progress */}
          <GlassCard className="p-4 border border-white/5" intensity="low">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Disbursement Progress</Text>
              <Text className="text-[#ffb4ab] text-[9px] font-bold">85% COMPLETE</Text>
            </View>
            <View className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <View className="h-full bg-[#ffb4ab]" style={{ width: '85%' }} />
            </View>
          </GlassCard>
        </View>

        {/* Section 2: Salary Categories */}
        <View className="px-5 mb-8">
          <Text className="text-[#ffe5a0] text-[10px] font-bold uppercase tracking-widest mb-4">Salary Categories</Text>
          <View className="flex-row flex-wrap justify-between">
            {salaryCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <GlassCard key={idx} className="w-[48%] p-4 mb-4 items-center justify-center border border-white/10 active:bg-white/5" intensity="low">
                  <Icon size={28} color={cat.color} style={{ marginBottom: 8 }} />
                  <Text className="text-white font-bold text-sm">{cat.label}</Text>
                  <Text className="text-white/40 text-xs mt-1">{cat.cost} • {cat.staff}</Text>
                </GlassCard>
              );
            })}
          </View>
        </View>

        {/* Section 3: Expenses Log */}
        <View className="px-5 mb-16">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[#ffe5a0] text-[10px] font-bold uppercase tracking-widest">Expenses Log</Text>
            <View className="flex-row gap-2">
              <Pressable className="w-8 h-8 rounded-full bg-white/5 border border-white/10 items-center justify-center active:scale-95">
                <Search size={14} color="rgba(255,255,255,0.6)" />
              </Pressable>
              <Pressable className="w-8 h-8 rounded-full bg-white/5 border border-white/10 items-center justify-center active:scale-95">
                <Filter size={14} color="rgba(255,255,255,0.6)" />
              </Pressable>
            </View>
          </View>

          <View className="gap-3">
            {expenses.map((item) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.id} className="p-4 border border-white/10 flex-row items-center justify-between" intensity="low">
                  <View className="flex-row items-center gap-4 flex-1">
                    <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: item.color + '15', borderWidth: 1, borderColor: item.color + '30' }}>
                      <Icon size={20} color={item.color} />
                    </View>
                    <View className="flex-1 pr-2">
                      <Text className="text-white font-bold text-sm">{item.title}</Text>
                      <Text className="text-[#d1c5ac] text-[11px] mt-0.5">{item.category}</Text>
                    </View>
                  </View>

                  <View className="items-end gap-1.5">
                    <Text className="text-[#ffe5a0] font-bold text-sm">{item.amount}</Text>
                    <View className="flex-row items-center gap-1">
                      <View className="w-4 h-4 rounded-full bg-white/10 items-center justify-center">
                        <Text className="text-white text-[8px] font-bold">{item.initials}</Text>
                      </View>
                      <Text className="text-white/40 text-[9px] font-semibold">{item.date}</Text>
                    </View>
                  </View>
                </GlassCard>
              );
            })}
          </View>
        </View>

      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <Pressable 
        onPress={handleAddExpense}
        className="absolute bottom-24 right-6 w-14 h-14 rounded-full bg-[#f5c518] items-center justify-center shadow-[0_0_15px_rgba(245,197,24,0.4)] active:scale-90"
      >
        <Plus size={26} color="#241a00" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101415',
  },
  header: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 100,
  },
});

export default SalaryExpensesScreen;
