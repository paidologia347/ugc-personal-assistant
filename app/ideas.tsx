import { useMemo, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

const SEEDS = [
  'Morning routine for {niche} creators — 3 habits they wish they knew',
  '5 unpopular opinions every {niche} creator needs to hear',
  'I tried {niche} for 30 days — here\'s what nobody talks about',
  'Before/after using {niche} tools — raw reaction',
  'Tier-list: the best {niche} hooks that still convert in 2025',
  'POV: your first {niche} viral video — step-by-step breakdown',
  'Reply to @username: my honest take on {niche} in 45 seconds',
  'Things I\'d tell my past self before starting {niche}',
]

export default function IdeasScreen() {
  const [niche, setNiche] = useState('skincare')

  const ideas = useMemo(() => {
    const label = niche.trim() || 'your niche'
    return SEEDS.map((seed) => seed.replaceAll('{niche}', label))
  }, [niche])

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Content Ideas</Text>
      <Text style={styles.subtitle}>
        Enter your niche and get a starter list of UGC hooks.
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          value={niche}
          onChangeText={setNiche}
          placeholder="e.g. fitness, skincare, finance"
          placeholderTextColor="#64748b"
          style={styles.input}
          autoCapitalize="none"
          returnKeyType="done"
        />
      </View>

      <View style={styles.list}>
        {ideas.map((idea, index) => (
          <Pressable
            key={`${index}-${idea}`}
            style={({ hovered, pressed }) => [
              styles.card,
              hovered && styles.cardHovered,
              pressed && styles.cardPressed,
            ]}
          >
            <Text style={styles.cardIndex}>#{String(index + 1).padStart(2, '0')}</Text>
            <Text style={styles.cardText}>{idea}</Text>
          </Pressable>
        ))}
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
    padding: 24,
    maxWidth: 880,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    color: '#f8fafc',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 24,
  },
  inputRow: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#111c35',
    borderWidth: 1,
    borderColor: '#1f2a44',
    borderRadius: 12,
    color: '#f8fafc',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#111c35',
    borderWidth: 1,
    borderColor: '#1f2a44',
  },
  cardHovered: {
    borderColor: '#38bdf8',
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardIndex: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: '700',
    minWidth: 32,
  },
  cardText: {
    color: '#e2e8f0',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
})
