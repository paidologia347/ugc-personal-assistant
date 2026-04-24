import { ScrollView, StyleSheet, Text, View } from 'react-native'

const WEEK = [
  { day: 'Mon', focus: 'Hook Day', prompt: 'Record 3 hook variants for the same idea.' },
  { day: 'Tue', focus: 'Story Day', prompt: 'Share a behind-the-scenes of your workflow.' },
  { day: 'Wed', focus: 'Value Day', prompt: 'Teach one tiny thing your audience can apply today.' },
  { day: 'Thu', focus: 'Trend Day', prompt: 'Riff on a trending audio / format in your niche.' },
  { day: 'Fri', focus: 'Proof Day', prompt: 'Show a result, testimonial, or case study.' },
  { day: 'Sat', focus: 'Community Day', prompt: 'Reply to a comment on video.' },
  { day: 'Sun', focus: 'Rest / Plan', prompt: 'Batch plan next week\'s content.' },
]

export default function CalendarScreen() {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Content Calendar</Text>
      <Text style={styles.subtitle}>
        A starter weekly cadence you can remix to fit your niche.
      </Text>

      <View style={styles.list}>
        {WEEK.map((entry) => (
          <View key={entry.day} style={styles.row}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayText}>{entry.day}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.focus}>{entry.focus}</Text>
              <Text style={styles.prompt}>{entry.prompt}</Text>
            </View>
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
  list: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#111c35',
    borderWidth: 1,
    borderColor: '#1f2a44',
  },
  dayBadge: {
    width: 64,
    borderRadius: 10,
    backgroundColor: '#0b1120',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#1f2a44',
  },
  dayText: {
    color: '#38bdf8',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 1,
  },
  body: {
    flex: 1,
  },
  focus: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  prompt: {
    color: '#cbd5f5',
    fontSize: 15,
    lineHeight: 22,
  },
})
