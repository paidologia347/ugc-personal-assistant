import { Link } from 'expo-router'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

type Feature = {
  href: '/ideas' | '/scripts' | '/calendar'
  title: string
  description: string
  emoji: string
}

const FEATURES: Feature[] = [
  {
    href: '/ideas',
    title: 'Content Ideas',
    description: 'Generate trending UGC hooks tailored to your niche.',
    emoji: '💡',
  },
  {
    href: '/scripts',
    title: 'Script Generator',
    description: 'Draft TikTok / Reels / Shorts scripts in seconds.',
    emoji: '🎬',
  },
  {
    href: '/calendar',
    title: 'Content Calendar',
    description: 'Plan posting cadence across every platform.',
    emoji: '🗓️',
  },
]

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>UGC · Personal Assistant</Text>
        <Text style={styles.title}>Create faster. Post smarter.</Text>
        <Text style={styles.subtitle}>
          Your AI-powered sidekick for turning raw ideas into brand-ready content
          across TikTok, Instagram, and YouTube.
        </Text>

        <Link href="/ideas" asChild>
          <Pressable style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}>
            <Text style={styles.ctaText}>Get started →</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.grid}>
        {FEATURES.map((feature) => (
          <Link key={feature.href} href={feature.href} asChild>
            <Pressable
              style={({ hovered, pressed }) => [
                styles.card,
                hovered && styles.cardHovered,
                pressed && styles.cardPressed,
              ]}
            >
              <Text style={styles.cardEmoji}>{feature.emoji}</Text>
              <Text style={styles.cardTitle}>{feature.title}</Text>
              <Text style={styles.cardDescription}>{feature.description}</Text>
              <Text style={styles.cardLink}>Open →</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Built with Expo Router · Deployed to GitHub Pages
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0b1120',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 64,
    maxWidth: 1040,
    width: '100%',
    alignSelf: 'center',
  },
  hero: {
    paddingVertical: 32,
  },
  eyebrow: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  title: {
    color: '#f8fafc',
    fontSize: 44,
    fontWeight: '800',
    lineHeight: 52,
    marginBottom: 16,
  },
  subtitle: {
    color: '#cbd5f5',
    fontSize: 17,
    lineHeight: 26,
    maxWidth: 640,
    marginBottom: 28,
  },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: '#38bdf8',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaPressed: {
    opacity: 0.85,
  },
  ctaText: {
    color: '#0b1120',
    fontSize: 16,
    fontWeight: '700',
  },
  grid: {
    marginTop: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  card: {
    flexGrow: 1,
    flexBasis: 260,
    backgroundColor: '#111c35',
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1f2a44',
  },
  cardHovered: {
    borderColor: '#38bdf8',
    transform: [{ translateY: -2 }],
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardDescription: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  cardLink: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    marginTop: 48,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#1f2a44',
  },
  footerText: {
    color: '#64748b',
    fontSize: 13,
    textAlign: 'center',
  },
})
