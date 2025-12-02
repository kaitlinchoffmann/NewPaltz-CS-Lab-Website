import React from 'react';
import ScrollContainer from '../scrollContainer';
import EventCard from './EventCard';
import EventPopup from './EventPopup';

export default function PastEventsList({ events }) {
    const [selectedEvent, setSelectedEvent] = React.useState(null);

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Past Events</h2>

            <ScrollContainer>
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="flex-shrink-0 w-72">
                            <EventCard event={event} onClick={() => setSelectedEvent(event)} />
                        </div>
                    ))
                ) : (
                    <p>No past events.</p>
                )}
            </ScrollContainer>

            {selectedEvent && (
                <EventPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}
        </div>
    );
}
