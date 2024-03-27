export const formatBytes = (bytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }
  return `${bytes.toFixed(2)} ${units[index]}`;
};

/**
 * Get the user agent and platform information of the browser.
 * @returns {Object} 包含用户代理和平台信息的对象。
 * @property {string} 浏览器的用户代理字符串。
 * @property {string} platform 浏览器的平台信息。
 *
 * Get the user agent and platform information of the browser.
 * @returns {Object} An object containing user agent and platform information.
 * @property {string} ua The user agent string of the browser.
 * @property {string} platform The platform information of the browser.
 */
export const getBrowserUserAgentAndPlatform = () => {
  return {
    ua: window.navigator.userAgent,
    platform: window.navigator.platform,
  };
};

/**
 * 获取字符串中第一个正则表达式匹配项。
 * @param {RegExp} regExp - 用于匹配的正则表达式。
 * @param {string} str - 需要进行匹配的字符串。
 * @returns {string} 返回第一个匹配项。如果没有匹配项，则返回空字符串。
 *
 * Get the first RegExp match in a string.
 * @param {RegExp} regExp - The RegExp to use for matching.
 * @param {string} str - The string to match against.
 * @returns {string} Returns the first match. If no match, returns an empty string.
 */
export const getFirstRegExpMatch = (regExp: RegExp, str: string) => {
  const match = str.match(regExp);
  return match && match.length ? match[1] : '';
};
