/**
 * Génère les visuels TEMPORAIRES du site (public/images/placeholders/*.webp).
 *
 * Ce sont des compositions graphiques aux couleurs de la pharmacie, utilisées
 * en attendant les vraies photographies. Voir docs/IMAGES.md pour la liste des
 * photos à fournir et src/config/images.ts pour les remplacer.
 *
 * Usage : node scripts/generate-placeholders.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public/images/placeholders");
const W = 1800;
const H = 1500;

const C = {
  brand: "#8EB55C",
  brandSoft: "#B7D092",
  sage: "#DCE7CC",
  sageLight: "#EEF4E6",
  cream: "#FAF7F0",
  sand: "#EFE7D8",
  forest: "#15301F",
  moss: "#4A7328",
  clay: "#E6D3BE",
  white: "#FFFFFF",
};

const leaf = (x, y, rot, s, fill, vein = true) => `
  <g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path d="M0 0 C 60 -90 180 -110 260 -40 C 180 30 60 40 0 0 Z" fill="${fill}"/>
    ${vein ? `<path d="M0 0 C 90 -30 170 -45 250 -40" stroke="${C.forest}" stroke-opacity=".18" stroke-width="3" fill="none"/>` : ""}
  </g>`;

const sprig = (x, y, rot, s, fill) => `
  <g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path d="M0 0 C 20 -160 10 -320 -10 -480" stroke="${C.moss}" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${[60, 140, 220, 300, 380]
      .map(
        (d, i) => `
      <ellipse cx="${i % 2 ? 38 : -34}" cy="${-d}" rx="46" ry="20" transform="rotate(${i % 2 ? -35 : 35} ${i % 2 ? 38 : -34} ${-d})" fill="${fill}"/>`,
      )
      .join("")}
  </g>`;

const arch = (x, y, w, h, fill) =>
  `<path d="M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z" fill="${fill}"/>`;

const bottle = (x, y, w, h, body, cap) => `
  <g>
    <rect x="${x + w * 0.3}" y="${y - h * 0.16}" width="${w * 0.4}" height="${h * 0.18}" rx="10" fill="${cap}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.22}" fill="${body}"/>
    <rect x="${x + w * 0.18}" y="${y + h * 0.4}" width="${w * 0.64}" height="${h * 0.22}" rx="8" fill="${C.white}" fill-opacity=".55"/>
  </g>`;

const grain = `
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="table" tableValues="0 .07"/></feComponentTransfer>
  </filter>`;

const frame = (bg, body) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${grain}
    <radialGradient id="light" cx=".3" cy=".2" r=".9">
      <stop offset="0" stop-color="#fff" stop-opacity=".3"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="${bg}"/>
  ${body}
  <rect width="100%" height="100%" fill="url(#light)"/>
  <rect width="100%" height="100%" filter="url(#grain)"/>
</svg>`;

const images = {
  // Accueil — comptoir / conseil
  hero: frame(
    C.sand,
    `
    ${arch(980, 180, 620, 1320, C.sageLight)}
    <circle cx="420" cy="420" r="260" fill="${C.clay}" fill-opacity=".7"/>
    <rect x="0" y="1080" width="${W}" height="420" fill="${C.cream}"/>
    <rect x="0" y="1060" width="${W}" height="30" fill="${C.clay}"/>
    ${bottle(260, 820, 150, 260, C.brandSoft, C.forest)}
    ${bottle(450, 880, 120, 200, C.white, C.brand)}
    ${bottle(600, 760, 130, 320, C.sage, C.moss)}
    <rect x="1180" y="840" width="230" height="240" rx="26" fill="${C.cream}"/>
    ${sprig(1295, 860, -6, 1, C.brand)}
    ${sprig(1280, 860, 18, 0.85, C.brandSoft)}
    ${leaf(1300, 820, -140, 1.1, C.moss)}
  `,
  ),
  counsel: frame(
    C.sageLight,
    `
    ${arch(240, 160, 700, 1340, C.sage)}
    <circle cx="1350" cy="520" r="330" fill="${C.cream}"/>
    ${leaf(1150, 1100, -70, 2.2, C.brand)}
    ${leaf(1250, 1180, -30, 1.8, C.moss)}
    ${leaf(1180, 1200, -110, 1.5, C.brandSoft)}
    <rect x="0" y="1240" width="${W}" height="260" fill="${C.sand}"/>
    ${bottle(460, 900, 170, 340, C.white, C.brand)}
  `,
  ),
  delivery: frame(
    C.cream,
    `
    <circle cx="1400" cy="360" r="240" fill="${C.sageLight}"/>
    ${arch(160, 300, 560, 1200, C.sageLight)}
    <path d="M760 620 H1260 L1300 1260 H720 Z" fill="${C.clay}"/>
    <path d="M880 620 C 880 480 1140 480 1140 620" stroke="${C.forest}" stroke-opacity=".6" stroke-width="16" fill="none"/>
    <rect x="860" y="820" width="340" height="150" rx="20" fill="${C.white}" fill-opacity=".7"/>
    <path d="M985 870 h90 M1030 830 v90" stroke="${C.brand}" stroke-width="18" stroke-linecap="round"/>
    ${sprig(840, 640, -10, 0.7, C.brand)}
    ${leaf(1240, 640, -120, 1, C.moss)}
    <rect x="0" y="1260" width="${W}" height="240" fill="${C.sand}"/>
  `,
  ),
  herbal: frame(
    C.sageLight,
    `
    <circle cx="900" cy="760" r="520" fill="${C.cream}"/>
    ${sprig(760, 1250, -18, 1.4, C.brand)}
    ${sprig(900, 1260, 4, 1.6, C.moss)}
    ${sprig(1050, 1250, 22, 1.3, C.brandSoft)}
    ${leaf(560, 1180, -30, 1.5, C.brandSoft)}
    ${leaf(1240, 1180, -150, 1.5, C.brand)}
    <ellipse cx="900" cy="1300" rx="420" ry="50" fill="${C.clay}"/>
  `,
  ),
  skincare: frame(
    C.sand,
    `
    ${arch(560, 140, 680, 1360, C.cream)}
    ${bottle(620, 700, 210, 520, C.white, C.forest)}
    ${bottle(880, 860, 170, 360, C.sage, C.brand)}
    ${bottle(1080, 780, 150, 440, C.brandSoft, C.moss)}
    <rect x="0" y="1220" width="${W}" height="280" fill="${C.clay}"/>
    ${leaf(360, 1220, -60, 1.8, C.brand)}
    ${leaf(1500, 1220, -120, 1.6, C.moss)}
  `,
  ),
  hygiene: frame(
    C.cream,
    `
    <circle cx="1300" cy="520" r="360" fill="${C.sageLight}"/>
    <rect x="420" y="760" width="520" height="300" rx="120" fill="${C.white}"/>
    <rect x="470" y="800" width="420" height="220" rx="100" fill="${C.sage}"/>
    ${[0, 1, 2, 3].map((i) => `<circle cx="${1080 + i * 110}" cy="${900 - (i % 2) * 90}" r="${40 + i * 8}" fill="${C.white}" stroke="${C.brand}" stroke-opacity=".5" stroke-width="6"/>`).join("")}
    <rect x="0" y="1180" width="${W}" height="320" fill="${C.sand}"/>
    ${leaf(300, 1180, -50, 1.6, C.brand)}
  `,
  ),
  supplements: frame(
    C.sageLight,
    `
    <circle cx="560" cy="620" r="380" fill="${C.cream}"/>
    <path d="M1060 1240 V760 a200 200 0 0 1 400 0 V1240 Z" fill="${C.sand}"/>
    ${[
      [420, 980, 30],
      [560, 1040, -20],
      [700, 960, 60],
      [500, 1120, 80],
      [650, 1140, 10],
    ]
      .map(
        ([x, y, r]) =>
          `<g transform="rotate(${r} ${x} ${y})"><rect x="${x - 70}" y="${y - 28}" width="140" height="56" rx="28" fill="${C.brandSoft}"/><rect x="${x}" y="${y - 28}" width="70" height="56" rx="0" fill="${C.white}"/><rect x="${x - 70}" y="${y - 28}" width="140" height="56" rx="28" fill="none" stroke="${C.moss}" stroke-opacity=".25" stroke-width="4"/></g>`,
      )
      .join("")}
    ${sprig(1260, 1240, 6, 1.2, C.brand)}
    <rect x="0" y="1240" width="${W}" height="260" fill="${C.clay}"/>
  `,
  ),
  equipment: frame(
    C.cream,
    `
    ${arch(1000, 220, 560, 1280, C.sageLight)}
    <circle cx="560" cy="700" r="250" fill="none" stroke="${C.moss}" stroke-opacity=".5" stroke-width="28"/>
    <circle cx="560" cy="700" r="120" fill="${C.sage}"/>
    <path d="M560 950 C 560 1100 760 1120 820 1000" stroke="${C.forest}" stroke-opacity=".55" stroke-width="22" fill="none" stroke-linecap="round"/>
    <rect x="1140" y="760" width="280" height="420" rx="40" fill="${C.white}"/>
    <rect x="1180" y="810" width="200" height="120" rx="18" fill="${C.sageLight}"/>
    <circle cx="1280" cy="1060" r="46" fill="${C.brand}"/>
    <rect x="0" y="1200" width="${W}" height="300" fill="${C.sand}"/>
  `,
  ),
  baby: frame(
    "#F6EFE6",
    `
    <circle cx="620" cy="600" r="360" fill="${C.sageLight}"/>
    <path d="M980 700 a150 150 0 0 1 290 -40 a120 120 0 0 1 200 110 a110 110 0 0 1 -30 216 H1020 a130 130 0 0 1 -40 -286 Z" fill="${C.white}"/>
    <circle cx="560" cy="1000" r="110" fill="${C.clay}"/>
    <circle cx="760" cy="1060" r="80" fill="${C.brandSoft}"/>
    ${bottle(1180, 1000, 120, 220, C.white, C.brand)}
    <rect x="0" y="1220" width="${W}" height="280" fill="${C.cream}"/>
    ${leaf(360, 1220, -60, 1.3, C.brand)}
  `,
  ),
  pillbox: frame(
    C.sageLight,
    `
    <circle cx="1450" cy="320" r="260" fill="${C.cream}"/>
    <rect x="260" y="560" width="1280" height="520" rx="60" fill="${C.white}"/>
    ${Array.from({ length: 7 })
      .map(
        (_, i) => `
      <rect x="${310 + i * 176}" y="610" width="150" height="190" rx="28" fill="${i % 2 ? C.sage : C.cream}"/>
      <rect x="${310 + i * 176}" y="830" width="150" height="190" rx="28" fill="${i % 2 ? C.cream : C.sage}"/>
      <circle cx="${385 + i * 176}" cy="${705 + (i % 3) * 8}" r="${20 + (i % 3) * 4}" fill="${i % 3 ? C.brandSoft : C.brand}"/>`,
      )
      .join("")}
    <rect x="0" y="1180" width="${W}" height="320" fill="${C.sand}"/>
    ${leaf(240, 1180, -40, 1.5, C.brand)}
  `,
  ),
  madagascar: frame(
    "#F3E7D6",
    `
    <circle cx="1280" cy="520" r="300" fill="#EBC99E" fill-opacity=".85"/>
    <rect x="0" y="1060" width="${W}" height="440" fill="${C.clay}"/>
    <g fill="${C.forest}" fill-opacity=".82">
      <path d="M560 1080 C 580 880 590 700 600 560 L680 560 C 690 700 700 880 720 1080 Z"/>
      <path d="M600 580 C 560 500 470 470 420 480 M640 570 C 640 470 610 420 580 400 M660 575 C 700 480 760 450 820 460" stroke="${C.forest}" stroke-width="22" fill="none" stroke-linecap="round"/>
    </g>
    <ellipse cx="430" cy="470" rx="110" ry="50" fill="${C.moss}"/>
    <ellipse cx="580" cy="390" rx="90" ry="46" fill="${C.brand}"/>
    <ellipse cx="830" cy="450" rx="120" ry="52" fill="${C.moss}"/>
    <path d="M1060 1080 H1480 V820 H1060 Z" fill="${C.cream}"/>
    <path d="M1060 820 L1270 740 L1480 820" fill="${C.sand}"/>
    <path d="M1270 740 V1080" stroke="${C.brand}" stroke-width="14"/>
    <path d="M160 300 q60 -40 120 0 q60 -40 120 0" stroke="${C.forest}" stroke-opacity=".35" stroke-width="8" fill="none"/>
  `,
  ),
  team: frame(
    C.cream,
    `
    ${arch(160, 240, 460, 1260, C.sageLight)}
    ${arch(680, 120, 460, 1380, C.sand)}
    ${arch(1200, 240, 460, 1260, C.sageLight)}
    ${sprig(390, 1300, -8, 1.2, C.brand)}
    ${bottle(830, 1000, 160, 300, C.white, C.brand)}
    ${sprig(1430, 1300, 10, 1.1, C.moss)}
    <rect x="0" y="1300" width="${W}" height="200" fill="${C.clay}"/>
  `,
  ),
};

await mkdir(OUT, { recursive: true });
// Seuls ces visuels sont encore utilisés (les autres ont été remplacés par des photos)
const USED = ["delivery", "madagascar"];
for (const [name, svg] of Object.entries(images).filter(([n]) => USED.includes(n))) {
  const file = path.join(OUT, `${name}.webp`);
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(file);
  console.log("✓", path.relative(process.cwd(), file));
}
