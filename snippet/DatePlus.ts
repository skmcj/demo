// 年 | 月 | 季 | 日 | 时 | 分 | 秒 | 毫秒
type DateUnit = 'y' | 'M' | 'q' | 'd' | 'h' | 'm' | 's' | 'ms';

/**
 * Date 增强类
 * @extends Date
 */
class DatePlus extends Date {
  /**
   * 是否闰年
   * @param year 年份
   * @returns {boolean}
   */
  static isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  /**
   * 获取指定月份的天数，考虑闰年
   * @param month
   * @param year
   * @returns {number}
   */
  static daysInMonth(month: number, year?: number): number {
    if (!year) year = new Date().getFullYear();
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // 如果是 2 月并且是闰年
    if (month === 1 && DatePlus.isLeapYear(year)) {
      return 29;
    }
    return monthDays[month];
  }

  /**
   * 计算日期时间差
   * @param start
   * @param end
   * @returns {number}
   */
  static betweenDays(start: Date | DatePlus, end: Date | DatePlus): number {
    // 保证 end > start
    if (start > end) return DatePlus.betweenDays(end, start);
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    let totalDays = 0;
    // 开始月份天数
    totalDays += DatePlus.daysInMonth(start.getMonth(), startYear) - start.getDate();
    if (startYear === endYear) {
      // 同年

      // 同月
      if (start.getMonth() === end.getMonth()) {
        // 由于 end > start
        // 即 endMOnth > startMonth
        totalDays = -start.getDate();
      } else {
        for (let m = start.getMonth() + 1; m < end.getMonth(); m++) {
          totalDays += DatePlus.daysInMonth(m, startYear);
        }
      }
    } else {
      // 累计开始年天数
      for (let m = start.getMonth() + 1; m < 12; m++) {
        totalDays += DatePlus.daysInMonth(m, startYear);
      }
      // 累计结束年天数
      for (let m = 0; m < end.getMonth(); m++) {
        totalDays += DatePlus.daysInMonth(m, endYear);
      }
      // 累计中间年天数
      for (let y = startYear + 1; y < endYear; y++) {
        totalDays += DatePlus.isLeapYear(y) ? 366 : 365;
      }
    }
    // 结束月份天数
    totalDays += end.getDate();

    return totalDays;
  }

  /**
   * 返回直观月份值
   * @returns {number} [1-12]的月份值
   */
  getMonthFixed(): number {
    return this.getMonth() + 1;
  }

  /**
   * 计算分钟数增量
   * @param seconds 分钟数增量，可为负数
   * @returns {DatePlus} 一个新对象，为当前对象指定分钟数增量后的值
   */
  calcSecond(seconds: number): DatePlus {
    const date = new Date(this.valueOf());
    date.setSeconds(date.getSeconds() + seconds);
    return new DatePlus(date);
  }

  /**
   * 计算分钟数增量
   * @param minutes 分钟数增量，可为负数
   * @returns {DatePlus} 一个新对象，为当前对象指定分钟数增量后的值
   */
  calcMinute(minutes: number): DatePlus {
    const date = new Date(this.valueOf());
    date.setMinutes(date.getMinutes() + minutes);
    return new DatePlus(date);
  }

  /**
   * 计算小时数增量
   * @param hours 小时数增量，可为负数
   * @returns {DatePlus} 一个新对象，为当前对象指定小时数增量后的值
   */
  calcHour(hours: number): DatePlus {
    const date = new Date(this.valueOf());
    date.setHours(date.getHours() + hours);
    return new DatePlus(date);
  }

  /**
   * 计算天数增量
   * @param days 天数增量，可为负数
   * @returns {DatePlus} 一个新对象，为当前对象指定天数增量后的值
   */
  calcDay(days: number): DatePlus {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return new DatePlus(date);
  }

  /**
   * 计算月份增量
   * @param months 月份增量，可为负数
   * @returns {DatePlus} 一个新对象，为当前对象指定月份增量后的值
   */
  calcMonth(months: number): DatePlus {
    const date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + months);
    return new DatePlus(date);
  }

  /**
   * 计算年份增量
   * @param years 年份增量，可为负数
   * @returns {DatePlus} 一个新对象，为当前对象指定年份增量后的值
   */
  calcYear(years: number): DatePlus {
    const date = new Date(this.valueOf());
    date.setFullYear(date.getFullYear() + years);
    return new DatePlus(date);
  }

  /**
   * 获取月末日期对象
   * @param {boolean} flag 是否清除时间
   * @returns {DatePlus}
   */
  lastDayOfMonth(flag?: boolean): DatePlus {
    let date = new Date(this.valueOf());
    if (flag) {
      date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    }
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return new DatePlus(date);
  }

  /**
   * 获取月初日期对象
   * @param {boolean} flag 是否清除时间
   * @returns {DatePlus}
   */
  firstDayOfMonth(flag?: boolean): DatePlus {
    let date = new Date(this.valueOf());
    if (flag) {
      date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    }
    date.setDate(1);
    return new DatePlus(date);
  }

  /**
   * 格式化日期
   * @param {string} fmt 格式化字符串
   * @desc
   *   - y: 年，M: 月，d: 日
   *   - h: 时(12)，H: 时(24)，m: 分，s: 秒，i: 毫秒
   *   - q: 季度，a: 上午|下午，A: AM|PM
   *   - w: 星期(EN)，W: 星期(CN)
   *   - 例：'yyyy-MM-dd W' = '1970-01-01 星期四'
   * @returns {string} 格式化后的日期字符串
   */
  format(fmt: string): string {
    const re = /(y+)/;
    if (re.test(fmt)) {
      const t = re.exec(fmt)![1];
      fmt = fmt.replace(t, (this.getFullYear() + '').substring(4 - t.length));
    }
    const CW = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const EW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const o: Record<string, string | number> = {
      'M+': this.getMonth() + 1, // 月
      'd+': this.getDate(), // 日
      'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时[12]
      'H+': this.getHours(), // 小时[24]
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'i+': this.getMilliseconds(), // 毫秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      a: this.getHours() < 12 ? '上午' : '下午', // 上午/下午
      A: this.getHours() < 12 ? 'AM' : 'PM', // AM/PM
      w: EW[this.getDay()],
      W: CW[this.getDay()]
    };
    for (let k in o) {
      const regx = new RegExp('(' + k + ')');
      if (regx.test(fmt)) {
        const t = regx.exec(fmt)![1];
        fmt = fmt.replace(t, t.length === 1 ? `${o[k]}` : `000${o[k]}`.slice(t.length * -1));
      }
    }
    return fmt;
  }

  /**
   * 计算时间差
   * @param another 另一个世界
   * @param unit 单位(默认为d)
   *  - y - 年
   *  - M - 月
   *  - q - 季
   *  - d - 天
   *  - h - 时
   *  - m - 分
   *  - s - 秒
   *  - ms - 毫秒
   * @returns {number} 时间差结果
   */
  diff(another: Date | DatePlus, unit: DateUnit = 'd'): number {
    // 保证 another > this
    if (this.getTime() > another.getTime()) return new DatePlus(another).diff(this, unit);
    const thisYear = this.getFullYear();
    const anotherYear = another.getFullYear();

    // 计算粗略单位时间差
    let years = anotherYear - thisYear;
    let months = another.getMonth() - this.getMonth();
    let days = another.getDate() - this.getDate();
    let hours = another.getHours() - this.getHours();
    let minutes = another.getMinutes() - this.getMinutes();
    let seconds = another.getSeconds() - this.getSeconds();

    // 处理秒、分、时的借位
    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }

    // 处理天数的借位
    if (days < 0) {
      const prevMonth = (another.getMonth() - 1 + 12) % 12; // 获取前一个月
      const daysInPrevMonth = DatePlus.daysInMonth(prevMonth, anotherYear);
      days += daysInPrevMonth;
      months--;
    }

    // 处理月份的借位
    if (months < 0) {
      months += 12;
      years--;
    }

    let res: number;
    // 根据单位返回时间差
    switch (unit) {
      case 'y':
        res = years;
        break;
      case 'M':
        res = years * 12 + months;
        break;
      case 'q':
        res = Math.floor((years * 12 + months) / 3);
        break;
      case 'd':
        res = DatePlus.betweenDays(this, another);
        break;
      case 'h':
        res = DatePlus.betweenDays(this, another) * 24 + hours;
        break;
      case 'm':
        res = (DatePlus.betweenDays(this, another) * 24 + hours) * 60 + minutes;
        break;
      case 's':
        res = ((DatePlus.betweenDays(this, another) * 24 + hours) * 60 + minutes) * 60 + seconds;
        break;
      case 'ms':
        res = another.getTime() - this.getTime();
        break;
      default:
        throw new Error('Unsupported unit');
    }
    return res;
  }
}

// test
/*
(function () {
  const start = new DatePlus();
  // const end = new DatePlus(1687478444237);
  const end = new DatePlus(1707523244237);
  // const end = new DatePlus(1727395244237);
  console.log(`start: ${start.format('yyyy-MM-dd(第q季度) W/a HH:mm:ss:iii')}`);
  console.log(`end: ${end.format('yyyy-MM-dd(第q季度) W/a HH:mm:ss:iii')}`);
  console.log(`时间差: ${end.diff(start, 'y')} 年`);
  console.log(`时间差: ${start.diff(end, 'M')} 月`);
  console.log(`时间差: ${end.diff(start)} 天`);
  console.log(`时间差: ${end.diff(start, 'h')} 时`);
  console.log(`时间差: ${end.diff(start, 'm')} 分`);
  console.log(`时间差: ${end.diff(start, 's')} 秒`);
  console.log(`时间差: ${end.diff(start, 'ms')} 毫秒`);
  const date = new DatePlus(1706745644237);
  console.log(`Date: ${date.format('yyyy-MM-dd W/a HH:mm:ss')}`);
  console.log(`前一天: ${date.calcDay(-1).format('yyyy-MM-dd W/a HH:mm:ss')}`);
  console.log(`后31天: ${date.calcDay(31).format('yyyy-MM-dd W/a HH:mm:ss')}`);
  console.log(`月末: ${date.lastDayOfMonth(true).format('yyyy-MM-dd W/a HH:mm:ss')}`);
  console.log(`后一月: ${date.calcMonth(1).format('yyyy-MM-dd W/a HH:mm:ss')}`);
  console.log(`后22时: ${date.calcHour(22).format('yyyy-MM-dd W/a HH:mm:ss')}`);
})();
*/
