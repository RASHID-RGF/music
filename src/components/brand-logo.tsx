// Use public/ so it always loads in the browser as /music.jpeg
export const brandLogoUrl = "/music.jpeg";






export function BrandLogo({
  label = "VibeFlow",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={brandLogoUrl}
        alt="VibeFlow logo"
        className="h-8 w-8 rounded-full object-cover"
      />
      <span className="text-lg font-bold tracking-tight">{label}</span>
    </div>
  );
}
