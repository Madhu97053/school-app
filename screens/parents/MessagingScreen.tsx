import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { GlassCard } from '../../components/GlassCard';
import { mockChats, ChatMessage } from '../../services/mockData';
import { ArrowLeft, Send, Paperclip, Mic } from 'lucide-react-native';

export const MessagingScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const chatKey = route?.params?.chatKey || 'teacher_parent';
  const [messages, setMessages] = useState<ChatMessage[]>(mockChats[chatKey] || []);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Math.random()}`,
      senderId: 'parent_elizabeth',
      senderName: 'Elizabeth Warren',
      senderRole: 'parent',
      text: inputText,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Trigger minor simulated auto reply
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg_${Math.random()}`,
        senderId: 'usr_jenkins',
        senderName: 'Sarah Jenkins',
        senderRole: 'teacher',
        text: "Understood, thank you for the details. I will review this during class prep.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-brand-darkNavy"
    >
      <View style={styles.container} className="flex-1">
        {/* Chat Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-white/5 bg-brand-darkNavy">
          <View className="flex-row items-center">
            <Pressable onPress={() => navigation.goBack()} className="p-2 bg-white/5 rounded-xl mr-3">
              <ArrowLeft size={18} color="#FFFFFF" />
            </Pressable>
            <View>
              <Text className="text-white font-bold text-base">
                {chatKey === 'teacher_parent' ? 'Mrs. Jenkins (Grade 9 Math)' : 'Marcus Vance (Registrar Office)'}
              </Text>
              <Text className="text-emerald-400 text-[10px] font-semibold uppercase">Online</Text>
            </View>
          </View>
        </View>

        {/* Message List */}
        <ScrollView contentContainerStyle={styles.messagesList} className="flex-1 px-5 py-4">
          {messages.map((msg) => {
            const isMe = msg.senderRole === 'parent';
            return (
              <View
                key={msg.id}
                className={`mb-4 flex-row ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <GlassCard
                  intensity={isMe ? 'high' : 'low'}
                  style={{
                    maxWidth: '80%',
                    backgroundColor: isMe ? 'rgba(79, 70, 229, 0.22)' : 'rgba(255, 255, 255, 0.08)',
                    borderBottomRightRadius: isMe ? 4 : 20,
                    borderBottomLeftRadius: isMe ? 20 : 4,
                  }}
                  className="p-3.5"
                >
                  <Text className="text-white/50 text-[9px] font-bold mb-1">{msg.senderName}</Text>
                  <Text className="text-white text-sm leading-5">{msg.text}</Text>
                </GlassCard>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Bar */}
        <View className="flex-row items-center px-4 py-3 border-t border-white/5 bg-brand-darkNavy">
          <Pressable className="p-3 bg-white/5 rounded-full mr-2">
            <Paperclip size={18} color="#FFFFFF" />
          </Pressable>
          
          <TextInput
            placeholder="Type message..."
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            value={inputText}
            onChangeText={setInputText}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white text-sm mr-2"
          />

          {inputText.trim() ? (
            <Pressable onPress={handleSend} className="p-3 bg-brand-indigo rounded-full">
              <Send size={18} color="#FFFFFF" />
            </Pressable>
          ) : (
            <Pressable className="p-3 bg-white/5 rounded-full">
              <Mic size={18} color="#FFFFFF" />
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  messagesList: {
    paddingBottom: 20,
  },
});

export default MessagingScreen;
