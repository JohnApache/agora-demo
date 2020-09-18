import AgoraRTC, { Client, Stream } from 'agora-rtc-sdk';
import { IAudioDeviceInfo, IVideoDeviceInfo } from './types';

interface IInitOptions {
  appId: string;
  channel: string;
  token: string;
  uid?: number;
}

export const isCarmeraKind = (kind: string) => kind === 'videoinput' 

export const getDevices = (): Promise<[IAudioDeviceInfo[], IVideoDeviceInfo[]]> => {
  return new Promise(resolve => {
    AgoraRTC.getDevices(devices => {
      const result = devices.reduce((prev, cur) => {
        const kindIndex = ['audioinput', 'videoinput'].indexOf(cur.kind);
        if(kindIndex !== -1) {
          const defaultKindName = isCarmeraKind(cur.kind) ? `camera-${prev[kindIndex].length}` : `microphone-${prev[kindIndex].length}`
          prev[kindIndex].push({
            name: cur.label || defaultKindName,
            value: cur.deviceId,
            kind: cur.kind,
          })
        } 
        return prev;
      }, [[], []] as [IAudioDeviceInfo[], IVideoDeviceInfo[]]) 
      
      resolve(result)
    })
  })
}

export const initRTCClient = (rtcClient: Client, options: IInitOptions) => {
    return new Promise((resolve, reject) => {
      rtcClient.init(options.appId, () => {
        resolve();
      }, (err) => reject(err));
    })
}

export const joinRTCClient = (rtcClient: Client, options: IInitOptions): Promise<string|number> => {
    return new Promise((resolve, reject) => {
      rtcClient.join(options.token || null, options.channel, options.uid || null, (uid) => {
        resolve(uid);
      }, (err) => {
        reject(err);
      })
    })
}

export const leaveRTCClient = (rtcClient: Client) => {
  
    return new Promise((resolve, reject) => {
      rtcClient.leave(() => {
        resolve();
      }, (err) => {
        reject(err);
      })
    })
}

export const initLocalStream = (localStream: Stream) => {
    return new Promise((resolve, reject) => {
      localStream.init(() => resolve(), (err) => reject(err));
    })
}


export {
    AgoraRTC
}