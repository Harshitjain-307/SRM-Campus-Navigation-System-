export type CampusEvent = {
  id: string
  title: string
  lat: number
  lng: number
  datetime: string
  venue: string
  tag: 'fest' | 'workshop' | 'talk' | 'club'
}

export const EVENTS: CampusEvent[] = [
  {
    id: 'e1',
    title: 'Tech Fest: HackSRM',
    lat: 28.7962,
    lng: 77.5394,
    datetime: '2025-09-20T10:00:00',
    venue: 'G Block Auditorium',
    tag: 'fest',
  },
  {
    id: 'e2',
    title: 'AI Workshop: Prompt Engineering',
    lat: 28.7967,
    lng: 77.5383,
    datetime: '2025-10-02T14:00:00',
    venue: 'Admin Block Seminar Hall',
    tag: 'workshop',
  },
]
