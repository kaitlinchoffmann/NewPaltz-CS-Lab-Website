import React from 'react';
import EventCard from './EventCard';
import EventPopup from './EventPopup';
import ScrollContainer from '../scrollContainer';

export default function UpcomingEvents({ events }) {
    const [selectedEvent, setSelectedEvent] = React.useState(null);

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>

            <ScrollContainer>
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="flex-shrink-0 w-72">
                            <EventCard event={event} onClick={() => setSelectedEvent(event)} />
                        </div>
                    ))
                ) : (
                    <p>No upcoming events.</p>
                )}
            </ScrollContainer>

            {selectedEvent && (
                <EventPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}
        </div>
    );
}
