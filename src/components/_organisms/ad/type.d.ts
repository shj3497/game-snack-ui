// TODO 추후 codegen을 했을때 생성된 AdOrder 타입을 사용하도록 변경
export type AdOrder =
  | 'mezzo_video'
  | 'mezzo_interstitial'
  | 'dawin_video'
  | 'adpopcorn_video'
  | 'adpopcorn_interstitial'
  | 'gpt_interstitial'
  | 'gpt_reward'
  | 'pass'; //? 광고 없이 다음 페이지로 이동
