// from uiGradients: https://uigradients.com
const gradients = [
  ["#8e2de2", "#4a00e0"],
  ["#203a43", "#2c5364"],
  ["#FF0099", "#493240"],
  ["#7F7FD5", "#86A8E7"],
  ["#f953c6", "#b91d73"],
  ["#c31432", "#240b36"],
  ["#f12711", "#f5af19"],
  ["#654ea3", "#eaafc8"],
  ["#FF416C", "#FF4B2B"],
  ["#8A2387", "#E94057"],
  ["#a8ff78", "#78ffd6"],
  ["#ED213A", "#93291E"],
  ["#FDC830", "#F37335"],
  ["#00B4DB", "#0083B0"],
  ["#DA4453", "#89216B"],
  ["#ad5389", "#3c1053"],
  ["#a8c0ff", "#3f2b96"],
  ["#4e54c8", "#8f94fb"],
  ["#bc4e9c", "#f80759"],
  ["#11998e", "#38ef7d"],
  ["#FC5C7D", "#6A82FB"],
  ["#FC466B", "#3F5EFB"],
  ["#c94b4b", "#4b134f"],
  ["#23074d", "#cc5333"],
  ["#24243e", "#302b63"],
  ["#00b09b", "#96c93d"],
  ["#CAC531", "#F3F9A7"],
  ["#800080", "#ffc0cb"],
  ["#00F260", "#0575E6"],
  ["#fc4a1a", "#f7b733"],
  ["#74ebd5", "#ACB6E5"],
  ["#22c1c3", "#fdbb2d"],
  ["#ff9966", "#ff5e62"],
  ["#7F00FF", "#E100FF"],
  ["#0cebeb", "#20e3b2"],
  ["#396afc", "#2948ff"],
  ["#06beb6", "#48b1bf"],
  ["#642B73", "#C6426E"],
  ["#36D1DC", "#5B86E5"],
  ["#CB356B", "#BD3F32"],
  ["#c0392b", "#8e44ad"],
  ["#159957", "#155799"],
  ["#000046", "#1CB5E0"],
  ["#007991", "#78ffd6"],
  ["#56CCF2", "#2F80ED"],
  ["#F2994A", "#F2C94C"],
  ["#E44D26", "#F16529"],
  ["#F7971E", "#FFD200"],
  ["#6190E8", "#A7BFE8"],
  ["#4568DC", "#B06AB3"],
  ["#0575E6", "#021B79"],
  ["#43C6AC", "#F8FFAE"],
  ["#FFAFBD", "#ffc3a0"],
  ["#DCE35B", "#45B649"],
  ["#67B26F", "#4ca2cd"],
  ["#ee0979", "#ff6a00"],
  ["#ff7e5f", "#feb47b"],
  ["#cb2d3e", "#ef473a"],
  ["#56ab2f", "#a8e063"],
  ["#42275a", "#734b6d"],
  ["#e96443", "#904e95"],
  ["#2980b9", "#2c3e50"],
  ["#6a3093", "#a044ff"],
  ["#B24592", "#F15F79"],
];

export const getGradientAndTextColor = (uid) => {
  const intUid = getIntFromUid(uid);
  const index = intUid % gradients.length;
  const gradient = gradients[index];
  const textColor = getColorContrastedTextForGradient(gradient);
  return { colors: gradient, textColor: textColor };
};

export const getColorsAndTextColors = (uid) => {
  const intUid = getIntFromUid(uid);
  const index = intUid % gradients.length;
  const gradient = gradients[index];
  const colorLeft = gradient[0];
  const colorRight = gradient[1];

  const textColorLeft = getColorHexFromTextColorOptions(
    getColorContrastedTextForColor(colorLeft)
  );
  const textColorRight = getColorHexFromTextColorOptions(
    getColorContrastedTextForColor(colorRight)
  );
  return {
    left: { color: colorLeft, textColor: textColorLeft },
    right: { color: colorRight, textColor: textColorRight },
  };
};

const getRandomGradient = () => {
  var index = Math.floor(Math.random() * gradients.length);
  return gradients[index];
};

const getColorContrastedTextForGradient = (colorArr) => {
  const textColors = { gray: 0, black: 0, white: 0 };
  const primaryGrayHex = "#6d6e71";

  colorArr.forEach((color) => {
    var textColor = getColorContrastedTextForColor(color, textColors);
    textColors[textColor]++;
  });

  const outputColor = Object.keys(textColors).reduce((a, b) =>
    textColors[a] > textColors[b] ? a : b
  );

  return getColorHexFromTextColorOptions(outputColor);
};

const getColorContrastedTextForColor = (color, textColors) => {
  const primaryGray = _getRGB(primaryGrayHex).color;
  const contrastThreshold = 4.5; //4.5 minimum, 7 is ideally better.
  const lumGray = _relativeLuminance(primaryGray);

  const lumColor = _relativeLuminance(color);
  const lighterColor = Math.max(lumColor, lumGray);
  const darkerColor = Math.max(lumColor, lumGray);

  const contrastRatio = (lighterColor + 0.05) / (darkerColor + 0.05);

  if (contrastRatio >= contrastThreshold) {
    return "gray";
  } else {
    //select between black and white:
    if (lumColor <= 0.1833) {
      return "white";
    } else {
      return "black";
    }
  }
};

const getIntFromUid = (uid) => {
  var output = 0;
  for (var i = 0; i < uid.length; i++) {
    if (i % 2 == 0) {
      output += uid[i].charCodeAt(0);
    } else {
      output -= uid[i].charCodeAt(0);
    }
  }
  return output;
};

const getColorHexFromTextColorOptions = (option) => {
  switch (option) {
    case "gray":
      return "#6d6e71";
    case "white":
      return "#FFFFFF";
    case "black":
      return "#000000";
  }
};
const _relativeLuminance = (color) => {
  //Using relative luminance formula from: https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const sRed = color.r;
  const sGreen = color.g;
  const sBlue = color.b;
  const R =
    sRed <= 0.03928 ? sRed / 12.92 : Math.pow((sRed + 0.055) / 1.055, 2.4);
  const G =
    sGreen <= 0.03928
      ? sGreen / 12.92
      : Math.pow((sGreen + 0.055) / 1.055, 2.4);
  const B =
    sBlue <= 0.03928 ? sBlue / 12.92 : Math.pow((sBlue + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

// from: https://stackoverflow.com/a/38853364
const _getRGB = () => {
  var _hex2dec = function (v) {
    return parseInt(v, 16);
  };

  var _splitHEX = function (hex) {
    var c;
    if (hex.length === 4) {
      c = hex.replace("#", "").split("");
      return {
        r: _hex2dec(c[0] + c[0]),
        g: _hex2dec(c[1] + c[1]),
        b: _hex2dec(c[2] + c[2]),
      };
    } else {
      return {
        r: _hex2dec(hex.slice(1, 3)),
        g: _hex2dec(hex.slice(3, 5)),
        b: _hex2dec(hex.slice(5)),
      };
    }
  };

  var _splitRGB = function (rgb) {
    var c = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")")).split(",");
    var flag = false,
      obj;
    c = c.map(function (n, i) {
      return i !== 3 ? parseInt(n, 10) : (flag = true), parseFloat(n);
    });
    obj = {
      r: c[0],
      g: c[1],
      b: c[2],
    };
    if (flag) obj.a = c[3];
    return obj;
  };

  var color = function (col) {
    var slc = col.slice(0, 1);
    if (slc === "#") {
      return _splitHEX(col);
    } else if (slc.toLowerCase() === "r") {
      return _splitRGB(col);
    } else {
      throw "_getRGBColor.color(" + col + ") : HEX, RGB, or RGBa strings only";
    }
  };

  return {
    color: color,
  };
};
