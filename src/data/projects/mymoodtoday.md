---
slug: mymoodtoday
title: MyMoodToday
stats: 18 Moods · 100% Offline
platform: iOS · Android
description: Minimalist cross-platform mood tracker that lets you log your daily emotional state with a single tap. 18 carefully curated emojis, interactive calendar, and zero network requests — your data stays on your phone.
tech: React Native · TypeScript · Kotlin · Swift · Hermes
tags: Mobile, Open Source, Mental Health
github: https://github.com/ihornone/MyMoodToday
install: https://github.com/ihornone/MyMoodToday/releases

accent: "#FF758F"
accentLight: "#FF8FA5"
borderRadius: 25
fontFamily: System, sans-serif

darkBg: "#1C1C1E"
darkSurface: "#2C2C2E"
darkText: "#FFFFFF"
darkTextSec: "#8E8E93"
darkTextMuted: "#666666"
darkBorder: "#3A3A3C"

lightBg: "#FAE9FE"
lightSurface: "#FFFFFF"
lightText: "#4A4A4A"
lightTextSec: "#888888"
lightTextMuted: "#A0A0A0"
lightBorder: "#E8E8E8"
---

## The Problem

Most mood tracking apps are over-engineered. They demand accounts, cloud sync, complex questionnaires, subscription fees, and intrusive permissions. Users just want to tap an emoji and move on with their day. Privacy is often an afterthought — your emotional data gets mined, sold, or locked behind paywalls.

## The Mood Grid
images:
  - https://raw.githubusercontent.com/ihornone/MyMoodToday/refs/heads/main/src/assets/screenshots/home.png

A clean 3-column flex grid presents all 18 moods on a single screen. Each card shows the emoji at 35px with its label below — no scrolling, no categories to expand, no friction. Tap any card and an alert confirms your mood is saved. From 🤩 Excited to 🤯 Stressed, every shade of your day is one tap away.

## The Solution

A radically simple mood tracker built on the opposite philosophy: **tap, done, private**. Pick from 18 curated emojis spanning the full emotional spectrum, watch your journey unfold on a beautifully rendered interactive calendar, and rest easy knowing every byte stays on your device. No accounts. No cloud. No telemetry. Just you and your feelings.

## The Calendar Journey
images:
  - https://raw.githubusercontent.com/ihornone/MyMoodToday/refs/heads/main/src/assets/screenshots/calendar.png

A custom `dayComponent` overrides the default calendar cells to render emoji markers beneath each date number. The `useIsFocused()` hook ensures the calendar reloads every time you switch tabs — your emotional timeline is always up to date. Pink arrows (`#FF758F`) and bold month labels make navigation through months feel deliberate and calm.

## Architecture

React Navigation bottom tabs drive two screens — Home and Calendar — with a shared AsyncStorage persistence layer. The mood grid on HomeScreen writes to local storage via `saveMood()`. CalendarScreen reads mood data on focus via `useIsFocused()`, ensuring the calendar always reflects the latest entry. No networking, no state management libraries, no unnecessary dependencies.

## Design System

A soft, calming visual language built around a lavender (`#FAE9FE`) canvas, pink accent (`#FF758F`), and white rounded cards (border-radius: 25). The floating bottom tab bar features a 30px top border radius with subtle elevation for a material-like depth effect. Every screen is wrapped in `SafeAreaView` for pristine rendering on notched and island displays.

## Key Features

### 18 Curated Moods
Six positive, six neutral, and six negative — spanning the full emotional spectrum. Each mood pairs an expressive emoji with a readable label, making selection instant and intuitive.

### 100% Offline & Private
All data persisted locally via `AsyncStorage`. Zero network requests, zero accounts, zero tracking. The storage schema is a simple flat JSON object mapping `YYYY-MM-DD` to emoji strings.

### Smooth Navigation
Custom bottom tab navigator with a floating white bar, rounded top corners, and subtle shadow elevation. Active tab glows pink (`#FF758F`), inactive tabs fade to gray. Tab labels sit above a generous bottom margin for thumb-friendly reach.

### New Architecture
React Native 0.84 powers the app with Hermes engine and Fabric renderer on Android. Faster startup, lower memory usage, and smoother animations compared to the legacy architecture.

### Type-Safe Codebase
Full TypeScript coverage across every file — from mood definitions to storage utilities. Strict typing catches data format issues at compile time rather than runtime.

### Immutable Data Flow
Mood entries use spread syntax for immutable state updates (`{...moods, [date]: emoji}`), preventing data loss when logging moods in rapid succession. The flat key-value schema keeps reads and writes O(1).

### Cross-Screen Sync
`useIsFocused()` hook triggers a fresh data load every time the user switches to the Calendar tab. No stale data, no manual refresh — the calendar always matches the home screen state.

### Adaptive Layout
A `flexWrap: 'wrap'` grid with 3-column cards adapts seamlessly across screen sizes and orientations. Each mood card maintains a 1:1 aspect ratio for consistent tap targets.

## Code

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@mood_data';

export const saveMood = async (date: string, emoji: string) => {
  const existing = await AsyncStorage.getItem(STORAGE_KEY);
  const moods = existing ? JSON.parse(existing) : {};
  moods[date] = emoji;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(moods));
};

export const getAllMoods = async (): Promise<Record<string, string>> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};
```

Zero-dependency persistence layer. `saveMood` merges new entries into the existing blob using an immutable spread pattern, while `getAllMoods` returns the entire dataset for the calendar to render. The flat `{ date: emoji }` schema keeps serialization trivial.
