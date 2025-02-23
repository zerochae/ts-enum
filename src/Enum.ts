import { InvalidEnumValue } from "./Exception";
import { EnumValidKeys, EnumInstanceType } from "./type";

export default abstract class Enum {
  private readonly value: string;

  /**
   * @param value - Enum의 내부 값 (null 또는 undefined는 허용되지 않음)
   * @throws {InvalidEnumValue} - 값이 null 또는 undefined일 경우 예외 발생
   */
  protected constructor(value: string) {
    if (value === null || value === undefined) {
      throw new InvalidEnumValue(value);
    }
    this.value = value;
  }

  /**
   * 특정 Enum 클래스의 모든 인스턴스를 가져오는 정적 메서드
   * @returns {Record<string, EnumInstanceType<T>>} - Enum 클래스의 모든 static 필드(인스턴스)를 객체로 반환
   */
  private static getEnums<T extends typeof Enum>(this: T): { [key: string]: EnumInstanceType<T> } {
    const classEnums: { [key: string]: EnumInstanceType<T> } = {};

    for (const value of Object.getOwnPropertyNames(this)) {
      if (value === "prototype") continue; // `prototype` 필드는 무시 (클래스 자체의 프로토타입이므로 Enum 인스턴스가 아님)

      const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(this, value);
      if (!descriptor || !("value" in descriptor)) continue; // 필드가 없거나 `value` 속성이 없는 경우 무시

      const enumValue: any = descriptor.value;

      // `enumValue`가 `Enum`의 인스턴스인지 확인하여 필터링
      if (!(enumValue instanceof Enum)) continue;

      classEnums[value] = enumValue as EnumInstanceType<T>;
    }

    return classEnums;
  }

  /**
   * Enum 클래스의 모든 인스턴스를 배열로 반환
   * @returns {EnumInstanceType<T>[]} - 특정 Enum 클래스의 모든 값들을 배열로 반환
   */
  public static values<T extends typeof Enum>(this: T): EnumInstanceType<T>[] {
    return Object.values(this.getEnums());
  }

  /**
   * 특정 값에 해당하는 Enum 인스턴스를 반환
   * @param value - 찾을 Enum의 내부 값
   * @returns {EnumInstanceType<T> | undefined} - 해당하는 Enum 인스턴스
   */
  public static valueOf<T extends typeof Enum>(
    this: T,
    value: EnumValidKeys<T>,
  ): EnumInstanceType<T> | undefined {
    return (this as T).values().find((enumInstance) => enumInstance.toString() === value);
  }

  /**
   * Enum 값이 특정 문자열(value) 또는 다른 Enum 인스턴스와 동일한지 확인
   * @param e - 비교할 대상 (Enum 인스턴스 또는 문자열)
   * @returns {boolean} - 동일한 값이면 true, 그렇지 않으면 false
   */
  public equals(e: Enum | string): boolean {
    return this.value === (typeof e === "string" ? e : e.value);
  }

  /**
   * 엄격 비교 메서드 (다른 Enum과의 값 비교)
   * @param e - 비교할 Enum 인스턴스
   * @returns {boolean} - 값이 동일하면 true, 아니면 false
   * @description `equals()`와 달리 문자열과 비교하지 않고, Enum 인스턴스만 비교할 수 있음
   */
  public strictEquals(e: Enum): boolean {
    return this.value === e.value;
  }

  /**
   * Enum 값을 문자열로 변환
   * @returns {string} - Enum의 내부 값 반환
   */
  public toString(): string {
    return this.value;
  }
}
