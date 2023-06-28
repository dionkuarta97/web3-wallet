import { ethers } from 'ethers';
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

export const formatEmail = (email: string | null) => {
  const emailReg = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.){1,2}[a-zA-Z]{2,}))$/
  );

  if (email !== null) {
    if (emailReg.test(email)) {
      return true;
    } else {
      return false;
    }
  }
};

export function passwordValidations(text: string | null) {
  let validasi: { valid: boolean; error: string[] } = {
    valid: true,
    error: []
  };
  if (text !== null) {
    if (text.length < 8) {
      validasi.valid = false;
      validasi.error.push('minimum 8 letters');
    }
    if (!text.match(new RegExp('[A-Z]'))) {
      validasi.valid = false;
      validasi.error.push('must be capitalized');
    }
    if (!text.match(new RegExp('[a-z]'))) {
      validasi.valid = false;
      validasi.error.push('must contain lowercase letters');
    }
    if (text.search(/[0-9]/) < 0) {
      validasi.valid = false;
      validasi.error.push('there must be a number');
    }
  }
  return validasi;
}

export const displayToken = (balance: string, decimals: number, precision?: number) => {
  if (!balance) return '0';

  const _balance = ethers.utils.formatUnits(balance, decimals);
  console.log({ _balance })
  return toPlainString( 
    parseFloat(Number.parseFloat(_balance).toFixed(precision || 5))
  );
}

function toPlainString(num: number) {
  return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function(a,b,c,d,e) {
      return e < 0
        ? b + '0.' + Array(1-e-c.length).join('0') + c + d
        : b + c + d + Array(e-d.length+1).join('0');
    });
}