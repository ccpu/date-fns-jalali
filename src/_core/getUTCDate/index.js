import { toJalali } from '../../_jalali/index.js'

/**
 *
 * @param cleanDate {Date}
 * @returns {number}
 */
export default function getUTCDate(cleanDate) {
  const gd = cleanDate.getUTCDate()
  const gm = cleanDate.getUTCMonth() + 1
  const gy = cleanDate.getUTCFullYear()
  return toJalali(gy, gm, gd).jd
}
