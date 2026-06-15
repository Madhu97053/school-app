import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { GlassCard } from '../../components/GlassCard';
import { mockBusRoute } from '../../services/mockData';
import { MapPin, Navigation, Phone, Shield, ArrowLeft } from 'lucide-react-native';

export const BusTrackingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [eta, setEta] = useState(8);

  // Simulate GPS coordinates updating
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => (prev > 1 ? prev - 1 : 8));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleCallDriver = () => {
    Alert.alert("Contacting Driver", `Dialing Robert Miller at ${mockBusRoute.driverPhone}...`);
  };

  return (
    <View style={styles.container} className="flex-1">
      {/* simulated Map View background with deep navy grids */}
      <View style={styles.mapCanvas} className="flex-grow justify-center items-center relative">
        {/* Simple mock GPS route lines */}
        <View className="absolute top-[28%] left-[20%] w-[60%] h-[150px] border-t-4 border-l-4 border-dashed border-brand-indigo opacity-60 rounded-tl-3xl" />
        <View className="absolute top-[48%] left-[10%] w-[80%] h-[2px] bg-brand-emerald opacity-80" />

        {/* Header toolbar */}
        <View className="absolute top-10 left-5 flex-row items-center z-10">
          <Pressable onPress={() => navigation.goBack()} className="p-3 bg-brand-darkNavy/80 border border-white/10 rounded-2xl">
            <ArrowLeft size={20} color="#FFFFFF" />
          </Pressable>
          <Text className="text-white text-xl font-bold ml-4">Route GPS Tracker</Text>
        </View>

        {/* Simulated Bus Icon marker */}
        <View className="absolute top-[40%] left-[45%] items-center z-10">
          <View className="bg-brand-indigo p-3 rounded-full border-2 border-white shadow-2xl animate-bounce">
            <Navigation size={22} color="#FFFFFF" style={{ transform: [{ rotate: '45deg' }] }} />
          </View>
          <View className="bg-brand-indigo/20 px-3 py-1 rounded-full border border-brand-indigo/30 mt-2">
            <Text className="text-white text-[10px] font-bold">CA-342-BUS</Text>
          </View>
        </View>

        {/* Simulated Stop Marker */}
        <View className="absolute top-[26%] left-[18%] items-center z-10">
          <View className="bg-brand-emerald p-2 rounded-full border border-white">
            <MapPin size={14} color="#FFFFFF" />
          </View>
          <Text className="text-white/60 text-[9px] mt-1 font-semibold">Oakridge Stop</Text>
        </View>
      </View>

      {/* Floating details panel */}
      <GlassCard style={styles.detailsPanel} className="p-5" intensity="high">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-white/40 text-[10px] font-bold uppercase">Active Route</Text>
            <Text className="text-white text-lg font-bold">{mockBusRoute.routeName}</Text>
          </View>
          <View className="bg-brand-indigo/20 px-4 py-2.5 rounded-2xl border border-brand-indigo/30">
            <Text className="text-brand-indigo text-lg font-extrabold">{eta} Mins</Text>
            <Text className="text-white/50 text-[9px] text-center mt-0.5">ETA</Text>
          </View>
        </View>

        {/* Driver contact row */}
        <View className="flex-row justify-between items-center border-t border-b border-white/5 py-3.5 mb-4">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-2.5 rounded-xl">
              <Shield size={18} color="#A78BFA" />
            </View>
            <View className="ml-3">
              <Text className="text-white font-bold text-sm">{mockBusRoute.driverName}</Text>
              <Text className="text-white/50 text-xs">Vetted Academy Operator</Text>
            </View>
          </View>
          <Pressable onPress={handleCallDriver} className="bg-brand-indigo p-3 rounded-2xl">
            <Phone size={18} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Stop Timeline */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
          {mockBusRoute.stops.map((stop, idx) => (
            <View key={idx} className="items-start min-w-[110px]">
              <View className="flex-row items-center mb-1">
                <View className={`w-2 h-2 rounded-full ${idx === 2 ? 'bg-brand-indigo' : 'bg-white/20'}`} />
                <View className="h-[1px] flex-1 bg-white/10" />
              </View>
              <Text className="text-white text-xs font-bold" numberOfLines={1}>{stop.name}</Text>
              <Text className="text-white/40 text-[10px] mt-0.5">{stop.time}</Text>
            </View>
          ))}
        </ScrollView>
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  mapCanvas: {
    backgroundColor: '#0F172A',
  },
  detailsPanel: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
});

export default BusTrackingScreen;
