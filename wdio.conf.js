const androidCaps = {
    platformName: 'Android',
    'appium:deviceName': 'emulator-5554', // Use `adb devices` to find your emulator
    'appium:platformVersion': '14', // Your Android version
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'D:/ZellerCustomer/android/app/build/outputs/apk/debug/app-debug.apk', // Path to APK
    'appium:noReset': false,
};

exports.config = {
    runner: 'local',
    specs: ['./e2e-appium/zellerCustomer.test.js'],
    path: '/',
    hostname: '172.20.10.2',
    port: 4723,
    capabilities: [androidCaps],
    framework: 'mocha',
    reporters: [
        ['spec', {
            symbols: {
                passed: '✓',
                failed: '✗',
                pending: '-',
            },
            realtimeReporting: true // Ensures instant logging
        }]
    ],
    maxInstances: 1,
    logLevel: 'error',
    mochaOpts: {
        timeout: 120000,
    },

};


