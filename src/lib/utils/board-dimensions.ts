/**
 * Utilitários para conversão de dimensões de pranchas.
 * Pranchas usam medidas em pés/polegadas com frações (5'10", 18 1/2").
 */

const FRACTION_MAP: Record<string, number> = {
  "1/16": 0.0625,
  "1/8": 0.125,
  "3/16": 0.1875,
  "1/4": 0.25,
  "5/16": 0.3125,
  "3/8": 0.375,
  "7/16": 0.4375,
  "1/2": 0.5,
  "9/16": 0.5625,
  "5/8": 0.625,
  "11/16": 0.6875,
  "3/4": 0.75,
  "13/16": 0.8125,
  "7/8": 0.875,
  "15/16": 0.9375,
};

/**
 * Converte tamanho em formato pés'polegadas" para polegadas decimais.
 * Ex: "5'10\"" → 70, "6'2 1/2\"" → 74.5
 */
export function lengthToInches(input: string): number {
  const cleaned = input.replace(/["]/g, "").trim();

  const feetMatch = cleaned.match(/^(\d+)['']/);
  const feet = feetMatch ? parseInt(feetMatch[1]) : 0;

  const afterFeet = cleaned.replace(/^\d+['']/, "").trim();

  if (!afterFeet) return feet * 12;

  const wholeMatch = afterFeet.match(/^(\d+)/);
  const wholeInches = wholeMatch ? parseInt(wholeMatch[1]) : 0;

  const fractionMatch = afterFeet.match(/(\d+\/\d+)/);
  const fraction = fractionMatch ? FRACTION_MAP[fractionMatch[1]] ?? 0 : 0;

  return feet * 12 + wholeInches + fraction;
}

/**
 * Converte largura/espessura em polegadas com frações para decimais.
 * Ex: "18 1/2\"" → 18.5, "2 5/8\"" → 2.625
 */
export function inchesToDecimal(input: string): number {
  const cleaned = input.replace(/["]/g, "").trim();

  const wholeMatch = cleaned.match(/^(\d+)/);
  const whole = wholeMatch ? parseInt(wholeMatch[1]) : 0;

  const fractionMatch = cleaned.match(/(\d+\/\d+)/);
  const fraction = fractionMatch ? FRACTION_MAP[fractionMatch[1]] ?? 0 : 0;

  return whole + fraction;
}

/**
 * Converte polegadas decimais para formato pés'polegadas".
 * Ex: 70 → "5'10\"", 74.5 → "6'2 1/2\""
 */
export function inchesToLength(decimalInches: number): string {
  const feet = Math.floor(decimalInches / 12);
  const remainingInches = decimalInches - feet * 12;
  const wholeInches = Math.floor(remainingInches);
  const fractionalPart = remainingInches - wholeInches;

  const fraction = decimalToFraction(fractionalPart);
  const fractionStr = fraction ? ` ${fraction}` : "";

  return `${feet}'${wholeInches}${fractionStr}"`;
}

/**
 * Converte decimal para fração mais próxima (1/16, 1/8, 1/4, etc.)
 */
export function decimalToFraction(decimal: number): string {
  if (decimal === 0) return "";

  let closest = "";
  let smallestDiff = Infinity;

  for (const [frac, val] of Object.entries(FRACTION_MAP)) {
    const diff = Math.abs(decimal - val);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closest = frac;
    }
  }

  return smallestDiff < 0.04 ? closest : "";
}

/**
 * Formata polegadas decimais para display (largura/espessura).
 * Ex: 18.5 → "18 1/2\"", 2.625 → "2 5/8\""
 */
export function formatInches(decimal: number): string {
  const whole = Math.floor(decimal);
  const fractional = decimal - whole;
  const fraction = decimalToFraction(fractional);
  return fraction ? `${whole} ${fraction}"` : `${whole}"`;
}

/**
 * Calcula volume aproximado interpolando entre dimensões standard.
 * Quando o cliente customiza fora dos valores standard.
 */
export function interpolateVolume(
  targetLength: number,
  targetWidth: number,
  targetThickness: number,
  standards: Array<{
    lengthInches: number;
    widthInches: number;
    thicknessInches: number;
    volume: number;
  }>
): number {
  const closest = standards.reduce((prev, curr) => {
    const prevDiff = Math.abs(prev.lengthInches - targetLength);
    const currDiff = Math.abs(curr.lengthInches - targetLength);
    return currDiff < prevDiff ? curr : prev;
  });

  const widthRatio = targetWidth / closest.widthInches;
  const thicknessRatio = targetThickness / closest.thicknessInches;
  const lengthRatio = targetLength / closest.lengthInches;

  const adjustedVolume =
    closest.volume * widthRatio * thicknessRatio * lengthRatio;

  return Math.round(adjustedVolume * 10) / 10;
}
