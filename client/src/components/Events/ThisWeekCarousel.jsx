import React, { useRef, useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventPopup from './EventPopup';

export default function ThisWeekCarousel({ events }) {
    const carouselRef = useRef(null);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [canScroll, setCanScroll] = useState(false);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const scroll = (direction) => {
        if (!carouselRef.current) return;

        const { scrollLeft, clientWidth } = carouselRef.current;
        const scrollAmount = clientWidth * 0.8;

        carouselRef.current.scrollTo({
            left: direction === 'left'
                ? scrollLeft - scrollAmount
                : scrollLeft + scrollAmount,
            behavior: 'smooth',
        });
    };

    // Detect if scrollbars should appear (only if content overflows)
    useEffect(() => {
        if (!carouselRef.current) return;

        const { scrollWidth, clientWidth } = carouselRef.current;
        setCanScroll(scrollWidth > clientWidth);
    }, [events]);

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">This Week&apos;s Events</h2>

            <div className="relative">

                {/* Left arrow -- only show if scrolling is possible */}
                {canScroll && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 
                                   bg-gray-200 rounded-full w-8 h-8 flex items-center 
                                   justify-center hover:bg-gray-300"
                    >
                        &#8592;
                    </button>
                )}

                {/* Carousel */}
                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto gap-4 pb-2 scroll-smooth scrollbar-hide"
                >
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event.id} className="flex-shrink-0 w-64">
                                <EventCard event={event} onClick={handleEventClick} />
                            </div>
                        ))
                    ) : (
                        <p className="ml-4">No events this week.</p>
                    )}
                </div>

                {/* Right arrow -- only show if scrolling is possible */}
                {canScroll && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 
                                   bg-gray-200 rounded-full w-8 h-8 flex items-center 
                                   justify-center hover:bg-gray-300"
                    >
                        &#8594;
                    </button>
                )}
            </div>

            {/* Popup */}
            {selectedEvent && (
                <EventPopup
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
}
