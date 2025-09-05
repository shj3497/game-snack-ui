export type DawinSdk = {
  initAd: (config: DawinAdConfig) => void;
  setVolume: () => void;
  startAd: () => void;
  stopAd: () => void;
};

export type DawinConfig = {
  adslotid: string; // 매체별로 전달 되는 slot id
};

/*
 * target : 광고 재생 영역으로 <video> 태그를 지정 할 경우 <video> 태그의 정보를 저장하였다가
 * 광고 재생이 끝나면 저장했던 정보를 다시 복원. <video> 태그가 아닐 경우 <video> 태그를 생성하여 광
 * 고를 재생하고 삭제
 */

export type DawinAdConfig = {
  // adslotid: string; // 매체별로 전달 되는 slot id
  target: string; // 광고 재생 영역
  videoTimeout?: number; // 광고 로딩 지연이 발생하는 경우 대기 시간 설정. ms 단위로 설정
  zindex?: number; // 광고 재생 영역의 Z-index 를 변경 ( 기본 : 1000 )
  muted?: boolean; // 브라우저 정책에 의해 자동 재생이 안되는 경우, true 로 설정하여 음소거된 상태에서 자동 재생 (기본 : false)
  callback?: DawinAdCallbacks;
  protocol?: 'http' | 'https'; // 광고 호출 프로토콜 (기본 : http)
} & DawinConfig;

// 공통 : Session Key를 텍스트 인자로 전달
export interface DawinAdCallbacks {
  onAdLoaded?: (key: string) => void; // initAd 후 광고 보기가 가능한 시점에 호출, 광고가 있을 경우에만 호출
  onAdVideoStarted?: (key: string) => void; // 광고 동영상 재생이 시작 된 시점에 호출
  onAdVideoFirstQuartile?: (key: string) => void; // 광고 동영상 재생이 1/4 진행 된 시점에 호출
  onAdVideoMidpoint?: (key: string) => void; // 광고 동영상 재생이 1/2 진행 된 시점에 호출
  onVideoThirdQuartile?: (key: string) => void; // 광고 동영상 재생이 3/4 진행 된 시점에 호출
  onAdVideoComplete?: (key: string) => void; // 광고 동영상 재생이 완료 된 시점에 호출
  onAdVideoProgress?: (key: string) => void; // 광고 동영상 재생이 15초 되는 시점에 호출, 광고 재생 시간이 15초 보다 작을 경우 15초 보다 일찍 호출 될 수 있음.
  onAdClickThru?: (
    click: 'Action' | 'Brand' | 'VideoClick',
    key: string,
  ) => void; // 광고 동영상 재생 중 광고주 랜딩 버튼이 클릭 된 경우 호출
  onAdSkipped?: (key: string) => void; // 광고 동영상 재생 중 Skip 버튼이 클릭이 되어 종료 되는 경우 호출
  onAdStoped?: (key: string) => void; // 광고 동영상 재생이 중지 되는 경우 호출
  onAdSkippableStateChange?: (key: string) => void; // Skip 버튼이 노출 되는 시점에 호출
  onAdError?: (error: string, key: string) => void; // 광고 보기 에러 or 광고없음 일 경우 호출, error: '서버접속오류', '광고없음', '입력 데이터 오류' 등 다윈 광고가 없을 경우 '광고없음' 으로 호출 됨
}
