import CastCard from "./CastCard";

export default function CastSection({ cast }) {
  return (
    <div className="pb-8 px-6 md:px-12 lg:px-24">
      <p className="text-xl font-bold mb-3 tracking-[0.15em]">Starring:</p>
      <div className="flex gap-6 md:gap-10 overflow-x-auto py-2 custom-scrollbar">
        {cast.map((member, index) => (
          <CastCard
            key={index}
            imageSrc={member.image}
            castName={member.name}
            characterName={member.role}
          />
        ))}
      </div>
    </div>
  );
}
