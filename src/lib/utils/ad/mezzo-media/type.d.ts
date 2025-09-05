export type MezzoConfig = {
  publisher: string;
  media: string;
  section: string;
  adid?: string | null;
};
/*
 * https://docs.targetpick.io/java-script-web/banner
 * closeBtnLocation:
 *    1 : 상단 좌측
 *    2 : 상단 중앙
 *    3 : 상단 우측
 *    4 : 중앙 좌측
 *    5 : 중앙 우측
 *    6 : 하단 좌측
 *    7 : 하단 중앙
 *    8 : 하단 우측
 */
export type MezzoInterstitialConfigType = {
  targetId: string; // 광고 노출영역 ID
  // adid: string | null; // adid
  // publisher: string; // 퍼블리셔 코드
  // media: string; // 미디어 코드
  // section: string; // 섹션 코드
  uAgeLevel?: string; // 연령대 '0' : 만 13세 이하, '1' : 만 13세 이상
  keyword?: string;
  closeBtn?: boolean; // 닫기버튼 노출 여부
  closeBtnLocation?: number; // 닫기버튼 위치
  callbacks?: MezzoInterstitialCallbacks;
} & MezzoConfig &
  Record<string, any>;

/*
 * https://docs.targetpick.io/java-script-web/video
 * INJECTION : video 영역(video tag)에 광고를 삽입하는 모드
 * OVERLAY : video 영역이 아닌 영역에 광고를 삽입하는 경우
 */
export type MezzoVideoConfigType = {
  targetId: string; // 고정값인 경우 리터럴 타입 사용
  elementMode?: 'INJECTION' | 'OVERLAY';
  // adid: string | null;
  // publisher: string;
  // media: string;
  // section: string;
  uAgeLevel?: string;
  keyword?: string;
  autoPlay?: boolean;
  autoReplay?: boolean;
  clickFullArea?: boolean;
  clickBtn?: boolean;
  viewability?: boolean;
  muted?: boolean;
  soundBtn?: boolean;
  skipBtn?: boolean;
  closeBtn?: boolean;
  setArea?: boolean;
  postClick?: number;
  callbacks?: MezzoVideoCallbacks;
} & MezzoConfig &
  Record<string, any>;

// https://docs.targetpick.io/java-script-web/banner#callback
export interface MezzoInterstitialCallbacks {
  success?: CallbackSuccess;
  fail?: CallbackFail;
  event?: InterstitialCallbackEvent;
}
export interface MezzoVideoCallbacks {
  success?: CallbackSuccess;
  fail?: CallbackFail;
  event?: VideoCallbackEvent;
}

type CallbackSuccess = (
  type: 'gurantee' | 'house',
  status: number,
  data: any,
) => void;
type CallbackFail = (type: 'noad' | 'error', status: number, data: any) => void;

type InterstitialCallbackEvent = (
  type: InterstitialEventType,
  status: number,
  data: any,
) => void;

type VideoCallbackEvent = (
  type: VideoEventType,
  status: number,
  data: any,
) => void;

type InterstitialEventType =
  | 'adclick' // 광고클릭
  | 'close' // 닫기 클릭
  | 'start' // 영상 시작
  | 'imp' // 영상 노출
  | 'firstQ' // 영상 1/4 재생
  | 'midQ' // 영상 2/4 재생
  | 'thirdQ' // 영상 3/4 재생
  | 'complete'; // 영상 종료

type VideoEventType =
  | 'adclick' // 광고클릭
  | 'close' // 닫기 클릭
  | 'skip' // SKIP 버튼 클릭
  | 'start' // 영상 시작
  | 'imp' // 영상 노출
  | 'firstQ' // 영상 1/4 재생
  | 'midQ' // 영상 2/4 재생
  | 'thirdQ' // 영상 3/4 재생
  | 'complete' // 영상 종료
  | 'objhide' // INJECTION 방식일 때, 매체 video tag 숨김
  | 'objshow' // INJECTION 방식일 때, 매체 video tag 보여줌
  | 'ended' // 광고 종료 ( 광고 후 원본 영상 재생 등 추가 작업시 해당 type 을 이용하여 처리 )
  | 'endcard_start' // 엔드카드 시작
  | 'endcard_imp' // 엔드카드 노출
  | 'endcard_click' // 엔드카드 클릭
  | 'endcard_close'; // 엔드카드 닫기 버튼 클릭

export interface MezzoSdk {
  mezzoAd: (config: MezzoInterstitialConfigType | MezzoVideoConfigType) => void;
}
