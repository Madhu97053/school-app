import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CustomInput } from '../../components/CustomInput';
import { InteractiveButton } from '../../components/InteractiveButton';
import { GlassCard } from '../../components/GlassCard';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react-native';

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be exactly 6 digits" }),
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type OtpFormData = z.infer<typeof otpSchema>;

export const OTPVerifyScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const email = route?.params?.email || "your email";
  
  const { control, handleSubmit, formState: { errors } } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = (data: OtpFormData) => {
    // Code validation
    if (data.otp === "123456") {
      Alert.alert(
        "Verification Success",
        "Your password has been successfully reset. Please log in with your new credentials.",
        [{ text: "Back to Login", onPress: () => navigation.navigate('Login') }]
      );
    } else {
      Alert.alert("Verification Error", "The code you entered is invalid. Try '123456' for testing.");
    }
  };

  return (
    <ScrollView contentContainerClassName="bg-brand-darkNavy flex-grow justify-center px-6 py-12">
      <View className="flex-row items-center mb-8">
        <ArrowLeft size={24} color="#FFFFFF" onPress={() => navigation.goBack()} />
        <Text className="text-white text-2xl font-bold ml-4">Verification</Text>
      </View>

      <GlassCard className="p-6">
        <Text className="text-white/70 text-sm mb-6 leading-5">
          We sent a verification code to <Text className="text-white font-bold">{email}</Text>. Enter the code and set your new password. (Use <Text className="text-white font-bold">123456</Text> for demo)
        </Text>

        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="6-Digit Verification Code"
              placeholder="e.g. 123456"
              maxLength={6}
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.otp?.message}
              icon={<ShieldCheck size={20} color="#FFFFFF" />}
            />
          )}
        />

        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="New Portal Password"
              placeholder="••••••••"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.newPassword?.message}
              icon={<Lock size={20} color="#FFFFFF" />}
              autoCapitalize="none"
            />
          )}
        />

        <InteractiveButton
          onPress={handleSubmit(onSubmit)}
          title="Verify & Reset"
          variant="accent"
          className="mt-4"
        />
      </GlassCard>
    </ScrollView>
  );
};

export default OTPVerifyScreen;

