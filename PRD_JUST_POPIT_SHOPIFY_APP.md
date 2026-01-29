# Product Requirements Document: Just PopIt - Shopify Pop-ups App

**Version:** 1.0
**Last Updated:** January 29, 2026
**Product Manager:** [Your Name]
**Status:** Draft for Development

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Goals](#2-product-vision--goals)
3. [Success Metrics](#3-success-metrics)
4. [User Personas](#4-user-personas)
5. [Functional Requirements](#5-functional-requirements)
6. [Technical Architecture](#6-technical-architecture)
7. [Data Models & Google Sheets Schema](#7-data-models--google-sheets-schema)
8. [API Specifications](#8-api-specifications)
9. [Validation Rules & Edge Cases](#9-validation-rules--edge-cases)
10. [Integration Requirements](#10-integration-requirements)
11. [Phased Implementation Plan](#11-phased-implementation-plan)
12. [Testing Checkpoints](#12-testing-checkpoints)

---

## 1. Executive Summary

**Just PopIt** is a no-code Shopify app that enables merchants to create, configure, and manage custom pop-ups for their Online Store 2.0 themes. The app provides a comprehensive trigger system, condition builder, pop-up studio, and A/B testing capabilities to maximize customer engagement and conversions.

### Key Differentiators
- **Advanced Condition Builder**: Visual, no-code interface for complex trigger logic
- **Google Sheets as Database**: Cost-effective, accessible data storage eliminating need for paid databases
- **Template Library**: 3+ pre-built templates for instant deployment
- **Experiment Framework**: Built-in A/B testing for triggers, content, and design
- **Guardrail-Led Validation**: Comprehensive validation preventing merchant errors

### Primary Use Cases
1. **Promotional Pop-ups** (Nth visit, seasonal, time-based)
2. **User Onboarding** (sign-up, social media follow)
3. **Data Collection** (profile forms, preferences)
4. **Referral & Credits** (referral info display)
5. **Gamification** (interactive events)
6. **App Download Prompts**
7. **Navigation** (collection/page redirection)
8. **FTUE Tutorials** (first-time user experience)
9. **Cookie Consent** (preferences management)
10. **Product Discovery** (comparison, quick filters)
11. **Urgency & FOMO** (exit intent, cart abandonment, discount timers)
12. **Inventory Alerts** (OOS, price drops, discounts)
13. **Social Proof** (product highlights, urgency)
14. **Cart Optimization** (confirmation, cross-sell)
15. **Payment Authorization** (PG confirmation pop-ups)

---

## 2. Product Vision & Goals

### Vision Statement
"Empower Shopify merchants to create highly targeted, non-intrusive pop-up experiences that drive engagement and conversions without requiring technical expertise."

### Business Goals
- **Table Stakes Compliance**: Match core features of competitors (Privy, Pop Convert, Wisepops)
- **Content Spotlighting**: Enable temporal and contextual content highlighting
- **Growth Lever Integration**: Serve as display medium for other marketing tools

### Product Principles
1. **Trigger-Based Initiation**: All pop-ups activated by specific, measurable conditions
2. **Integration-Led**: Seamless connection with Shopify ecosystem and third-party tools
3. **Platform/Page Agnostic**: Works across desktop, mobile web, and all page types
4. **Lean Development**: Start with MVP, iterate based on merchant feedback
5. **Guardrail-Led Design**: Prevent merchant errors through proactive validation

### Customer Value Proposition
- **Improved/Mandatory Engagement**: Capture attention without layout interference
- **Minimized Layout Interference**: Overlay approach preserves page design
- **High Impact/Effort Ratio**: No-code tools for maximum flexibility

---

## 3. Success Metrics

### North Star Metric
**Pop-up Conversion Rate**: % of pop-up impressions that result in desired action (email capture, cart addition, etc.)

### Primary Metrics
| Metric | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|
| Active Installations | 100 | 500 |
| Pop-ups Created per Merchant | 3 | 5 |
| Average Pop-up CTR | 3-5% | 5-7% |
| Pop-up Attributed Revenue per Merchant | $500/mo | $1,500/mo |
| Merchant Retention Rate (MRR) | 70% | 80% |

### Secondary Metrics
- Template Usage Rate: 60%+ merchants use pre-built templates
- Experiment Adoption: 40%+ merchants run A/B tests
- Integration Usage: 50%+ merchants connect to Klaviyo/SMS tools
- Support Ticket Volume: <10 tickets per 100 merchants/month

---

## 4. User Personas

### Primary Persona: "Marketing Manager Maya"
- **Role**: Marketing Manager at D2C fashion brand (500-1000 orders/month)
- **Tech Savvy**: Medium (can use Shopify admin, email tools)
- **Pain Points**:
  - Needs to run frequent promotions without developer help
  - Wants to A/B test messaging
  - Struggles with exit intent and cart abandonment
- **Goals**: Increase email list by 20%, reduce cart abandonment by 15%
- **Preferred Features**: Templates, exit-intent triggers, A/B testing

### Secondary Persona: "Solo Founder Sam"
- **Role**: Founder/Operator of beauty brand (50-200 orders/month)
- **Tech Savvy**: Low (basic Shopify knowledge)
- **Pain Points**:
  - Limited budget for paid tools
  - No time to learn complex software
  - Needs quick wins
- **Goals**: Build email list, promote new product launches
- **Preferred Features**: Simple templates, one-click setup, visual editor

### Tertiary Persona: "Agency Alex"
- **Role**: Shopify agency managing 20+ client stores
- **Tech Savvy**: High (developer, can write custom code)
- **Pain Points**:
  - Needs white-label capabilities
  - Requires bulk configuration
  - Wants advanced targeting
- **Goals**: Efficiently manage pop-ups across multiple stores
- **Preferred Features**: Advanced conditions, custom CSS, API access

---

## 5. Functional Requirements

### 5.1 Pop-up Creation & Management

#### 5.1.1 Pop-up Dashboard
**Description**: Central interface for viewing, creating, and managing all pop-ups.

**Requirements**:
- **FR-PCM-001**: Display all pop-ups in a table view with columns:
  - Pop-up Name
  - Status (Draft, Active, Paused, Archived)
  - Type (Banner, Form, Custom)
  - Impressions (Last 7 days)
  - CTR (Last 7 days)
  - Last Modified Date
  - Actions (Edit, Duplicate, Archive, View Analytics)

- **FR-PCM-002**: Provide filters for:
  - Status (All, Active, Paused, Draft, Archived)
  - Type (All, Banner, Form, Custom)
  - Date Range (Last 7/30/90 days, Custom)

- **FR-PCM-003**: Enable search by pop-up name

- **FR-PCM-004**: Support bulk actions:
  - Activate/Pause multiple pop-ups
  - Archive multiple pop-ups
  - Duplicate pop-ups

- **FR-PCM-005**: Display quick stats card:
  - Total Active Pop-ups
  - Total Impressions (Last 30 days)
  - Average CTR
  - Total Conversions

#### 5.1.2 Pop-up Creation Flow
**Description**: Step-by-step wizard for creating new pop-ups.

**Requirements**:
- **FR-PCM-006**: Implement 5-step wizard:
  1. **Select Template/Type**
  2. **Configure Triggers** (Display & Dismissal)
  3. **Design Pop-up** (Content & Style)
  4. **Set Experiments** (Optional A/B testing)
  5. **Review & Publish**

- **FR-PCM-007**: Allow "Save as Draft" at any step

- **FR-PCM-008**: Show progress indicator (Step X of 5)

- **FR-PCM-009**: Enable "Quick Create" mode for template-based pop-ups (skip step 3)

#### 5.1.3 Pop-up Status Management
**Requirements**:
- **FR-PCM-010**: Support 4 statuses:
  - **Draft**: Not visible on storefront
  - **Active**: Visible and triggering based on conditions
  - **Paused**: Temporarily disabled, can be reactivated
  - **Archived**: Soft-deleted, preserves analytics data

- **FR-PCM-011**: Validate before activation:
  - At least one display trigger configured
  - At least one dismissal trigger configured
  - Valid content (no empty required fields)
  - No conflicting z-index with other active pop-ups

- **FR-PCM-012**: Auto-pause pop-ups after 90 days of inactivity (configurable)

---

### 5.2 Template System

#### 5.2.1 Pre-built Templates
**Description**: 3 production-ready templates for instant deployment.

**Requirements**:
- **FR-TS-001**: Provide **3 core templates**:
  1. **Banner Display Pop-up**
     - Use Case: Promotional announcements, free shipping alerts
     - Layout: Full-width top/bottom bar
     - Default Triggers: Page load (3 seconds delay)
     - Default Content: Text + CTA button
     - Customizable: Background color, text, CTA text/link

  2. **Email Capture Form Pop-up**
     - Use Case: Newsletter signup, discount code giveaway
     - Layout: Center modal (400px x 500px)
     - Default Triggers: Exit intent OR 30% scroll depth
     - Default Content: Headline, subtext, email input, submit button
     - Customizable: All text, button color, background image

  3. **Gamification Wheel Pop-up** (Spin-to-Win)
     - Use Case: Interactive discount reveal
     - Layout: Center modal (500px x 600px)
     - Default Triggers: First-time visitor + 10 seconds on site
     - Default Content: Spinning wheel, email input (post-spin), prize reveal
     - Customizable: Wheel segments (6 prizes), colors, email requirement

- **FR-TS-002**: Display template preview on selection screen

- **FR-TS-003**: Allow "Start from Template" with full customization

- **FR-TS-004**: Enable "Save as Template" for custom pop-ups (merchant-level only)

#### 5.2.2 Template Library UI
**Requirements**:
- **FR-TS-005**: Display templates as cards with:
  - Template name
  - Preview image/GIF
  - Use case description
  - "Use Template" button

- **FR-TS-006**: Filter templates by:
  - Use Case (Promotion, Email Capture, Gamification, Exit Intent, etc.)
  - Layout Type (Full-screen, Modal, Banner, Sidebar)

---

### 5.3 Trigger System

#### 5.3.1 Display Triggers
**Description**: Conditions that activate pop-up display.

**Trigger Categories & Requirements**:

##### A. Session-Based Triggers

**FR-TS-007: Source-Based Triggers**
- **Referral Source**:
  - Ad Campaign (Meta, Google, UTM parameters)
    - UTM Source (e.g., `utm_source=facebook`)
    - UTM Medium (e.g., `utm_medium=cpc`)
    - UTM Campaign (e.g., `utm_campaign=summer_sale`)
  - Organic (search engine referral)
  - Direct (no referrer)
  - P2P Referral (custom referral links)
  - Offline (QR code campaigns)

- **Landing Page Based**:
  - Page Type: Home, PLP (Product Listing), PDP (Product Detail), Cart, Checkout, Thank You, Blog, Account, Custom Pages
  - URL Contains: Specific collection handle, product handle, page path
  - URL Exact Match: `/collections/summer-collection`

- **Platform Type**:
  - Desktop (screen width > 1024px)
  - Mobile Web (screen width ≤ 1024px)
  - Tablet (screen width 768-1024px)

- **Browser Type**:
  - Chrome, Firefox, Safari, Edge, Other
  - Version detection (e.g., Safari < 15 for compatibility warnings)

- **Multi-Tab Browsing**:
  - Detect multiple tabs open (same session ID across tabs)
  - Use Cases: Product comparison pop-ups, price change alerts, inventory callouts

- **Saved Cookie Preferences**:
  - Marketing cookies accepted/declined
  - Analytics cookies accepted/declined
  - Custom cookie values (e.g., `returning_customer=true`)

**FR-TS-008: Visit Time-Based Triggers**
- Time Zone (auto-detect or manual selection)
- Time of Day (e.g., 9 AM - 5 PM)
- Day of Week (Monday - Sunday, Weekdays, Weekends)
- Peak Shopping Hours (configurable by merchant, e.g., 6 PM - 9 PM)
- Season/Holiday Period (Christmas, Black Friday, Summer, etc.)
- Specific Discount Running (detect active discount codes from Shopify)

**FR-TS-009: Page Visit-Based Triggers**
- Current URL (exact match or contains)
- Previous URL (track navigation history)
- Previous Widget Slug (if using page builder)
- URL Query Parameters (e.g., `?ref=email`)
- Product View Sequence (2nd product viewed, 5th product viewed)
- Category Browse Pattern (viewed 3+ products in "Shoes" category)
- Search Term Patterns (searched for "red dress")
- Filter Usage Patterns (used price filter, used size filter)
- Sort Preference (sorted by price, sorted by popularity)
- Price Range Browsing (viewing products $50-$100)
- Brand Affinity (viewing specific brand repeatedly)
- Size Selection Pattern (selected "Large" 3+ times)
- Style/Color Preference (viewed "minimalist" or "red" items)
- Review Reading Pattern (clicked reviews on 2+ products)
- Social Proof Interaction (viewed "X people bought this")
- Page Type:
  - Home page
  - Collection page
  - Product page
  - Search results
  - Login/Signup
  - Account page
  - Blog
  - Checkout
  - Thank you page
  - Policy pages (Terms, Privacy, Shipping, Returns)
  - Contact us
  - About us

**FR-TS-010: User Action-Based Triggers**
- **Scroll Depth**: 25%, 50%, 75%, 100% (configurable)
- **Mouse Behavior**:
  - Hover over specific element (by CSS selector)
  - Long press (> 2 seconds)
  - Mouse idle for X seconds (configurable)
  - Multiple clicks on same element
  - Mouse exit intent (moving towards close button/back button)
- **Cart Actions**:
  - Add to cart
  - Remove from cart
  - Update cart quantity
  - Apply discount code
  - Proceed to checkout
- **Wishlist Actions**:
  - Add to wishlist
  - Remove from wishlist
- **Product Interactions**:
  - Product quick view opened
  - Image gallery interaction (zoom, swipe)
  - Size chart view
  - Variant selection (color, size)
  - Video play
- **Filter/Sort Usage**:
  - Applied filter
  - Used sort dropdown
- **Search Interactions**:
  - Search bar focus
  - Search submitted
  - Search results viewed
- **Review Interactions**:
  - "Write a review" button clicked
  - Review UGC viewed
  - Star rating clicked
- **Form Interactions**:
  - Form field focus
  - Form field blur (exited without submitting)
  - Form submission
  - Form error
- **Navigation**:
  - Preview click (if pop-up preview exists)
  - Website exit button clicked
  - Back button pressed

**FR-TS-011: Cart-Based Triggers**
- Cart Value Threshold:
  - Greater than $X
  - Less than $X
  - Between $X and $Y
- Basket Size Threshold:
  - Number of items > X
  - Number of items < X
  - Specific item count
- Discount Applicability:
  - Cart qualifies for discount X
  - Cart does NOT qualify (show incentive to add more)
- Shipping Threshold Proximity:
  - $X away from free shipping
  - Qualifies for free shipping
- Cart Line Items:
  - Specific product in cart (by product ID)
  - Product from specific collection in cart
  - Low inventory item in cart
- Payment Method Selection (at checkout):
  - Selected payment method = X

**FR-TS-012: User Cohort-Based Triggers**
- **User History**:
  - First-time visitor (no session cookie)
  - Returning visitor (has session cookie)
  - Nth visit (2nd, 5th, 10th visit)
  - Time since last visit (> 7 days, > 30 days)
  - Previous purchase history (purchased before, never purchased)
  - Order count (1st order, 2nd order, VIP with 5+ orders)
- **User Behavior Patterns**:
  - Product price range affinity ($0-$50, $50-$100, etc.)
  - Brand affinity (frequently views Brand X)
  - Color preference (frequently views red items)
  - Style preference (minimalist, maximalist)
  - Seasonal shopping pattern (buys in summer, winter)
  - Social proof affinity (clicks "X people bought" frequently)
  - Feature usage history (used size chart, used reviews)
- **User Preferences**:
  - Cookie preference (marketing accepted/declined)
  - Email subscription status (subscribed, unsubscribed)
  - SMS subscription status
  - Payment preference (PayPal, Credit Card)
  - Shipping preference (Express, Standard)
- **User Profile**:
  - Geolocation (country, region, city)
  - Missing profile info (no email, no phone)
  - Coupon usage history (used coupons before, never used)
  - Customer tags (from Shopify)

**FR-TS-013: Time-Based Triggers**
- Seconds after page load (configurable, 0-60 seconds)
- Total time on site (across all pages in session)
- Inactive time (no mouse movement/scroll for X seconds)
- X seconds after dismissal of previous pop-up (prevents spam)

**FR-TS-014: Product-Based Triggers**
- Low Inventory:
  - Inventory count < X units
  - Last few items (e.g., "Only 3 left!")
- Previously Purchased:
  - User previously purchased this product
  - User previously purchased from this collection
- Product Attributes:
  - Belongs to category/type/tag X
  - Has discount code applicable
  - Is on sale (compare_at_price > price)
  - Is new arrival (created_at within last X days)
  - Is bestseller (top 10% by sales)

**FR-TS-015: Pop-up Impression-Based Triggers**
- **Session Impression**:
  - User has seen pop-up X times this session
  - User has NOT seen pop-up this session
- **User Impression**:
  - User has seen pop-up X times total (across all sessions)
  - User has never seen pop-up

**FR-TS-016: Series Triggers**
- Trigger Pop-up B after Pop-up A is dismissed
- Trigger Pop-up C after action in Pop-up B (e.g., form submission)
- Conditional series: If user clicks "Yes" in Pop-up A, show Pop-up B; if "No", show Pop-up C

#### 5.3.2 Dismissal Triggers
**Description**: Conditions that close/hide the pop-up.

**FR-TS-017: Time-Based Dismissal**
- Auto-dismiss after X seconds (configurable)
- Countdown timer completion (e.g., "Offer expires in 60 seconds")

**FR-TS-018: Click-Based Dismissal**
- Click on close button (X icon)
- Click outside modal (on overlay)
- Click on specific element in background (by CSS selector)

**FR-TS-019: Keyboard-Based Dismissal**
- ESC key press
- Enter/Return key press
- Any key press (for accessibility)

**FR-TS-020: Navigation-Based Dismissal**
- Page change detected (SPA or hard navigation)
- Navigation to specific URL (e.g., dismiss when user goes to checkout)

**FR-TS-021: State Change Dismissal**
- Profile successfully updated
- Product successfully added:
  - To order (post-purchase upsell)
  - To cart
  - To wishlist
- Product successfully removed:
  - From cart
  - From wishlist
- Promo code:
  - Successfully applied
  - Successfully copied to clipboard
- Successful login/signup

**FR-TS-022: Page-Based Dismissal**
- Page refresh detected
- Scroll to specific element (by CSS selector)
- Scroll past pop-up position
- Scroll to page bottom

**FR-TS-023: Dismissal Types**
- **Permanent Dismissal**:
  - Session-based: Don't show again this session
  - User-based: Don't show again to this user (cookie/localStorage)
  - UTM-based: Don't show to users from specific campaign
- **Temporary Dismissal**:
  - Collapse into preview (minimize to corner)
  - Re-appearance trigger: Show again after X minutes, or on next page

---

### 5.4 Condition Builder

#### 5.4.1 Visual Condition Builder UI
**Description**: No-code interface for creating complex trigger logic using AND/OR conditions.

**Requirements**:
- **FR-CB-001**: Implement drag-and-drop condition builder with:
  - Condition groups (support AND/OR logic)
  - Nested conditions (up to 3 levels deep)
  - Visual connectors (lines showing AND/OR relationships)

- **FR-CB-002**: Support condition operators:
  - **Equals**: Exact match (e.g., `utm_source = facebook`)
  - **Not Equals**: Exclude (e.g., `browser != Safari`)
  - **Contains**: Partial match (e.g., `url contains /sale/`)
  - **Does Not Contain**: Exclude partial match
  - **Starts With**: Prefix match (e.g., `url starts with /collections/`)
  - **Ends With**: Suffix match
  - **Greater Than**: Numeric comparison (e.g., `cart_value > 50`)
  - **Less Than**: Numeric comparison
  - **Between**: Range (e.g., `time_on_site between 30 and 60`)
  - **In List**: Multiple values (e.g., `product_id in [123, 456, 789]`)
  - **Not In List**: Exclude multiple values
  - **Is Set**: Field has value (e.g., `email is set`)
  - **Is Not Set**: Field is empty

- **FR-CB-003**: Provide condition templates:
  - **First-Time Visitor**: `session_count = 1 AND cookie_consent = not_set`
  - **Cart Abandoner**: `cart_value > 50 AND time_on_checkout_page > 30 AND exit_intent = true`
  - **VIP Customer**: `order_count >= 5 OR lifetime_value > 500`
  - **Free Shipping Eligible**: `cart_value >= 75 AND shipping_country = US`
  - **Exit Intent**: `mouse_exit = true AND time_on_page > 10`

- **FR-CB-004**: Enable "Test Condition" feature:
  - Simulate user attributes (manual input)
  - Show if pop-up would trigger (Yes/No)
  - Display evaluation logic (step-by-step breakdown)

#### 5.4.2 Condition Validation
**Requirements**:
- **FR-CB-005**: Validate conditions before save:
  - No empty condition groups
  - No conflicting conditions (e.g., `cart_value > 100 AND cart_value < 50`)
  - No impossible conditions (e.g., `is_new_visitor = true AND order_count > 0`)
  - Valid data types (numbers for numeric fields, strings for text)

- **FR-CB-006**: Show validation warnings (non-blocking):
  - "This condition may trigger very rarely" (e.g., `time_on_site > 600`)
  - "This condition requires third-party integration" (e.g., Klaviyo segment)

- **FR-CB-007**: Auto-suggest related conditions:
  - When `exit_intent = true` is added, suggest `time_on_page > 10`
  - When `cart_value > 50` is added, suggest `cart_items_count > 1`

---

### 5.5 Pop-up Studio (Design Editor)

#### 5.5.1 Content Editor
**Description**: Visual editor for pop-up content.

**Requirements**:
- **FR-PS-001**: Support content types:
  - **Static Content**:
    - Text (headline, paragraph, CTA button text)
    - Images (upload or URL)
    - Videos (YouTube/Vimeo embed or direct upload)
    - GIFs
    - Icons (icon library or custom upload)
    - Buttons (primary, secondary, tertiary styles)
  - **Input Fields**:
    - Text input (email, name, phone)
    - Textarea (comments, feedback)
    - Checkboxes (opt-ins, preferences)
    - Radio buttons (single selection)
    - Dropdowns (multi-option selection)
    - Sliders (numeric range, e.g., budget)
    - Toggle switches (yes/no)
  - **Dynamic Content**:
    - Product list (from Shopify, filtered by collection/tag/type)
    - Coupon/discount codes (auto-generate unique codes)
    - Countdown timers (urgency)
    - Stock counters ("Only X left!")
    - Recent purchase notifications (social proof)
    - Gamification widgets (spin wheel, scratch card)
    - Reviews/ratings list

- **FR-PS-002**: Provide WYSIWYG editor:
  - Real-time preview (desktop + mobile)
  - Drag-and-drop elements
  - Click to edit text inline
  - Layer panel (reorder elements, adjust z-index)

- **FR-PS-003**: Enable content validation:
  - Required fields marked with asterisk
  - Character limits (e.g., headline max 60 chars)
  - Email format validation
  - Phone number format validation (international)
  - URL format validation

- **FR-PS-004**: Support dynamic variables:
  - `{{customer.first_name}}` - Customer first name
  - `{{customer.email}}` - Customer email
  - `{{cart.total_price}}` - Cart value
  - `{{cart.item_count}}` - Number of items in cart
  - `{{product.title}}` - Current product title (on PDP)
  - `{{product.price}}` - Current product price
  - `{{discount.code}}` - Dynamic discount code
  - `{{free_shipping_threshold}}` - Amount needed for free shipping

#### 5.5.2 Style Editor
**Requirements**:
- **FR-PS-005**: Provide style controls:
  - **Layout**:
    - Pop-up size: Small (300x400), Medium (400x500), Large (600x700), Custom (px or %)
    - Padding: Top, Right, Bottom, Left (px)
    - Border radius: 0-50px
    - Border: Width, style (solid, dashed), color
  - **Colors**:
    - Background color (solid or gradient)
    - Text color
    - Button color (background, text, border)
    - Overlay color (with opacity slider)
  - **Typography**:
    - Font family (system fonts + Google Fonts integration)
    - Font size (12-72px)
    - Font weight (Light, Regular, Medium, Bold)
    - Line height (1.0-2.0)
    - Letter spacing (-2 to 5px)
    - Text alignment (Left, Center, Right, Justify)
  - **Spacing**:
    - Margin (external spacing)
    - Padding (internal spacing)
    - Gap (between elements)

- **FR-PS-006**: Enable advanced styling:
  - Custom CSS input (for advanced users)
  - Pre-defined themes (Minimal, Bold, Elegant, Playful)
  - Dark mode support (auto-switch based on system preference)

#### 5.5.3 Placement & Positioning
**Requirements**:
- **FR-PS-007**: Support placement options:
  - **Viewport-Relative**:
    - Center (default)
    - Top-left, Top-center, Top-right
    - Center-left, Center-right
    - Bottom-left, Bottom-center, Bottom-right
  - **Page-Relative**:
    - Inline (within page flow)
    - Fixed (scroll-independent)
    - Sticky (scroll-dependent, locks after scroll threshold)
  - **Custom Positioning**:
    - Absolute coordinates (X, Y in px or %)
    - Drag-and-drop positioning on preview

- **FR-PS-008**: Configure overlay settings:
  - **Background Type**:
    - Non-interactive (lightbox): Blocks background interaction
    - Interactive: Allows background clicks/scrolls
  - **Overlay Color**: Color picker with opacity
  - **Overlay Assets**: Background image/video/GIF (optional)
  - **Blur Effect**: Blur background (0-10px)

- **FR-PS-009**: Set z-index rules:
  - Auto-calculate z-index to avoid conflicts
  - Manual override (1-9999)
  - Layering relative to:
    - Other pop-ups
    - Cart drawer
    - Search drawer
    - Navigation menus
    - Sticky buttons

#### 5.5.4 Animations & Gestures
**Requirements**:
- **FR-PS-010**: Support entrance animations:
  - Fade in
  - Slide in (from top, bottom, left, right)
  - Zoom in
  - Bounce in
  - None (instant)
  - Duration: 0.1-2.0 seconds
  - Easing: Linear, Ease-in, Ease-out, Ease-in-out

- **FR-PS-011**: Support exit animations:
  - Fade out
  - Slide out (to top, bottom, left, right)
  - Zoom out
  - Shrink
  - None (instant)
  - Duration: 0.1-2.0 seconds

- **FR-PS-012**: Enable micro-animations:
  - Button hover effects (scale, color change, shadow)
  - Input field focus (border glow, scale)
  - Error state (shake, red border)
  - Success state (checkmark, green border)

- **FR-PS-013**: Support gestures:
  - **Swipe** (mobile): Swipe up/down/left/right to dismiss
  - **Double tap**: Double tap to trigger action
  - **Long press**: Press and hold to reveal content
  - **Pinch**: Pinch in/out to resize (advanced)

#### 5.5.5 Pop-up Previews (Minimized State)
**Requirements**:
- **FR-PS-014**: Create pop-up previews:
  - Small "teaser" element when pop-up is dismissed
  - Types:
    - Text tab (e.g., "Get 10% Off")
    - Icon bubble (e.g., gift icon)
    - Image thumbnail
  - Placement: Corner positions (all 4 corners) or custom
  - Interaction:
    - Click to re-open pop-up
    - Double tap to re-open
    - Press and hold to play preview animation

- **FR-PS-015**: Configure preview behavior:
  - Show preview after temporary dismissal (YES/NO)
  - Auto-hide preview after X seconds
  - Animate preview (pulse, bounce, wiggle)

---

### 5.6 Experiment System (A/B Testing)

#### 5.6.1 Experiment Setup
**Description**: Built-in A/B testing for optimizing pop-up performance.

**Requirements**:
- **FR-EXP-001**: Enable experiments on:
  - **Triggers**: Test different display conditions (e.g., exit intent vs. 30% scroll)
  - **Content**: Test headlines, CTAs, images
  - **Design**: Test colors, layouts, button placement

- **FR-EXP-002**: Support experiment variants:
  - Control (original pop-up)
  - Variant A, Variant B, Variant C (up to 3 variants)
  - Traffic split: Manual % allocation (e.g., 50/25/25) or Equal split

- **FR-EXP-003**: Set experiment duration:
  - Start date/time
  - End date/time OR
  - Run until statistical significance achieved

- **FR-EXP-004**: Define success metrics:
  - Impressions
  - Click-through rate (CTR)
  - Conversion rate (% who completed goal action)
  - Revenue attributed
  - Custom event (e.g., form submission, product added to cart)

#### 5.6.2 Experiment Execution
**Requirements**:
- **FR-EXP-005**: Randomly assign users to variants:
  - Cookie-based assignment (user sees same variant across sessions)
  - Session-based assignment (new variant each session)

- **FR-EXP-006**: Track experiment metrics:
  - Impressions per variant
  - Clicks per variant
  - Conversions per variant
  - Statistical significance (p-value < 0.05)

- **FR-EXP-007**: Auto-pause experiment:
  - When winner is statistically significant
  - When end date reached
  - When merchant manually pauses

#### 5.6.3 Experiment Analytics
**Requirements**:
- **FR-EXP-008**: Display experiment results:
  - Side-by-side variant comparison table
  - Winner badge (if statistically significant)
  - Confidence level (90%, 95%, 99%)
  - Recommendation: "Use Variant B" or "Keep testing"

- **FR-EXP-009**: Enable "Apply Winner" action:
  - One-click to make winning variant the default
  - Archive losing variants

---

### 5.7 Analytics & Reporting

#### 5.7.1 Pop-up Analytics
**Requirements**:
- **FR-ANLY-001**: Track per-pop-up metrics:
  - Total impressions
  - Unique impressions (deduplicated by user)
  - Clicks (CTA button, form submission)
  - Click-through rate (CTR)
  - Conversions (goal action completed)
  - Conversion rate
  - Dismissals (manual close vs. auto-dismiss)
  - Average time to action (seconds from display to click)
  - Revenue attributed (if conversion = purchase)

- **FR-ANLY-002**: Provide date range filters:
  - Today, Yesterday
  - Last 7 days, Last 30 days, Last 90 days
  - Custom date range

- **FR-ANLY-003**: Enable metric breakdowns:
  - By device (Desktop, Mobile, Tablet)
  - By traffic source (Organic, Paid, Direct, Referral)
  - By page type (Home, PDP, PLP, Cart)
  - By hour of day (heatmap showing peak engagement)

#### 5.7.2 Dashboard Analytics
**Requirements**:
- **FR-ANLY-004**: Display aggregate metrics:
  - Total pop-up impressions (all pop-ups)
  - Average CTR across all pop-ups
  - Top 5 performing pop-ups (by CTR)
  - Bottom 5 performing pop-ups (flagged for optimization)
  - Total revenue attributed

- **FR-ANLY-005**: Visualize trends:
  - Line chart: Impressions/CTR over time
  - Bar chart: Performance by pop-up type
  - Funnel chart: Display → Click → Conversion

---

### 5.8 Integration Requirements

#### 5.8.1 Shopify Integrations
**Requirements**:
- **FR-INT-001**: Shopify Cart API:
  - Read cart contents (items, quantity, total)
  - Add items to cart from pop-up
  - Apply discount codes
  - Trigger pop-up on cart changes

- **FR-INT-002**: Shopify Customer API:
  - Read customer data (name, email, tags)
  - Detect logged-in status
  - Create customer (signup form in pop-up)

- **FR-INT-003**: Shopify Product API:
  - Fetch product data for dynamic pop-ups (recommendations)
  - Check inventory levels (for low-stock alerts)

- **FR-INT-004**: Shopify Theme App Extension:
  - Render pop-ups via app block (Online Store 2.0)
  - No manual code installation required
  - Auto-update across all pages

#### 5.8.2 Third-Party Integrations (Future)
**Requirements**:
- **FR-INT-005**: Email Marketing:
  - Klaviyo: Sync email captures to lists/segments
  - Mailchimp: Sync email captures
  - Omnisend: Sync email captures

- **FR-INT-006**: SMS Marketing:
  - Postscript: Sync phone numbers to SMS lists
  - Attentive: Sync phone numbers

- **FR-INT-007**: Analytics:
  - Google Analytics 4: Send pop-up events (impression, click, conversion)
  - Facebook Pixel: Track pop-up conversions

---

## 6. Technical Architecture

### 6.1 System Architecture

**Architecture Pattern**: Serverless + JAMstack
- **Frontend**: React (Remix framework) for admin UI
- **Backend**: Shopify App (embedded in admin)
- **Database**: Google Sheets API (cost-effective, no-code-friendly)
- **Hosting**: Shopify App hosting (included)
- **Theme Integration**: Theme App Extensions (Online Store 2.0)

**Component Diagram**:
```
┌─────────────────────────────────────────────────────────┐
│                  Shopify Admin (Merchant)               │
│  ┌──────────────────────────────────────────────────┐   │
│  │           Just PopIt App (Embedded)               │   │
│  │  ┌────────────┬──────────────┬─────────────────┐ │   │
│  │  │ Dashboard  │ Pop-up Studio│  Analytics      │ │   │
│  │  │ Component  │ Component    │  Component      │ │   │
│  │  └────────────┴──────────────┴─────────────────┘ │   │
│  │                React/Remix App                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                           │ API Calls
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Google Sheets (Database)                   │
│  ┌──────────┬──────────┬──────────┬──────────────────┐ │
│  │ Pop-ups  │ Triggers │ Analytics│  Experiments     │ │
│  │ Sheet    │ Sheet    │ Sheet    │  Sheet           │ │
│  └──────────┴──────────┴──────────┴──────────────────┘ │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Read Config
                           ▼
┌─────────────────────────────────────────────────────────┐
│          Shopify Storefront (Customer-Facing)           │
│  ┌──────────────────────────────────────────────────┐   │
│  │      Theme App Extension (Liquid + JS)           │   │
│  │  ┌────────────────────────────────────────────┐  │   │
│  │  │   Pop-up Renderer (Client-Side Script)     │  │   │
│  │  │   - Loads config from Google Sheets        │  │   │
│  │  │   - Evaluates triggers                     │  │   │
│  │  │   - Displays pop-up                        │  │   │
│  │  │   - Tracks analytics                       │  │   │
│  │  └────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Data Flow

**Pop-up Creation Flow**:
1. Merchant creates pop-up in admin UI
2. Admin UI calls Google Sheets API to save pop-up config
3. Google Sheets stores pop-up data
4. Theme App Extension loads config on storefront
5. Client-side script evaluates triggers
6. Pop-up displays to customer
7. Customer action logged to Analytics Sheet

**Analytics Flow**:
1. Customer interacts with pop-up (impression, click, dismiss)
2. Client-side script sends event to Google Sheets API
3. Analytics Sheet appends event data
4. Admin dashboard reads Analytics Sheet
5. Metrics aggregated and displayed to merchant

### 6.3 Security & Privacy

**Requirements**:
- **ARCH-SEC-001**: Use Shopify OAuth for authentication
- **ARCH-SEC-002**: Store Google Sheets credentials securely (environment variables)
- **ARCH-SEC-003**: Validate all inputs (XSS prevention)
- **ARCH-SEC-004**: Sanitize customer data (no PII in analytics without consent)
- **ARCH-SEC-005**: GDPR compliance: Allow customers to opt-out of tracking
- **ARCH-SEC-006**: Rate limiting on Google Sheets API calls (prevent abuse)

---

## 7. Data Models & Google Sheets Schema

### 7.1 Google Sheets Database Structure

**Sheet Structure**: 1 Google Sheet per merchant, 6 tabs (sheets):
1. **Popups**: Master pop-up configuration
2. **DisplayTriggers**: Display trigger conditions
3. **DismissalTriggers**: Dismissal trigger conditions
4. **Experiments**: A/B test configurations
5. **Analytics**: Event tracking data
6. **Templates**: Pre-built template definitions

### 7.2 Schema Definitions

#### Sheet 1: Popups
**Purpose**: Store all pop-up configurations.

**Columns**:
| Column | Data Type | Description | Example |
|--------|-----------|-------------|---------|
| popup_id | String (UUID) | Unique identifier | `550e8400-e29b-41d4-a716-446655440000` |
| name | String (255) | Pop-up name | `Summer Sale Welcome` |
| status | Enum | `draft`, `active`, `paused`, `archived` | `active` |
| type | Enum | `banner`, `form`, `custom`, `gamification` | `form` |
| template_id | String (UUID) | Reference to template (if used) | `template_001` |
| content_json | JSON String | Pop-up content structure | `{"headline": "Get 10% Off", ...}` |
| style_json | JSON String | Styling configuration | `{"backgroundColor": "#fff", ...}` |
| placement | String | Placement position | `center`, `top-right`, etc. |
| overlay_settings_json | JSON String | Overlay configuration | `{"color": "#000", "opacity": 0.5}` |
| z_index | Integer | Stacking order | `1000` |
| animations_json | JSON String | Animation settings | `{"entrance": "fade-in", ...}` |
| preview_enabled | Boolean | Show preview after dismissal | `TRUE`, `FALSE` |
| preview_settings_json | JSON String | Preview configuration | `{"type": "text-tab", ...}` |
| created_at | Timestamp | Creation date | `2026-01-29T10:30:00Z` |
| updated_at | Timestamp | Last update date | `2026-01-29T15:45:00Z` |
| created_by | String | Merchant ID | `merchant_12345` |

**Sample Row**:
```
popup_id: 550e8400-e29b-41d4-a716-446655440000
name: Summer Sale Welcome
status: active
type: form
template_id: email_capture_template
content_json: {
  "headline": "Get 10% Off Your First Order",
  "subtext": "Join our email list and receive exclusive offers!",
  "fields": [
    {"type": "email", "placeholder": "Enter your email", "required": true}
  ],
  "button_text": "Get Discount",
  "success_message": "Check your email for the code!"
}
style_json: {
  "backgroundColor": "#ffffff",
  "textColor": "#333333",
  "buttonColor": "#ff6b6b",
  "borderRadius": "12px",
  "width": "400px",
  "height": "500px"
}
placement: center
overlay_settings_json: {"color": "#000000", "opacity": 0.6, "interactive": false}
z_index: 1000
animations_json: {"entrance": "fade-in", "exit": "slide-out-top", "duration": 0.3}
preview_enabled: TRUE
preview_settings_json: {"type": "text-tab", "text": "Get 10% Off", "position": "bottom-right"}
created_at: 2026-01-29T10:30:00Z
updated_at: 2026-01-29T15:45:00Z
created_by: merchant_12345
```

#### Sheet 2: DisplayTriggers
**Purpose**: Define when pop-ups should appear.

**Columns**:
| Column | Data Type | Description | Example |
|--------|-----------|-------------|---------|
| trigger_id | String (UUID) | Unique identifier | `trigger_001` |
| popup_id | String (UUID) | Foreign key to Popups | `550e8400-e29b-41d4-a716-446655440000` |
| trigger_group_id | String (UUID) | Groups conditions (for AND/OR logic) | `group_001` |
| group_logic | Enum | `AND`, `OR` | `AND` |
| trigger_category | Enum | `session`, `time`, `user_action`, `cart`, `cohort`, `product`, `impression`, `series` | `user_action` |
| trigger_type | String | Specific trigger type | `scroll_depth`, `exit_intent`, `cart_value` |
| operator | Enum | `equals`, `not_equals`, `contains`, `gt`, `lt`, `between`, `in`, `is_set` | `gt` (greater than) |
| value | String | Trigger value | `50` (for scroll_depth 50%) |
| secondary_value | String | Second value (for `between` operator) | `75` |
| enabled | Boolean | Is trigger active | `TRUE` |
| created_at | Timestamp | Creation date | `2026-01-29T10:30:00Z` |

**Sample Rows** (Exit Intent Pop-up):
```
Condition: Show pop-up when (exit_intent = true) AND (time_on_page > 10 seconds)

Row 1:
trigger_id: trigger_001
popup_id: 550e8400-e29b-41d4-a716-446655440000
trigger_group_id: group_001
group_logic: AND
trigger_category: user_action
trigger_type: exit_intent
operator: equals
value: true
secondary_value:
enabled: TRUE
created_at: 2026-01-29T10:30:00Z

Row 2:
trigger_id: trigger_002
popup_id: 550e8400-e29b-41d4-a716-446655440000
trigger_group_id: group_001
group_logic: AND
trigger_category: time
trigger_type: time_on_page
operator: gt
value: 10
secondary_value:
enabled: TRUE
created_at: 2026-01-29T10:30:00Z
```

#### Sheet 3: DismissalTriggers
**Purpose**: Define when pop-ups should be dismissed.

**Columns**:
| Column | Data Type | Description | Example |
|--------|-----------|-------------|---------|
| dismissal_id | String (UUID) | Unique identifier | `dismiss_001` |
| popup_id | String (UUID) | Foreign key to Popups | `550e8400-e29b-41d4-a716-446655440000` |
| trigger_type | Enum | `time`, `click`, `keyboard`, `navigation`, `state_change`, `page` | `click` |
| trigger_subtype | String | Specific dismissal trigger | `close_button`, `outside_click`, `esc_key` |
| value | String | Trigger value (e.g., seconds for time-based) | `30` |
| dismissal_type | Enum | `permanent_session`, `permanent_user`, `temporary` | `permanent_user` |
| temporary_settings_json | JSON String | Reappearance settings (if temporary) | `{"reappear_after_seconds": 300}` |
| enabled | Boolean | Is trigger active | `TRUE` |
| created_at | Timestamp | Creation date | `2026-01-29T10:30:00Z` |

**Sample Rows**:
```
Row 1 (Auto-dismiss after 30 seconds):
dismissal_id: dismiss_001
popup_id: 550e8400-e29b-41d4-a716-446655440000
trigger_type: time
trigger_subtype: auto_dismiss
value: 30
dismissal_type: temporary
temporary_settings_json: {"collapse_to_preview": true}
enabled: TRUE
created_at: 2026-01-29T10:30:00Z

Row 2 (Click outside to permanently dismiss):
dismissal_id: dismiss_002
popup_id: 550e8400-e29b-41d4-a716-446655440000
trigger_type: click
trigger_subtype: outside_click
value:
dismissal_type: permanent_user
temporary_settings_json:
enabled: TRUE
created_at: 2026-01-29T10:30:00Z

Row 3 (ESC key to dismiss this session):
dismissal_id: dismiss_003
popup_id: 550e8400-e29b-41d4-a716-446655440000
trigger_type: keyboard
trigger_subtype: esc_key
value:
dismissal_type: permanent_session
temporary_settings_json:
enabled: TRUE
created_at: 2026-01-29T10:30:00Z
```

#### Sheet 4: Experiments
**Purpose**: Store A/B test configurations.

**Columns**:
| Column | Data Type | Description | Example |
|--------|-----------|-------------|---------|
| experiment_id | String (UUID) | Unique identifier | `exp_001` |
| popup_id | String (UUID) | Base pop-up being tested | `550e8400-e29b-41d4-a716-446655440000` |
| name | String (255) | Experiment name | `Headline Test - Summer Sale` |
| status | Enum | `draft`, `running`, `paused`, `completed` | `running` |
| start_date | Timestamp | Start date/time | `2026-01-29T00:00:00Z` |
| end_date | Timestamp | End date/time (nullable) | `2026-02-05T23:59:59Z` |
| variants_json | JSON String | Variant definitions | `[{"id": "control", "traffic": 50}, {"id": "variant_a", "traffic": 50}]` |
| success_metric | Enum | `impressions`, `ctr`, `conversion`, `revenue` | `conversion` |
| goal_action | String | Specific goal (e.g., form submission) | `email_submitted` |
| winner_variant_id | String (UUID) | Winning variant (nullable) | `variant_a` |
| confidence_level | Float | Statistical confidence (0-100) | `95.5` |
| created_at | Timestamp | Creation date | `2026-01-29T10:00:00Z` |
| completed_at | Timestamp | Completion date (nullable) | `2026-02-05T18:30:00Z` |

**Sample Row**:
```
experiment_id: exp_001
popup_id: 550e8400-e29b-41d4-a716-446655440000
name: Headline Test - Summer Sale
status: running
start_date: 2026-01-29T00:00:00Z
end_date: 2026-02-05T23:59:59Z
variants_json: [
  {
    "id": "control",
    "traffic": 50,
    "changes": {}
  },
  {
    "id": "variant_a",
    "traffic": 50,
    "changes": {
      "content_json.headline": "Limited Time: 10% Off Your First Order!"
    }
  }
]
success_metric: conversion
goal_action: email_submitted
winner_variant_id:
confidence_level:
created_at: 2026-01-29T10:00:00Z
completed_at:
```

#### Sheet 5: Analytics
**Purpose**: Track all pop-up events for analytics.

**Columns**:
| Column | Data Type | Description | Example |
|--------|-----------|-------------|---------|
| event_id | String (UUID) | Unique identifier | `event_001` |
| popup_id | String (UUID) | Pop-up that triggered event | `550e8400-e29b-41d4-a716-446655440000` |
| experiment_id | String (UUID) | Experiment ID (if part of A/B test) | `exp_001` |
| variant_id | String (UUID) | Variant ID (if part of A/B test) | `variant_a` |
| event_type | Enum | `impression`, `click`, `conversion`, `dismissal` | `impression` |
| user_id | String | Anonymous user ID (cookie) | `user_abc123` |
| session_id | String | Session ID | `session_xyz789` |
| page_url | String | Current page URL | `https://store.myshopify.com/products/shirt` |
| page_type | Enum | `home`, `pdp`, `plp`, `cart`, etc. | `pdp` |
| device_type | Enum | `desktop`, `mobile`, `tablet` | `mobile` |
| browser | String | Browser name | `Chrome` |
| traffic_source | String | Referrer source | `google`, `facebook`, `direct` |
| utm_source | String | UTM source parameter | `instagram` |
| utm_campaign | String | UTM campaign parameter | `summer_sale` |
| timestamp | Timestamp | Event timestamp | `2026-01-29T14:23:11Z` |
| additional_data_json | JSON String | Extra event data | `{"time_to_action": 5.2, "field_filled": "email"}` |

**Sample Rows**:
```
Row 1 (Impression):
event_id: event_001
popup_id: 550e8400-e29b-41d4-a716-446655440000
experiment_id: exp_001
variant_id: control
event_type: impression
user_id: user_abc123
session_id: session_xyz789
page_url: https://store.myshopify.com/collections/summer
page_type: plp
device_type: mobile
browser: Safari
traffic_source: organic
utm_source:
utm_campaign:
timestamp: 2026-01-29T14:23:11Z
additional_data_json: {}

Row 2 (Click):
event_id: event_002
popup_id: 550e8400-e29b-41d4-a716-446655440000
experiment_id: exp_001
variant_id: control
event_type: click
user_id: user_abc123
session_id: session_xyz789
page_url: https://store.myshopify.com/collections/summer
page_type: plp
device_type: mobile
browser: Safari
traffic_source: organic
utm_source:
utm_campaign:
timestamp: 2026-01-29T14:23:16Z
additional_data_json: {"time_to_action": 5.2, "button_clicked": "submit"}

Row 3 (Conversion):
event_id: event_003
popup_id: 550e8400-e29b-41d4-a716-446655440000
experiment_id: exp_001
variant_id: control
event_type: conversion
user_id: user_abc123
session_id: session_xyz789
page_url: https://store.myshopify.com/collections/summer
page_type: plp
device_type: mobile
browser: Safari
traffic_source: organic
utm_source:
utm_campaign:
timestamp: 2026-01-29T14:23:18Z
additional_data_json: {"email_submitted": "user@example.com", "discount_code": "SUMMER10"}
```

#### Sheet 6: Templates
**Purpose**: Store pre-built template definitions.

**Columns**:
| Column | Data Type | Description | Example |
|--------|-----------|-------------|---------|
| template_id | String | Unique identifier | `email_capture_template` |
| name | String (255) | Template name | `Email Capture Form` |
| description | String (500) | Template description | `Classic email opt-in with discount incentive` |
| category | Enum | `promotion`, `email_capture`, `gamification`, `exit_intent` | `email_capture` |
| layout_type | Enum | `banner`, `modal`, `sidebar`, `fullscreen` | `modal` |
| preview_image_url | String | Preview image URL | `https://cdn.example.com/template_email.png` |
| content_json | JSON String | Default content structure | `{"headline": "Get 10% Off", ...}` |
| style_json | JSON String | Default styling | `{"backgroundColor": "#fff", ...}` |
| default_triggers_json | JSON String | Default display triggers | `[{"type": "exit_intent"}, {"type": "scroll_depth", "value": 30}]` |
| default_dismissals_json | JSON String | Default dismissal triggers | `[{"type": "click", "subtype": "close_button"}]` |
| is_system_template | Boolean | System vs. merchant-created | `TRUE` |
| created_at | Timestamp | Creation date | `2026-01-20T00:00:00Z` |

**Sample Row**:
```
template_id: email_capture_template
name: Email Capture Form
description: Classic email opt-in pop-up with discount incentive. Perfect for growing your email list.
category: email_capture
layout_type: modal
preview_image_url: https://cdn.example.com/templates/email_capture.png
content_json: {
  "headline": "Get 10% Off Your First Order",
  "subtext": "Join our email list and receive exclusive offers!",
  "fields": [
    {"type": "email", "placeholder": "Enter your email", "required": true}
  ],
  "button_text": "Get Discount",
  "success_message": "Check your email for the code!"
}
style_json: {
  "backgroundColor": "#ffffff",
  "textColor": "#333333",
  "buttonColor": "#ff6b6b",
  "borderRadius": "12px",
  "width": "400px",
  "height": "500px",
  "fontFamily": "Inter"
}
default_triggers_json: [
  {"category": "user_action", "type": "exit_intent", "operator": "equals", "value": "true"},
  {"category": "user_action", "type": "scroll_depth", "operator": "gt", "value": "30"}
]
default_dismissals_json: [
  {"type": "click", "subtype": "close_button", "dismissal_type": "permanent_user"},
  {"type": "state_change", "subtype": "email_submitted", "dismissal_type": "permanent_user"}
]
is_system_template: TRUE
created_at: 2026-01-20T00:00:00Z
```

### 7.3 Google Sheets API Integration

**Requirements**:
- **ARCH-GS-001**: Use Google Sheets API v4
- **ARCH-GS-002**: Authenticate via Service Account (OAuth 2.0)
- **ARCH-GS-003**: Implement caching layer (5-minute cache for read operations)
- **ARCH-GS-004**: Batch writes to reduce API calls (batch updates every 30 seconds)
- **ARCH-GS-005**: Handle rate limits (100 requests/100 seconds per user)
- **ARCH-GS-006**: Fallback to cached data if API unavailable

**Google Sheets Setup Process for Merchants**:
1. Merchant installs app
2. App auto-creates Google Sheet with 6 tabs (using template)
3. App requests OAuth permission to access Sheet
4. Merchant grants permission
5. App stores Sheet ID in Shopify metafields
6. App reads/writes data via API

---

## 8. API Specifications

### 8.1 Admin API Endpoints

**Base URL**: `/api/admin` (internal app API)

#### 8.1.1 Pop-up Management

**GET /api/admin/popups**
- **Description**: List all pop-ups
- **Query Params**:
  - `status` (optional): Filter by status (`draft`, `active`, `paused`, `archived`)
  - `type` (optional): Filter by type (`banner`, `form`, `custom`)
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Results per page (default: 20, max: 100)
- **Response**:
```json
{
  "popups": [
    {
      "popup_id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Summer Sale Welcome",
      "status": "active",
      "type": "form",
      "impressions_7d": 1250,
      "ctr_7d": 4.2,
      "created_at": "2026-01-29T10:30:00Z",
      "updated_at": "2026-01-29T15:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "total_pages": 1
  }
}
```

**POST /api/admin/popups**
- **Description**: Create new pop-up
- **Request Body**:
```json
{
  "name": "Summer Sale Welcome",
  "type": "form",
  "template_id": "email_capture_template",
  "content": {
    "headline": "Get 10% Off",
    "subtext": "Join our email list",
    "fields": [
      {"type": "email", "placeholder": "Enter email", "required": true}
    ],
    "button_text": "Get Discount"
  },
  "style": {
    "backgroundColor": "#ffffff",
    "textColor": "#333333",
    "buttonColor": "#ff6b6b"
  },
  "placement": "center",
  "overlay_settings": {
    "color": "#000000",
    "opacity": 0.6
  }
}
```
- **Response**: `201 Created` with pop-up object

**PUT /api/admin/popups/:popup_id**
- **Description**: Update existing pop-up
- **Request Body**: Same as POST (partial updates allowed)
- **Response**: `200 OK` with updated pop-up object

**DELETE /api/admin/popups/:popup_id**
- **Description**: Archive pop-up (soft delete)
- **Response**: `204 No Content`

**POST /api/admin/popups/:popup_id/duplicate**
- **Description**: Duplicate pop-up
- **Response**: `201 Created` with new pop-up object (name appended with "Copy")

**PATCH /api/admin/popups/:popup_id/status**
- **Description**: Change pop-up status
- **Request Body**:
```json
{
  "status": "active"
}
```
- **Response**: `200 OK`

#### 8.1.2 Trigger Management

**POST /api/admin/popups/:popup_id/triggers/display**
- **Description**: Add display trigger
- **Request Body**:
```json
{
  "trigger_group_id": "group_001",
  "group_logic": "AND",
  "trigger_category": "user_action",
  "trigger_type": "exit_intent",
  "operator": "equals",
  "value": "true"
}
```
- **Response**: `201 Created` with trigger object

**DELETE /api/admin/triggers/display/:trigger_id**
- **Description**: Remove display trigger
- **Response**: `204 No Content`

**POST /api/admin/popups/:popup_id/triggers/dismissal**
- **Description**: Add dismissal trigger
- **Request Body**:
```json
{
  "trigger_type": "click",
  "trigger_subtype": "close_button",
  "dismissal_type": "permanent_user"
}
```
- **Response**: `201 Created`

#### 8.1.3 Experiment Management

**POST /api/admin/experiments**
- **Description**: Create A/B test
- **Request Body**:
```json
{
  "popup_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Headline Test",
  "start_date": "2026-01-29T00:00:00Z",
  "end_date": "2026-02-05T23:59:59Z",
  "variants": [
    {"id": "control", "traffic": 50, "changes": {}},
    {"id": "variant_a", "traffic": 50, "changes": {"content.headline": "New Headline!"}}
  ],
  "success_metric": "conversion",
  "goal_action": "email_submitted"
}
```
- **Response**: `201 Created`

**GET /api/admin/experiments/:experiment_id/results**
- **Description**: Get experiment results
- **Response**:
```json
{
  "experiment_id": "exp_001",
  "status": "running",
  "variants": [
    {
      "id": "control",
      "impressions": 500,
      "clicks": 25,
      "conversions": 15,
      "ctr": 5.0,
      "conversion_rate": 3.0
    },
    {
      "id": "variant_a",
      "impressions": 500,
      "clicks": 40,
      "conversions": 28,
      "ctr": 8.0,
      "conversion_rate": 5.6
    }
  ],
  "winner": "variant_a",
  "confidence_level": 95.5,
  "recommendation": "Use Variant A"
}
```

**POST /api/admin/experiments/:experiment_id/apply-winner**
- **Description**: Apply winning variant as default
- **Response**: `200 OK`

#### 8.1.4 Analytics

**GET /api/admin/popups/:popup_id/analytics**
- **Description**: Get pop-up analytics
- **Query Params**:
  - `start_date` (required): ISO 8601 date
  - `end_date` (required): ISO 8601 date
  - `breakdown` (optional): `device`, `source`, `page_type`, `hour`
- **Response**:
```json
{
  "popup_id": "550e8400-e29b-41d4-a716-446655440000",
  "date_range": {
    "start": "2026-01-22T00:00:00Z",
    "end": "2026-01-29T23:59:59Z"
  },
  "metrics": {
    "impressions": 1250,
    "unique_impressions": 980,
    "clicks": 52,
    "ctr": 4.16,
    "conversions": 31,
    "conversion_rate": 2.48,
    "dismissals": 1198,
    "avg_time_to_action": 5.3
  },
  "breakdown": {
    "by_device": [
      {"device": "mobile", "impressions": 750, "ctr": 3.2},
      {"device": "desktop", "impressions": 500, "ctr": 5.8}
    ]
  }
}
```

**GET /api/admin/analytics/dashboard**
- **Description**: Get aggregate analytics for all pop-ups
- **Query Params**: Same as above
- **Response**:
```json
{
  "total_impressions": 5200,
  "avg_ctr": 4.5,
  "total_conversions": 156,
  "top_performers": [
    {"popup_id": "...", "name": "Summer Sale", "ctr": 8.2},
    {"popup_id": "...", "name": "Exit Intent", "ctr": 6.5}
  ],
  "bottom_performers": [
    {"popup_id": "...", "name": "Newsletter", "ctr": 1.2}
  ]
}
```

### 8.2 Storefront API (Client-Side)

**Base URL**: `/api/storefront` (public-facing)

**GET /api/storefront/config**
- **Description**: Get active pop-up configurations for current user
- **Query Params**:
  - `page_url` (required): Current page URL
  - `page_type` (required): `home`, `pdp`, `plp`, etc.
  - `user_id` (optional): Anonymous user ID (cookie)
- **Response**:
```json
{
  "popups": [
    {
      "popup_id": "550e8400-e29b-41d4-a716-446655440000",
      "content": {...},
      "style": {...},
      "triggers": {
        "display": [...],
        "dismissal": [...]
      },
      "experiment_id": "exp_001",
      "variant_id": "control"
    }
  ]
}
```

**POST /api/storefront/track**
- **Description**: Track pop-up events (impression, click, conversion)
- **Request Body**:
```json
{
  "event_type": "impression",
  "popup_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "user_abc123",
  "session_id": "session_xyz789",
  "page_url": "https://store.myshopify.com/products/shirt",
  "page_type": "pdp",
  "device_type": "mobile",
  "browser": "Safari",
  "traffic_source": "organic",
  "additional_data": {}
}
```
- **Response**: `201 Created`

---

## 9. Validation Rules & Edge Cases

### 9.1 Pop-up Creation Validation

**VALIDATION RULES**:

**VR-PC-001**: Pop-up Name
- Required field
- Min length: 3 characters
- Max length: 255 characters
- Must be unique per merchant
- Error message: "Pop-up name must be 3-255 characters and unique"

**VR-PC-002**: Content Validation
- Headline: Max 100 characters
- Subtext: Max 500 characters
- Button text: Max 50 characters
- Email fields: Must have valid regex pattern for email validation
- Required fields: Must be marked with asterisk in preview
- Error message: "Field exceeds character limit" or "Email validation pattern required"

**VR-PC-003**: Style Validation
- Colors: Must be valid hex (#RRGGBB) or rgba(r, g, b, a)
- Dimensions: Min 200px x 200px, Max 90vw x 90vh
- Border radius: 0-50px
- Font size: 12-72px
- Z-index: 1-9999
- Error message: "Invalid color format" or "Dimensions out of range"

**VR-PC-004**: Trigger Validation
- At least 1 display trigger required before activation
- At least 1 dismissal trigger required before activation
- No conflicting triggers (e.g., `is_new_visitor AND order_count > 0`)
- Error message: "At least one display and dismissal trigger required" or "Conflicting trigger conditions detected"

**VR-PC-005**: Template Validation
- If using template, required fields in `content_json` must match template schema
- Error message: "Missing required field: [field_name]"

**VR-PC-006**: Overlay Validation
- Opacity: 0-1 (0 = fully transparent, 1 = fully opaque)
- If `interactive: true`, warn user that background is clickable
- Error message: "Opacity must be between 0 and 1"

**VR-PC-007**: Z-Index Conflict Detection
- Before activation, check for z-index conflicts with other active pop-ups
- If conflict detected, suggest auto-incrementing z-index
- Error message: "Z-index 1000 conflicts with pop-up '[Name]'. Suggested: 1001"

### 9.2 Trigger Logic Edge Cases

**EDGE CASE HANDLING**:

**EC-TR-001**: Simultaneous Trigger Evaluation
- **Scenario**: Multiple pop-ups have overlapping triggers
- **Solution**: Prioritize by z-index (higher = shown first). If z-index equal, prioritize by `created_at` (newer first)
- **Implementation**: Client-side trigger evaluator queues pop-ups, shows one at a time

**EC-TR-002**: Rapid Trigger Firing (Spam Prevention)
- **Scenario**: User triggers same pop-up multiple times in quick succession
- **Solution**: Enforce 5-second cooldown between same pop-up impressions
- **Implementation**: Track `last_shown_at` timestamp in localStorage

**EC-TR-003**: Cookie/LocalStorage Unavailable
- **Scenario**: User has cookies disabled, can't track dismissals
- **Solution**: Fall back to session-based tracking (sessionStorage). If unavailable, pop-up shows on every page load
- **Implementation**: Try localStorage → sessionStorage → in-memory (reset on page load)

**EC-TR-004**: Experiment Variant Assignment
- **Scenario**: User clears cookies mid-experiment, gets reassigned to different variant
- **Solution**: Accept variant reassignment (edge case, minimal impact on results)
- **Future Enhancement**: Use server-side user ID for consistent assignment

**EC-TR-005**: Exit Intent False Positives (Mobile)
- **Scenario**: Exit intent trigger doesn't work well on mobile (no mouse)
- **Solution**: On mobile, replace exit intent with "scroll to top rapidly" as proxy
- **Implementation**: Detect scroll direction change from down to up with velocity > threshold

**EC-TR-006**: Time-Based Trigger Precision
- **Scenario**: "30 seconds on site" may be inaccurate if user switches tabs
- **Solution**: Use `Page Visibility API` to track only active time (tab focused)
- **Implementation**: Pause timer when `document.hidden = true`

**EC-TR-007**: Cart Value Trigger Race Condition
- **Scenario**: Cart value changes while pop-up is displaying (user adds/removes item)
- **Solution**: Re-evaluate triggers on cart change events. If conditions no longer met, auto-dismiss pop-up
- **Implementation**: Listen to Shopify cart update events

**EC-TR-008**: URL-Based Trigger on SPA Navigation
- **Scenario**: Single-page app navigation doesn't reload page, URL changes via `pushState`
- **Solution**: Listen to `popstate` and `pushState` events, re-evaluate triggers
- **Implementation**: Wrap `history.pushState` to trigger custom event

### 9.3 Form Validation Edge Cases

**EC-FV-001**: Email Validation
- **Rule**: Use standard email regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
- **Edge Cases**:
  - Disposable emails (temp-mail.org): Optionally block via API (Mailcheck.ai)
  - Typos (gmial.com): Suggest corrections ("Did you mean gmail.com?")
  - Role emails (admin@, support@): Optionally block
- **Error Messages**: "Invalid email format", "Did you mean [suggestion]?"

**EC-FV-002**: Phone Number Validation
- **Rule**: Use international format validation (libphonenumber-js)
- **Edge Cases**:
  - Missing country code: Auto-prepend based on geolocation
  - Invalid format: Show example format "+1 (555) 123-4567"
- **Error Messages**: "Invalid phone number", "Example: +1 (555) 123-4567"

**EC-FV-003**: Required Field Skipped
- **Scenario**: User tries to submit form with empty required field
- **Solution**: Show inline error, prevent submission, focus on first error field
- **Implementation**: Client-side validation before POST request

**EC-FV-004**: Duplicate Submission
- **Scenario**: User double-clicks submit button
- **Solution**: Disable button after first click, show loading spinner
- **Implementation**: `disabled` attribute + loading state

### 9.4 Performance Edge Cases

**EC-PERF-001**: Large Number of Active Pop-ups
- **Scenario**: Merchant has 50+ active pop-ups
- **Solution**: Limit to 10 active pop-ups max. Show warning if limit reached
- **Error Message**: "You can have up to 10 active pop-ups. Please pause some to activate this one."

**EC-PERF-002**: Slow Google Sheets API Response
- **Scenario**: API latency > 2 seconds
- **Solution**: Implement 5-minute cache, serve cached data while refreshing in background
- **Implementation**: Stale-while-revalidate pattern

**EC-PERF-003**: High Analytics Volume
- **Scenario**: High-traffic store generates 10k+ events/day
- **Solution**: Batch writes to Google Sheets (every 30 seconds, max 100 events per batch)
- **Implementation**: In-memory queue, flush on interval or threshold

**EC-PERF-004**: Mobile Performance
- **Scenario**: Pop-up script slows down page load on mobile
- **Solution**: Lazy load pop-up script (load after `DOMContentLoaded`)
- **Implementation**: Async script tag with `defer` attribute

---

## 10. Integration Requirements

### 10.1 Shopify Theme App Extension

**Requirements**:

**INT-THEME-001**: Online Store 2.0 Compatibility
- Render via app block (no manual code installation)
- Auto-inject on all pages (home, PDP, PLP, cart, etc.)
- Support Liquid themes

**INT-THEME-002**: Script Loading
- Load pop-up renderer script asynchronously
- Inject after `DOMContentLoaded` to avoid blocking page load
- Minify and compress script (< 50KB gzipped)

**INT-THEME-003**: CSS Isolation
- Use CSS-in-JS or scoped styles to avoid theme conflicts
- Prefix all classes with `jpi-` (Just PopIt)
- Use Shadow DOM if supported (fallback to scoped styles)

**INT-THEME-004**: Event Listeners
- Listen to Shopify-specific events:
  - `cart:updated` (cart changes)
  - `product:variant:change` (variant selection)
  - `klaviyo:identify` (user identification, if Klaviyo installed)

### 10.2 Google Sheets Integration

**INT-GS-001**: Authentication
- Use Service Account OAuth 2.0
- Store credentials in environment variables (secure)
- Request only necessary scopes (read/write to specific sheet)

**INT-GS-002**: Sheet Creation
- Auto-create sheet on merchant first login
- Use template with 6 pre-configured tabs
- Share sheet with merchant's email (view-only or edit based on preference)

**INT-GS-003**: Data Sync
- Real-time writes for analytics events (with batching)
- 5-minute cache for pop-up config reads
- Manual refresh button in admin UI ("Sync Now")

**INT-GS-004**: Error Handling
- If API unavailable, queue writes and retry (up to 3 retries)
- Show error banner in admin UI if sync fails
- Fallback to last cached data for storefront

### 10.3 Future Integrations (Phase 2+)

**INT-FUT-001**: Email Marketing Platforms
- Klaviyo: Sync email captures to specific lists
- Mailchimp: Sync email captures
- Omnisend: Sync email captures
- Implementation: Webhook on form submission

**INT-FUT-002**: SMS Platforms
- Postscript: Sync phone numbers to SMS lists
- Attentive: Sync phone numbers
- Implementation: API integration on form submission

**INT-FUT-003**: Analytics Platforms
- Google Analytics 4: Send events (impression, click, conversion)
- Facebook Pixel: Track conversions for ad attribution
- Implementation: Fire events from client-side script

---

## 11. Phased Implementation Plan

### Phase 0: Foundation (Week 1)
**Testable Checkpoint**: Dev store with basic app installed

**Deliverables**:
- Shopify app scaffold (Remix-based)
- Google Sheets API integration (read/write test)
- Basic admin UI (empty dashboard)
- Theme App Extension installed on dev store

**Acceptance Criteria**:
- Merchant can install app on dev store
- App creates Google Sheet with 6 tabs
- Admin UI loads successfully (even if empty)

---

### Phase 1: MVP - Banner Pop-up (Week 2-3)
**Testable Checkpoint**: Create and display simple banner pop-up on dev store

**Deliverables**:
1. **Pop-up Dashboard**:
   - List all pop-ups (table view)
   - Create new pop-up button
   - Basic filters (status, type)

2. **Banner Template**:
   - Pre-built banner template (full-width top bar)
   - Default content: Text + CTA button
   - Simple customization (text, colors, button link)

3. **Basic Triggers**:
   - Display: Page load + X seconds delay
   - Dismissal: Click close button OR auto-dismiss after Y seconds

4. **Storefront Rendering**:
   - Client-side script loads pop-up config from Google Sheets
   - Evaluates basic triggers (time-based only)
   - Displays banner at top of page
   - Tracks impressions/clicks to Analytics Sheet

5. **Validation**:
   - Require pop-up name
   - Require at least 1 display trigger
   - Max 10 active pop-ups

**Acceptance Criteria**:
- Merchant can create banner pop-up in admin
- Pop-up displays on dev store after X seconds
- Pop-up dismisses when close button clicked
- Impressions/clicks logged to Google Sheets
- Analytics dashboard shows basic metrics (impressions, clicks)

**Test Plan**:
1. Create banner pop-up: "Free Shipping on Orders $75+"
2. Set display trigger: 5 seconds after page load
3. Set dismissal: Close button OR 30 seconds auto-dismiss
4. Activate pop-up
5. Visit dev store homepage
6. Verify banner appears after 5 seconds
7. Click CTA button → verify click tracked
8. Close banner → verify not shown again this session
9. Open admin analytics → verify 1 impression, 1 click

---

### Phase 2: Email Capture Form + Condition Builder (Week 4-5)
**Testable Checkpoint**: Create email capture form with exit intent trigger

**Deliverables**:
1. **Form Template**:
   - Email capture modal (center placement)
   - Fields: Email input + submit button
   - Success message display
   - Email validation

2. **Advanced Display Triggers**:
   - Exit intent (mouse movement toward close/back button)
   - Scroll depth (25%, 50%, 75%, 100%)
   - User action: Add to cart, wishlist addition
   - Cart value threshold

3. **Condition Builder UI**:
   - Drag-and-drop interface
   - AND/OR logic support
   - Condition templates (First-Time Visitor, Cart Abandoner, etc.)
   - Test Condition feature

4. **Advanced Dismissals**:
   - Permanent dismissal (user-based via cookie)
   - Temporary dismissal (collapse to preview)
   - State change: Email submitted, product added to cart

5. **Pop-up Previews**:
   - Text tab or icon bubble
   - Placement options (4 corners)
   - Click to re-open pop-up

**Acceptance Criteria**:
- Merchant can create email capture pop-up
- Exit intent trigger works on desktop
- Scroll depth trigger fires at correct percentage
- Email validation prevents invalid submissions
- Permanent dismissal persists across sessions (cookie)
- Preview tab appears after temporary dismissal

**Test Plan**:
1. Create email capture pop-up: "Get 10% Off"
2. Set trigger: Exit intent OR scroll 50%
3. Set dismissal: Permanent after email submission
4. Activate pop-up
5. Visit dev store, scroll 50% → verify pop-up appears
6. Submit email → verify success message, pop-up dismisses
7. Refresh page → verify pop-up does NOT appear again
8. Clear cookies, revisit, scroll 50% → verify pop-up appears
9. Close without submitting → verify preview tab appears
10. Click preview → verify pop-up re-opens

---

### Phase 3: Gamification + Experiments (Week 6-7)
**Testable Checkpoint**: Create spin-to-win pop-up with A/B test

**Deliverables**:
1. **Gamification Template**:
   - Spin-to-win wheel (6 prize segments)
   - Email input (required to spin)
   - Prize reveal modal
   - Discount code auto-generation (Shopify integration)

2. **Experiment System**:
   - Create A/B test wizard
   - Variant editor (change headline, colors, triggers)
   - Traffic split configuration
   - Real-time results dashboard

3. **Enhanced Analytics**:
   - Experiment results (impressions, CTR, conversion rate per variant)
   - Statistical significance calculation
   - Winner recommendation
   - Apply winner action

**Acceptance Criteria**:
- Merchant can create spin-to-win pop-up
- Wheel spins and reveals prize
- Discount code auto-generated and displayed
- Merchant can create A/B test with 2 variants
- Users randomly assigned to variants
- Results dashboard shows metrics per variant
- Winner detected when statistically significant

**Test Plan**:
1. Create spin-to-win pop-up: "Spin for a Discount!"
2. Configure 6 prizes: 5%, 10%, 15%, 20%, Free Shipping, No Prize
3. Set trigger: First-time visitor + 10 seconds on site
4. Activate pop-up
5. Visit dev store (incognito) → verify pop-up appears
6. Enter email, spin wheel → verify prize revealed
7. Verify discount code displayed
8. Create A/B test: Control (original headline) vs. Variant A (new headline)
9. Simulate 100 users (50 per variant) using automated script
10. Check results → verify metrics calculated correctly
11. Apply winner → verify pop-up updated to winning variant

---

### Phase 4: Advanced Triggers + Product Integration (Week 8-9)
**Testable Checkpoint**: Create cart abandonment pop-up with dynamic product recommendations

**Deliverables**:
1. **Advanced Trigger Categories**:
   - User cohort triggers (Nth visit, VIP customers, geolocation)
   - Product-based triggers (low inventory, previously purchased, on sale)
   - Series triggers (Pop-up B after Pop-up A dismissed)

2. **Dynamic Content**:
   - Product list (from Shopify API)
   - Countdown timer
   - Stock counter ("Only 3 left!")
   - Recent purchase notifications (social proof)

3. **Shopify Integrations**:
   - Cart API: Read cart, add items, apply discounts
   - Customer API: Read customer data, detect login status
   - Product API: Fetch product data, check inventory

4. **Multi-Language Support**:
   - Detect storefront language
   - Translate pop-up content (manual or via integration)

**Acceptance Criteria**:
- Pop-up triggers based on cart value threshold
- Dynamic product recommendations displayed
- Countdown timer counts down correctly
- Low inventory alert shows accurate stock count
- Pop-up content translates based on storefront language

**Test Plan**:
1. Create cart abandonment pop-up: "Complete Your Order!"
2. Set trigger: Cart value > $50 + inactive for 30 seconds
3. Add dynamic content: Recommended products from same collection
4. Activate pop-up
5. Add $60 worth of products to cart
6. Wait 30 seconds without interaction → verify pop-up appears
7. Verify recommended products displayed correctly
8. Click "Add to Cart" on recommended product → verify added to cart
9. Test countdown timer: Set 60-second timer → verify counts down
10. Test low inventory: Create product with 3 units → verify "Only 3 left!" displays

---

### Phase 5: Polish + Performance (Week 10)
**Testable Checkpoint**: Full regression testing on dev store

**Deliverables**:
1. **Performance Optimization**:
   - Lazy load pop-up script
   - Minify and compress JS/CSS
   - Implement caching (5-minute config cache)
   - Batch analytics writes (30-second intervals)

2. **Mobile Optimization**:
   - Responsive designs for all templates
   - Touch gestures (swipe to dismiss)
   - Mobile-specific triggers (scroll-based exit intent)

3. **Accessibility**:
   - Keyboard navigation (Tab, Enter, ESC)
   - ARIA labels for screen readers
   - Focus management (trap focus in modal)
   - Color contrast compliance (WCAG AA)

4. **Error Handling**:
   - Graceful degradation (if Google Sheets unavailable)
   - User-friendly error messages
   - Retry logic for failed API calls

5. **Documentation**:
   - Merchant help center (how to create pop-ups, trigger guide)
   - Developer docs (API reference, integration guide)

**Acceptance Criteria**:
- Page load time impact < 100ms
- Pop-up script < 50KB gzipped
- All templates mobile-responsive
- Keyboard navigation works for all pop-ups
- Screen reader announces pop-up content
- App works offline (shows last cached pop-ups)

**Test Plan**:
1. Run Lighthouse audit → verify performance score > 90
2. Test on mobile devices (iOS Safari, Android Chrome) → verify responsive
3. Test keyboard navigation: Tab through fields, ESC to close → verify works
4. Test screen reader (VoiceOver on Mac) → verify announces content
5. Disconnect internet, visit dev store → verify cached pop-ups still display
6. Simulate Google Sheets API failure → verify error message shown in admin
7. Load test: Simulate 100 concurrent users → verify no performance degradation

---

### Phase 6: Production Launch (Week 11-12)
**Testable Checkpoint**: Live on Shopify App Store

**Deliverables**:
1. **App Store Listing**:
   - App name, icon, screenshots
   - Description, features, pricing
   - Support email, privacy policy, terms of service

2. **Pricing Tiers**:
   - **Free**: Up to 100 impressions/month, 1 active pop-up, basic templates
   - **Starter ($9/month)**: Up to 5,000 impressions/month, 3 active pop-ups, A/B testing
   - **Growth ($29/month)**: Up to 25,000 impressions/month, 10 active pop-ups, all features
   - **Pro ($79/month)**: Unlimited impressions, unlimited pop-ups, priority support

3. **Onboarding Flow**:
   - Welcome screen with quick-start guide
   - Prompt to create first pop-up (template selection)
   - Tutorial overlays for key features

4. **Support Infrastructure**:
   - Help center articles (FAQ, troubleshooting)
   - Email support (support@justpopit.com)
   - In-app chat widget (optional)

5. **Monitoring & Analytics**:
   - Error tracking (Sentry or similar)
   - Usage analytics (Mixpanel or similar)
   - Performance monitoring (uptime, API latency)

**Acceptance Criteria**:
- App approved by Shopify App Store review team
- At least 5 merchants successfully install and activate pop-ups
- Support tickets resolved within 24 hours
- Zero critical bugs in production

**Test Plan**:
1. Submit app for Shopify App Store review
2. Beta test with 5 friendly merchants:
   - Install app
   - Create 3 different pop-ups (banner, form, gamification)
   - Activate on live store
   - Collect feedback
3. Monitor error tracking → fix any bugs
4. Iterate based on feedback
5. Launch publicly on App Store

---

## 12. Testing Checkpoints

### 12.1 Checkpoint Summary

| Phase | Checkpoint | Test Scenario | Success Criteria |
|-------|-----------|---------------|------------------|
| **Phase 0** | App Installation | Install app on dev store | App installs, creates Google Sheet, admin UI loads |
| **Phase 1** | Banner Pop-up | Create banner, trigger on page load | Banner displays, tracks impressions/clicks |
| **Phase 2** | Email Capture | Create form, trigger on exit intent | Form displays, validates email, logs submissions |
| **Phase 3** | Gamification | Create spin-to-win, run A/B test | Wheel spins, reveals prize, experiment tracks variants |
| **Phase 4** | Advanced Triggers | Create cart abandonment pop-up | Triggers on cart value, shows dynamic products |
| **Phase 5** | Performance | Full regression testing | Page load < 100ms impact, mobile responsive, accessible |
| **Phase 6** | Production Launch | Live merchant testing | 5+ merchants successfully use app in production |

### 12.2 Continuous Testing Requirements

**Automated Tests**:
- Unit tests: 80%+ code coverage
- Integration tests: All API endpoints
- E2E tests: Critical user flows (create pop-up, activate, display on storefront)

**Manual Tests** (Before Each Release):
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile testing (iOS Safari, Android Chrome)
- Accessibility testing (keyboard nav, screen reader)
- Performance testing (Lighthouse audit)

**User Acceptance Testing**:
- Beta merchants test new features before public release
- Collect feedback via surveys and support tickets
- Iterate based on feedback

---

## 13. Non-Functional Requirements

### 13.1 Performance

**NFR-PERF-001**: Page Load Impact
- Pop-up script must add < 100ms to page load time
- Script size: < 50KB gzipped
- Lazy load: Load after `DOMContentLoaded`

**NFR-PERF-002**: API Response Time
- Admin API: < 500ms for 95% of requests
- Storefront API: < 200ms for 95% of requests
- Google Sheets API: 5-minute cache to reduce latency

**NFR-PERF-003**: Analytics Throughput
- Handle up to 100,000 events/day per merchant
- Batch writes: Max 100 events per batch, flush every 30 seconds

### 13.2 Scalability

**NFR-SCALE-001**: Concurrent Users
- Support 10,000+ concurrent merchants in admin UI
- Support 1,000,000+ concurrent storefront visitors

**NFR-SCALE-002**: Data Storage
- Google Sheets: Max 5,000,000 rows per sheet (Analytics)
- Archive old analytics data (> 90 days) to separate sheet

### 13.3 Security

**NFR-SEC-001**: Authentication
- Shopify OAuth for admin access
- Service Account OAuth for Google Sheets

**NFR-SEC-002**: Data Protection
- HTTPS for all API calls
- Sanitize user inputs (XSS prevention)
- No PII in analytics without consent (GDPR compliance)

**NFR-SEC-003**: Rate Limiting
- Google Sheets API: Respect 100 requests/100 seconds limit
- Admin API: 60 requests/minute per merchant

### 13.4 Accessibility

**NFR-A11Y-001**: WCAG 2.1 AA Compliance
- Color contrast ratio: ≥ 4.5:1 for text
- Keyboard navigation: All interactive elements focusable
- Screen reader support: ARIA labels for all UI elements

**NFR-A11Y-002**: Focus Management
- Trap focus in modal (can't tab to background elements)
- Return focus to trigger element on dismissal

### 13.5 Browser Support

**NFR-BROWSER-001**: Supported Browsers
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 13+)
- Mobile Chrome (Android 8+)

### 13.6 Internationalization

**NFR-I18N-001**: Multi-Language Support
- Admin UI: English (Phase 1), add more languages (Phase 2+)
- Pop-up content: Merchant-defined (any language)
- Detect storefront language for dynamic translations

---

## 14. Open Questions & Future Enhancements

### 14.1 Open Questions (To Resolve Before Development)

**Q1**: Google Sheets Row Limit
- **Question**: What happens when Analytics sheet exceeds 5M rows?
- **Options**:
  - A) Auto-archive old data to new sheet
  - B) Aggregate old data (daily summaries instead of raw events)
  - C) Migrate to paid database (Postgres, Firebase)
- **Decision Needed By**: Phase 0

**Q2**: Custom CSS/JS Support
- **Question**: Should advanced users be able to inject custom CSS/JS into pop-ups?
- **Risks**: Security (XSS), conflicts with theme
- **Options**:
  - A) Allow custom CSS only (safer)
  - B) Allow both CSS and JS (more flexible)
  - C) No custom code (simplest)
- **Decision Needed By**: Phase 3

**Q3**: Multi-Store Management (Agencies)
- **Question**: Should agencies be able to manage pop-ups across multiple client stores?
- **Options**:
  - A) Build agency dashboard (multi-store view)
  - B) Require separate login per store (current approach)
- **Decision Needed By**: Phase 6 (Post-Launch)

### 14.2 Future Enhancements (Post-MVP)

**FE-001**: Advanced Personalization
- Use Shopify customer data for hyper-personalization
- Example: "Welcome back, [FirstName]! Here's 10% off [FavoriteBrand]"

**FE-002**: AI-Powered Optimization
- Auto-optimize triggers based on performance data
- Example: "Exit intent performs better than scroll depth for this pop-up"

**FE-003**: Third-Party Integrations
- Klaviyo, Mailchimp, Omnisend (email sync)
- Postscript, Attentive (SMS sync)
- Google Analytics 4, Facebook Pixel (event tracking)

**FE-004**: Pop-up Series & Automation
- Multi-step pop-up journeys (Pop-up A → B → C)
- Automated sequences (e.g., "Welcome Series" for new visitors)

**FE-005**: Visual Editor Enhancements
- Drag-and-drop WYSIWYG editor (Wix-style)
- Pre-designed element library (buttons, icons, shapes)

**FE-006**: Advanced Analytics
- Cohort analysis (compare performance by user segment)
- Revenue attribution (track purchases from pop-up leads)
- Heatmaps (where users click within pop-up)

**FE-007**: White-Label Mode (Agencies)
- Remove "Powered by Just PopIt" branding
- Custom logo and colors

---

## 15. Appendices

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| **Pop-up** | Modal or overlay UI element displayed on top of page content |
| **Trigger** | Condition that activates or dismisses a pop-up |
| **Impression** | Single display of a pop-up to a user |
| **CTR (Click-Through Rate)** | Percentage of impressions that result in a click (clicks / impressions × 100) |
| **Conversion** | Desired user action (email submission, cart addition, etc.) |
| **Conversion Rate** | Percentage of impressions that result in conversion |
| **Dismissal** | Action that closes/hides a pop-up (manual or automatic) |
| **Preview** | Minimized state of pop-up (small teaser element) |
| **Overlay** | Semi-transparent background behind pop-up |
| **Z-Index** | CSS property controlling stacking order of overlapping elements |
| **Exit Intent** | Trigger based on mouse movement toward browser close/back button |
| **Experiment** | A/B test comparing multiple pop-up variants |
| **Variant** | Version of pop-up in A/B test (control, variant A, etc.) |
| **Session** | Single browsing session (ends when browser closed or after 30 min inactivity) |
| **User Cohort** | Group of users with shared characteristics (VIP customers, new visitors, etc.) |

### Appendix B: Trigger Category Reference

**Quick Reference Table**:

| Category | Trigger Types | Example Use Case |
|----------|---------------|------------------|
| **Session** | Referral source, landing page, platform, browser, cookies | Show different pop-up to Instagram visitors vs. Google visitors |
| **Time** | Time of day, day of week, season, discount running | Show "Weekend Sale" pop-up on Saturdays/Sundays |
| **User Action** | Scroll, mouse hover, add to cart, wishlist, filter usage | Show exit intent pop-up when user moves mouse to close tab |
| **Cart** | Cart value, item count, discount eligibility, shipping threshold | Show "Free shipping at $75!" when cart is $60 |
| **Cohort** | Nth visit, order history, geolocation, preferences | Show "Welcome back!" to returning visitors |
| **Product** | Low inventory, previously purchased, on sale | Show "Only 3 left!" on low-stock products |
| **Impression** | Session/user impression count | Don't show pop-up if user already saw it 3 times |
| **Series** | Sequential triggers (Pop-up A → B → C) | After email form, show discount code pop-up |

### Appendix C: Template Specifications

#### Template 1: Banner Display Pop-up

**Visual**: Full-width bar at top or bottom of page

**Default Content**:
```json
{
  "text": "Free Shipping on Orders Over $75!",
  "cta_text": "Shop Now",
  "cta_link": "/collections/all"
}
```

**Default Style**:
```json
{
  "backgroundColor": "#ff6b6b",
  "textColor": "#ffffff",
  "fontSize": "16px",
  "height": "60px",
  "position": "top"
}
```

**Default Triggers**:
- Display: Page load + 3 seconds delay
- Dismissal: Close button OR 60 seconds auto-dismiss

---

#### Template 2: Email Capture Form Pop-up

**Visual**: Center modal (400px × 500px)

**Default Content**:
```json
{
  "headline": "Get 10% Off Your First Order",
  "subtext": "Join our email list and receive exclusive offers!",
  "fields": [
    {"type": "email", "placeholder": "Enter your email", "required": true}
  ],
  "button_text": "Get Discount",
  "success_message": "Check your email for the code!"
}
```

**Default Style**:
```json
{
  "backgroundColor": "#ffffff",
  "textColor": "#333333",
  "buttonColor": "#4CAF50",
  "borderRadius": "12px",
  "width": "400px",
  "height": "500px"
}
```

**Default Triggers**:
- Display: Exit intent OR 30% scroll depth
- Dismissal: Permanent (user-based) after email submission

---

#### Template 3: Gamification Wheel Pop-up

**Visual**: Center modal (500px × 600px) with spinning wheel

**Default Content**:
```json
{
  "headline": "Spin to Win!",
  "subtext": "Try your luck for a discount",
  "prizes": [
    {"label": "5% Off", "probability": 0.3},
    {"label": "10% Off", "probability": 0.25},
    {"label": "15% Off", "probability": 0.2},
    {"label": "20% Off", "probability": 0.15},
    {"label": "Free Shipping", "probability": 0.08},
    {"label": "Better Luck Next Time", "probability": 0.02}
  ],
  "email_required": true,
  "button_text": "Spin the Wheel"
}
```

**Default Style**:
```json
{
  "wheelColors": ["#ff6b6b", "#4CAF50", "#2196F3", "#FFC107", "#9C27B0", "#FF5722"],
  "backgroundColor": "#ffffff",
  "textColor": "#333333",
  "width": "500px",
  "height": "600px"
}
```

**Default Triggers**:
- Display: First-time visitor + 10 seconds on site
- Dismissal: Permanent (user-based) after spin

---

### Appendix D: Google Sheets API Setup Guide

**For Merchants (Auto-Setup)**:
1. Install Just PopIt app from Shopify App Store
2. Click "Connect Google Sheets" in onboarding
3. Authorize app to create sheet (OAuth popup)
4. App auto-creates sheet with 6 tabs
5. Sheet ID saved to Shopify metafields
6. Done! App reads/writes data automatically

**For Developers (Manual Setup)**:
1. Create Google Cloud Project
2. Enable Google Sheets API
3. Create Service Account
4. Download JSON credentials
5. Add credentials to environment variables:
   ```
   GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_SHEETS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
   ```
6. In app code, authenticate using Service Account:
   ```javascript
   const { GoogleSpreadsheet } = require('google-spreadsheet');
   const doc = new GoogleSpreadsheet('SHEET_ID');
   await doc.useServiceAccountAuth({
     client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
     private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
   });
   ```
7. Read/write data:
   ```javascript
   await doc.loadInfo();
   const sheet = doc.sheetsByTitle['Popups'];
   const rows = await sheet.getRows();
   ```

---

### Appendix E: Analytics Event Schema

**Event Structure** (POST to `/api/storefront/track`):

```json
{
  "event_id": "uuid",
  "event_type": "impression | click | conversion | dismissal",
  "popup_id": "uuid",
  "experiment_id": "uuid (optional)",
  "variant_id": "uuid (optional)",
  "user_id": "anonymous_user_id (cookie)",
  "session_id": "session_id (sessionStorage)",
  "page_url": "https://store.myshopify.com/products/shirt",
  "page_type": "home | pdp | plp | cart | checkout | other",
  "device_type": "desktop | mobile | tablet",
  "browser": "Chrome | Firefox | Safari | Edge",
  "traffic_source": "organic | paid | direct | referral",
  "utm_source": "facebook | google | instagram (optional)",
  "utm_campaign": "summer_sale (optional)",
  "timestamp": "ISO 8601 timestamp",
  "additional_data": {
    "time_to_action": 5.2,
    "field_filled": "email",
    "button_clicked": "submit",
    "discount_code": "SUMMER10"
  }
}
```

**Event Types**:
- **impression**: Pop-up displayed to user
- **click**: User clicked CTA button or link
- **conversion**: User completed goal action (email submitted, product added to cart, etc.)
- **dismissal**: Pop-up closed (manual or automatic)

---

## 16. Developer Handoff Notes

**For Claude Code IDE**:

This PRD is designed to be ingested by Claude Code for automated implementation. Key points:

1. **Phased Approach**: Implement in 6 phases with testable checkpoints at each phase
2. **Google Sheets as DB**: Use Google Sheets API (v4) for all data storage (see Section 7 for schemas)
3. **Shopify App Structure**: Remix-based admin UI + Theme App Extension for storefront
4. **No-Code Focus**: All features must be configurable via UI (no manual code required)
5. **Validation-First**: Implement validation rules (Section 9) before feature logic
6. **Mobile-Responsive**: All pop-ups must work on mobile (test on iOS Safari, Android Chrome)

**Critical Files to Generate**:
- `/app/routes/admin.popups._index.tsx` (Pop-up dashboard)
- `/app/routes/admin.popups.new.tsx` (Pop-up creation wizard)
- `/app/components/ConditionBuilder.tsx` (Visual condition builder)
- `/app/components/PopupStudio.tsx` (Design editor)
- `/extensions/theme-app-extension/assets/popup-renderer.js` (Client-side script)
- `/app/services/googleSheets.ts` (Google Sheets API integration)
- `/app/models/popup.server.ts` (Pop-up model + validation)

**Testing Requirements**:
- Unit tests: Jest + React Testing Library
- E2E tests: Playwright (test on dev store)
- Manual tests: See Section 12 checkpoints

**Deployment**:
- Hosting: Shopify App hosting (via Shopify CLI)
- Environment variables: Google Sheets credentials, Shopify API keys

---

## 17. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-29 | Product Manager | Initial PRD draft |

---

**End of PRD**

*This document is a living document and will be updated as requirements evolve. For questions or clarifications, contact the product manager.*
