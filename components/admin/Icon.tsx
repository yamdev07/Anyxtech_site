/* Icône AnyxTech affichée dans la barre de navigation du dashboard. */
export default function Icon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-removebg-preview.png"
      alt="AnyxTech"
      style={{ width: "30px", height: "30px", objectFit: "contain" }}
    />
  );
}
