import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { mockNotifications } from '../../services/mockData';
import { GlassCard } from '../../components/GlassCard';
import { ArrowLeft, Bell, AlertTriangle, Info } from 'lucide-react-native';

export const NotificationCenterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'emergency':
        return <AlertTriangle size={18} color="#EF4444" />;
      case 'finance':
        return <Info size={18} color="#F59E0B" />;
      case 'academic':
      default:
        return <Bell size={18} color="#60A5FA" />;
    }
  };

  const getBorderColor = (priority: string) => {
    if (priority === 'high') return 'border-l-red-500';
    if (priority === 'medium') return 'border-l-amber-500';
    return 'border-l-blue-400';
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View className="flex-row items-center mb-6">
        <Pressable onPress={() => navigation.goBack()} className="p-3 bg-white/5 border border-white/10 rounded-2xl">
          <ArrowLeft size={20} color="#FFFFFF" />
        </Pressable>
        <Text className="text-white text-xl font-bold ml-4">Noticeboard Center</Text>
      </View>

      {mockNotifications.map((not) => (
        <GlassCard
          key={not.id}
          className={`p-4 mb-4 border-l-4 ${getBorderColor(not.priority)}`}
          intensity="medium"
        >
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-row items-center flex-1 mr-2">
              {getIcon(not.category)}
              <Text className="text-white font-bold text-sm ml-2.5">{not.title}</Text>
            </View>
            <Text className="text-white/40 text-[9px] font-semibold">{not.time}</Text>
          </View>
          <Text className="text-white/70 text-xs leading-5 pl-7">{not.message}</Text>
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

export default NotificationCenterScreen;
