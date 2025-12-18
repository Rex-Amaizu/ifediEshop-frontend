export const mapCategoriesToSelect = (categories: any[]) =>
  categories.map((cat) => ({ label: cat.name, value: cat._id }));

// ====================================================
// ==================== SIZE GROUPS ====================
// ====================================================

// EU Shoe Sizes
export const euShoesSizes = [
  34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
].map((n) => ({ label: `${n}`, value: n }));

// US Shoe Sizes (Men/Women combined common range)
export const usShoesSizes = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((n) => ({
  label: `${n}`,
  value: n,
}));

// UK Shoe Sizes
export const ukShoesSizes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => ({
  label: `${n}`,
  value: n,
}));

// Clothing Alpha Sizes
export const alphaClothingSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
  "5XL",
  "6XL",
  "7XL",
].map((s) => ({ label: s, value: s }));

// Trouser / Jeans Sizes
export const trouserSizes = [26, 28, 30, 32, 34, 36, 38, 40, 42].map((n) => ({
  label: `${n}`,
  value: n,
}));

// Kids Clothing Sizes
export const kidsClothingSizes = [
  "0-3M",
  "3-6M",
  "6-9M",
  "9-12M",
  "1-2Y",
  "2-3Y",
  "3-4Y",
  "4-5Y",
  "6-7Y",
  "8-9Y",
  "10-11Y",
  "12-13Y",
].map((s) => ({ label: s, value: s }));

// Cap Sizes
export const capSizes = [
  "S",
  "M",
  "L",
  "XL",
  "54cm",
  "55cm",
  "56cm",
  "57cm",
  "58cm",
  "59cm",
  "60cm",
].map((s) => ({ label: s, value: s }));

// Watch Strap Sizes
export const watchSizes = ["14mm", "16mm", "18mm", "20mm", "22mm", "24mm"].map(
  (s) => ({ label: s, value: s })
);

// Necklace Lengths
export const necklaceSizes = [
  "14in",
  "16in",
  "18in",
  "20in",
  "22in",
  "24in",
  "26in",
].map((s) => ({ label: s, value: s }));

// Shirt / Top Numeric Sizes
export const shirtNumberSizes = [34, 36, 38, 40, 42, 44, 46].map((n) => ({
  label: `${n}`,
  value: n,
}));

export const bagSizes = [
  { label: "Small (25 x 15 x 10 cm)", value: "S-25x15x10" },
  { label: "Medium (30 x 20 x 15 cm)", value: "M-30x20x15" },
  { label: "Large (40 x 30 x 20 cm)", value: "L-40x30x20" },
];

// ====================================================
// ========== SIZE TYPE SELECT (MASTER SELECT) =========
// ====================================================
export const sizeTypeSelect = [
  { label: "EU Shoe Sizes", value: "euShoesSizes" },
  { label: "US Shoe Sizes", value: "usShoesSizes" },
  { label: "UK Shoe Sizes", value: "ukShoesSizes" },
  { label: "Clothing (XS - 7XL)", value: "alphaClothingSizes" },
  { label: "Trousers/Jeans Numeric Sizes", value: "trouserSizes" },
  { label: "Kids Clothing Sizes", value: "kidsClothingSizes" },
  { label: "Cap Sizes", value: "capSizes" },
  { label: "Watch Strap Sizes", value: "watchSizes" },
  { label: "Necklace Lengths", value: "necklaceSizes" },
  { label: "Shirt/Top Numbered Sizes", value: "shirtNumberSizes" },
  { label: "Bag Sizes", value: "bagSizes" },
];

export const colorsSelect = [
  { label: "AliceBlue", value: "aliceblue" },
  { label: "AntiqueWhite", value: "antiquewhite" },
  { label: "Aqua", value: "aqua" },
  { label: "Aquamarine", value: "aquamarine" },
  { label: "Azure", value: "azure" },
  { label: "Beige", value: "beige" },
  { label: "Bisque", value: "bisque" },
  { label: "Black", value: "black" },
  { label: "BlanchedAlmond", value: "blanchedalmond" },
  { label: "Blue", value: "blue" },
  { label: "BlueViolet", value: "blueviolet" },
  { label: "Brown", value: "brown" },
  { label: "BurlyWood", value: "burlywood" },
  { label: "CadetBlue", value: "cadetblue" },
  { label: "Chartreuse", value: "chartreuse" },
  { label: "Chocolate", value: "chocolate" },
  { label: "Coral", value: "coral" },
  { label: "CornflowerBlue", value: "cornflowerblue" },
  { label: "Cornsilk", value: "cornsilk" },
  { label: "Crimson", value: "crimson" },
  { label: "Cyan", value: "cyan" },
  { label: "DarkBlue", value: "darkblue" },
  { label: "DarkCyan", value: "darkcyan" },
  { label: "DarkGoldenRod", value: "darkgoldenrod" },
  { label: "DarkGray", value: "darkgray" },
  { label: "DarkGrey", value: "darkgrey" },
  { label: "DarkGreen", value: "darkgreen" },
  { label: "DarkKhaki", value: "darkkhaki" },
  { label: "DarkMagenta", value: "darkmagenta" },
  { label: "DarkOliveGreen", value: "darkolivegreen" },
  { label: "DarkOrange", value: "darkorange" },
  { label: "DarkOrchid", value: "darkorchid" },
  { label: "DarkRed", value: "darkred" },
  { label: "DarkSalmon", value: "darksalmon" },
  { label: "DarkSeaGreen", value: "darkseagreen" },
  { label: "DarkSlateBlue", value: "darkslateblue" },
  { label: "DarkSlateGray", value: "darkslategray" },
  { label: "DarkSlateGrey", value: "darkslategrey" },
  { label: "DarkTurquoise", value: "darkturquoise" },
  { label: "DarkViolet", value: "darkviolet" },
  { label: "DeepPink", value: "deeppink" },
  { label: "DeepSkyBlue", value: "deepskyblue" },
  { label: "DimGray", value: "dimgray" },
  { label: "DimGrey", value: "dimgrey" },
  { label: "DodgerBlue", value: "dodgerblue" },
  { label: "FireBrick", value: "firebrick" },
  { label: "FloralWhite", value: "floralwhite" },
  { label: "ForestGreen", value: "forestgreen" },
  { label: "Fuchsia", value: "fuchsia" },
  { label: "Gainsboro", value: "gainsboro" },
  { label: "GhostWhite", value: "ghostwhite" },
  { label: "Gold", value: "gold" },
  { label: "GoldenRod", value: "goldenrod" },
  { label: "Gray", value: "gray" },
  { label: "Grey", value: "grey" },
  { label: "Green", value: "green" },
  { label: "GreenYellow", value: "greenyellow" },
  { label: "HoneyDew", value: "honeydew" },
  { label: "HotPink", value: "hotpink" },
  { label: "IndianRed", value: "indianred" },
  { label: "Indigo", value: "indigo" },
  { label: "Ivory", value: "ivory" },
  { label: "Khaki", value: "khaki" },
  { label: "Lavender", value: "lavender" },
  { label: "LavenderBlush", value: "lavenderblush" },
  { label: "LawnGreen", value: "lawngreen" },
  { label: "LemonChiffon", value: "lemonchiffon" },
  { label: "LightBlue", value: "lightblue" },
  { label: "LightCoral", value: "lightcoral" },
  { label: "LightCyan", value: "lightcyan" },
  { label: "LightGoldenRodYellow", value: "lightgoldenrodyellow" },
  { label: "LightGray", value: "lightgray" },
  { label: "LightGrey", value: "lightgrey" },
  { label: "LightGreen", value: "lightgreen" },
  { label: "LightPink", value: "lightpink" },
  { label: "LightSalmon", value: "lightsalmon" },
  { label: "LightSeaGreen", value: "lightseagreen" },
  { label: "LightSkyBlue", value: "lightskyblue" },
  { label: "LightSlateGray", value: "lightslategray" },
  { label: "LightSlateGrey", value: "lightslategrey" },
  { label: "LightSteelBlue", value: "lightsteelblue" },
  { label: "LightYellow", value: "lightyellow" },
  { label: "Lime", value: "lime" },
  { label: "LimeGreen", value: "limegreen" },
  { label: "Linen", value: "linen" },
  { label: "Magenta", value: "magenta" },
  { label: "Maroon", value: "maroon" },
  { label: "MediumAquaMarine", value: "mediumaquamarine" },
  { label: "MediumBlue", value: "mediumblue" },
  { label: "MediumOrchid", value: "mediumorchid" },
  { label: "MediumPurple", value: "mediumpurple" },
  { label: "MediumSeaGreen", value: "mediumseagreen" },
  { label: "MediumSlateBlue", value: "mediumslateblue" },
  { label: "MediumSpringGreen", value: "mediumspringgreen" },
  { label: "MediumTurquoise", value: "mediumturquoise" },
  { label: "MediumVioletRed", value: "mediumvioletred" },
  { label: "MidnightBlue", value: "midnightblue" },
  { label: "MintCream", value: "mintcream" },
  { label: "MistyRose", value: "mistyrose" },
  { label: "Moccasin", value: "moccasin" },
  { label: "NavajoWhite", value: "navajowhite" },
  { label: "Navy", value: "navy" },
  { label: "OldLace", value: "oldlace" },
  { label: "Olive", value: "olive" },
  { label: "OliveDrab", value: "olivedrab" },
  { label: "Orange", value: "orange" },
  { label: "OrangeRed", value: "orangered" },
  { label: "Orchid", value: "orchid" },
  { label: "PaleGoldenRod", value: "palegoldenrod" },
  { label: "PaleGreen", value: "palegreen" },
  { label: "PaleTurquoise", value: "paleturquoise" },
  { label: "PaleVioletRed", value: "palevioletred" },
  { label: "PapayaWhip", value: "papayawhip" },
  { label: "PeachPuff", value: "peachpuff" },
  { label: "Peru", value: "peru" },
  { label: "Pink", value: "pink" },
  { label: "Plum", value: "plum" },
  { label: "PowderBlue", value: "powderblue" },
  { label: "Purple", value: "purple" },
  { label: "Red", value: "red" },
  { label: "RosyBrown", value: "rosybrown" },
  { label: "RoyalBlue", value: "royalblue" },
  { label: "SaddleBrown", value: "saddlebrown" },
  { label: "Salmon", value: "salmon" },
  { label: "SandyBrown", value: "sandybrown" },
  { label: "SeaGreen", value: "seagreen" },
  { label: "SeaShell", value: "seashell" },
  { label: "Sienna", value: "sienna" },
  { label: "Silver", value: "silver" },
  { label: "SkyBlue", value: "skyblue" },
  { label: "SlateBlue", value: "slateblue" },
  { label: "SlateGray", value: "slategray" },
  { label: "SlateGrey", value: "slategrey" },
  { label: "Snow", value: "snow" },
  { label: "SpringGreen", value: "springgreen" },
  { label: "SteelBlue", value: "steelblue" },
  { label: "Tan", value: "tan" },
  { label: "Teal", value: "teal" },
  { label: "Thistle", value: "thistle" },
  { label: "Tomato", value: "tomato" },
  { label: "Turquoise", value: "turquoise" },
  { label: "Violet", value: "violet" },
  { label: "Wheat", value: "wheat" },
  { label: "White", value: "white" },
  { label: "WhiteSmoke", value: "whitesmoke" },
  { label: "Yellow", value: "yellow" },
  { label: "YellowGreen", value: "yellowgreen" },
] as const;

export const genderSelect = [
  { label: "Men", value: "Men" },
  { label: "Ladies", value: "Ladies" },
  { label: "Kids", value: "Kids" },
] as const;

export const sizeOptionsMap = {
  euShoesSizes,
  usShoesSizes,
  ukShoesSizes,
  alphaClothingSizes,
  trouserSizes,
  kidsClothingSizes,
  capSizes,
  watchSizes,
  necklaceSizes,
  shirtNumberSizes,
  bagSizes,
} as const;

export type GenderValue = (typeof genderSelect)[number]["value"];
export type ColorValue = (typeof colorsSelect)[number]["value"];
export type SizeTypeKey = keyof typeof sizeOptionsMap;
