// gotta love chatgpt
export function lightenColour(hex: string, amount: number): string {
    // Remove the hash character if it's present
    hex = hex.replace('#', '');

    // Convert the hex color to an RGB color
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate the new, lighter RGB color
    const newR = Math.min(Math.round(r + (255 - r) * amount), 255);
    const newG = Math.min(Math.round(g + (255 - g) * amount), 255);
    const newB = Math.min(Math.round(b + (255 - b) * amount), 255);

    // Convert the new RGB color back to hex format
    const newHex = `#${newR.toString(16).padStart(2, '0')}${newG
        .toString(16)
        .padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;

    return newHex;
}
