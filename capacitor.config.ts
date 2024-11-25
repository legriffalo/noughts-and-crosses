
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "noughts.and.crosses",
  appName: "noughts and crosses",
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      launchFadeOutDuration: 1000,
      backgroundColor: "000000",
      androidSplashResourceName: "splash",
      androidScaleType: "FIT_END",

      // androidScaleType: "CENTER_CROP",
      // showSpinner: true,
      // androidSpinnerStyle: "large",
      // iosSpinnerStyle: "small",
      // spinnerColor: "#999999",
      // splashFullScreen: true,
      // splashImmersive: true,
      // layoutName: "launch_screen",
    },
  }
};

export default config;