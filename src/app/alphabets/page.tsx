'use client';

import { useState } from 'react';

export default function AlphabetsLearning() {
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

    const alphabetColors = [
        'bg-red-400 hover:bg-red-500',
        'bg-blue-400 hover:bg-blue-500',
        'bg-green-400 hover:bg-green-500',
        'bg-yellow-400 hover:bg-yellow-500',
        'bg-purple-400 hover:bg-purple-500',
        'bg-pink-400 hover:bg-pink-500',
        'bg-indigo-400 hover:bg-indigo-500',
        'bg-orange-400 hover:bg-orange-500',
        'bg-teal-400 hover:bg-teal-500',
        'bg-cyan-400 hover:bg-cyan-500',
        'bg-lime-400 hover:bg-lime-500',
        'bg-amber-400 hover:bg-amber-500',
        'bg-emerald-400 hover:bg-emerald-500',
        'bg-violet-400 hover:bg-violet-500',
        'bg-rose-400 hover:bg-rose-500',
        'bg-sky-400 hover:bg-sky-500',
        'bg-fuchsia-400 hover:bg-fuchsia-500',
        'bg-slate-400 hover:bg-slate-500',
        'bg-zinc-400 hover:bg-zinc-500',
        'bg-stone-400 hover:bg-stone-500',
        'bg-neutral-400 hover:bg-neutral-500',
        'bg-gray-400 hover:bg-gray-500',
        'bg-red-500 hover:bg-red-600',
        'bg-blue-500 hover:bg-blue-600',
        'bg-green-500 hover:bg-green-600',
        'bg-yellow-500 hover:bg-yellow-600',
        'bg-purple-500 hover:bg-purple-600',
    ];

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const handleLetterClick = (letter: string) => {
        setSelectedLetter(letter);

        // Play audio - check for both .m4a and .mp3 extensions
        const audio = new Audio(`/sounds/alphabets/${letter}.m4a`);
        audio.play().catch(() => {
            // If .m4a fails, try .mp3
            const audioMp3 = new Audio(`/sounds/alphabets/${letter}.mp3`);
            audioMp3.play().catch(error2 => {
                console.log('Audio playback failed for both formats:', error2);
            });
        });
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-2 flex flex-col">
            <div className="flex flex-col justify-between h-full max-w-sm mx-auto w-full">
                <div>


                    {/* Letter Display */}
                    {selectedLetter ? (
                        <div className="text-center mt-1 mb-1 flex-shrink-0">
                            <div className="mb-2">
                                <div className={`
                  ${alphabetColors[alphabet.indexOf(selectedLetter)]}
                  w-32 h-32 mx-auto rounded-full
                  flex items-center justify-center
                  text-white font-bold text-6xl
                  shadow-lg
                  animate-bounce
                `}>
                                    {selectedLetter}
                                </div>
                            </div>
                            {/* <div className="mb-2">
                                <h2 className="text-lg font-bold text-gray-800 mb-1">
                                    Letter {selectedLetter}
                                </h2>
                                <button
                                    onClick={() => handleLetterClick(selectedLetter)}
                                    className={`
                    ${alphabetColors[alphabet.indexOf(selectedLetter)]}
                    px-4 py-2 rounded-full text-white font-bold text-sm
                    shadow-md hover:shadow-lg transform hover:scale-105
                    transition-all duration-200
                  `}
                                >
                                    🔊 Play Again
                                </button>
                            </div> */}
                        </div>
                    ) : (
                        <div className="text-center mt-1 mb-3 flex-shrink-0">
                            <div className="mb-2">
                                <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center shadow-lg">
                                    <span className="text-gray-400 text-4xl">?</span>
                                </div>
                            </div>
                            {/* <div className="mb-2">
                                <h2 className="text-lg font-bold text-gray-600 mb-1">
                                    Tap a letter below
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Choose any letter to hear it!
                                </p>
                            </div> */}
                        </div>
                    )}
                </div>

                {/* Alphabet Grid */}
                <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto w-full mb-4">
                    {alphabet.map((letter, index) => (
                        <button
                            key={letter}
                            onClick={() => handleLetterClick(letter)}
                            className={`
                ${alphabetColors[index]}
                w-full aspect-square rounded-xl shadow-md
                transform transition-all duration-200
                hover:scale-105 hover:shadow-lg
                active:scale-95
                flex items-center justify-center
                text-white font-bold text-lg
                animate-pulse
              `}
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                <div>
                </div>

            </div>
        </div>
    );
} 