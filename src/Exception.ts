/**
 * 존재하지 않는 Enum 값을 요청했을 때 발생하는 예외
 * `valueOf()` 메서드에서 유효하지 않은 값을 찾을 경우 발생한다.
 *
 * @example
 * ```typescript
 * const status = UserStatus.valueOf("DELETED"); // `UserStatus.DELETED` 가 존재하지 않음으로 예외 발생
 * ```
 */
export class EnumNotFound extends Error {
  /**
   * @param value - 존재하지 않는 Enum 값
   */
  constructor(value: string) {
    super(`'${value}' is an invalid value in Enum`);
    this.name = "EnumNotFound";
  }
}

/**
 * 유효하지 않은 값이 Enum에 전달되었을 때 발생하는 예외
 * `Enum`의 생성자나 `valueOf()` 메서드에서 `null` 또는 `undefined` 값이 전달되면 발생한다.
 *
 * @example
 * ```typescript
 * const status = UserStatus.valueOf(null); // InvalidEnumValue 예외 발생
 * ```
 *
 * ```typescript
 * class CustomEnum extends Enum {
 *   static readonly OPTION = new CustomEnum(null); // InvalidEnumValue 예외 발생
 * }
 * ```
 */
export class InvalidEnumValue extends Error {
  /**
   * @param value - 유효하지 않은 Enum 값
   */
  constructor(value: unknown) {
    super(`Invalid Enum value: ${value}`);
    this.name = "InvalidEnumValue";
  }
}
