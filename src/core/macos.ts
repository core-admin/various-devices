import { get } from 'http';
import { getBrowserUserAgentAndPlatform, getFirstRegExpMatch } from '../utils';
import { getEnv } from './basic';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';

const parseMacOSVersion = (_version?: string) => {
  let version = getFirstRegExpMatch(/Mac OS X (\d+(\.?_?\d+)+)/i, UA);
  console.log(version);
};

parseMacOSVersion();

const isBrowserOnMacOS = () => {
  const { platform, ua } = getBrowserUserAgentAndPlatform();
  const macPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];

  // This API is still in the experimental stage, and support varies across different browsers (https://caniuse.com/?search=NavigatorUAData).
  if ('userAgentData' in window.navigator && window.navigator.userAgentData) {
    return (window.navigator.userAgentData as any).platform === 'macOS';
  }

  if (platform && macPlatforms.indexOf(platform) !== -1) {
    return true;
  }

  return /macintosh|mac os x/i.test(ua);
};

/**
 * Check if the current environment is MacOS.
 * 检查当前环境是否为MacOS。
 *
 * @returns {boolean} Returns true if the current environment is MacOS, false otherwise.
 * 如果当前环境是MacOS，则返回true，否则返回false。
 * @throws {Error} Throws an error when an exception occurs while retrieving platform information in the Node environment, or executing in the WebWorker environment.
 * 当在Node环境中获取平台信息或在WebWorker环境执行时发生异常将抛出对应的错误信息。
 */
export const isMacOS = () => {
  const env = getEnv();

  if (env === 'browser') {
    return isBrowserOnMacOS();
  }

  if (env === 'node') {
    try {
      return require('os').platform() === 'darwin';
    } catch (error) {
      throw new Error(
        'An exception occurred when retrieving platform information from the os module in the Node environment: ',
        {
          cause: error,
        },
      );
    }
  }

  if (env === 'webworker') {
    try {
      return isBrowserOnMacOS();
    } catch (error) {
      throw new Error('An exception occurred in the WebWorker environment: ', {
        cause: error,
      });
    }
  }

  return false;
};
