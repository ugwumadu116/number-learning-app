'use client';

import { useState, useEffect } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    vx: number;
    vy: number;
}

export default function ColorsLearning() {
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isCelebrating, setIsCelebrating] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const colors = [
        { name: 'Red', bgClass: 'bg-red-400 hover:bg-red-500', soundFile: 'Redapple.mp3', emoji: '🍎' },
        { name: 'Blue', bgClass: 'bg-blue-400 hover:bg-blue-500', soundFile: 'Bluecar.mp3', emoji: '🚗' },
        { name: 'Green', bgClass: 'bg-green-400 hover:bg-green-500', soundFile: 'Greentree.mp3', emoji: '🌳' },
        { name: 'Yellow', bgClass: 'bg-yellow-400 hover:bg-yellow-500', soundFile: 'Yellowsun.mp3', emoji: '🌞' },
        { name: 'Purple', bgClass: 'bg-purple-400 hover:bg-purple-500', soundFile: 'Purplegrape.mp3', emoji: '🍇' },
        { name: 'Orange', bgClass: 'bg-orange-400 hover:bg-orange-500', soundFile: 'Orange orange.mp3', emoji: '🍊' },
        { name: 'Pink', bgClass: 'bg-pink-400 hover:bg-pink-500', soundFile: 'Pinkflower.mp3', emoji: '🌸' },
        { name: 'White', bgClass: 'bg-gray-200 hover:bg-gray-300', soundFile: 'Whitecloud.mp3', emoji: '☁️' },
        { name: 'Black', bgClass: 'bg-gray-800 hover:bg-gray-900', soundFile: 'Blackcat.mp3', emoji: '🐈‍⬛' },
    ];

    const phrases = [
        'Red apple 🍎',
        'Blue car 🚗',
        'Green tree 🌳',
        'Yellow sun 🌞',
        'Purple grape 🍇',
        'Orange orange 🍊',
        'Pink flower 🌸',
        'White cloud ☁️',
        'Black cat 🐈‍⬛',
    ];

    // Create particle explosion effect
    const createParticles = (x: number, y: number, color: string) => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 15; i++) {
            newParticles.push({
                id: Date.now() + i,
                x: x,
                y: y,
                color: color,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10
            });
        }
        setParticles(prev => [...prev, ...newParticles]);
    };

    // Animate particles
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev =>
                prev.map(particle => ({
                    ...particle,
                    x: particle.x + particle.vx,
                    y: particle.y + particle.vy,
                    vy: particle.vy + 0.5 // gravity
                })).filter(particle => particle.y < window.innerHeight && particle.x > 0 && particle.x < window.innerWidth)
            );
        }, 50);

        return () => clearInterval(interval);
    }, []);

    const handleColorClick = (colorIndex: number) => {
        setSelectedColor(colorIndex);
        setIsCelebrating(true);

        // Create particle effect
        const rect = document.getElementById(`color-${colorIndex}`)?.getBoundingClientRect();
        if (rect) {
            createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, colors[colorIndex].name.toLowerCase());
        }

        // Play audio
        const audio = new Audio(`/sounds/colors/${colors[colorIndex].soundFile}`);
        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });

        // Celebration timeout
        setTimeout(() => setIsCelebrating(false), 2000);
    };

    const handleHintClick = () => {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 3000);
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-2 flex flex-col relative overflow-hidden">
            {/* Particle effects */}
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className={`absolute w-2 h-2 rounded-full ${particle.color === 'red' ? 'bg-red-500' :
                        particle.color === 'blue' ? 'bg-blue-500' :
                            particle.color === 'green' ? 'bg-green-500' :
                                particle.color === 'yellow' ? 'bg-yellow-500' :
                                    particle.color === 'purple' ? 'bg-purple-500' :
                                        particle.color === 'orange' ? 'bg-orange-500' :
                                            particle.color === 'pink' ? 'bg-pink-500' :
                                                particle.color === 'white' ? 'bg-gray-300' :
                                                    'bg-gray-700'}`}
                    style={{
                        left: particle.x,
                        top: particle.y,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000
                    }}
                />
            ))}

            {/* Celebration overlay */}
            {isCelebrating && (
                <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="text-6xl animate-bounce">🎉</div>
                </div>
            )}

            <div className="flex flex-col justify-between h-full max-w-sm mx-auto w-full relative z-10">
                <div>
                    {/* Header with score and streak */}
                    {/* <header className="text-center mb-2 mt-2">
                        <h1 className="text-3xl font-bold text-gray-800 mb-1 animate-pulse">
                            🎨 Color Adventure! 🎨
                        </h1>
                        <p className="text-sm text-gray-600 mb-2">
                            Tap colors to learn and have fun!
                        </p>
                        <div className="flex justify-center gap-4 text-sm">
                            <div className="bg-white/80 px-3 py-1 rounded-full shadow-md">
                                <span className="font-bold text-blue-600">Score: {score}</span>
                            </div>
                            <div className="bg-white/80 px-3 py-1 rounded-full shadow-md">
                                <span className="font-bold text-green-600">Streak: {streak} 🔥</span>
                            </div>
                        </div>
                    </header> */}

                    {/* Color Display */}
                    {selectedColor !== null ? (
                        <div className="text-center mt-8 mb-3 flex-shrink-0">
                            <div className="mb-4">
                                <div className={`
                  ${colors[selectedColor].bgClass}
                  w-36 h-36 mx-auto rounded-full
                  flex items-center justify-center
                  text-white font-bold text-3xl
                  shadow-2xl
                  animate-bounce
                  ${colors[selectedColor].name === 'White' ? 'text-gray-800' : ''}
                  ${colors[selectedColor].name === 'Black' ? 'text-white' : ''}
                  transform hover:scale-110 transition-transform duration-300
                `}>
                                    {colors[selectedColor].emoji}
                                </div>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-pulse">
                                    {phrases[selectedColor]}
                                </h2>
                                <div className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleColorClick(selectedColor)}
                                        className={`
                    ${colors[selectedColor].bgClass}
                    px-6 py-3 rounded-full text-white font-bold text-lg
                    shadow-lg hover:shadow-xl transform hover:scale-105
                    transition-all duration-200
                    ${colors[selectedColor].name === 'White' ? 'text-gray-800' : ''}
                    ${colors[selectedColor].name === 'Black' ? 'text-white' : ''}
                  `}
                                    >
                                        🔊 Play Again
                                    </button>
                                    <button
                                        onClick={handleHintClick}
                                        className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                                    >
                                        💡 Hint
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mt-8 mb-3 flex-shrink-0">
                            <div className="mb-4">
                                <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-red-400 via-blue-400 to-green-400 flex items-center justify-center shadow-2xl animate-pulse">
                                    <span className="text-white text-6xl">🎨</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-gray-600 mb-2">
                                    Ready to Learn Colors? 🌈
                                </h2>
                                <p className="text-lg text-gray-500">
                                    Choose any color to start the adventure!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Hint display */}
                    {showHint && (
                        <div className="text-center mb-4 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-300 animate-pulse">
                            <p className="text-lg font-bold text-yellow-800">
                                💡 Tip: Try saying the color name out loud!
                            </p>
                        </div>
                    )}
                </div>

                {/* Color Grid at the bottom */}
                <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto w-full mb-4">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            id={`color-${index}`}
                            onClick={() => handleColorClick(index)}
                            className={`
                ${color.bgClass}
                w-full aspect-square rounded-2xl shadow-lg
                transform transition-all duration-300
                hover:scale-110 hover:shadow-2xl
                active:scale-95
                flex flex-col items-center justify-center
                text-white font-bold text-lg
                animate-pulse
                ${color.name === 'White' ? 'text-gray-800' : ''}
                ${color.name === 'Black' ? 'text-white' : ''}
                border-4 border-white/50 hover:border-white/80
              `}
                        >
                            <span className="text-2xl mb-1">{color.emoji}</span>
                            <span className="text-sm">{color.name}</span>
                        </button>
                    ))}
                </div>

                {/* Fun footer */}
                <div className="text-center mb-2">
                    <p className="text-sm text-gray-500 animate-bounce">
                        🌈 Keep learning and having fun! 🌈
                    </p>
                </div>
            </div>
        </div>
    );
} 