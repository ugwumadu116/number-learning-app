'use client';

import { useState } from 'react';

export default function NumbersLearning() {
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

    const numberColors = [
        'bg-red-400 hover:bg-red-500',
        'bg-blue-400 hover:bg-blue-500',
        'bg-green-400 hover:bg-green-500',
        'bg-yellow-400 hover:bg-yellow-500',
        'bg-purple-400 hover:bg-purple-500',
        'bg-pink-400 hover:bg-pink-500',
        'bg-indigo-400 hover:bg-indigo-500',
        'bg-orange-400 hover:bg-orange-500',
        'bg-teal-400 hover:bg-teal-500',
    ];

    const handleNumberClick = (number: number) => {
        setSelectedNumber(number);

        // Play audio
        const audio = new Audio(`/sounds/numbers/${number}.m4a`);
        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-2 flex flex-col">
            <div 
            className="flex flex-col justify-between h-full w-full"
            // className="flex flex-col justify-between h-full max-w-sm mx-auto w-full"
            >
                <div>
                  

                    {/* Calculator Display */}
                    {selectedNumber ? (
                        <div className="text-center mt-12 mb-3 flex-shrink-0">
                            <div className="mb-2">
                                <div className={`
                  ${numberColors[selectedNumber - 1]}
                  w-32 h-32 mx-auto rounded-full
                  flex items-center justify-center
                  text-white font-bold text-6xl
                  shadow-lg
                  animate-bounce
                `}>
                                    {selectedNumber}
                                </div>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-lg font-bold text-gray-800 mb-1">
                                    Number {selectedNumber}
                                </h2>
                                <button
                                    onClick={() => handleNumberClick(selectedNumber)}
                                    className={`
                    ${numberColors[selectedNumber - 1]}
                    px-4 py-2 rounded-full text-white font-bold text-sm
                    shadow-md hover:shadow-lg transform hover:scale-105
                    transition-all duration-200
                  `}
                                >
                                    🔊 Play Again
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mt-12 mb-3 flex-shrink-0">
                            <div className="mb-2">
                                <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center shadow-lg">
                                    <span className="text-gray-400 text-4xl">?</span>
                                </div>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-lg font-bold text-gray-600 mb-1">
                                    Tap a number below
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Choose any number to hear it!
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Number Grid at the bottom */}
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto w-full mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                        <button
                            key={number}
                            onClick={() => handleNumberClick(number)}
                            className={`
                ${numberColors[number - 1]}
                w-full aspect-square rounded-xl shadow-md
                transform transition-all duration-200
                hover:scale-105 hover:shadow-lg
                active:scale-95
                flex items-center justify-center
                text-white font-bold text-2xl
                animate-pulse
              `}
                        >
                            {number}
                        </button>
                    ))}
                </div>
                <div>
                </div>
            </div>
        </div>
    );
} 