import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { useRouter } from 'expo-router';

const FAQS = [
  {
    question: 'How do I place an order?',
    answer: 'To place an order, search for your desired products, add them to your cart, and proceed to checkout. Choose your delivery address and payment method to confirm.',
  },
  {
    question: 'Can I schedule a delivery?',
    answer: 'Yes, you can schedule a delivery during checkout by selecting your preferred date and time.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, UPI, and cash on delivery.',
  },
  {
    question: 'How do I track my order?',
    answer: 'You can track your order status in the Orders section of the app.',
  },
  {
    question: 'How can I update my delivery address?',
    answer: 'Go to your profile and update your saved addresses at any time.',
  },
  {
    question: 'What if an item is missing or damaged?',
    answer: 'Contact our support team through the Help section for quick resolution.',
  },
  {
    question: 'Can I cancel my order?',
    answer: 'Yes, you can cancel your order before it is out for delivery from the Orders section.',
  },
  {
    question: 'Is there a delivery fee?',
    answer: 'Delivery fees may apply based on your order value and location. Check the checkout page for details.',
  },
];

export default function FAQScreen() {
  const [openIndex, setOpenIndex] = useState(0);
  const router = useRouter();

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>FAQ</Text>
        </View>
        <Text style={styles.subtitle}>Got Questions? We've Got Answers!</Text>
        <View style={styles.faqCard}>
          {FAQS.map((faq, idx) => (
            <View key={faq.question}>
              <TouchableOpacity
                style={styles.faqItem}
                onPress={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                activeOpacity={0.8}
              >
                <Text style={[styles.faqQuestion, openIndex === idx && styles.faqQuestionActive]}>{faq.question}</Text>
                <Ionicons
                  name={openIndex === idx ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#222"
                />
              </TouchableOpacity>
              {openIndex === idx && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
              {idx !== FAQS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backBtn: {
    padding: 14,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  subtitle: {
    fontSize: 17,
    color: '#222',
    marginBottom: 24,
    fontWeight: '500',
    textAlign: 'left',
  },
  faqCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  faqQuestion: {
    fontSize: 14,
    color: '#222',
    lineHeight: 15,
    fontWeight: '600',
    flex: 1,
  },
  faqQuestionActive: {
    color: '#000000',
  },
  faqAnswer: {
    fontSize: 13,
    color: '#888',
    marginTop: -4,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F3F3',
    marginHorizontal: 10,
  },
});
