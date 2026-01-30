
import { Movie } from './types';

export const MOVIE_DATA: Movie[] = [
  // Tamil - 6 (2 also Animation)
  {
    id: 't1', title: 'Vikram', poster: 'https://m.media-amazon.com/images/M/MV5BNDEyMWQ0ZDktNTY0MC00YWRkLWFlMjQtMDUxMjRlMDhmMmRlXkEyXkFqcGc@._V1_.jpg',
    description: 'A high-octane action thriller where a special agent must take down a dangerous drug syndicate while uncovering deep secrets from the past.',
    genre: 'Action/Thriller', category: 'Tamil', cast: 'Kamal Haasan, Vijay Sethupathi',
    director: 'Lokesh Kanagaraj', hero: 'Kamal Haasan', heroine: 'N/A',
    vibe: 'Gritty & Intense', releaseType: 'Theatre', rating: 4.8
  },
  {
    id: 't2', title: 'Jailer', poster: 'https://i.pinimg.com/736x/7f/54/eb/7f54ebf507fc7984cba90ca8eaecd728.jpg',
    description: 'A retired jailer goes on a ruthless quest for justice when his son disappears, leading him into the world of international antique smuggling.',
    genre: 'Action/Drama', category: 'Tamil', cast: 'Rajinikanth, Vinayakan',
    director: 'Nelson Dilipkumar', hero: 'Rajinikanth', heroine: 'Tamannaah',
    vibe: 'Mass Entertainer', releaseType: 'Theatre', rating: 4.5
  },
  {
    id: 't3', title: 'Leo', poster: 'https://live.staticflickr.com/65535/52667109963_4f76301b9a_b.jpg',
    description: 'A peaceful cafe owner is dragged into the world of blood and bullets when a gang from his mysterious past tracks him down.',
    genre: 'Action/Crime', category: 'Tamil', cast: 'Vijay, Trisha',
    director: 'Lokesh Kanagaraj', hero: 'Vijay', heroine: 'Trisha',
    vibe: 'High Octane', releaseType: 'Theatre', rating: 4.2
  },
  {
    id: 't4', title: 'Ponniyin Selvan 2', poster: 'https://i.pinimg.com/736x/8f/c7/c5/8fc7c5a02469c2e29ff9e878001e53e3.jpg',
    description: 'The epic conclusion to the Chola dynasty struggle for the throne, where internal betrayals and external threats collide in a grand spectacle.',
    genre: 'Epic Drama', category: 'Tamil', cast: 'Vikram, Aishwarya Rai',
    director: 'Mani Ratnam', hero: 'Vikram', heroine: 'Aishwarya Rai',
    vibe: 'Majestic', releaseType: 'Theatre', rating: 4.7
  },
  {
    id: 't5', title: 'Sirai', poster: 'https://m.media-amazon.com/images/M/MV5BY2RlYWNjZGMtMDZhNi00YmRhLWExNGQtOTQyMGUyMTQ3YjU5XkEyXkFqcGc@._V1_.jpg',
    description: 'Sirai (2025) is a Tamil language crime thriller drama, directed by Suresh-Rajakumar.',
    genre: 'crime thriller and drama film', category: 'Tamil', cast: 'Vikram prabhu',
    director: 'R. C. Sakthi', hero: 'Vikram', heroine: 'Anishma Anilkumar',
    vibe: 'gripping, realistic', releaseType: 'OTT', rating: 4.9
  },
  {
    id: 't6', title: 'Joe', poster: 'https://wallpaperaccess.com/full/14764483.jpg',
    description: '2023 Tamil romantic drama starring Rio Raj about a young man and arrange marriage',
    genre: 'romantic drama', category: 'Tamil', cast: 'Rio Raj,Sheela',
    director: 'Hariharan Ram', hero: 'Rio', heroine: 'Malavika Manoj',
    vibe: 'nostalgic, coming-of-age vibe', releaseType: 'Theatre', rating: 4.1
  },

  // English - 6 (2 also Animation)
  {
    id: 'e1', title: 'Oppenheimer', poster: 'https://m.media-amazon.com/images/M/MV5BM2RmYmVmMzctMzc5Ny00MmNiLTgxMGUtYjk1ZDRhYjA2YTU0XkEyXkFqcGc@._V1_.jpg',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    genre: 'Biographical Thriller', category: 'English', cast: 'Cillian Murphy, Emily Blunt',
    director: 'Christopher Nolan', hero: 'Cillian Murphy', heroine: 'Emily Blunt',
    vibe: 'Intellectual & Haunting', releaseType: 'Theatre', rating: 4.9
  },
  {
    id: 'e2', title: 'Dune: Part Two', poster: 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg',
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    genre: 'Sci-Fi Epic', category: 'English', cast: 'Timothée Chalamet, Zendaya',
    director: 'Denis Villeneuve', hero: 'Timothée Chalamet', heroine: 'Zendaya',
    vibe: 'Visually Stunning', releaseType: 'Theatre', rating: 4.8
  },
  {
    id: 'e3', title: 'Barbie', poster: 'https://image.tmdb.org/t/p/original/dekMkQf0kqAmztUca9lX5e5Pjbp.jpg',
    description: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.',
    genre: 'Fantasy Comedy', category: 'English', cast: 'Margot Robbie, Ryan Gosling',
    director: 'Greta Gerwig', hero: 'Ryan Gosling', heroine: 'Margot Robbie',
    vibe: 'Vibrant & Meta', releaseType: 'Theatre', rating: 4.3
  },
  {
    id: 'e4', title: 'Spider-Man: Spider-Verse', poster: 'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_FMjpg_UX1000_.jpg',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    genre: 'Animation/Action', category: 'English', cast: 'Shameik Moore',
    director: 'Joaquim Dos Santos', hero: 'Miles Morales', heroine: 'Gwen Stacy',
    vibe: 'Artistic Revolution', releaseType: 'Theatre', rating: 4.9
  },
  {
    id: 'e5', title: 'Guardians 3', poster: 'https://m.media-amazon.com/images/M/MV5BOTJhOTMxMmItZmE0Ny00MDc3LWEzOGEtOGFkMzY4MWYyZDQ0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    description: 'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own.',
    genre: 'Sci-Fi/Action', category: 'English', cast: 'Chris Pratt',
    director: 'James Gunn', hero: 'Chris Pratt', heroine: 'Zoe Saldaña',
    vibe: 'Emotional & Fun', releaseType: 'Theatre', rating: 4.6
  },
  {
    id: 'e6', title: 'Puss in Boots: Last Wish', poster: 'https://images.wallpapersden.com/image/download/hd-puss-in-boots-the-last-wish-movie_bW1nZ22UmZqaraWkpJRmbmdlrWZlbWU.jpg',
    description: 'Puss in Boots discovers that his passion for adventure has taken its toll: he has burned through eight of his nine lives.',
    genre: 'Animation/Adventure', category: 'English', cast: 'Antonio Banderas',
    director: 'Joel Crawford', hero: 'Puss', heroine: 'Kitty Softpaws',
    vibe: 'Thrilling & Whimsical', releaseType: 'Theatre', rating: 4.7
  },

  // K-Drama - 6 (2 also Animation/Anime Style)
  {
    id: 'k1', title: 'Alchemy of Souls', poster: 'https://resizing.flixster.com/ofJBz4mK_vSJFwALxak7zx2pI78=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p22267462_b_v13_ae.jpg',
    description: 'A powerful sorceress in a blind woman\'s body encounters a man from a prestigious family, who wants her help to change his destiny.',
    genre: 'Fantasy/Romance', category: 'K-Drama', cast: 'Lee Jae-wook, Jung So-min',
    director: 'Park Joon-hwa', hero: 'Lee Jae-wook', heroine: 'Jung So-min',
    vibe: 'Mystical Love', releaseType: 'OTT', rating: 4.9
  },
  {
    id: 'k2', title: 'The Glory', poster: 'https://m.media-amazon.com/images/M/MV5BZTI3YjU5OTQtOGRlMS00OTkzLTlkZGUtZTdmNWFjMDAzMTg0XkEyXkFqcGc@._V1_.jpg',
    description: 'Years after surviving horrific abuse in high school, a woman puts an elaborate revenge scheme in motion to make the perpetrators pay for their crimes.',
    genre: 'Revenge Thriller', category: 'K-Drama', cast: 'Song Hye-kyo',
    director: 'Ahn Gil-ho', hero: 'Lee Do-hyun', heroine: 'Song Hye-kyo',
    vibe: 'Cold & Calculating', releaseType: 'OTT', rating: 4.8
  },
  {
    id: 'k3', title: 'Lovely Runner', poster: 'https://i.pinimg.com/736x/a6/f0/40/a6f040aaa740e70f7fc925c49c8c4800.jpg',
    description: 'a popular South Korean fantasy-romance drama about Im Sol (Kim Hye-yoon), a devoted fan devastated by the death of top star Ryu Sun-jae (Byeon Woo-seok).',
    genre: 'Fantasy Romance and Romantic Comedy (Rom-Com)', category: 'K-Drama', cast: 'Byeon Woo-seok ',
    director: 'Yoon Jong-ho and Kim Tae-yeop', hero: 'Ryu sun jae', heroine: 'Im Sol',
    vibe: 'sweet, "first-love" vibes', releaseType: 'OTT', rating: 4.9
  },
  {
    id: 'k4', title: 'Squid Game', poster: 'https://i.pinimg.com/736x/fb/d8/68/fbd86897dac23618e0f8fd2ce900c2b4.jpg',
    description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
    genre: 'Survival Thriller', category: 'K-Drama', cast: 'Lee Jung-jae',
    director: 'Hwang Dong-hyuk', hero: 'Lee Jung-jae', heroine: 'Jung Ho-yeon',
    vibe: 'Dark Society', releaseType: 'OTT', rating: 4.4
  },
  {
    id: 'k5', title: 'Suzume', poster: 'https://m.media-amazon.com/images/M/MV5BODhkNDhmNzktODFmMC00NDZiLWEzN2UtY2YwYzgzYTVlMWZmXkEyXkFqcGc@._V1_.jpg',
    description: 'A 17-year-old girl named Suzume helps a mysterious young man close doors from the other side that are releasing disasters all over Japan.',
    genre: 'Animation/Fantasy', category: 'K-Drama', cast: 'Nanoka Hara',
    director: 'Makoto Shinkai', hero: 'Souta', heroine: 'Suzume',
    vibe: 'Soulful Journey', releaseType: 'Theatre', rating: 4.8
  },
  {
    id: 'k6', title: 'hidden love', poster: 'https://i.pinimg.com/736x/f0/f8/95/f0f8950f39a71a4663f7e7f08b85a341.jpg',
    description: ' The story explores their journey from a one-sided, youthful admiration to a mature, mutual relationship as she grows up, featuring themes of slow-burn romance, emotional growth, and tender, sweet moments',
    genre: 'love', category: 'K-Drama', cast: 'Zhao Lusi',
    director: 'Gia Lee ', hero: 'Chen Zheyuan as Duan Jiaxu', heroine: 'Cha Hae-in',
    vibe: '"feel-good" and romantic vibe', releaseType: 'OTT', rating: 4.9
  },
];

export const FUNNY_MESSAGES = [
  "You've got great taste! 💖",
  "Cinema is better with fans like you! 🍿",
  "Sending a pulse of love your way! 💓",
  "The director just thanked you personally! 🎬",
  "A standing ovation for your feedback! 👏",
  "Your review is the blockbuster of today! 🌟",
  "We're 'rolling' in love with your comment! 🎥",
  "Oscar-worthy feedback right here! 🏆",
  "You're the hero of this application! 🦸‍♂️",
  "Spreading cinematic joy everywhere! 🌈"
];
