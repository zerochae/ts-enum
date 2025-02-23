export type EnumInstanceType<T> = T extends { prototype: infer R } ? R : never;
export type EnumInstanceMap<T> = { [K in keyof T]: EnumInstanceType<T> };
export type EnumRegistry<T> = Omit<EnumInstanceMap<T>, "prototype"> & {
  values(): EnumInstanceType<T>[];
  valueOf(value: EnumValidKeys<T>): EnumInstanceType<T>;
};
export type EnumValidKeys<T> = Exclude<keyof T, "values" | "valueOf" | "prototype">;
