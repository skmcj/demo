export type RGB = {
  /** 红色通道值 0-255 */
  r: number;
  /** 绿色通道值 0-255 */
  g: number;
  /** 蓝色通道值 0-255 */
  b: number;
  /** 不透明度 0-1 */
  a?: number;
};

export type HSL = {
  /** Hue 色相值 0-360 */
  h: number;
  /** 饱和度 0-100 */
  s: number;
  /** 亮度 0-100 */
  l: number;
};

export type HSV = {
  /** Hue 色相值 0-360 */
  h: number;
  /** 饱和度 0-100 */
  s: number;
  /** 明度 0-100 */
  v: number;
};

export type CMYK = {
  /** 靛青比例 0-100 */
  c: number;
  /** 品红比例 0-100 */
  m: number;
  /** 黄色比例 0-100 */
  y: number;
  /** 黑色比例 0-100 */
  k: number;
};

export type HSI = {
  /** 色调 0-360 */
  h: number;
  /** 饱和度 0-100 */
  s: number;
  /** 亮度 0-100 */
  i: number;
};

export type LAB = {
  /** 亮度 [0-100] */
  l: number;
  /** 从红到绿的范围 [-128 - 127] */
  a: number;
  /** 从黄到蓝的范围 [-128 - 127] */
  b: number;
};

export type XYZ = {
  x: number;
  y: number;
  z: number;
};

export type HEX = string;

const XN = 0.950456;
const YN = 1;
const ZN = 1.088754;

/**
 * RGB 转为 HSL
 * @param {number} r [0-255]红色通道值
 * @param {number} g [0-255]绿色通道值
 * @param {number} b [0-255]蓝色通道值
 * @return {HSL} 返回转换的 hsl 值
 */
export const rgbToHsl = function (r: number, g: number, b: number): HSL {
  r = r / 255; // [0, 1]
  g = g / 255; // [0, 1]
  b = b / 255; // [0, 1]

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  const l = (max + min) / 2;
  const s = d === 0 ? 0 : l > 0.5 ? d / (2 - 2 * l) : d / (2 * l);

  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h = h / 6;
  }
  return {
    h: toFixed(h * 360),
    s: toFixed(s * 100),
    l: toFixed(l * 100)
  };
};

/**
 * RGB 转为 HSV
 * @param {number} r [0-255]红色通道值
 * @param {number} g [0-255]绿色通道值
 * @param {number} b [0-255]蓝色通道值
 * @return {HSV} 返回转换的 hsv 值
 */
export const rgbToHsv = function (r: number, g: number, b: number): HSV {
  r = r / 255; // [0, 1]
  g = g / 255; // [0, 1]
  b = b / 255; // [0, 1]

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  const v = max;
  const s = max === 0 ? 0 : d / max;

  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h = h / 6;
  }
  return {
    h: toFixed(h * 360),
    s: toFixed(s * 100),
    v: toFixed(v * 100)
  };
};

/**
 * HSV 转 HSL
 * @param {number} h Hue 色相值 [0-360]
 * @param {number} s 饱和度 [0-100]
 * @param {number} v 明度 [0-100]
 * @return {HSL} 转换的 HSL 值
 */
export const hsvToHsl = function (h: number, s: number, v: number): HSL {
  const t = ((200 - s) * v) / 100;
  s = v === 0 || s === 0 ? 0 : (s * v) / (t > 100 ? 200 - t : t);
  return {
    h: toFixed(h),
    s: toFixed(s),
    l: toFixed(t / 2)
  };
};

/**
 * HSL 转 HSV
 * @param {number} h Hue 色相值 [0-360]
 * @param {number} s 饱和度 [0-100]
 * @param {number} l 亮度 [0-100]
 * @return {HSV} 转换的 HSV 值
 */
export const hslToHsv = function (h: number, s: number, l: number): HSV {
  let v = 0;
  if (s === 0) {
    v = l;
  } else if (l > 50) {
    v = l + (s * (100 - l)) / 100;
    s = v === 0 ? 0 : (200 * s * (100 - l)) / (v * 100);
  } else {
    v = (l * (s + 100)) / 100;
    s = v === 0 ? 0 : (200 * s) / (s + 100);
  }
  return {
    h: toFixed(h),
    s: toFixed(s),
    v: toFixed(v)
  };
};

/**
 * HSL 转 RGB
 * @param {number} h Hue 色相值 [0-360]
 * @param {number} s 饱和度 [0-100]
 * @param {number} l 亮度 [0-100]
 * @return {RGB} 转换的 RGB 值
 */
export const hslToRgb = function (h: number, s: number, l: number): RGB {
  h = h / 360; // [0, 1]
  s = s / 100; // [0, 1]
  l = l / 100; // [0, 1]

  let r = l;
  let g = l;
  let b = l;
  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }
  return {
    r: toFixed(r * 255, 0),
    g: toFixed(g * 255, 0),
    b: toFixed(b * 255, 0)
  };
};

/**
 * HSV 转 RGB
 * @param {number} h Hue 色相值 [0-360]
 * @param {number} s 饱和度 [0-100]
 * @param {number} v 明度 [0-100]
 * @return {RGB} 转换的 RGB 值
 */
export const hsvToRgb = function (h: number, s: number, v: number): RGB {
  h = h / 360; // [0, 1]
  s = s / 100; // [0, 1]
  v = v / 100; // [0, 1]
  h = h < 1 ? h * 6 : 0; // [0, 6)
  const mod = Math.floor(h); // {0, 1, 2, 3, 4, 5}
  const f = h - mod;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];
  return {
    r: toFixed(r * 255, 0),
    g: toFixed(g * 255, 0),
    b: toFixed(b * 255, 0)
  };
};

/**
 * RGB 转为 HEX
 * @param {number} r [0-255]红色通道值
 * @param {number} g [0-255]绿色通道值
 * @param {number} b [0-255]蓝色通道值
 * @param {boolean} ad 是否带 # ，默认带有
 * @return {HEX} 返回转换的 hex 值
 */
export const rgbToHex = function (r: number, g: number, b: number, ad: boolean = true): HEX {
  if (ad) return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  else return `${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/**
 * HEX 转 RGB
 * @param {string} hex hex 16进制颜色值
 * @return {RGB} 返回转换的 RGB 值
 */
export const hexToRgb = function (hex: string): RGB {
  if (hex.charAt(0) === '#') {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = `${hex.charAt(0)}${hex.charAt(0)}${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}`;
  }
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  };
};

/**
 * RGB 转为 CMYK
 * @param {number} r [0-255]红色通道值
 * @param {number} g [0-255]绿色通道值
 * @param {number} b [0-255]蓝色通道值
 * @return {CMYK} 返回转换的 cmyk 值
 */
export const rgbToCmyk = function (r: number, g: number, b: number): CMYK {
  let c = (255 - r) / 255;
  let m = (255 - g) / 255;
  let y = (255 - b) / 255;
  let k = Math.min(c, m, y);
  if (k === 1) {
    c = m = y = 0;
  } else {
    let kk = 1 - k;
    c = (c - k) / kk;
    m = (m - k) / kk;
    y = (y - k) / kk;
  }
  return {
    c: toFixed(c * 100, 0),
    m: toFixed(m * 100, 0),
    y: toFixed(y * 100, 0),
    k: toFixed(k * 100, 0)
  };
};

/**
 * CMYK 转 RGB
 * @param c [0-100]靛青比例
 * @param m [0-100]品红比例
 * @param y [0-100]黄色比例
 * @param k [0-100]黑色比例
 * @return {RGB} 返回转换的 rgb 值
 */
export const cmykToRgb = function (c: number, m: number, y: number, k: number): RGB {
  return {
    r: toFixed((255 * (100 - c) * (100 - k)) / 10000, 0),
    g: toFixed((255 * (100 - m) * (100 - k)) / 10000, 0),
    b: toFixed((255 * (100 - y) * (100 - k)) / 10000, 0)
  };
};

/**
 * RGB 转为 HSI
 * @param {number} r [0-255]红色通道值
 * @param {number} g [0-255]绿色通道值
 * @param {number} b [0-255]蓝色通道值
 * @return {HSI} 返回转换的 hsi 值
 */
export const rgbToHsi = function (r: number, g: number, b: number): HSI {
  let fz = 0.5 * (r + r - g - b);
  let fm = Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
  // 加上 EPS ，防止分母为零
  let h = (Math.acos(fz / (fm + Number.EPSILON)) * 180) / Math.PI;
  if (b > g) h = 360 - h;
  let i = (r + g + b) / 3;
  let min = Math.min(r, g, b);
  let s = 1 - min / i;
  return {
    h: toFixed(h),
    s: toFixed(s * 100),
    i: toFixed((i / 255) * 100)
  };
};

/**
 * HSI 转 RGB
 * @param {number} h Hue 色相值 [0-360]
 * @param {number} s 饱和度 [0-100]
 * @param {number} i 亮度 [0-100]
 * @return {RGB} 转换的 RGB 值
 */
export const hsiToRgb = function (h: number, s: number, i: number): RGB {
  s = s / 100; // [0-1]
  i = (i / 100) * 255; // [0-255]
  let r = 0,
    g = 0,
    b = 0;
  if (h < 120) {
    b = i * (1 - s);
    r = i * (1 + (s * Math.cos(toRadian(h))) / Math.cos(toRadian(60 - h)));
    g = 3 * i - r - b;
  } else if (h < 240) {
    h = h - 120;
    r = i * (1 - s);
    g = i * (1 + (s * Math.cos(toRadian(h))) / Math.cos(toRadian(60 - h)));
    b = 3 * i - r - g;
  } else if (h < 360) {
    h = h - 240;
    g = i * (1 - s);
    b = i * (1 + (s * Math.cos(toRadian(h))) / Math.cos(toRadian(60 - h)));
    r = 3 * i - g - b;
  }
  return {
    r: toFixed(r, 0),
    g: toFixed(g, 0),
    b: toFixed(b, 0)
  };
};

/**
 * RGB 转为 XYZ
 * @param {number} r [0-255]红色通道值
 * @param {number} g [0-255]绿色通道值
 * @param {number} b [0-255]蓝色通道值
 * @return {XYZ} 返回转换的 xyz 值
 */
export const rgbToXyz = function (r: number, g: number, b: number): XYZ {
  // 归一化
  r = r / 255;
  g = g / 255;
  b = b / 255;

  r = gammaL(r);
  g = gammaL(g);
  b = gammaL(b);

  let x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  let y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  let z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;
  return {
    x,
    y,
    z
  };
};

/**
 * XYZ 转 LAB
 * @param x
 * @param y
 * @param z
 */
export const xyzToLab = function (x: number, y: number, z: number): LAB {
  // 归一化
  x = x / XN;
  y = y / YN;
  z = z / ZN;

  x = ftXL(x);
  y = ftXL(y);
  z = ftXL(z);

  let l = 116 * y - 16;
  let a = 500 * (x - y);
  let b = 200 * (y - z);
  return {
    l,
    a,
    b
  };
};

/**
 * RGB 转为 LAB
 * @param {number} r [0-255]红色通道值
 * @param {number} g [0-255]绿色通道值
 * @param {number} b [0-255]蓝色通道值
 * @return {LAB} 返回转换的 Lab 值
 */
export const rgbToLab = function (r: number, g: number, b: number): LAB {
  let xyz = rgbToXyz(r, g, b);
  let lab = xyzToLab(xyz.x, xyz.y, xyz.z);
  return {
    l: toFixed(lab.l),
    a: toFixed(lab.a),
    b: toFixed(lab.b)
  };
};

/**
 * LAB 转 XYZ
 * @param {number} l 亮度 [0-100]
 * @param {number} a 从红到绿的范围 [-128 - 127]
 * @param {number} b 从黄到蓝的范围 [-128 - 127]
 * @return {XYZ} 返回转换的 xyz 值
 */
export const labToXyz = function (l: number, a: number, b: number): XYZ {
  // 线性变换
  let y = (l + 16) / 116;
  let x = a / 500 + y;
  let z = y - b / 200;
  // 非线性变换
  x = ftLX(x);
  y = ftLX(y);
  z = ftLX(z);
  // 反归一化
  x = x * XN;
  y = y * YN;
  z = z * ZN;
  return {
    x,
    y,
    z
  };
};

/**
 * XYZ 转 RGB
 * @param x
 * @param y
 * @param z
 * @return {RGB} 返回转换的 rgb 值
 */
export const xyzToRgb = function (x: number, y: number, z: number): RGB {
  let r = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
  let g = -0.969266 * x + 1.8760108 * y + 0.041556 * z;
  let b = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;

  r = gammaR(r);
  g = gammaR(g);
  b = gammaR(b);

  return {
    r: toFixed(r * 255, 0),
    g: toFixed(g * 255, 0),
    b: toFixed(b * 255, 0)
  };
};

/**
 * LAB 转 RGB
 * @param {number} l 亮度 [0-100]
 * @param {number} a 从红到绿的范围 [-128 - 127]
 * @param {number} b 从黄到蓝的范围 [-128 - 127]
 * @return {RGB} 返回转换的 rgb 值
 */
export const labToRgb = function (l: number, a: number, b: number): RGB {
  let xyz = labToXyz(l, a, b);
  return xyzToRgb(xyz.x, xyz.y, xyz.z);
};

/**
 * ============= 工具函数 =============
 */

/**
 * RGB 值分类
 * @param {number} r [0-255]红色通道值
 * @param {number} g [0-255]绿色通道值
 * @param {number} b [0-255]蓝色通道值
 * @return {number} 返回的类别编号
 *  - 0 - 红，1 - 橙，2 - 黄，3 - 绿，4 - 青，5 - 蓝，6 - 紫，7 - 白，8 - 灰，9 - 黑
 */
export const cateColorOfRgb = function (r: number, g: number, b: number): number {
  const { h, s, l } = rgbToHsl(r, g, b);
  return cateColorOfHsl(h, s, l);
};

/**
 * HSL 值分类
 * @param {number} h Hue 色相值 [0-360]
 * @param {number} s 饱和度 [0-100]
 * @param {number} l 亮度 [0-100]
 * @return {number} 返回的类别编号
 *  - 0 - 红，1 - 橙，2 - 黄，3 - 绿，4 - 青，5 - 蓝，6 - 紫，7 - 白，8 - 灰，9 - 黑
 */
export const cateColorOfHsl = function (h: number, s: number, l: number): number {
  if (l <= 20) return 9; // 黑
  else if (l <= 85) {
    if (s < 20) return 8; // 灰
    else {
      if (h < 26) return 0; // 红
      else if (h < 50) return 1; // 橙
      else if (h < 70) return 2; // 黄
      else if (h < 165) return 3; // 绿
      else if (h < 190) return 4; // 青
      else if (h < 265) return 5; // 蓝
      else if (h < 320) return 6; // 紫
      else return 0; // 红
    }
  } else return 7; // 白
};

/**
 * 保留指定小数位
 * @param {number} n 需要处理的数
 * @param {number} unit 保留的位数
 * @param {boolean} ad 是否四舍五入，默认四舍五入
 * @return {number} 返回值
 */
export const toFixed = function (n: number, unit: number = 2, ad: boolean = true): number {
  let flag = false;
  let tu = 1;
  let num = n;
  if (num < 0) {
    flag = true;
    num = -num;
  }
  while (unit > 0) {
    num *= 10;
    tu *= 10;
    unit -= 1;
  }
  if (ad) {
    num += 0.5;
  }
  num = ~~num;
  if (flag) num = -num;
  return num / tu;
};

/**
 * 将色相值转换为RGB值
 */
function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
  return p;
}

/**
 * 角度转弧度
 * @param angle 角度
 * @return {number} 弧度
 */
function toRadian(angle: number) {
  return (angle * Math.PI) / 180;
}

/**
 * XYZ 转 LAB 的非线性变换
 * @param {number} t x, y, z的值
 */
function ftXL(t: number): number {
  // Math.pow(29 / 6, 2) / 3 = 7.787037037037035
  // 16 / 116 = 0.13793103448275862
  if (t > 0.008856) {
    return Math.pow(t, 1 / 3);
  } else {
    return 7.787037037037035 * t + 0.13793103448275862;
  }
}

/**
 * LAB 转 XYZ 的非线性变换
 * @param t x, y, z的值
 */
function ftLX(t: number): number {
  // t > 6 / 29
  if (t > 0.20689655172413793) {
    return Math.pow(t, 3);
  } else {
    return (t - 0.13793103448275862) * 0.12841854934601665;
  }
}

/**
 * gamma变换
 * @param x r, g, b值
 */
function gammaL(x: number) {
  return x > 0.04045 ? Math.pow((x + 0.055) / 1.055, 2.4) : x / 12.92;
}

/**
 * gamma变换
 * @param x r, g, b值
 */
function gammaR(x: number) {
  return x > 0.0031308 ? 1.055 * Math.pow(x, 1 / 2.4) - 0.055 : x * 12.92;
}
