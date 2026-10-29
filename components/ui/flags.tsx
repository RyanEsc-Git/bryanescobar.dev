/**
 * Banderas dibujadas a mano en SVG.
 *
 * Los emoji 🇸🇻 y 🇺🇸 no existen como glifo en Windows: el navegador los
 * muestra como las letras "SV" y "US". Estas versiones se ven igual en
 * cualquier sistema, y a 16 px una bandera simplificada se lee mejor que una
 * exacta.
 *
 * Las franjas se recortan con un clipPath para que no se salgan de la esquina
 * redondeada. El id se repite si hay dos banderas iguales en la página (la
 * barra de escritorio y la de móvil), pero apuntan al mismo recorte, así que
 * el resultado es idéntico.
 */

type FlagProps = { className?: string };

const frame = {
  viewBox: "0 0 16 12",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
};

export function FlagSV({ className }: FlagProps) {
  return (
    <svg {...frame} className={className}>
      <clipPath id="flag-sv-clip">
        <rect width="16" height="12" rx="1.5" />
      </clipPath>
      <g clipPath="url(#flag-sv-clip)">
        <rect width="16" height="12" fill="#FFFFFF" />
        <rect width="16" height="4" fill="#0F47AF" />
        <rect y="8" width="16" height="4" fill="#0F47AF" />
        <circle
          cx="8"
          cy="6"
          r="1.3"
          fill="none"
          stroke="#0F47AF"
          strokeWidth="0.7"
        />
      </g>
    </svg>
  );
}

export function FlagUS({ className }: FlagProps) {
  return (
    <svg {...frame} className={className}>
      <clipPath id="flag-us-clip">
        <rect width="16" height="12" rx="1.5" />
      </clipPath>
      <g clipPath="url(#flag-us-clip)">
        <rect width="16" height="12" fill="#FFFFFF" />
        <g fill="#B22234">
          <rect width="16" height="1.85" />
          <rect y="3.7" width="16" height="1.85" />
          <rect y="7.4" width="16" height="1.85" />
          <rect y="11.1" width="16" height="0.9" />
        </g>
        <rect width="7" height="6.5" fill="#3C3B6E" />
        <g fill="#FFFFFF">
          <circle cx="1.6" cy="1.6" r="0.5" />
          <circle cx="3.5" cy="1.6" r="0.5" />
          <circle cx="5.4" cy="1.6" r="0.5" />
          <circle cx="2.5" cy="3.2" r="0.5" />
          <circle cx="4.4" cy="3.2" r="0.5" />
          <circle cx="1.6" cy="4.8" r="0.5" />
          <circle cx="3.5" cy="4.8" r="0.5" />
          <circle cx="5.4" cy="4.8" r="0.5" />
        </g>
      </g>
    </svg>
  );
}
