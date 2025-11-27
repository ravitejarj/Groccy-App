import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

export default function ContactUsScreen() {
  const router = useRouter();

  return (
    <SafeAreaWrapper style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#222" />
        </TouchableOpacity>

        <Text style={styles.title}>Contact Us</Text>

        <View style={styles.card}>
          <Ionicons name="mail-outline" size={22} color="#FF5722" style={styles.icon} />
          <View style={styles.details}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>support@groccy.com</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="call-outline" size={22} color="#FF5722" style={styles.icon} />
          <View style={styles.details}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>+1 (888) 123-4567</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="location-outline" size={22} color="#FF5722" style={styles.icon} />
          <View style={styles.details}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>Atlanta, Georgia, USA</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="time-outline" size={22} color="#FF5722" style={styles.icon} />
          <View style={styles.details}>
            <Text style={styles.label}>Support Hours</Text>
            <Text style={styles.value}>Mon–Fri, 9 AM – 6 PM EST</Text>
          </View>
        </View>

        {/* Optional buttons below */}
        {/* 
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:support@groccy.com')}
          style={styles.actionButton}
        >
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('tel:+18881234567')}
          style={styles.actionButton}
        >
          <Text style={styles.buttonText}>Call Us</Text>
        </TouchableOpacity>
        */}
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { padding: 20 },
  backButton: { marginBottom: 10 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 1,
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  details: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  actionButton: {
    backgroundColor: '#FF5722',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
