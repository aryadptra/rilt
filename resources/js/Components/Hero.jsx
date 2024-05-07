import clsx from 'clsx';
import React from 'react';

function Hero({ className = '', children }) {
    return (
        <div
            className={clsx(
                className,
                'mb-8 md:mb-16 grid grid-cols-12 bg-gray-800 py-5 px-5 md:px-0 lg:py-24'
            )}
        >
            <div className="col-span-12">
                <div className="container mx-auto max-w-screen-2xl">
                    <div className="max-w-4xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
function Title({ children }) {
    return (
        <h1 className="text-2xl font-bold text-white lg:text-6xl">
            {children}
        </h1>
    );
}
function Subtitle({ children }) {
    return (
        <h4 className="mt-2 lg:mt-6 text-gray-300 leading-relaxed lg:text-2xl">
            {children}
        </h4>
    );
}
function Content({ children }) {
    return (
        <div className="mt-2 lg:mt-4 leading-relaxed text-gray-400 lg:text-xl">
            {children}
        </div>
    );
}

Hero.Title = Title;
Hero.Subtitle = Subtitle;
Hero.Content = Content;

export default Hero;
