const LOCATION_IMAGE = 'https://res.cloudinary.com/l5tyqnmr/image/upload/v1793464021/Durr%C3%ABs_Clinic-to-Hospital_Walking_Map.png';

export default function MapEmbed({ className = '' }: { className?: string }) {
  return (
    <img
      src={LOCATION_IMAGE}
      alt="Harta e vendndodhjes së Medicare Qendër Diagnostike Durrës"
      loading="lazy"
      className={`h-full w-full object-cover object-center ${className}`}
    />
  );
}
