import { useMemo, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

const PLATFORMS = ['TikTok', 'Reels', 'Shorts'] as const
type Platform = (typeof PLATFORMS)[number]

function buildScript(platform: Platform, topic: string) {
  const t = topic.trim() || 'your product'
  const beats = [
    { label: 'Hook (0–2s)', text: `Stop scrolling — this is the ${t} moment nobody told you about.` },
    { label: 'Context (2–6s)', text: `I spent the last 2 weeks testing ${t} so you don't have to.` },
    { label: 'Value (6–18s)', text: `Here are the 3 things that actually moved the needle with ${t}.` },
    { label: 'Proof (18–30s)', text: `This is what my ${t} results looked like before / after.` },
    { label: 'CTA (30–40s)', text: `Save this, and follow for part 2 on ${t}.` },
  ]
  return { platform, beats }
}

export default function ScriptsScreen() {
  const [topic, setTopic] = useState('my morning coffee routine')
  const [platform, setPlatform] = useState<Platform>('TikTok')

  const script = useMemo(() => buildScript(platform, topic), [platform, topic])

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Script Generator</Text>
      <Text style={styles.subtitle}>
        Pick a platform and topic — we will scaffold a 40-second script.
      </Text>

      <View style={styles.platformRow}>
        {PLATFORMS.map((p) => {
          const active = p === platform
          return (
            <Pressable
              key={p}
              onPress={() => setPlatform(p)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{p}</Text>
            </Pressable>
          )
        })}
      </View>

      <TextInput
        value={topic}
        onChangeText={setTopic}
        placeholder="What's the video about?"
        placeholderTextColor="#64748b"
        style={styles.input}
        returnKeyType="done"
      />

      <View style={styles.script}>
        {script.beats.map((beat) => (
          <View key={beat.label} style={styles.beat}>
            <Text style={styles.beatLabel}>{beat.label}</Text>
            <Text style={styles.beatText}>{beat.text}</Text>
          </View>
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
  platformRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1f2a44',
    backgroundColor: '#111c35',
  },
  chipActive: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  chipText: {
    color: '#cbd5f5',
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#0b1120',
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
    marginBottom: 24,
  },
  script: {
    gap: 12,
  },
  beat: {
    backgroundColor: '#111c35',
    borderWidth: 1,
    borderColor: '#1f2a44',
    borderRadius: 14,
    padding: 18,
  },
  beatLabel: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  beatText: {
    color: '#e2e8f0',
    fontSize: 16,
    lineHeight: 24,
  },
})
