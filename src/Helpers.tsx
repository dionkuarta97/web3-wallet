import { Dimensions } from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';

export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;

export const initBackgroundFetch = async (event: () => void) => {
  const status: number = await BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false,
      enableHeadless: true,
      startOnBoot: true,
      // Android options
      forceAlarmManager: true, // <-- Set true to bypass JobScheduler.
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
      requiresCharging: false, // Default
      requiresDeviceIdle: false, // Default
      requiresBatteryNotLow: false, // Default
      requiresStorageNotLow: false // Default
    },
    async (taskId: string) => {
      console.log('[BackgroundFetch] taskId', taskId);
      // Create an Event record.
      await event();
      BackgroundFetch.finish(taskId);
      BackgroundFetch.stop(taskId);
    },
    (taskId: string) => {
      // Oh No!  Our task took too long to complete and the OS has signalled
      // that this task must be finished immediately.
      console.log('[Fetch] TIMEOUT taskId:', taskId);
      BackgroundFetch.finish(taskId);
    }
  );
};
export const scheduleTask = () => {
  BackgroundFetch.scheduleTask({
    taskId: 'com.arise',
    delay: 0,
    periodic: true,
    forceAlarmManager: true
  })
    .then(() => {})
    .catch((error) => {});
};
