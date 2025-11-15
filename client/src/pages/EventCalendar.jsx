
import Calendar from '../components/Calendar';

const EventCalendar = () => {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">Calendar Page</h1>
      <Calendar />
      {/* Legend for dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "red"
          }}></div>
          <span>Event</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "blue"
          }}></div>
          <span>Faculty Office Hour</span>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
