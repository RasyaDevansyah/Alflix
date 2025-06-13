export default function DescriptionSection({ description, quote }) {
    return (
      <div className="flex pb-8 px-24 tracking-[0.15em] gap-8">
        <div className="w-3/4">
          <p className="text-xl font-bold mb-3">Description:</p>
          <p className="text-xl leading-[1.6] font-light">{description}</p>
        </div>
        <div className="w-px bg-white/80 h-40 self-center"></div>
        <div className="w-1/4 pl-8 flex items-center justify-center">
          <p className="text-3xl italic font-bold leading-[1.6]">
            ❝{quote.split('\n').map((line, i) => (
              <span key={i}>{line}</span>
            ))}❞
          </p>
        </div>
      </div>
    );
  }