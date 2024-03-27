export interface MacOsSystemInfo {
  platform: 'macos';
  arch: string;
  os: {
    version: string;
    versionName: string;
  };
}
