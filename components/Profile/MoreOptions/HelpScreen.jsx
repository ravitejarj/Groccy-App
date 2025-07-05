import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HelpScreen() {
  const router = useRouter();
  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Help</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>Having issues with your order?</Text>
        <Text style={styles.subheading}>We're here to help! Choose one of the options below.</Text>
        <View style={styles.cardList}>
          <TouchableOpacity style={styles.cardBtn} activeOpacity={0.8}>
            <Ionicons name="call-outline" size={20} color="#333" style={styles.cardIcon} />
            <Text style={styles.cardText}>Call Support</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardBtn} activeOpacity={0.8} onPress={() => router.push('/chat_support')}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#333" style={styles.cardIcon} />
            <Text style={styles.cardText}>Chat with Support</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" style={styles.chevron} />
          </TouchableOpacity>
        </View>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  heading: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
    marginTop: 8,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 18,
  },
  cardList: {
    gap: 16,
  },
  cardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 0,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardText: {
    flex: 1,
    color: '#222',
    fontSize: 15,
  },
  chevron: {
    marginLeft: 'auto',
  },
});
