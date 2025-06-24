'use client';

import Link from 'next/link';

const games = [
  {
    title: 'Swipe Games',
    description: 'Swipe to play all games! 📱',
    href: '/swipe',
    color: 'from-indigo-300 to-purple-400',
    icon: '📱',
  },
  {
    title: 'Numbers Learning',
    description: 'Tap numbers to hear them! 🎲',
    href: '/numbers',
    color: 'from-red-300 to-pink-400',
    icon: '🔢',
  },
  {
    title: 'Alphabet Learning',
    description: 'Learn A–Z letters! 🔤',
    href: '/alphabets',
    color: 'from-blue-300 to-indigo-400',
    icon: '🔠',
  },
  {
    title: 'Color Learning',
    description: 'Discover colors! 🌈',
    href: '/colors',
    color: 'from-green-300 to-teal-400',
    icon: '🎨',
  },
  {
    title: 'Shape Learning',
    description: 'Fun with shapes! 🔺',
    href: '#',
    color: 'from-yellow-200 to-yellow-400',
    icon: '🔷',
  },
  {
    title: 'Animal Sounds',
    description: 'Hear animal sounds! 🐶',
    href: '#',
    color: 'from-orange-200 to-orange-400',
    icon: '🐾',
  },
  {
    title: '“Tap the…” Mini-Game',
    description: 'Find and tap! 👆',
    href: '#',
    color: 'from-purple-200 to-purple-400',
    icon: '🕹️',
  },
  {
    title: 'Songs & Rhymes',
    description: 'Sing along! 🎵',
    href: '#',
    color: 'from-pink-200 to-pink-400',
    icon: '🎶',
  },

];

// name 
// object



export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center p-4">
      {/* Header */}
      <header className="text-center mt-6 mb-4">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 drop-shadow-lg animate-bounce">Kids Learning Games</h1>
        <p className="text-lg text-gray-600 animate-fade-in">Fun & Interactive Learning for Kids</p>
      </header>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
        {games.map((game) => (
          game.href !== '#' ? (
            <Link href={game.href} key={game.title} className={`group block rounded-3xl shadow-xl bg-gradient-to-br ${game.color} p-6 transition-transform transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-200 animate-fade-in-up`}>
              <div className="flex flex-col items-center">
                <span className="text-6xl mb-2 animate-wiggle">{game.icon}</span>
                <h2 className="text-xl font-bold text-white mb-1 drop-shadow">{game.title}</h2>
                <p className="text-white text-sm opacity-90">{game.description}</p>
              </div>
            </Link>
          ) : (
            <div key={game.title} className={`block rounded-3xl shadow-xl bg-gradient-to-br ${game.color} p-6 opacity-70 cursor-not-allowed animate-fade-in-up`}>
              <div className="flex flex-col items-center">
                <span className="text-6xl mb-2 animate-wiggle">{game.icon}</span>
                <h2 className="text-xl font-bold text-white mb-1 drop-shadow">{game.title}</h2>
                <p className="text-white text-sm opacity-90">{game.description}</p>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Simple playful animation keyframes */}
      <style jsx global>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        .animate-wiggle {
          animation: wiggle 1.2s infinite alternate;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease both;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease both;
        }
      `}</style>
    </div>
  );
}
