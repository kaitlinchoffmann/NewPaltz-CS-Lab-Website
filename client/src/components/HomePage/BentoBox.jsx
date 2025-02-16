const BentoBox = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div id = "bento-box-section" className=" grid h-full w-2/3 grid-cols-4 grid-rows-6 gap-4">
        <div className="col-span-1 row-span-3 flex items-center justify-center rounded-3xl bg-rose-300">
          Student Highlights
        </div>
        <div className="col-span-3 row-span-2 flex items-center justify-center rounded-3xl bg-green-200">
          Event Calendar
        </div>
        <div className="col-span-1 row-span-1 flex items-center justify-center rounded-3xl bg-sky-200">
          Faculty Directory
        </div>
        <div className="col-span-1 row-span-1 flex items-center justify-center rounded-3xl bg-rose-400">
          Student Resources
        </div>
        <div className="col-span-1 row-span-1 flex items-center justify-center rounded-3xl bg-orange-300">
          FAQ
        </div>
        <div className="col-span-3 row-span-2 flex items-center justify-center rounded-3xl bg-amber-200">
          Featured Event
        </div>
        <div className="col-span- row-span-2 flex items-center justify-center rounded-3xl bg-purple-300">
          Tech Blog
        </div>
      </div>
    </div>
  );
};

export default BentoBox;
