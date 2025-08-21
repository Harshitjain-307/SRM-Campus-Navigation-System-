export type LocationCategory = 'building' | 'hostel' | 'food' | 'lab' | 'landmark' | 'event'

export type CampusLocation = {
  id: string
  name: string
  category: LocationCategory
  lat: number
  lng: number
  description?: string
}

export const LOCATIONS: CampusLocation[] = [
  { id: 'gate', name: 'Campus Gate', category: 'landmark', lat: 28.797629, lng: 77.53698, description: 'Main entrance' },
  { id: 'admin', name: 'Admin Block', category: 'building', lat: 28.796568, lng: 77.538177, description: 'Student services & offices' },
  { id: 'stationary', name: 'Stationary Store', category: 'building', lat: 28.796775, lng: 77.538381, description: 'Books & supplies' },
  { id: 'canteen', name: 'Red Canteen', category: 'food', lat: 28.796051, lng: 77.53915, description: 'Popular food court' },
  { id: 'hblock', name: 'H Block Hostel', category: 'hostel', lat: 28.795657, lng: 77.539948, description: 'Student hostel' },
  { id: 'gblock', name: 'G Block', category: 'building', lat: 28.796079, lng: 77.540866, description: 'Lecture halls & labs' },
]
