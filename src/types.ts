export interface IDeviceInfoItem {
    name: string,
    value: string,
    kind: string
}
  
export interface IAudioDeviceInfo extends IDeviceInfoItem {};
export interface IVideoDeviceInfo extends IDeviceInfoItem {};

export interface IResolutionsItem {
    name: string;
    value: string;
}