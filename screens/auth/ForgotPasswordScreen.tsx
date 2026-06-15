import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CustomInput } from '../../components/CustomInput';
import { InteractiveButton } from '../../components/InteractiveButton';
import { GlassCard } from '../../components/GlassCard';
import { Mail, ArrowLeft } from 'lucide-react-native';

const forgotSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export const ForgotPasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotFormData) => {
    // Mock OTP dispatch
    Alert.alert(
      "OTP Dispatched",
      `A 6-digit OTP verification code has been dispatched to ${data.email}.`,
      [{ text: "Verify OTP", onPress: () => navigation.navigate('OTPVerify', { email: data.email }) }]
    );
  };

  return (
    <ScrollView contentContainerClassName="bg-brand-darkNavy flex-grow justify-center px-6 py-12">
      <View className="flex-row items-center mb-8">
        <ArrowLeft size={24} color="#FFFFFF" onPress={() => navigation.goBack()} />
        <Text className="text-white text-2xl font-bold ml-4">Reset Password</Text>
      </View>

      <GlassCard className="p-6">
        <Text className="text-white/70 text-sm mb-6 leading-5">
          Enter your registered institutional email address. We will send you a 6-digit verification code to reset your account credentials.
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Institutional Email"
              placeholder="e.g. parent@eduvision.edu"
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

        <InteractiveButton
          onPress={handleSubmit(onSubmit)}
          title="Send OTP Verification"
          variant="secondary"
          className="mt-4"
        />
      </GlassCard>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

