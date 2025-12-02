export default function ScrollContainer({ children }) {
    return (
        <div
            className="flex overflow-x-auto gap-4 pb-2 scroll-smooth scrollbar-hide"
            onWheel={(e) => {
                const container = e.currentTarget;
                container.scrollLeft += e.deltaY;
            }}
        >
            {children}
        </div>
    );
}