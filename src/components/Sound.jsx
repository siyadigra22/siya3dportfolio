"use client"; // Add this line to mark the parent component as a client component

import React, { useState, useRef } from 'react'; // Import useRef
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const Modal = ({ onClose, toggle }) => {
    return (
        <div className='fixed inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-background/20 border border-accent/30 border-solid backdrop-blur-[6px] py-8 px-6 xs:px-10 sm:px-16 rounded shadow-glass-inset text-center space-y-8'>
                <p className="font-light">Do you like to play the background music?</p>
                <div className="flex items-center justify-center space-x-4">
                    <button onClick={toggle} className="px-4 py-2 border border-accent/30 border-solid hover:shadow-glass-sm rounded mr-2">Yes</button>
                    <button onClick={onClose} className="px-4 py-2 border border-accent/30 border-solid hover:shadow-glass-sm rounded">No</button>
                </div>
            </div>
        </div>
    );
};

const Sound = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showModal, setShowModal] = useState(true);

    const toggle = () => {
        const newState = !isPlaying;
        setIsPlaying(newState);
        newState ? audioRef.current.play() : audioRef.current.pause();
        localStorage.setItem('musicConsent', String(newState));
        setShowModal(false);
    };

    return (
        <div className="fixed top-4 right-2.5 xs:right-4 z-50 group">
            {showModal && <Modal onClose={() => setShowModal(false)} toggle={toggle} />}

            <audio ref={audioRef} loop>
                <source src="/audio/birds39-forest-20772.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <motion.button
                onClick={toggle}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="w-10 h-10 xs:w-14 xs:h-14 text-foreground rounded-full flex items-center justify-center cursor-pointer z-50 p-2.5 xs:p-4 custom-bg"
                aria-label="Sound Toggle Button"
            >
                {isPlaying ? (
                    <Volume2 className="w-full h-full text-foreground group-hover:text-accent" strokeWidth={1.5} />
                ) : (
                    <VolumeX className="w-full h-full text-foreground group-hover:text-accent" strokeWidth={1.5} />
                )}
            </motion.button>
        </div>
    );
};

export default Sound;