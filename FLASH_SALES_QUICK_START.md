# 🔥 Flash Sales Event System - Quick Start Guide

## 🎯 What You Need to Know

The new Flash Sales system has **ONE single timer** for all products, with automatic inventory tracking.

```
Instead of:
- Product A: 25% off, ends 6:00 PM
- Product B: 30% off, ends 6:30 PM
- Product C: 15% off, ends 7:00 PM

You now have:
⚡ FLASH SALE EVENT
   └─ Ends at: 6:00 PM (ONE timer for all)
      ├─ Product A: 25% off (100 items)
      ├─ Product B: 30% off (50 items)
      └─ Product C: 15% off (200 items)
```

---

## ⚡ 4-Step Setup Process

### Step 1️⃣: Create Flash Sale Event Time Frame

**What to do:**
1. Go to Admin Dashboard → Store Settings → ⚡ Flash Sales Event
2. Click the date picker next to "Set Flash Sale Time Frame"
3. Select a **future date and time** (when the sale should end)
4. Click **Create Event**

**Example:**
```
Selecting: June 28, 2026 at 6:00 PM
Action: Create Event
Result: ✅ Event created and ready!
```

**What appears:**
- Current Event: `Active until June 28, 2026, 6:00:00 PM` (in green)

---

### Step 2️⃣: Add Products to the Event

**What to do:**
1. In "Add Products to Sale" section
2. **Select Product**: Choose from dropdown
3. **Enter Discount**: Type percentage (0-100)
4. **Enter Total Items**: How many available at this price
5. Click **Add Product**

**Example:**
```
Product: Samsung Galaxy A13
Discount: 25%
Total Items: 100
Action: Add Product
Result: ✅ Product added!
```

**Repeat**: Add multiple products (as many as you want)

---

### Step 3️⃣: Monitor Active Products

**What you see:**
- List of all products in this sale
- For each product:
  - **Items Sold**: How many have sold
  - **Total Items**: Original count
  - **Items Left**: Real-time remaining
  - **Progress Bar**: Visual indication
  - **Remove Button**: To take product out

**Example Display:**
```
Samsung Galaxy A13
Discount: 25% | Sold: 15 / 100 | Left: 85
████░░░░░░░░░ [Remove]

iPhone 15 Pro
Discount: 30% | Sold: 8 / 50 | Left: 42
████░░░░░░░░░░░ [Remove]
```

**Monitor in Real-Time:**
- Items left updates as customers buy
- Progress bar fills up
- System tracks automatically

---

### Step 4️⃣: Adjust Inventory When Items Sell

**What to do:**
1. When customers purchase items
2. In "Adjust Inventory" section
3. **Select Product**: Choose which product
4. **Sold Count**: Enter how many sold (e.g., 5)
5. Click **Update Items Sold**

**Example:**
```
5 customers just bought the Samsung phone
Product: Samsung Galaxy A13
Sold: 5
Action: Update Items Sold
Result: ✅ Items Left: 80 (was 85)
```

**How it works:**
- If you say 5 sold → Items Left decreases by 5
- If 10 sold → Items Left decreases by 10
- Shows in real-time to customers

---

## 👥 What Customers See

### On Flash Sales Page

**Header:**
```
⚡ Flash Sales              [Timer: 05:30:45]
🔥 Limited time offers with exclusive discounts!
```

**Product Cards:**
```
┌─────────────────────────────────────┐
│          [Product Image]        |-25%│
│                                     │
│ Samsung Galaxy A13                  │
│ UGX 405,000  UGX 540,000            │
│ 📦 85 left                          │
│                                     │
│ [Click to view details]             │
└─────────────────────────────────────┘
```

**Real-Time Updates:**
- Timer counts down every second
- Items left decreases as people buy
- Sold out products show "📦 Sold Out"
- No page refresh needed

---

## 📊 Complete Workflow Example

### Friday 5:00 PM - Setup

**You:**
1. Create Event ending Sunday 6:00 PM ✅
2. Add Phone: 20% discount, 30 items ✅
3. Add Laptop: 15% discount, 10 items ✅
4. Add Headphones: 30% discount, 50 items ✅

**Admin Panel Shows:**
```
⚡ FLASH SALE EVENT
Current Event: Active until Sunday, 6:00 PM

Phone
Discount: 20% | Sold: 0 / 30 | Left: 30 [░░░░░░░]

Laptop
Discount: 15% | Sold: 0 / 10 | Left: 10 [░░░░░░░]

Headphones
Discount: 30% | Sold: 0 / 50 | Left: 50 [░░░░░░░]
```

### Saturday 2:00 PM - Sales Running

**Customers buying:**
- 5 people buy phones
- 2 people buy laptops
- 8 people buy headphones

**You update inventory:**
1. Select Phone → Sold: 5 → Update ✅
2. Select Laptop → Sold: 2 → Update ✅
3. Select Headphones → Sold: 8 → Update ✅

**Admin Panel Now Shows:**
```
Phone
Discount: 20% | Sold: 5 / 30 | Left: 25 [████░░░]

Laptop
Discount: 15% | Sold: 2 / 10 | Left: 8 [██████░]

Headphones
Discount: 30% | Sold: 8 / 50 | Left: 42 [████░░░]
```

**Customers See:**
```
⚡ Flash Sales              [Timer: 29:15:30]
📦 Phone: 25 left
📦 Laptop: 8 left
📦 Headphones: 42 left
```

### Sunday 5:50 PM - Almost Over

**Customers see:**
```
⚡ Flash Sales              [Timer: 00:10:00]
📦 Phone: 15 left (HURRY!)
📦 Laptop: Sold Out! 🚫
📦 Headphones: 28 left
```

**You (optional) can:**
- Remove Laptop (already sold out)
- Let timer run to completion
- Or click "End Event" manually

### Sunday 6:00 PM - Event Ends

**Customers see:**
```
Flash sale has ended.
Check back soon!
```

**Products return to normal prices**

---

## 🎨 Key Features

| Feature | How It Works |
|---------|-------------|
| **Single Timer** | All products end at the same time |
| **Real-Time Inventory** | Items left updates instantly |
| **One Discount Per Product** | Each product can have different discount |
| **Progress Tracking** | Admin sees sales progress with bar chart |
| **Automatic Updates** | Customers see changes without refresh |
| **Easy Control** | 4 simple steps to manage everything |

---

## ⚙️ Smart Tips

### Pricing Strategy

**Quick Flash (2 hours):**
```
- Discount: 30-50%
- Items: 10-20
- Goal: Maximum urgency & traffic
```

**Daily Deal (6-12 hours):**
```
- Discount: 20-35%
- Items: 50-100
- Goal: Good sales volume
```

**Weekend Special (24-48 hours):**
```
- Discount: 15-25%
- Items: 100-300
- Goal: Maximum volume
```

### Inventory Tips

1. **Always undercount**: If you have 100, set 80 to create urgency
2. **Watch progress**: If selling faster than expected, you can manually reduce items
3. **Mix products**: Different discounts keep customers interested
4. **Stock the popular items**: Put most inventory on your best sellers

### Time Selection

- **Best times**: 5 PM - 10 PM (evening shopping)
- **Weekends**: Longer sales (24+ hours)
- **Holidays**: Extended duration for traffic
- **Avoid early morning**: Sales between 6 AM - 12 PM are slower

---

## 🔴 Important Notes

### Before Creating Event

✅ Do:
- Select a **future** date/time
- Ensure products exist in your store
- Have realistic inventory counts
- Plan your discounts ahead

❌ Don't:
- Use past dates (system rejects them)
- Set discount above your cost
- Create event without products to add
- Forget to end event when done

### While Event is Running

✅ Do:
- Monitor sales in real-time
- Update inventory as items sell
- Watch for items selling faster than expected
- Remove products if they sell out

❌ Don't:
- Create a new event while one is active
- Forget to manually update inventory
- Leave event running after it should end
- Set items left to 0 (means sold out)

### After Event Ends

✅ Do:
- Click "End Event" to clean up
- Review sales performance
- Plan next flash sale
- Thank customers

❌ Don't:
- Leave old event showing
- Start new event with same products immediately
- Forget to reset discounts to 0

---

## 📱 Real-Time Inventory Tracking

### How It Updates

1. **Customer buys** → Order placed ✅
2. **You update inventory** → Enter sold count
3. **System processes** → Items left decreases
4. **Customer sees immediately** → No refresh needed

### Example Timeline

```
2:00 PM - 5 people buy
          [You enter: Sold 5]
          System: 85 → 80 items left

2:15 PM - 3 more people buy
          [You enter: Sold 3]
          System: 80 → 77 items left

2:30 PM - 8 people buy
          [You enter: Sold 8]
          System: 77 → 69 items left
```

### Tracking Method

**Manual Updates (Current):**
- You enter sold count manually
- Good for understanding sales pace
- Simple to manage

**Automatic (Future):**
- Can integrate with order system
- Updates automatically on checkout
- Zero manual work

---

## ❓ Common Questions

### Q: What if I create an event but change my mind?
**A:** Click "End Event" button. It stops the sale immediately.

### Q: Can I add/remove products after event starts?
**A:** Yes! You can add more products or remove any during the event.

### Q: What happens if I set items to 0?
**A:** Product shows as "Sold Out" but is still in the sale.

### Q: Can inventory go negative?
**A:** No, system prevents negative numbers. Min is 0.

### Q: How do customers know items are selling?
**A:** They see "📦 X left" indicator on product cards.

### Q: Do I need to refresh to see changes?
**A:** No! Admin panel and customer page update automatically.

### Q: Can I have multiple events at once?
**A:** No, only one event can be active. End current before creating new.

### Q: What time should I create the event?
**A:** 30-60 minutes before the end time you selected is best.

---

## ✅ Launch Checklist

Before going live:

- [ ] Event time is set correctly
- [ ] All products are in stock
- [ ] Discounts are profitable
- [ ] Item counts are realistic (undercount by 20%)
- [ ] Tested timer on customer page
- [ ] Verified prices calculate correctly
- [ ] Checked "Items left" shows accurately
- [ ] Confirmed products appear in grid
- [ ] All navigation works
- [ ] Ready to monitor sales

---

## 🚀 Quick Reference

### Admin Actions

```
Create Event → Set date/time → Click Create Event
Add Product → Select product → Discount → Items → Add Product
Update Sales → Select product → Enter sold count → Update
Monitor → See progress bars and inventory
End Event → Click "End Event" button
```

### Customer View

```
Visit /public/flash-sales.html
See single countdown timer
See all products in one place
Click products for details
See real-time inventory count
```

---

**Ready to launch your first Flash Sale Event? Follow the 4 steps above!** 🎉

