// 길이 L 인 고정 배열 타입
type FixedLengthArray<T, L extends number> = L extends L // 분기용
  ? number extends L // L 이 number(=동적)이면 그냥 T[]
    ? T[]
    : _FixedLengthArray<T, L, []>
  : never;

type _FixedLengthArray<
  T,
  L extends number,
  R extends unknown[],
> = R['length'] extends L ? R : _FixedLengthArray<T, L, [T, ...R]>;

export type {FixedLengthArray};
