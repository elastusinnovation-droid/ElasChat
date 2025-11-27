# ElasChat Design Guidelines

## Authentication Flow

**Auth Required**: Yes - social video platform with user accounts, follows, messaging, and content sync.

### Implementation:
- **Primary**: Email/phone signup with verification
- **SSO Options**: Google Sign-In, Apple Sign-In (required for iOS App Store)
- **Onboarding Flow**:
  1. Welcome screen: "Welcome to ElasChat — make short videos, share stories, and discover local creators"
  2. Birthdate collection (age gate - block under 13 per legal requirements)
  3. Account creation (email/phone + password OR SSO)
  4. Profile setup (username, display name, avatar, bio)
  5. Privacy settings selection
  6. Optional: Follow suggested creators
- **Auth Screens**: Login, Sign up, Forgot password, Terms & Privacy Policy links (required at signup)
- **Account Management**: Located in Settings > Account (email, phone, change password, logout, delete account with double confirmation)

## Navigation Architecture

### Root Navigation: Bottom Tab Bar (5 tabs)

1. **Home** (Video feed icon) → Vertical feed stack
2. **Discover** (Magnifying glass) → Search/trends stack  
3. **Create** (Center FAB, record icon - PRIMARY ACTION)
4. **Messages** (Chat bubble) → Messages stack
5. **Profile** (User circle) → Profile stack

**Center FAB Specifications**:
- Elevated above tab bar
- Primary color (#1E88E5) with subtle drop shadow (shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2)
- 56px diameter minimum touch target
- Opens Record/Create modal when tapped

## Screen Specifications

### Home Screen (Vertical Feed)
**Purpose**: Primary video consumption experience

**Header** (Transparent):
- Left: ElasChat logo (small)
- Center: Tab selector (Following | For You | Nearby) with active underline
- Right: Upload icon, Notification bell

**Layout**:
- Full-screen vertical video cards (one per view)
- Swipeable (up/down) with smooth transitions
- Infinite scroll with pagination

**Safe Area Insets**: 
- Top: headerHeight + Spacing.xl
- Bottom: tabBarHeight + Spacing.xl

**Components**:
- VerticalVideoCard with overlays:
  - Right sidebar: Profile pic, Follow button, Like (heart + count), Comment (bubble + count), Share (arrow + count), More (⋯)
  - Bottom left: @username, sound title (♪), caption with #hashtags
  - Bottom center: Video progress bar

### Discover Screen
**Purpose**: Search and trending content discovery

**Header** (Non-transparent):
- Search bar: "Search users, hashtags, sounds"
- Trending hashtag chips (#fun, #mbala, #fyp)

**Layout**:
- ScrollView root
- 2-column video thumbnail grid
- Each thumbnail shows play overlay + like count

**Safe Area Insets**:
- Top: Spacing.xl
- Bottom: tabBarHeight + Spacing.xl

### Create/Record Screen (Native Modal)
**Purpose**: Video recording and editing

**Camera Interface**:
- Header: Flash toggle, Camera flip, Timer
- Center: Large record button (tap to start/stop, hold for continuous)
- Left: Duration indicator (0:00 / 0:15)
- Right: Effects icons
- Bottom: Upload from gallery, Add music, Filters, Speed, Timer

**Edit Screen** (after recording):
- Video preview with trim handles
- Bottom sheet tools: Add text, Stickers, Filters, Voiceover, Cover frame picker

**Post Screen**:
- Scrollable form with submit in header
- Caption input (with hashtag suggestions)
- Tag people
- Privacy selector: Public / Friends / Private (segmented control)
- Allow duets toggle
- Header buttons: "Save to Drafts" (left), "Post" (right, primary color)

**Safe Area Insets**:
- Full-screen camera: Use insets.top and insets.bottom directly
- Form screens: Standard insets with Spacing.xl padding

### Profile Screen
**Purpose**: User identity and content showcase

**Header** (Transparent over cover):
- Left: Back button (if not self)
- Right: More (⋯) menu (settings for self, report for others)

**Layout**:
- ScrollView root
- Cover area (optional background)
- Avatar (120px, 6px corner radius)
- Display name, @handle, Bio text
- Follow/Edit Profile button
- Stats row: Posts | Followers | Following (tappable)
- Tabs: Videos | Liked
- 3-column video thumbnail grid below tabs

**Safe Area Insets**:
- Top: Transparent header, use headerHeight + Spacing.xl
- Bottom: tabBarHeight + Spacing.xl

### Messages Screen
**Purpose**: Direct messaging

**List View**:
- Header: Search messages input
- Chat preview cards: Avatar, name, last message, timestamp, unread badge
- Swipe actions: Delete, Archive

**Chat View** (Stack navigation):
- Header: Avatar, name, More (⋯)
- Message bubbles (sender right/blue, recipient left/gray)
- Bottom: Input bar with attach video/GIF, send button
- Message reactions (tap and hold)

**Safe Area Insets**:
- List: Standard with tab bar
- Chat input: Bottom inset should be insets.bottom + Spacing.xl (keyboard-aware)

### Notifications Screen (Modal)
**Purpose**: Activity feed

**Layout**:
- List of activity items (likes, comments, follows, mentions)
- Each row: Avatar, username, action text, thumbnail (if video-related), timestamp
- Tappable to navigate to content/profile

### Settings Screen
**Purpose**: Account and privacy management

**Layout**:
- Scrollable grouped list
- Sections: Account, Privacy, Safety, About
- Account: Email, phone, change password
- Privacy: Account visibility, messages from, block list
- Safety: Report, community guidelines
- About: Terms, logout (red destructive button)

## Design System

### Color Palette
**Dark Mode (Default)**:
- Background: #0F0F10
- Text: #FFFFFF
- Surface/Cards: #1A1A1C (slightly elevated)

**Light Mode (Alternative)**:
- Background: #FFFFFF
- Text: #111827
- Surface/Cards: #F9FAFB

**Brand Colors**:
- Primary: #1E88E5 (bright blue) - CTAs, record accents, active states
- Accent: #FF6B6B (warm coral) - likes, alerts, warnings
- Secondary actions: #6B7280 (gray)

### Typography (Inter Font Family)
- **Headings**: Inter Bold, 18-20pt
- **Body**: Inter Regular, 14pt
- **UI Labels**: Inter Medium, 12-13pt
- **Captions**: Inter Regular, 12pt

### Component Styling
- **Corner Radius**: 12px buttons/cards, 6px avatars, 24px input fields
- **Buttons**: 48px minimum height, 24px minimum touch target
- **Icons**: 24px size, simple line style (Feather icons)
- **Shadows**: Use sparingly - only for FAB and elevated modals
  - FAB shadow: shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2
- **Visual Feedback**: All touchable elements should show pressed state (opacity: 0.7 or scale: 0.95)

### Motion & Transitions
- Vertical swipe: Smooth 300ms ease-out
- Follow/Like: Subtle bounce animation (scale 1.0 → 1.15 → 1.0)
- Modal sheets: Slide up from bottom with backdrop fade
- Tab transitions: Crossfade 200ms

## Reusable Components

1. **VerticalVideoCard**: Full-screen video with overlay UI, action buttons, user info
2. **BottomTabBar**: 5-tab navigation with elevated center FAB
3. **Modal Sheet**: Comment threads, share options, settings panels
4. **Chip**: Rounded pill for trending hashtags (background: surface color, border: 1px solid #6B7280)
5. **ProfileCard**: Compact user card (avatar + username + follow button)
6. **Composer**: Text input with hashtag autocomplete suggestions

## UX Microcopy

- Empty feed: "Nothing here yet. Follow creators or explore Discover."
- Post success: "Your video was posted!" (toast notification)
- Follow confirmation: "You're now following @username"
- Error states: Friendly, actionable messages (e.g., "Couldn't load videos. Pull to retry.")

## Privacy & Safety Requirements

- **Reporting**: Every video and profile must have Report option in More (⋯) menu
- **Blocking**: Available on all user profiles
- **Privacy Settings**: Account visibility (Public/Private), message controls
- **Age Gate**: Required birthdate collection at signup
- **Community Guidelines**: Link accessible from Settings > Safety
- **Moderation Tools**: Flag system for inappropriate content

## Accessibility

- Minimum touch targets: 44x44pt (iOS) / 48x48dp (Android)
- Color contrast: WCAG AA compliance (4.5:1 for body text)
- Video captions: Support for user-added text overlays
- Screen reader labels: All icons and interactive elements must have accessible labels
- Haptic feedback: On significant actions (like, follow, post)