// components/ScrollableBox.js
export default function ScrollableBox() {
  return (
    <div className="flex-1 w-80 overflow-y-auto overflow-x-clip mb-4 flex flex-col-reverse space-y-2 space-y-reverse h-[500px] md:h-[500px] px-4">
      {Array.from({ length: 30 }).map((_, i) => (
        <p key={i} className="mb-2">
          Item {i + 1}
        </p>
      ))}
    </div>
  );
}
