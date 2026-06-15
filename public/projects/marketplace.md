---
slug: marketplace
title: Marketplace
stats: Best Project
platform: Android
description: Cross-platform mobile marketplace with adaptive dark/light theme, Firebase backend, real-time Firestore sync, and full i18n (EN/UK). Built with Expo SDK 54.
tech: Expo · React Native · Firebase · TypeScript · Zod
tags: Mobile, Open Source
github: https://github.com/ihornone/expo-marketplace-practice
install: https://github.com/ihornone/expo-marketplace-practice/releases

accent: "#6055D8"
accentLight: "#6C63FF"
borderRadius: 16
fontFamily: System, sans-serif

darkBg: "#000000"
darkSurface: "#1C1C1E"
darkText: "#FFFFFF"
darkTextSec: "#8E8E93"
darkTextMuted: "#666666"
darkBorder: "#3A3A3C"

lightBg: "#FFFFFF"
lightSurface: "#F8F7F7"
lightText: "#000000"
lightTextSec: "#8E8E93"
lightTextMuted: "#999999"
lightBorder: "#DADCE0"
---

## The Problem
images:
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/LoginScreen-dark.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/searchScreen-dark.jpg

Building a modern marketplace means choosing between costly native development for each platform or sluggish hybrid alternatives. Most solutions lack adaptive theming, feel heavy on mobile, and lock you into a single ecosystem without real-time capabilities.

## The Solution
images:
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/IndexScreen-light.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/ProductDetailsScreen-light.jpg

A cross-platform marketplace delivering native-quality experience on iOS, Android, and Web from a single Expo codebase. Features Firebase-powered real-time sync, seamless checkout flow, push notifications, and a polished adaptive theme that respects system dark/light mode preferences.

## Architecture
images:
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/SettingsScreen-dark.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/ProfileScreen-dark.jpg

Expo Router drives file-based navigation across 14+ screens with auth-guarded routing. Firebase handles authentication, Firestore provides real-time data sync via onSnapshot listeners. State is managed through React Context with custom hooks. Zod schemas ensure type-safe validation from registration to checkout.

## Design System
images:
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/FilterSheet-light.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/ProfileDetailsScreen-light.jpg

A cohesive design system with a purple (#6055D8) accent, 16px border radius on inputs, pill-shaped buttons, and consistent spacing. Every component automatically adapts to system color scheme via useColorScheme. Eight skeleton variants ensure smooth perceived loading across all screens.

## Key Features

### Real-time Sync
Firestore onSnapshot listeners keep products, cart, and orders in sync across devices instantly. No polling, no manual refresh.

### Adaptive Theming
Automatic dark/light mode across all 14+ screens. System color scheme detection with smooth transitions and semantic token system.

### Full i18n
English and Ukrainian translations powered by i18n-js with device locale auto-detection via expo-localization. Hot-switchable without app restart.

### Type-safe Forms
Zod schemas + react-hook-form drive validation from auth to checkout. Shared type inference between validation logic and UI.

### 8 Skeleton Variants
Animated loading skeletons for products, banners, orders, cart rows, form sections, and more — no content flash, smooth perceived performance.

### Push Notifications
Expo Push API + Firebase Cloud Messaging v1 for order updates and promotional alerts. System permission toggle with real-time feedback.

### Auth Flow
Email/password login, Google Sign-In, password reset, and Telegram OIDC. Persistent sessions via AsyncStorage with automatic auth guard routing.

### Promo System
Server-side promo code validation via Firestore. Configurable discount rates and expiration managed through Firebase Console.

## Code

```ts
import { onSnapshot, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export const CartService = {
  subscribe(callback: (items: CartItem[]) => void): Unsubscribe {
    const uid = auth.currentUser?.uid;
    if (!uid) { callback([]); return () => {}; }
    return onSnapshot(doc(db, 'carts', uid), (snapshot) => {
      callback(snapshot.exists() ? (snapshot.data().items ?? []) : []);
    });
  },

  async upsertItem(item: CartItem): Promise<void> {
    const uid = auth.currentUser!.uid;
    const cartRef = doc(db, 'carts', uid);
    const snapshot = await getDoc(cartRef);
    const currentItems: CartItem[] = snapshot.exists()
      ? (snapshot.data().items ?? []) : [];

    const idx = currentItems.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      currentItems[idx].quantity += item.quantity;
    } else {
      currentItems.push(item);
    }

    await setDoc(cartRef, { items: currentItems, updatedAt: serverTimestamp() });
  },
};
```

Real-time Firestore subscription via `onSnapshot` keeps the cart in sync across devices. The `upsertItem` method merges quantities when re-adding an existing product — no duplicates, no data loss.

## Gallery
images:
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/IndexScreen-light.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/ProductDetailsScreen-dark.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/searchScreen-dark.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/FilterSheet-light.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/ProfileScreen-dark.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/NotificationsScreen-light.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/RegisterScreen-dark.jpg
  - https://raw.githubusercontent.com/ihornone/expo-marketplace-practice/main/assets/screenshots/SettingsScreen-light.jpg
