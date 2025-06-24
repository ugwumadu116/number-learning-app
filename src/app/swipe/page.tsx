'use client';

import { useState, useRef } from 'react';
import NumbersGameScreen from '../numbers/page';
import AlphabetsGameScreen from '../alphabets/page';
import ColorsGameScreen from '../colors/page';
import DrumsGameScreen from '../drums/page';
// import ShapesGameScreen from '../shapes/page';
// import AnimalsGameScreen from '../animals/page';
// import TapGameScreen from '../tap/page';
// import SongsGame from '../songs/page';

interface Game {
    id: string;
    title: string;
    description: string;
    href: string;
    color: string;
    icon: string;
    component: React.ReactNode;
}

export default function SwipeableGames() {
    const [currentGameIndex, setCurrentGameIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
    const [swipeDirection, setSwipeDirection] = useState<string>('');
    const [isInteracting, setIsInteracting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const games: Game[] = [
        {
            id: 'numbers',
            title: 'Numbers Learning',
            description: 'Tap numbers to hear them! 🎲',
            href: '/numbers',
            color: 'from-red-300 to-pink-400',
            icon: '🔢',
            component: <NumbersGameScreen />
        },
        {
            id: 'alphabets',
            title: 'Alphabet Learning',
            description: 'Learn A–Z letters! 🔤',
            href: '/alphabets',
            color: 'from-blue-300 to-indigo-400',
            icon: '🔠',
            component: <AlphabetsGameScreen />
        },
        {
            id: 'colors',
            title: 'Color Learning',
            description: 'Discover colors! 🌈',
            href: '/colors',
            color: 'from-green-300 to-teal-400',
            icon: '🎨',
            component: <ColorsGameScreen />
        },
        {
            id: 'drums',
            title: 'Drum Learning',
            description: 'Tap drums to hear them! 🥁',
            href: '/drums',
            color: 'from-red-300 to-pink-400',
            icon: '🥁',
            component: <DrumsGameScreen />
        },
        // {
        //     id: 'shapes',
        //     title: 'Shape Learning',
        //     description: 'Fun with shapes! 🔺',
        //     href: '#',
        //     color: 'from-yellow-200 to-yellow-400',
        //     icon: '🔷',
        //     component: <ShapesGame />
        // },
        // {
        //     id: 'animals',
        //     title: 'Animal Sounds',
        //     description: 'Hear animal sounds! 🐶',
        //     href: '#',
        //     color: 'from-orange-200 to-orange-400',
        //     icon: '🐾',
        //     component: <AnimalsGame />
        // },
        // {
        //     id: 'tap-game',
        //     title: '"Tap the…" Mini-Game',
        //     description: 'Find and tap! 👆',
        //     href: '#',
        //     color: 'from-purple-200 to-purple-400',
        //     icon: '🕹️',
        //     component: <TapGame />
        // },
        // {
        //     id: 'songs',
        //     title: 'Songs & Rhymes',
        //     description: 'Sing along! 🎵',
        //     href: '#',
        //     color: 'from-pink-200 to-pink-400',
        //     icon: '🎶',
        //     component: <SongsGame />
        // }
    ];

    // Function to create endless games array with specified number of duplications
    const createEndlessGamesArray = (duplications: number = 100): Game[] => {
        const result: Game[] = [];
        for (let i = 0; i < duplications; i++) {
            result.push(...games);
        }
        return result;
    };

    // Create endless games array with 100 duplications (you can change this number)
    const endlessGamesArray = createEndlessGamesArray(100);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        // Check if the touch target is an interactive element
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('button') ||
            target.closest('input') ||
            target.closest('select') ||
            target.closest('[role="button"]') ||
            target.closest('.game-interactive');

        if (isInteractive) {
            setIsInteracting(true);
            return;
        }

        setIsInteracting(false);
        setTouchEnd({ x: 0, y: 0 });
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (isInteracting) return;

        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const onTouchEnd = () => {
        if (isInteracting) {
            setIsInteracting(false);
            return;
        }

        if (!touchStart || !touchEnd) return;

        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;
        const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
        const isLongEnough = Math.abs(distanceX) > minSwipeDistance || Math.abs(distanceY) > minSwipeDistance;

        if (isLongEnough) {
            if (isHorizontalSwipe) {
                if (distanceX > 0) {
                    // Swipe left - next game
                    setSwipeDirection('left');
                    nextGame();
                } else {
                    // Swipe right - previous game
                    setSwipeDirection('right');
                    previousGame();
                }
            } else {
                if (distanceY > 0) {
                    // Swipe up - next game
                    setSwipeDirection('up');
                    nextGame();
                } else {
                    // Swipe down - previous game
                    setSwipeDirection('down');
                    previousGame();
                }
            }
        }
    };

    const nextGame = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentGameIndex((prev) => (prev + 1) % endlessGamesArray.length);
        setTimeout(() => {
            setIsTransitioning(false);
            setSwipeDirection('');
        }, 500);
    };

    const previousGame = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentGameIndex((prev) => (prev - 1 + endlessGamesArray.length) % endlessGamesArray.length);
        setTimeout(() => {
            setIsTransitioning(false);
            setSwipeDirection('');
        }, 500);
    };

    const currentGame = endlessGamesArray[currentGameIndex];

    const getSwipeAnimation = () => {
        switch (swipeDirection) {
            case 'left': return 'animate-swipe-left';
            case 'right': return 'animate-swipe-right';
            case 'up': return 'animate-swipe-up';
            case 'down': return 'animate-swipe-down';
            default: return '';
        }
    };

    return (
        <div className="h-screen bg-black overflow-hidden relative">
            {/* Swipeable Game Container */}
            <div
                ref={containerRef}
                className="h-full w-full relative"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Current Game */}
                <div className={`h-full w-full transition-all duration-500 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'} ${getSwipeAnimation()}`}>
                    <div className={`h-full w-full bg-gradient-to-br ${currentGame.color} relative`}>


                        {/* Game Content */}
                        <div className="h-full ">
                            <div className="animate-fade-in-up">
                                {currentGame.component}
                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    );
}

