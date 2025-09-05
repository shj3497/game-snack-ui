import {AdPopcornEventListeners} from '.';

export const adPopcornEventMap: Record<string, keyof AdPopcornEventListeners> =
  {
    sdkError: 'sdkError',
    adInventoryRendered: 'adInventoryRendered',
    adClicked: 'adClicked',
    adClosed: 'adClosed',
    adClickthrough: 'adClickthrough',
    adPlaybackCompleted: 'adPlaybackCompleted',
    adLoadCompleted: 'adLoadCompleted',
  };
