import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore, UserRole } from '../../store/useAuthStore';
import { CustomInput } from '../../components/CustomInput';
import { InteractiveButton } from '../../components/InteractiveButton';
import { GlassCard } from '../../components/GlassCard';
import { Mail, Lock, CheckCircle } from 'lucide-react-native';

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

  const rolesList: { role: UserRole; label: string }[] = [
    { role: 'super_admin', label: 'Super Admin' },
    { role: 'admin_staff', label: 'Admin Staff' },
    { role: 'teacher', label: 'Teacher' },
    { role: 'parent', label: 'Parent' },
    { role: 'guest', label: 'Guest' },
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
          {rolesList.map((item) => (
            <Pressable
              key={item.role}
              onPress={() => setSelectedRole(item.role)}
              style={{ width: '48%' }}
              className={`p-3 rounded-xl mb-3 flex-row items-center justify-between border ${
                selectedRole === item.role
                  ? 'bg-brand-indigo/35 border-brand-indigo'
                  : 'bg-white/5 border-white/5'
              }`}
            >
              <Text className="text-white/90 text-sm font-semibold">{item.label}</Text>
              {selectedRole === item.role && <CheckCircle size={16} color="#10B981" />}
            </Pressable>
          ))}
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

