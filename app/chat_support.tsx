import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, Modal, KeyboardAvoidingView, Platform, ListRenderItem } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const DEMO_USER = {
  name: 'User',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};
const DEMO_BOT = {
  name: 'XO Assistant',
  avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png',
};

const DEMO_MESSAGES = [
  { id: '1', sender: 'user', text: 'Hi XO, I need help' },
  { id: '2', sender: 'bot', text: ",Hi! I\'m XO Assistant. How can I help you today?" },
];

export default function ChatSupport() {
  const router = useRouter();
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [input, setInput] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const flatListRef = useRef<FlatList<{ id: string; sender: string; text: string }> | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleNewChat = () => {
    setMessages([]);
    setMenuVisible(false);
  };

  const handleDeleteChat = () => {
    setMessages([]);
    setMenuVisible(false);
  };

  const renderMessage: ListRenderItem<{ id: string; sender: string; text: string }> = ({ item }) => {
    const isUser = item.sender === 'user';
    const avatar = isUser ? DEMO_USER.avatar : DEMO_BOT.avatar;
    return (
      <View style={[styles.messageRow, isUser ? styles.userRow : styles.botRow]}>
        {!isUser && <Image source={{ uri: avatar }} style={styles.avatar} />}
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
          <Text style={styles.bubbleText}>{item.text}</Text>
          <View style={styles.bubbleActions}>
            <Ionicons name="copy-outline" size={16} color="#888" style={{ marginRight: 8 }} />
            <Ionicons name="share-social-outline" size={16} color="#888" />
          </View>
        </View>
        {isUser && <Image source={{ uri: avatar }} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Chat with Support</Text>
        <TouchableOpacity style={styles.menuBtn} onPress={() => setMenuVisible(true)}>
          <Ionicons name="ellipsis-horizontal" size={26} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your question"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="send" size={22} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.micBtn}>
            <Ionicons name="mic-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.menuOverlay} onPress={() => setMenuVisible(false)} activeOpacity={1}>
          <View style={styles.menuPopup}>
            <TouchableOpacity style={styles.menuItem} onPress={handleNewChat}>
              <Text style={styles.menuItemText}>New Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleDeleteChat}>
              <Text style={styles.menuItemText}>Delete chat</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  backBtn: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  menuBtn: {
    padding: 4,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 80,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  botRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 6,
    backgroundColor: '#EEE',
  },
  bubble: {
    maxWidth: '70%',
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#FFF',
    marginHorizontal: 2,
  },
  userBubble: {
    backgroundColor: '#F2F2F2',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
  },
  bubbleText: {
    color: '#222',
    fontSize: 15,
    marginBottom: 8,
  },
  bubbleActions: {
    flexDirection: 'row',
    marginTop: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 22,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  sendBtn: {
    backgroundColor: '#FF5722',
    borderRadius: 16,
    padding: 8,
    marginLeft: 6,
  },
  micBtn: {
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    padding: 8,
    marginLeft: 6,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.12)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 24,
  },
  menuPopup: {
    backgroundColor: '#222',
    borderRadius: 14,
    paddingVertical: 8,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  menuItemText: {
    color: '#FFF',
    fontSize: 15,
  },
}); 