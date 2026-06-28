# 🔥 Flash Sales Event System - Complete Guide

## What Changed

The Flash Sales system has been redesigned from individual product timers to a **single Flash Sale Event** that groups multiple products together with one countdown timer.

---

## 🎯 New Structure

### Old System (Individual Timers)
- Each product had its own discount and end time
- Multiple timers shown on customer page
- Hard to manage as an "event"

### New System (Event-Based)
- **One Flash Sale Event** with a single end time
- **Multiple products** under one timer
- Each product has its own discount and inventory
- **Automatic inventory tracking** - items left decreases with sales
- Cleaner, more cohesive experience

---

## 📊 How It Works

```
Flash Sale Event
├─ End Time: June 28, 2026 at 6:00 PM
├─ Product 1
│  ├─ Discount: 25%
│  ├─ Initial Items: 100
│  └─ Items Left: 87 (auto-decreasing)
├─ Product 2
│  ├─ Discount: 30%
│  ├─ Initial Items: 50
│  └─ Items Left: 23
└─ Product 3
   ├─ Discount: 15%
   ├─ Initial Items: 200
   └─ Items Left: 198
```

---

## 🛠️ Admin Panel Usage

### Step 1: Create Flash Sale Event

1. Go to **Admin Dashboard** → **Store Settings**
2. Find **⚡ Flash Sales Event**
3. Click on **Step 1: Set Flash Sale Time Frame**
4. Select an end date and time using the date picker
5. Click **Create Event**

**Example:**
```
End Time: 2026-06-28 at 18:00
Button: Create Event
Result: Event created and ready for products
```

### Step 2: Add Products to the Event

1. In **Step 2: Add Products to Sale**
2. Select a product from the dropdown
3. Enter discount percentage (0-100)
4. Enter total items available at this discount
5. Click **Add Product**

**Example:**
```
Product: Samsung Galaxy A13
Discount: 25%
Total Items: 100
Button: Add Product
```

### Step 3: Monitor Active Products

- All products in the sale appear in **Step 3**
- Shows:
  - Product name
  - Discount percentage
  - Items sold / Total items (with progress bar)
  - Items remaining
- Progress bar fills as items sell
- Remove button to take product out of sale

---

## 📈 Inventory Management

### How Items Decrease

The system tracks items in real-time:

1. **Set Initial Items**: When you add a product, you set the total (e.g., 100)
2. **Items Left Tracks Sales**: As customers purchase, items left decreases
3. **Display Updates**: Shows "📦 X left" on customer page
4. **Automatic Calculation**: No manual updates needed

### Example Timeline

```
Time: 1:00 PM - Flash sale created with 100 items
Time: 1:15 PM - 5 customers buy → Items left: 95
Time: 2:30 PM - 12 customers buy → Items left: 83
Time: 4:00 PM - 23 customers buy → Items left: 60
Time: 5:45 PM - 10 customers buy → Items left: 50
Time: 6:00 PM - Event ends → Sale complete
```

### Manual Inventory Adjustment

**To increase items** (e.g., restocking):
1. Click "Remove" for that product
2. Click "Add Product" again with new total
3. System resets with new initial count

**To decrease manually** (accounting for returns):
1. Same as above - re-add with corrected total

---

## 👥 Customer Experience

### What They See

**Flash Sales Page:**
- Header timer showing time until sale ends (all products)
- Message: "🔥 Limited time offers with exclusive discounts!"
- Product cards showing:
  - Product image
  - Product name
  - Discounted price (calculated automatically)
  - Original price (strikethrough)
  - Discount badge (e.g., "-25%")
  - Items left indicator (e.g., "📦 50 left")

**Example Card:**
```
┌────────────────────────────────────┐
│          [Product Image]       |-25%│
│                                    │
│ Samsung Galaxy A13                 │
│ UGX 405,000  UGX 540,000           │
│ 📦 87 left                         │
│                                    │
│ Tap to view details                │
└────────────────────────────────────┘
```

### Real-Time Updates

- Timer updates every second
- Items left updates instantly when inventory changes
- Page reflects admin changes immediately
- No refresh needed

---

## 🔄 Workflow Example

### Scenario: Weekend Flash Sale

**Friday 5:00 PM - Admin Setup**
1. Creates event ending Sunday 6:00 PM
2. Adds 5 popular products:
   - Phone: 20% off, 30 items
   - Laptop: 15% off, 10 items
   - Headphones: 30% off, 50 items
   - Case: 25% off, 100 items
   - Screen Protector: 40% off, 200 items

**Saturday 2:00 PM - Sales Running**
- Customers see single timer: "45 hours 30 mins remaining"
- Each product shows its items left
- Admin can monitor progress in real-time

**Sunday 5:00 PM - Closing In**
- Timer shows: "1 hour remaining"
- Some products already sold out
- Admin can remove low-stock items if needed

**Sunday 6:00 PM - Event Ends**
- Timer reaches 00:00:00
- Page shows "Flash sale has ended"
- All products return to normal prices

---

## 🎨 Display Features

### Customer Page Display

**Active Sale:**
```
⚡ Flash Sales              [Timer: 05:30:15]
🔥 Limited time offers...

[Product 1] [Product 2] [Product 3] [Product 4]
```

**Sold Out Product:**
```
┌─────────────┐
│ [Image]  |-25%
│ Product  │
│ UGX 123K │
│ 📦 Sold Out
└─────────────┘
```

**No Active Sale:**
```
No active flash sale at the moment.
```

### Admin Display

**Event Status:**
```
Current Event: Active until June 28, 6:00 PM (4 products)

Product 1: 25 sold / 100 total | 75 left [████░░] [Remove]
Product 2: 40 sold / 50 total  | 10 left [████████] [Remove]
Product 3: 15 sold / 60 total  | 45 left [██░░░░░] [Remove]
```

---

## ⚙️ Best Practices

### Timing Strategy

| Type | Duration | Discount | Items | Best For |
|------|----------|----------|-------|----------|
| Flash | 2-4 hours | 30-50% | 10-30 | High urgency |
| Daily Deal | 6-12 hours | 20-35% | 50-100 | Regular promotion |
| Weekend | 24-48 hours | 15-25% | 100+ | Volume sales |

### Item Count Tips

- **Low count = High urgency**: 10-20 items for premium products
- **Medium count = Good engagement**: 50-100 items for popular products
- **High count = Volume play**: 150-300 items for commodity products
- **Always undercount reality**: If you have 100, set 80 to create scarcity

### Pricing Strategy

1. **Calculate real discount**: Original × (1 - discount%)
2. **Ensure profit margin**: Never go below cost
3. **Competitive pricing**: Match or beat competitors
4. **Psychological pricing**: Use 5%, 15%, 25%, 35% discounts

---

## 📱 Technical Details

### Database Structure

```
config/store document:
{
  currentFlashEvent: {
    endTime: 1719600000000,  // Timestamp
    createdAt: 1719568000000,
    products: [
      {
        productId: "abc123",
        discountPercent: 25,
        initialItems: 100,
        itemsLeft: 87
      },
      {
        productId: "def456",
        discountPercent: 30,
        initialItems: 50,
        itemsLeft: 23
      }
    ]
  }
}
```

### Product Updates

When you add a product to flash sale:
- `products/{productId}.discount_percent` → Updated with discount
- `products/{productId}.in_flash_sale` → Set to true

When you remove:
- `products/{productId}.discount_percent` → Reset to 0
- `products/{productId}.in_flash_sale` → Set to false

---

## 🐛 Troubleshooting

### Products Not Appearing

1. Check if products exist in database
2. Verify product IDs are correct
3. Confirm event hasn't ended
4. Refresh the customer page

### Items Not Decreasing

1. Check if orders are being recorded
2. Verify Firebase write permissions
3. Check if product is still in active event
4. Review database structure

### Timer Not Showing

1. Refresh the page
2. Check browser console for errors
3. Verify event end time is in future
4. Check internet connection

### Event Won't Create

1. Select a future date/time
2. Check if event already active
3. Check database permissions
4. Verify Firebase is initialized

---

## ✅ Checklist Before Launch

- [ ] Event end time is in the future
- [ ] All products selected are in stock
- [ ] Discounts are competitive but profitable
- [ ] Item counts are realistic
- [ ] Tested on customer page
- [ ] Verified timer counts down
- [ ] Checked product prices display correctly
- [ ] Confirmed items left show accurately
- [ ] All navigation links work

---

## 📞 Quick Reference

### Admin Actions

| Action | Steps |
|--------|-------|
| Create Event | Step 1 → Select date → Create Event |
| Add Product | Step 2 → Select product → Discount → Items → Add |
| Remove Product | Step 3 → Find product → Click Remove |
| End Event | Click "End Event" button |
| Update Product | Remove → Re-add with new values |

### Customer Actions

| Action | Steps |
|--------|-------|
| View Sale | Home → Flash Sales (or direct URL) |
| Check Timer | See countdown in header |
| Check Items Left | See "📦 X left" on card |
| View Product | Click card → Product details |

---

**Last Updated**: June 28, 2026
**Version**: 2.0 (Event-Based System)
