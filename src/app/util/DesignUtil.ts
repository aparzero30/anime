export class DesignUtil {
  static darkenColor(color: string | undefined): string {
    if (!color) {
      return '#000000'; // Return black if color is undefined
    }
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

    if (luminance > 128) {
      // Darken color by reducing RGB values by 20%
      const darkerR = Math.max(r - r * 0.2, 0);
      const darkerG = Math.max(g - g * 0.2, 0);
      const darkerB = Math.max(b - b * 0.2, 0);
      return `#${Math.floor(darkerR).toString(16).padStart(2, '0')}${Math.floor(darkerG).toString(16).padStart(2, '0')}${Math.floor(darkerB).toString(16).padStart(2, '0')}`;
    } else {
      return color; // Return original color if not light
    }
  }
}
