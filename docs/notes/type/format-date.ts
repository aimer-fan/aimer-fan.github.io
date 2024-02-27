/**
 * 实现一个 Type 类型，用于约束特殊时间格式的字符串
 * FormatDate<"YY-MM-DD">
 *
 * 允许的字符串为:
 *    const data: FormatDate<"YY-MM-DD"> = "2024-01-16" | "2023-12-16" ...
 * 不允许的字符串为:
 *    const data: FormatDate<"YY-MM-DD"> = "2024-01-126" | "2024-13-126" ...
 *
 * 时间格式支持多种分隔符: "-" | "." | "/"
 */

type Splitter = '-' | '/'

type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type Num2 = Num | 0

type YY = `19${Num2}${Num2}` | `20${Num2}${Num2}`

type MM = `0${Num}` | `1${0 | 1 | 2}`

type DD = `${0}${Num}` | `${1 | 2}${Num2}` | `3${0 | 1}`

type GenStr<Type extends string> =
  Type extends 'YY'
    ? YY
    : Type extends 'MM'
      ? MM
      : DD

// eslint-disable-next-line max-len
type FormatDate<Pattern extends string> = Pattern extends `${infer A}${Splitter}${infer B}${Splitter}${infer C}`
  ? Pattern extends `${A}${infer Sp}${B}${infer _}${C}`
    ? `${GenStr<A>}${Sp}${GenStr<B>}${Sp}${GenStr<C>}`
    : never
  : never

export type FormatedDate = FormatDate<'YY/DD/MM'>
