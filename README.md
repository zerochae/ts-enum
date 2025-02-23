# 🚀 ts-enum - Java-style Enums in TypeScript

A TypeScript Enum library inspired by Java's Enum.  
Provides auto-registration, type safety, and a more structured approach to Enums in TypeScript.

---

## 📌 Features
✅ **Java-like Enum** with static `values()` and `valueOf()` methods  
✅ **Auto-register Enums** without manual configuration  
✅ **Type-safe and strict Enum handling**  
✅ **Removes unwanted `Function` properties** (`apply`, `caller`, `bind`)  

---

## 📦 Installation
You can install `ts-enum` via npm or yarn:

```sh
npm install @zc/tts-enum
# or
yarn add @zc/ts-enum
```

---

## 🛠️ Usage

### 1️⃣ Basic Enum Example
```typescript
// UserStatus.ts
import { Enum, createEnum } from "ts-enum";

export default createEnum(
  class UserStatus extends Enum {
    static readonly ACTIVE = new UserStatus("ACTIVE");
    static readonly INACTIVE = new UserStatus("INACTIVE");

    protected constructor(value: string) {
      super(value);
    }

    isActive() {
      return this === UserStatus.ACTIVE;
    }
  },
);

// another file
import UserStatus from "/my/enum/path/UserStatus"

console.log(UserStatus.values()); 
// ✅ [UserStatus.ACTIVE, UserStatus.INACTIVE]

console.log(UserStatus.valueOf("ACTIVE") === UserStatus.ACTIVE); 
// ✅ true

console.log(UserStatus.ACTIVE.isActive()); 
// ✅ true
```

---

### 2️⃣ Enum with Additional Methods
```typescript
// OrderStatus.ts
import { Enum, createEnum } from "ts-enum";

export default createEnum(
  class OrderStatus extends Enum {
    static readonly PENDING = new OrderStatus("PENDING");
    static readonly COMPLETED = new OrderStatus("COMPLETED");
    static readonly CANCELED = new OrderStatus("CANCELED");

    protected constructor(value: string) {
      super(value);
    }

    isFinalized() {
      return this === OrderStatus.COMPLETED || this === OrderStatus.CANCELED;
    }
  },
);

// use another file
import OrderStatus from "/my/enum/path/OrderStatus"

console.log(OrderStatus.PENDING.isFinalized()); 
// ✅ false

console.log(OrderStatus.COMPLETED.isFinalized()); 
// ✅ true
```

---

## 🎯 API Reference

### `Enum` Base Class
All custom Enums should extend the `Enum` base class.

| Method | Description |
|--------|-------------|
| `Enum.values()` | Returns an array of all Enum instances |
| `Enum.valueOf(value: string)` | Returns the Enum instance corresponding to the given value |
| `Enum.toString()` | Returns the string representation of the Enum value |
| `Enum.equals(other: Enum | string)` | Checks if two Enum values are equal |
| `Enum.strictEquals(other: Enum)` | Strictly compares two Enum instances |

---

## 💡 Why Use `ts-enum`?

| Feature | TypeScript Native `enum` | `ts-enum` |
|---------|------------------|------------|
| Type Safety | ⚠️ Weak (allows any value) | ✅ Strong |
| String-Based Enums | ❌ No | ✅ Yes |
| Methods in Enums | ❌ No | ✅ Yes |
| Auto-Registration | ❌ No | ✅ Yes |
| `values()` / `valueOf()` | ❌ No | ✅ Yes |


---

## 📌 References  
This library was inspired by [class-enum](https://github.com/banlife/class-enum).
