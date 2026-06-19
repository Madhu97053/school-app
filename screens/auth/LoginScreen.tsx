import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert, ActivityIndicator, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore, UserRole } from '../../store/useAuthStore';
import { CustomInput } from '../../components/CustomInput';
import { InteractiveButton } from '../../components/InteractiveButton';
import { GlassCard } from '../../components/GlassCard';
import { Mail, Lock, CheckCircle, Users, GraduationCap, Briefcase, Shield, Compass } from 'lucide-react-native';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('parent');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'parent@eduvision.edu',
      password: 'password123',
    }
  });

  interface RoleConfig {
    role: UserRole;
    label: string;
    description: string;
    colorClass: string;
    borderClass: string;
    bgClass: string;
    glowColor: string;
    activeColor: string;
    icon: React.ComponentType<any>;
  }

  const rolesConfigs: RoleConfig[] = [
    {
      role: 'parent',
      label: 'Parent',
      description: 'Student progress & portal',
      colorClass: 'text-pink-400',
      borderClass: 'border-pink-500/50',
      bgClass: 'bg-pink-500/10',
      glowColor: 'rgba(236, 72, 153, 0.45)',
      activeColor: '#EC4899',
      icon: Users,
    },
    {
      role: 'teacher',
      label: 'Teacher',
      description: 'Classroom & grading portal',
      colorClass: 'text-blue-400',
      borderClass: 'border-blue-500/50',
      bgClass: 'bg-blue-500/10',
      glowColor: 'rgba(59, 130, 246, 0.45)',
      activeColor: '#3B82F6',
      icon: GraduationCap,
    },
    {
      role: 'admin_staff',
      label: 'Admin Staff',
      description: 'Campus ops & finance',
      colorClass: 'text-emerald-400',
      borderClass: 'border-emerald-500/50',
      bgClass: 'bg-emerald-500/10',
      glowColor: 'rgba(16, 185, 129, 0.45)',
      activeColor: '#10B981',
      icon: Briefcase,
    },
    {
      role: 'super_admin',
      label: 'Super Admin',
      description: 'Full system configs',
      colorClass: 'text-purple-400',
      borderClass: 'border-purple-500/50',
      bgClass: 'bg-purple-500/10',
      glowColor: 'rgba(139, 92, 246, 0.45)',
      activeColor: '#8B5CF6',
      icon: Shield,
    },
    {
      role: 'guest',
      label: 'Guest',
      description: 'Explore the public showcase',
      colorClass: 'text-orange-400',
      borderClass: 'border-orange-500/50',
      bgClass: 'bg-orange-500/10',
      glowColor: 'rgba(249, 115, 22, 0.45)',
      activeColor: '#F97316',
      icon: Compass,
    },
  ];

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const success = await login(data.email, selectedRole);
      if (success) {
        // Logged in!
      } else {
        Alert.alert("Login Failed", "Invalid credentials, please try again.");
      }
    } catch (err) {
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = async () => {
    setLoading(true);
    await login('guest@eduvision.edu', 'guest');
    setLoading(false);
  };

  const handleBypass = async () => {
    setLoading(true);
    await login(`${selectedRole}@eduvision.edu`, selectedRole);
    setLoading(false);
  };

  return (
    <ScrollView contentContainerClassName="bg-brand-darkNavy flex-grow justify-center px-6 py-12">
      <View className="items-center mb-10">
        <Text className="text-white text-4xl font-extrabold tracking-wider">EduVision</Text>
        <Text className="text-white/60 text-sm mt-2 font-medium">Elite Campus Management Portal</Text>
      </View>

      <GlassCard className="p-6">
        <Text className="text-white text-xl font-bold mb-4">Select Portal Profile</Text>
        
        {/* Role Selector Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {rolesConfigs.map((item) => {
            const isSelected = selectedRole === item.role;
            const isFullWidth = item.role === 'guest';
            const IconComponent = item.icon;
            
            return (
              <Pressable
                key={item.role}
                onPress={() => setSelectedRole(item.role)}
                style={{
                  width: isFullWidth ? '100%' : '48%',
                  shadowColor: isSelected ? item.glowColor : 'transparent',
                  shadowOffset: isSelected ? { width: 0, height: 6 } : { width: 0, height: 0 },
                  shadowOpacity: isSelected ? 0.45 : 0,
                  shadowRadius: isSelected ? 12 : 0,
                  elevation: Platform.OS === 'android' ? 0 : (isSelected ? 6 : 0),
                }}
                className={`p-4 rounded-2xl mb-4 flex-col items-center justify-center border transition-all duration-300 ${
                  isSelected
                    ? `${item.bgClass} ${item.borderClass}`
                    : 'bg-black/35 border-white/5'
                }`}
              >
                <View 
                  className={`p-3 rounded-2xl mb-3 flex items-center justify-center border ${
                    isSelected ? 'bg-white/10 border-transparent' : 'bg-white/5 border-white/15'
                  }`}
                >
                  <IconComponent 
                    size={28} 
                    color={isSelected ? item.activeColor : '#FFFFFF'} 
                  />
                </View>
                <Text className={`text-base font-bold text-center mb-1 ${item.colorClass}`}>
                  {item.label}
                </Text>
                <Text className="text-white/50 text-[11px] text-center font-medium leading-4 px-2">
                  {item.description}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Inputs */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Institutional Email"
              placeholder="e.g. name@eduvision.edu"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              icon={<Mail size={20} color="#FFFFFF" />}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Portal Password"
              placeholder="••••••••"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              icon={<Lock size={20} color="#FFFFFF" />}
              autoCapitalize="none"
            />
          )}
        />

        {/* Forgot password */}
        <Pressable onPress={() => navigation.navigate('ForgotPassword')} className="align-self-end mb-6">
          <Text className="text-brand-indigo text-right font-semibold text-sm">Forgot Password?</Text>
        </Pressable>

        {/* Action Buttons */}
        {loading ? (
          <View className="py-4 bg-brand-blue rounded-2xl items-center justify-center">
            <ActivityIndicator size="small" color="#FFFFFF" />
          </View>
        ) : (
          <View className="gap-3">
            <InteractiveButton
              onPress={handleSubmit(onSubmit)}
              title="Authenticate Portal"
              variant="primary"
            />
            
            <InteractiveButton
              onPress={handleBypass}
              title={`⚡ Bypass Auth (Login as ${selectedRole.replace('_', ' ').toUpperCase()})`}
              variant="secondary"
            />
          </View>
        )}
      </GlassCard>

      {/* Guest Login Option */}
      <View className="mt-8 items-center">
        <Text className="text-white/40 text-sm mb-3">Prospective Parent or Guest?</Text>
        <Pressable onPress={handleGuestAccess} className="bg-white/5 px-6 py-3 rounded-full border border-white/10">
          <Text className="text-white/80 font-bold text-sm">Explore as Guest</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

