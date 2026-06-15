import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { mockFees, FeeItem } from '../../services/mockData';
import { GlassCard } from '../../components/GlassCard';
import { InteractiveButton } from '../../components/InteractiveButton';
import { CreditCard, FileDown, CheckCircle, ArrowLeft } from 'lucide-react-native';

export const FeePaymentScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { activeChildId } = useAuthStore();
  const [fees, setFees] = useState<FeeItem[]>(mockFees[activeChildId || 'stud_001'] || []);
  const [payingId, setPayingId] = useState<string | null>(null);

  const handlePayment = (feeId: string, title: string, amount: number) => {
    Alert.alert(
      "Confirm Fee Settle",
      `Authorize payment of $${amount} for "${title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Settle Payment",
          onPress: () => simulatePayment(feeId)
        }
      ]
    );
  };

  const simulatePayment = (feeId: string) => {
    setPayingId(feeId);
    setTimeout(() => {
      setFees(prev => prev.map(f => f.id === feeId ? { ...f, status: 'paid' } : f));
      setPayingId(null);
      Alert.alert("Payment Verified", "Transaction approved! Invoice receipt downloaded to secure storage.");
    }, 1500);
  };

  const getStatusStyle = (status: string) => {
    if (status === 'paid') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (status === 'overdue') return 'bg-red-500/20 text-red-400 border-red-500/30';
    return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View className="flex-row items-center mb-6">
        <Pressable onPress={() => navigation.goBack()} className="p-3 bg-white/5 border border-white/10 rounded-2xl">
          <ArrowLeft size={20} color="#FFFFFF" />
        </Pressable>
        <Text className="text-white text-xl font-bold ml-4">Tuition & Accounts</Text>
      </View>

      <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Outstanding Invoices</Text>
      {fees.filter(f => f.status !== 'paid').map((fee) => (
        <GlassCard key={fee.id} className="p-5 mb-4 border-l-4 border-l-amber-400" intensity="high">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1 mr-2">
              <Text className="text-white font-bold text-base">{fee.title}</Text>
              <Text className="text-white/50 text-xs font-semibold uppercase">{fee.category} • Due {fee.dueDate}</Text>
            </View>
            <View className={`px-2 py-0.5 rounded border ${getStatusStyle(fee.status)}`}>
              <Text className="font-bold text-[9px] uppercase">{fee.status}</Text>
            </View>
          </View>
          
          <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-white/5">
            <Text className="text-white text-2xl font-black">${fee.amount}</Text>
            {payingId === fee.id ? (
              <View className="bg-brand-indigo px-6 py-2.5 rounded-xl">
                <ActivityIndicator size="small" color="#FFFFFF" />
              </View>
            ) : (
              <Pressable
                onPress={() => handlePayment(fee.id, fee.title, fee.amount)}
                className="bg-brand-indigo px-5 py-2.5 rounded-xl"
              >
                <Text className="text-white font-bold text-xs">Pay Online</Text>
              </Pressable>
            )}
          </View>
        </GlassCard>
      ))}

      <Text className="text-white/80 text-sm font-semibold mb-3 mt-4 ml-1">Payment History</Text>
      {fees.filter(f => f.status === 'paid').map((fee) => (
        <GlassCard key={fee.id} className="p-4 mb-3 flex-row justify-between items-center" intensity="medium">
          <View>
            <Text className="text-white font-bold text-sm">{fee.title}</Text>
            <Text className="text-white/50 text-[10px] uppercase font-semibold mt-0.5">{fee.category} • Settle Auto</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-emerald-400 font-extrabold text-sm mr-3">${fee.amount}</Text>
            <Pressable
              onPress={() => Alert.alert("Receipt Generated", "PDF Receipt successfully compiled and shared.")}
              className="bg-white/10 p-2 rounded-xl border border-white/10"
            >
              <FileDown size={14} color="#FFFFFF" />
            </Pressable>
          </View>
        </GlassCard>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
  },
});

export default FeePaymentScreen;
