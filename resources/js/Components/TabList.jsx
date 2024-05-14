import React, { useRef, useState, useEffect } from 'react';

const TabList = ({ tabs }) => {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 640); // Ganti nilai 640 dengan breakpoint yang sesuai dengan kebutuhan Anda
        };

        checkIsMobile();

        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        const scrollDistance = 150; // Ganti dengan jarak scroll yang sesuai dengan kebutuhan Anda
        if (direction === 'left') {
            container.scrollBy({
                left: -scrollDistance,
                behavior: 'smooth',
            });
        } else if (direction === 'right') {
            container.scrollBy({
                left: scrollDistance,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="w-full bg-gray-900">
            <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto mx-auto max-w-screen-2xl">
                <div className="flex items-center text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <ul ref={containerRef} className="flex flex-nowrap">
                        {tabs.map((tab, index) => (
                            <li key={index} className="me-10">
                                <a
                                    href="#"
                                    className="inline-flex items-center justify-center py-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                                >
                                    {tab.icon && (
                                        <svg
                                            className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            {tab.icon}
                                        </svg>
                                    )}
                                    {tab.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TabList;
