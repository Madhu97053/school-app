import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from './GlassCard';

interface AdminStatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle?: string;
  trend?: string;
  progress?: number; // 0 to 1
  isGlowing?: boolean;
}

export const AdminStatCard: React.FC<AdminStatCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  trend,
  progress,
  isGlowing = false,
}) => {
  return (
    <GlassCard 
      intensity="low" 
      className={`p-4 flex-1 ${isGlowing ? 'border-[#00f1a1]/50' : 'border-[#00f1a1]/10 bg-[#101415]/80'}`}
      glowColor={isGlowing ? 'rgba(0, 241, 161, 0.4)' : undefined}
      style={isGlowing ? styles.glowingCard : undefined}
    >
      <View className="flex-row justify-between items-start mb-4">
        <Text className="text-white/70 text-xs font-semibold tracking-wider uppercase">{title}</Text>
        {icon}
      </View>
      <Text className="text-white text-2xl font-bold mb-1">{value}</Text>
      
      {progress !== undefined && (
        <View className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
          <View 
            className="h-full bg-[#00f1a1] rounded-full shadow-[0_0_8px_#00f1a1]" 
            style={{ width: `${progress * 100}%` }} 
          />
        </View>
      )}

      {subtitle && !trend && (
        <Text className="text-white/50 text-xs mt-1">{subtitle}</Text>
      )}
      
      {trend && (
        <View className="flex-row items-center mt-1">
          <Text className="text-[#00f1a1] text-[10px] font-bold mr-1">↗ {trend}</Text>
          {subtitle && <Text className="text-white/50 text-[10px]">{subtitle}</Text>}
        </View>
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  glowingCard: {
    shadowColor: '#00f1a1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    backgroundColor: '#101415',
  }
});
