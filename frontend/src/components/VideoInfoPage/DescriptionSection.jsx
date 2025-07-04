export default function DescriptionSection({ description, quote }) {
  return (
    <div className="flex flex-col md:flex-row pb-8 px-6 md:px-12 lg:px-24 tracking-[0.15em] gap-8">
      <div className="w-full md:w-3/4">
        <p className="text-xl font-bold mb-3">Description:</p>
        <p className="text-base md:text-xl leading-[1.6] font-light">{description}</p>
      </div>
      <div className="hidden md:block w-px bg-white/80 h-40 self-center"></div>
      <div className="w-full md:w-1/4 pl-0 md:pl-8 mt-6 md:mt-0 flex items-center justify-center">
        <p className="text-xl md:text-3xl italic font-bold leading-[1.6] text-center">
          ❝{quote.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}❞
        </p>
      </div>
    </div>
  );
}
