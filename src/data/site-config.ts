/**
 * Constantes globais do Xen&Co Surf Shop.
 * Centraliza informação que aparece em vários sítios (header, footer,
 * páginas /visitar, /contacto, schema.org, metadata).
 */

export const SITE_CONFIG = {
  name: "Xen&Co Surf Shop",
  shortName: "Xen&Co",
  tagline: "40 anos de surf no Guincho",
  description:
    "Surf shop emblemática da Malveira da Serra, junto à Praia do Guincho. Pranchas Semente sob encomenda, pranchas usadas, wetsuits e acessórios.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://xencosurfshop.pt",

  contact: {
    email: "xenico1@gmail.com",
    phone: "+351 000 000 000",
    whatsapp: "+351000000000",
  },

  address: {
    street: "Avenida Nossa Senhora da Assunção, 1111",
    city: "Malveira da Serra",
    region: "Cascais",
    postalCode: "2755-140",
    country: "Portugal",
    fullAddress:
      "Avenida Nossa Senhora da Assunção 1111, 2755-140 Malveira da Serra, Cascais",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Xen%26Co+Surf+Shop+Malveira+da+Serra",
    coordinates: {
      lat: 38.7367,
      lng: -9.4567,
    },
  },

  hours: [
    { day: "Segunda", morning: "10:00 – 13:00", afternoon: "15:00 – 19:00", closed: false },
    { day: "Terça", morning: "10:00 – 13:00", afternoon: "15:00 – 19:00", closed: false },
    { day: "Quarta", morning: "10:00 – 13:00", afternoon: "15:00 – 19:00", closed: false },
    { day: "Quinta", morning: "10:00 – 13:00", afternoon: "15:00 – 19:00", closed: false },
    { day: "Sexta", morning: "10:00 – 13:00", afternoon: "15:00 – 19:00", closed: false },
    { day: "Sábado", morning: "10:00 – 13:00", afternoon: "14:30 – 18:00", closed: false },
    { day: "Domingo", morning: null, afternoon: null, closed: true },
  ] as Array<{
    day: string;
    morning: string | null;
    afternoon: string | null;
    closed: boolean;
  }>,

  social: {
    youtube: "https://www.youtube.com/@XenicoPodcast",
    instagram: "",
    facebook: "",
  },

  podcast: {
    name: "Xenico Podcast",
    url: "https://www.youtube.com/@XenicoPodcast",
    description:
      "Histórias de 40 anos no Guincho. Ondas épicas, caldos memoráveis, encontros improváveis e entrevistas com quem vive para o mar.",
  },
} as const;

/**
 * Navegação principal (header + footer).
 */
export const NAV_LINKS = [
  { label: "Loja", href: "/loja" },
  { label: "Pranchas", href: "/loja/pranchas" },
  { label: "Sob encomenda", href: "/loja/encomenda" },
  { label: "Histórias", href: "/historias" },
  { label: "Sobre", href: "/sobre" },
  { label: "Visitar", href: "/visitar" },
] as const;

/**
 * Categorias da loja (footer + mega-menu futuro).
 */
export const SHOP_CATEGORIES = [
  { label: "Pranchas novas", href: "/loja/pranchas/novas" },
  { label: "Pranchas usadas", href: "/loja/pranchas/usadas" },
  { label: "Sob encomenda Semente", href: "/loja/encomenda" },
  { label: "Wetsuits", href: "/loja/wetsuits" },
  { label: "Acessórios", href: "/loja/acessorios" },
  { label: "Roupa Xen&Co", href: "/loja/roupa" },
] as const;

/**
 * Helper: hoje é dia de loja aberta?
 */
export function getStoreStatus(): {
  isOpen: boolean;
  message: string;
  nextOpen?: string;
} {
  const now = new Date();
  const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const todayHours = SITE_CONFIG.hours[dayIndex];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (todayHours.closed) {
    return { isOpen: false, message: "Fechado hoje" };
  }

  const parseTime = (time: string): number => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  if (todayHours.morning) {
    const [openStr, closeStr] = todayHours.morning.split(" – ");
    if (
      currentMinutes >= parseTime(openStr) &&
      currentMinutes <= parseTime(closeStr)
    ) {
      return {
        isOpen: true,
        message: `Aberto até às ${closeStr}`,
      };
    }
  }

  if (todayHours.afternoon) {
    const [openStr, closeStr] = todayHours.afternoon.split(" – ");
    if (
      currentMinutes >= parseTime(openStr) &&
      currentMinutes <= parseTime(closeStr)
    ) {
      return {
        isOpen: true,
        message: `Aberto até às ${closeStr}`,
      };
    }
  }

  return { isOpen: false, message: "Fechado agora" };
}
