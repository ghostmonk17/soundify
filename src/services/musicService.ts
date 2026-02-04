import { Song } from '@/context/PlayerContext';
import { Playlist } from '@/context/PlaylistContext';

// Dummy data for ui testing
export const dummySongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Nova',
    album: 'Starlight',
    duration: 234,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Electric Pulse',
    artist: 'Neon Waves',
    album: 'Voltage',
    duration: 198,
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Ocean Breeze',
    artist: 'Coastal Vibes',
    album: 'Serenity',
    duration: 267,
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: 'Urban Nights',
    artist: 'City Lights',
    album: 'Metropolitan',
    duration: 212,
    coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: '5',
    title: 'Mountain Echo',
    artist: 'Alpine Sound',
    album: 'Heights',
    duration: 289,
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: '6',
    title: 'Sunset Boulevard',
    artist: 'Golden Hour',
    album: 'California Dreams',
    duration: 245,
    coverUrl: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    id: '7',
    title: 'Rainy Day Jazz',
    artist: 'Blue Note',
    album: 'Cafe Sessions',
    duration: 312,
    coverUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    id: '8',
    title: 'Dance Floor',
    artist: 'Beat Masters',
    album: 'Club Nights',
    duration: 178,
    coverUrl: 'https://images.unsplash.com/photo-1571266028243-d220c6a39a10?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
];

export const dummyPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    description: 'Relaxing tracks for your peaceful moments',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    songs: [dummySongs[0], dummySongs[2], dummySongs[6]],
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Workout Mix',
    description: 'High energy beats to fuel your workout',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    songs: [dummySongs[1], dummySongs[3], dummySongs[7]],
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Focus Mode',
    description: 'Concentration enhancing instrumentals',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    songs: [dummySongs[4], dummySongs[5]],
    createdAt: new Date('2024-03-10'),
  },
];

export const musicService = {
  async getSongs(): Promise<Song[]> {
    // Simulated API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummySongs;
  },

  async getSongById(id: string): Promise<Song | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return dummySongs.find((song) => song.id === id);
  },

  async searchSongs(query: string): Promise<Song[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();
    return dummySongs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery) ||
        song.album.toLowerCase().includes(lowerQuery)
    );
  },

  async getPlaylists(): Promise<Playlist[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummyPlaylists;
  },

  async getPlaylistById(id: string): Promise<Playlist | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return dummyPlaylists.find((playlist) => playlist.id === id);
  },

  async getFeaturedSongs(): Promise<Song[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return dummySongs.slice(0, 4);
  },

  async getRecentlyPlayed(): Promise<Song[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return dummySongs.slice(2, 6);
  },
};
