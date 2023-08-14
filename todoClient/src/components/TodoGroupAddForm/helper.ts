function expandHexColor(hex: string) {
  if (hex.length === 3) {
    return `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  return hex;
}

export const isValidHexColor = (hex: string) => {
  const hexColorPattern = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  return hexColorPattern.test(hex);
};
export const generateHoverColor = (primaryColorHex: string, amount: number = -20) => {
  primaryColorHex = expandHexColor(primaryColorHex.replace("#", ""));

  const r = parseInt(primaryColorHex.substring(0, 2), 16);
  const g = parseInt(primaryColorHex.substring(2, 4), 16);
  const b = parseInt(primaryColorHex.substring(4, 6), 16);

  const hoverR = Math.max(0, Math.min(255, r + amount));
  const hoverG = Math.max(0, Math.min(255, g + amount));
  const hoverB = Math.max(0, Math.min(255, b + amount));

  const hoverColorHex =
    (hoverR < 16 ? "0" : "") +
    Math.round(hoverR).toString(16) +
    (hoverG < 16 ? "0" : "") +
    Math.round(hoverG).toString(16) +
    (hoverB < 16 ? "0" : "") +
    Math.round(hoverB).toString(16);

  return `#${hoverColorHex}`;
};
