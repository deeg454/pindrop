type PinPopUpProps = {
  title: string;
  content: string;
};

export default function PinPopUp({ title, content }: PinPopUpProps) {
  return (
    <div className="bg-white rounded-xl px-3 py-2 max-w-[220px] shadow-lg">
      <div className="font-semibold text-sm text-gray-900 mb-1">
        {title}
      </div>
      <div className="text-xs text-gray-600 leading-snug">
        {content}
      </div>
    </div>
  );
}
