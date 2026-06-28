# 🎨 Flash Sales System - Visual Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        FIRESTORE DATABASE                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  config/store document:                                  │  │
│  │                                                          │  │
│  │  currentFlashEvent: {                                   │  │
│  │    endTime: 1719600000000,                             │  │
│  │    products: [                                         │  │
│  │      { productId, discountPercent, initialItems,      │  │
│  │        itemsLeft },                                   │  │
│  │      ...                                              │  │
│  │    ]                                                  │  │
│  │  }                                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
              ▲                                    ▲
              │                                    │
              │ (Read/Write)                       │ (Read Only)
              │                                    │
    ┌─────────┴──────────┐              ┌─────────┴──────────┐
    │                    │              │                    │
┌───┴───────────────────▼──┐    ┌───────┴──────────────────▼──┐
│    ADMIN DASHBOARD       │    │   CUSTOMER PAGE            │
│                          │    │                            │
│  Step 1: Set Time        │    │  ⚡ Flash Sales            │
│  └─ Date/Time picker     │    │  Timer: [00:05:30]        │
│  └─ Create/End Event     │    │                            │
│                          │    │  Product Grid:            │
│  Step 2: Add Products    │    │  ├─ Product 1 (-25%)     │
│  └─ Select product       │    │  │  UGX X  📦 85 left    │
│  └─ Discount %           │    │  │                        │
│  └─ Items count          │    │  ├─ Product 2 (-30%)     │
│                          │    │  │  UGX X  📦 42 left    │
│  Step 3: Monitor         │    │  │                        │
│  └─ Progress bars        │    │  └─ Product 3 (-15%)     │
│  └─ Remove products      │    │     UGX X  📦 50 left    │
│                          │    │                            │
│  Step 4: Update Sales    │    │  [Updates in Real-Time]  │
│  └─ Manual inventory     │    │                            │
│     updates              │    │                            │
└────────────────────────────┘    └──────────────────────────┘
```

---

## Complete User Workflow

### Admin (4-Step Process)

```
📱 ADMIN DASHBOARD

┌─ STEP 1: SET TIMEFRAME ──────────────────────┐
│                                               │
│  🔥 Flash Sales Event Setup                 │
│                                               │
│  Select End Time:                            │
│  ┌─────────────────────────────────────┐    │
│  │ June 28, 2026 at 6:00 PM           │    │
│  └─────────────────────────────────────┘    │
│                                               │
│  [Create Event] [End Event]                 │
│                                               │
│  Current Event: Active until June 28 at 6PM │
└───────────────────────────────────────────────┘
              ↓
┌─ STEP 2: ADD PRODUCTS ───────────────────────┐
│                                               │
│  Select Product: [Samsung Galaxy ▼]          │
│  Discount %:     [25]%                       │
│  Total Items:    [100]                       │
│                                               │
│  [Add Product]                               │
│                                               │
│  (Repeat to add more products)               │
└───────────────────────────────────────────────┘
              ↓
┌─ STEP 3: MONITOR INVENTORY ──────────────────┐
│                                               │
│  Samsung Galaxy                              │
│  Discount: 25% | Sold: 15/100 | Left: 85   │
│  ████░░░░░░░░░░░░░░ [Remove]                │
│                                               │
│  iPhone 15 Pro                               │
│  Discount: 30% | Sold: 8/50 | Left: 42     │
│  ████░░░░░░░░░░░░░░░░░░░░ [Remove]         │
│                                               │
│  Headphones                                  │
│  Discount: 40% | Sold: 25/150 | Left: 125  │
│  ██████░░░░░░░░░░░░░░░░░░ [Remove]         │
│                                               │
│  (Shows in real-time)                        │
└───────────────────────────────────────────────┘
              ↓
┌─ STEP 4: UPDATE AFTER SALES ─────────────────┐
│                                               │
│  Select Product: [Samsung Galaxy ▼]          │
│  Items Sold:     [5]                         │
│                                               │
│  [Update Items Sold]                         │
│                                               │
│  Result: 85 → 80 items left                 │
│  ✅ Items sold updated!                     │
│  (Customers see immediately)                 │
└───────────────────────────────────────────────┘
```

---

## Customer Experience Timeline

```
TIME: 1:00 PM - FLASH SALE STARTS
┌────────────────────────────────────────┐
│  ⚡ FLASH SALES          [5:00:00]     │
│  🔥 Limited time offers!               │
│                                        │
│  [Samsung]    [iPhone]    [Headphones]│
│  -25%         -30%        -40%        │
│  405,000      840,000     18,000      │
│  📦 100 left  📦 50 left  📦 150 left│
└────────────────────────────────────────┘

TIME: 2:30 PM - 15 ITEMS SOLD
[Admin Updates: Sold 15]
                    ↓
┌────────────────────────────────────────┐
│  ⚡ FLASH SALES          [3:30:00]     │
│  🔥 Limited time offers!               │
│                                        │
│  [Samsung]    [iPhone]    [Headphones]│
│  -25%         -30%        -40%        │
│  405,000      840,000     18,000      │
│  📦 85 left   📦 50 left  📦 150 left│ ← UPDATED!
└────────────────────────────────────────┘

TIME: 4:45 PM - MORE SALES
[Admin Updates: Sold 8 iPhones, 25 Headphones]
                    ↓
┌────────────────────────────────────────┐
│  ⚡ FLASH SALES          [1:15:00]     │
│  🔥 Limited time offers!               │
│                                        │
│  [Samsung]    [iPhone]    [Headphones]│
│  -25%         -30%        -40%        │
│  405,000      840,000     18,000      │
│  📦 85 left   📦 42 left  📦 125 left│ ← UPDATED!
└────────────────────────────────────────┘

TIME: 5:58 PM - 2 MINUTES LEFT
┌────────────────────────────────────────┐
│  ⚡ FLASH SALES          [0:02:00]     │ ← URGENT!
│  🔥 Limited time offers!               │
│                                        │
│  [Samsung]    [iPhone]    [Headphones]│
│  -25%         -30%        -40%        │
│  405,000      840,000     18,000      │
│  📦 75 left   🚫 SOLD OUT  📦 98 left│
└────────────────────────────────────────┘

TIME: 6:00 PM - SALE ENDS
┌────────────────────────────────────────┐
│                                        │
│  Flash sale has ended.                │
│  Check back soon!                      │
│                                        │
│  [Back to Store]                       │
│                                        │
└────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
CUSTOMER BUYS PRODUCT
          ↓
    [Order Created]
          ↓
   ADMIN SEES SALE
          ↓
┌─ Enters items sold count
│  (e.g., 5 items)
│         ↓
│  [Update Items Sold]
│         ↓
├─ System processes update
│         ↓
├─ Database updated:
│  ├─ itemsLeft: 85 → 80
│  ├─ Event timestamp updated
│  └─ Stored in Firestore
│         ↓
├─ All listeners notified
│  ├─ Admin panel refreshes
│  └─ Customer page refreshes
│         ↓
└─ CUSTOMERS SEE:
   📦 Inventory updated
   [No page refresh needed]
   ✓ Real-time update!
```

---

## Product Card Visual Examples

### ACTIVE PRODUCT
```
┌─────────────────────────────┐
│                       |-25% │  ← Discount Badge
│    [Product Image]          │
│                             │
│ Samsung Galaxy A13          │ ← Product Name
│                             │
│ UGX 405,000                 │ ← Discounted Price
│ UGX 540,000 (strikethrough) │ ← Original Price
│                             │
│ 📦 85 left                  │ ← Items Left
└─────────────────────────────┘
    [Hover: Lift & Glow]
```

### SOLD OUT PRODUCT
```
┌─────────────────────────────┐
│                       |-40% │
│    [Product Image]          │
│                             │
│ Headphones Pro              │
│                             │
│ UGX 18,000                  │
│ UGX 30,000 (strikethrough)  │
│                             │
│ 📦 Sold Out                 │ ← Sold Out Indicator
└─────────────────────────────┘
```

### LAST ITEM PRODUCT
```
┌─────────────────────────────┐
│                       |-30% │
│    [Product Image]          │
│                             │
│ iPhone 15 Pro               │
│                             │
│ UGX 840,000                 │
│ UGX 1,200,000 (strikethrough)
│                             │
│ 📦 1 left                   │ ← URGENT: Last Item!
└─────────────────────────────┘
```

---

## Admin Progress Tracking

```
THREE PRODUCTS IN SALE:

SAMSUNG GALAXY (25% off)
Sold: ████░░░░░░ (15 of 100)
Remaining: 85 items (85%)

IPHONE 15 PRO (30% off)
Sold: ████████░░ (40 of 50)
Remaining: 10 items (20%) ← ALMOST GONE!

HEADPHONES (40% off)
Sold: ███░░░░░░░ (25 of 150)
Remaining: 125 items (83%)
```

---

## Real-Time Sync Visualization

```
Admin Dashboard          Firestore Database          Customer Page
    ┌──────┐                 ┌──────┐                   ┌──────┐
    │      │                 │      │                   │      │
    │ Sets │                 │      │                   │      │
    │ Sale │ ─────Write────→ │ Data │ ───Listen────→  │Shows │
    │      │ Discount=25%    │      │   itemsLeft=85  │Timer │
    │      │ itemsLeft=100   │      │                   │Cards │
    │      │                 │      │                   │      │
    └──────┘                 └──────┘                   └──────┘
       ▲                         │
       │                         │
       │                    Updates every second
       │                         │
       ├─────Listener runs───────┘
       │
    Progress bars
    refresh in real-time
```

---

## Configuration Example

### Example Flash Sale Event

```json
{
  "currentFlashEvent": {
    "endTime": 1719600000000,        // June 28, 6:00 PM
    "createdAt": 1719568000000,
    "products": [
      {
        "productId": "phone_123",
        "discountPercent": 25,
        "initialItems": 100,
        "itemsLeft": 85
      },
      {
        "productId": "laptop_456",
        "discountPercent": 30,
        "initialItems": 50,
        "itemsLeft": 42
      },
      {
        "productId": "headphones_789",
        "discountPercent": 40,
        "initialItems": 150,
        "itemsLeft": 125
      }
    ]
  }
}
```

---

## Step-by-Step Admin Actions

```
ACTION 1: CREATE EVENT
Input:  June 28, 2026 at 6:00 PM
Output: currentFlashEvent created
Status: Ready for products

          ↓

ACTION 2: ADD PRODUCT 1
Input:  productId=phone_123, discount=25%, items=100
Output: Product added to products array
Status: itemsLeft initialized to 100

          ↓

ACTION 3: ADD PRODUCT 2
Input:  productId=laptop_456, discount=30%, items=50
Output: Product added to products array
Status: 2 products now in sale

          ↓

ACTION 4: ADD PRODUCT 3
Input:  productId=headphones_789, discount=40%, items=150
Output: Product added to products array
Status: 3 products now in sale

          ↓

LIVE: CUSTOMERS SEE
- Single timer counting down
- 3 products with discounts
- Real-time inventory

          ↓

ACTION 5: UPDATE SALES
Input:  productId=phone_123, sold=15
Output: itemsLeft = 100 - 15 = 85
Status: Updated in database
Result: Customers see "📦 85 left"

          ↓

ACTION 6: UPDATE SALES
Input:  productId=laptop_456, sold=8
Output: itemsLeft = 50 - 8 = 42
Status: Updated in database
Result: Customers see "📦 42 left"

          ↓

ACTION 7: END EVENT (Optional)
Input:  Click "End Event" button
Output: currentFlashEvent deleted
Status: Sale complete
Result: Customers see "Flash sale has ended"
```

---

## Inventory State Transitions

```
CREATE EVENT
        ↓
    [Event Created]
    itemsLeft: 100
        ↓
    [Customers Browse]
        ↓
    [5 Sales]
    [Admin: +5 sold]
        ↓
    itemsLeft: 95
    [Customers see: 📦 95 left]
        ↓
    [8 More Sales]
    [Admin: +8 sold]
        ↓
    itemsLeft: 87
    [Customers see: 📦 87 left]
        ↓
    [42 More Sales]
    [Admin: +42 sold]
        ↓
    itemsLeft: 45
    [Customers see: 📦 45 left]
        ↓
    [45 More Sales]
    [Admin: +45 sold]
        ↓
    itemsLeft: 0
    [Customers see: 📦 Sold Out]
        ↓
    [Timer Expires OR Admin Ends Event]
        ↓
    EVENT COMPLETE
```

---

## Success Metrics Dashboard

```
FLASH SALE PERFORMANCE

⏱️  Time Remaining: 00:45:30

📊 SALES BY PRODUCT:

Samsung Galaxy (25% off)
├─ Started: 100 items
├─ Sold: 25 items (25%)
├─ Remaining: 75 items
├─ Revenue: ~$1,875 (est)
└─ Velocity: 1 item/min

iPhone 15 Pro (30% off)
├─ Started: 50 items
├─ Sold: 48 items (96%) ← ALMOST SOLD OUT!
├─ Remaining: 2 items
├─ Revenue: ~$1,008 (est)
└─ Velocity: 4 items/min

Headphones (40% off)
├─ Started: 150 items
├─ Sold: 35 items (23%)
├─ Remaining: 115 items
├─ Revenue: ~$630 (est)
└─ Velocity: 1.4 items/min

TOTALS
├─ Total Items Sold: 108
├─ Total Revenue: ~$3,513
└─ Estimated Completion: In 45 minutes
```

---

## Mobile View Example

```
┌─────────────────────────┐
│ Jefram Stores    [MENU] │
├─────────────────────────┤
│                         │
│ ⚡ FLASH SALES          │
│ [Timer: 03:45:12] ◀───  │
│                         │
│ 🔥 Limited time offers! │
│                         │
├─────────────────────────┤
│                         │
│  ┌─────────────────────┐│
│  │ [Samsung]      |-25%││
│  │ [Image]             ││
│  │ 405K | 540K         ││
│  │ 📦 85 left          ││
│  └─────────────────────┘│
│                         │
│  ┌─────────────────────┐│
│  │ [iPhone]       |-30%││
│  │ [Image]             ││
│  │ 840K | 1.2M         ││
│  │ 📦 42 left          ││
│  └─────────────────────┘│
│                         │
│  ┌─────────────────────┐│
│  │ [Headphones]   |-40%││
│  │ [Image]             ││
│  │ 18K | 30K           ││
│  │ 📦 50 left          ││
│  └─────────────────────┘│
│                         │
│         [Scroll]        │
│                         │
└─────────────────────────┘
```

---

## Summary

This visual guide shows:
✅ Complete system architecture
✅ User workflows (admin & customer)
✅ Data flow and real-time sync
✅ Product card designs
✅ Inventory tracking
✅ Admin progress monitoring
✅ Mobile responsiveness
✅ State transitions
✅ Performance metrics

All working together in one cohesive system! 🎉

