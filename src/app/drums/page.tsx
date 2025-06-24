'use client';

import { useState } from 'react';

export default function DrumsLearning() {
    const [selectedDrum, setSelectedDrum] = useState<string | null>(null);

    const drums = [
        { name: 'Boom', sound: 'boom.wav', color: 'bg-red-400 hover:bg-red-500' },
        { name: 'Clap', sound: 'clap.wav', color: 'bg-blue-400 hover:bg-blue-500' },
        { name: 'Hi-Hat', sound: 'hihat.wav', color: 'bg-green-400 hover:bg-green-500' },
        { name: 'Kick', sound: 'kick.wav', color: 'bg-yellow-400 hover:bg-yellow-500' },
        { name: 'Open Hat', sound: 'openhat.wav', color: 'bg-purple-400 hover:bg-purple-500' },
        { name: 'Ride', sound: 'ride.wav', color: 'bg-pink-400 hover:bg-pink-500' },
        { name: 'Snare', sound: 'snare.wav', color: 'bg-indigo-400 hover:bg-indigo-500' },
        { name: 'Tink', sound: 'tink.wav', color: 'bg-orange-400 hover:bg-orange-500' },
        { name: 'Tom', sound: 'tom.wav', color: 'bg-teal-400 hover:bg-teal-500' },
    ];

    const handleDrumClick = (drum: typeof drums[0]) => {
        setSelectedDrum(drum.name);

        // Play audio
        const audio = new Audio(`/sounds/drums/${drum.sound}`);
        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
    };

    const selectedDrumData = selectedDrum ? drums.find(drum => drum.name === selectedDrum) : null;

    return (
        <div className="h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-2 flex flex-col">
            <div
                className="flex flex-col justify-between h-full w-full"
            // className="flex flex-col justify-between h-full max-w-sm mx-auto w-full"
            >
                <div>


                    {/* Drum Display */}
                    {selectedDrumData ? (
                        <div className="text-center mt-12 mb-3 flex-shrink-0">
                            <div className="mb-2">
                                <div className={`
                  ${selectedDrumData.color}
                  w-32 h-32 mx-auto rounded-full
                  flex items-center justify-center
                  text-white font-bold text-2xl
                  shadow-lg
                  animate-bounce
                `}>
                                    🥁
                                </div>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-lg font-bold text-gray-800 mb-1">
                                    {selectedDrumData.name}
                                </h2>
                                <button
                                    onClick={() => handleDrumClick(selectedDrumData)}
                                    className={`
                    ${selectedDrumData.color}
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
                                    <span className="text-gray-400 text-4xl">🥁</span>
                                </div>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-lg font-bold text-gray-600 mb-1">
                                    Tap a drum below
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Choose any drum to hear it!
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Drum Grid at the bottom */}
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto w-full mb-4">
                    {drums.map((drum) => (
                        <button
                            key={drum.name}
                            onClick={() => handleDrumClick(drum)}
                            className={`
                ${drum.color}
                w-full aspect-square rounded-xl shadow-md
                transform transition-all duration-200
                hover:scale-105 hover:shadow-lg
                active:scale-95
                flex items-center justify-center
                text-white font-bold text-lg
                animate-pulse
              `}
                        >
                            <div className="text-center">
                                <div className="text-2xl mb-1">🥁</div>
                                <div className="text-xs">{drum.name}</div>
                            </div>
                        </button>
                    ))}
                </div>
                <div>
                </div>
            </div>
        </div>
    );
} 