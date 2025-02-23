import Enum from "./Enum";
import { EnumValidKeys, EnumRegistry, EnumInstanceMap, EnumInstanceType } from "./type";

/**
 * Enum 클래스의 `static` 필드에서 Enum 인스턴스만 추출하여 객체로 반환
 * @param EnumClass - `Enum`을 상속하는 클래스
 * @returns Enum 인스턴스를 포함하는 객체
 */
function getEnumInstance<T extends typeof Enum>(EnumClass: T): EnumRegistry<T> {
  const enumInstances = {} as EnumInstanceMap<T>;

  for (const key of Object.keys(EnumClass) as (keyof T)[]) {
    if (["values", "valueOf", "prototype"].includes(String(key))) continue;

    const enumClassTyped = EnumClass;

    if (enumClassTyped[key] instanceof Enum) {
      enumInstances[key] = enumClassTyped[key] as EnumInstanceType<T>;
    }
  }

  return { ...enumInstances } as EnumRegistry<T>;
}

/**
 * Enum 객체에 동적으로 메서드를 정의하는 함수
 * @param enumObject - 대상 Enum 객체
 * @param methodName - 추가할 메서드 이름
 * @param method - 메서드 구현
 */
function defineEnumMethod<T>(enumObject: T, methodName: string, method: Function) {
  Object.defineProperty(enumObject, methodName, {
    value: method,
    enumerable: false,
    configurable: false,
    writable: false,
  });
}

/**
 * Enum 클래스를 기반으로 Enum 객체를 생성하는 함수
 * @param EnumClass - `Enum`을 상속하는 클래스
 * @returns Enum 인스턴스를 포함하는 객체
 */
export function createEnum<T extends typeof Enum>(EnumClass: T): EnumRegistry<T> {
  const enumInstance = getEnumInstance(EnumClass);

  defineEnumMethod(enumInstance, "values", function () {
    return EnumClass.values();
  });

  defineEnumMethod(enumInstance, "valueOf", function (value: EnumValidKeys<T>) {
    return EnumClass.valueOf(value);
  });

  return Object.freeze(enumInstance);
}
