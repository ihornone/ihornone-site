---
slug: ustogether
title: UsTogether
stats: Best Project
platform: iOS · Android
description: Romantic relationship tracker with live second-by-second counter, interactive heart calendar, and adaptive warm theming. Built with Expo SDK 54.
tech: Expo · React Native · TypeScript
tags: Mobile, Open Source
github: https://github.com/ihornone/UsTogetherRNE
install: https://github.com/ihornone/UsTogetherRNE/releases

accent: "#E74C3C"
accentLight: "#E8856A"
borderRadius: 12
fontFamily: System, sans-serif

darkBg: "#121212"
darkSurface: "#1E1C1B"
darkText: "#F0EDE8"
darkTextSec: "#C4A8A0"
darkTextMuted: "#8A7A78"
darkBorder: "#3A3030"

lightBg: "#FFFFFF"
lightSurface: "#FFF5F2"
lightText: "#000000"
lightTextSec: "#E8856A"
lightTextMuted: "#999999"
lightBorder: "#DADCE0"
---

## The Problem
images:
  - https://raw.githubusercontent.com/ihornone/UsTogetherRNE/refs/heads/master/assets/screenshots/OnBoarding.jpg
  - https://raw.githubusercontent.com/ihornone/UsTogetherRNE/refs/heads/master/assets/screenshots/Home.jpg

Most couple apps are bloated with social features, ads, and unnecessary complexity. Finding a simple, private, beautifully crafted tool that counts your relationship time and visualises your love story feels impossible. Existing solutions either lock core features behind paywalls or lack the emotional polish that makes tracking your journey feel special.

## The Solution
images:
  - https://raw.githubusercontent.com/ihornone/UsTogetherRNE/refs/heads/master/assets/screenshots/Calendar.jpg
  - https://raw.githubusercontent.com/ihornone/UsTogetherRNE/refs/heads/master/assets/screenshots/Settings.jpg

A minimalist, ad-free relationship tracker that does one thing beautifully — count every moment of your story. Live second-by-second counter, an interactive heart calendar that fills with red for every day together, and a warm coral-peach design system. No accounts, no cloud, no distractions. Just your love, persistently stored locally with full privacy.

## Architecture

Expo Router drives file-based navigation across four screens with a warm theme provider wrapping the entire stack. Date state flows from Settings → AsyncStorage → Home + Calendar via a simple load-on-mount pattern. The live counter runs on a 1-second setInterval inside useEffect with proper cleanup. Calendar iterates from start year to present, rendering dynamic month grids with responsive day cell sizing based on window dimensions.

## Design System

A cohesive romantic design system anchored by a coral-red (#E74C3C) accent on a soft peach (#FFC6B3) background. StatCards range from 64px hero values to 24px compact metrics, all with 25px border radius and consistent spacing. Calendar month cards use 32px rounded corners with a translucent white surface. The bottom tab bar features haptic feedback on iOS and a warm pink tint matching the overall palette.

## Key Features

### Live Counter
Second-by-second real-time counter computing six metrics — seconds, minutes, hours, days, weeks, months — from a single diffMs value. Updates via setInterval with proper effect cleanup.

### Heart Calendar
Interactive calendar iterating from relationship start to present. Each day renders as a heart: solid red for together-days, peach outline for future, gray outline for pre-relationship past. Three-state visual logic with responsive grid sizing.

### Date Configuration
Five-field input (DD/MM/YYYY HH:mm) with validation and ISO 8601 serialization. Persists via AsyncStorage with immediate reflection across all screens on next load.

### Adaptive StatCard
A reusable component with four size variants — main (64px, full-width), default (48px), ms (24px), and half (responsive half-width). Optional date badge pill for the primary card.

### Haptic Feedback
Native-feeling tab interactions via expo-haptics on iOS. Soft ImpactFeedbackStyle.Light on every tab press, making navigation feel premium and tactile.

### No-Account Privacy
Zero authentication, zero cloud sync, zero data collection. Everything stays on-device via AsyncStorage. No sign-up, no tracking, no servers.

### Responsive Layout
Every screen adapts to any device size using dynamic Dimensions-based calculations. Half-width cards, flexible inputs, and calendar cells all scale proportionally.

### Warm Theming
iOS, Android, and Web share the same romantic palette. System color scheme detection with custom light/dark themes both using the signature peach background.

## Code

```tsx
interface MonthCardProps {
  year: number;
  month: number;
  startDate: Date;
  today: Date;
}

function MonthCard({ year, month, startDate, today }: MonthCardProps) {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const dayOfWeek = firstDayOfMonth.getDay();
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return (
    <View style={styles.monthCard}>
      <Text style={styles.monthTitle}>
        {firstDayOfMonth.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()} {year}
      </Text>
      <View style={styles.daysGrid}>
        {Array.from({ length: offset }).map((_, i) => (
          <View key={`spacer-${i}`} style={styles.dayCell} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const currentDate = new Date(year, month - 1, day);
          return (
            <HeartDayItem
              key={day}
              day={day}
              isLovePeriod={currentDate >= startDate && currentDate <= today}
              isBeforeTogether={currentDate < startDate}
            />
          );
        })}
      </View>
    </View>
  );
}

function HeartDayItem({ day, isLovePeriod, isBeforeTogether }: HeartDayItemProps) {
  const heartColor = isLovePeriod ? '#E74C3C' : isBeforeTogether ? '#DDD' : '#FFD4C4';
  const textColor = isLovePeriod ? '#fff' : '#E8856A';

  return (
    <View style={styles.dayCell}>
      <View style={[styles.heartContainer, { opacity: isLovePeriod ? 1 : 0.3 }]}>
        <Ionicons
          name={isBeforeTogether ? 'heart-outline' : 'heart'}
          size={32}
          color={heartColor}
        />
      </View>
      <Text style={[styles.dayNumber, { color: textColor }]}>{day}</Text>
    </View>
  );
}
```

Three-state heart rendering engine driving the interactive calendar. Day-of-week offset calculation ensures proper grid alignment. Hearts transition through red (together), peach (future), and gray outline (before relationship) — each communicating the relationship timeline at a glance.
