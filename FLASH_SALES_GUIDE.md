# 🔥 Flash Sales Management Guide

## Overview
The Flash Sales feature allows you to create time-limited sales with specific discounts on selected products. Customers will see flash sale products with countdown timers and discounted prices.

---

## 📊 What Customers See

### Flash Sales Page (`/public/flash-sales.html`)
- **Countdown Timer**: Shows the time remaining until the earliest flash sale ends
- **Product Cards Display**:
  - 📸 Product image
  - 📝 Product name
  - 💰 Current discounted price
  - 🏷️ Original price (strikethrough)
  - 🏷️ Discount percentage badge (-X%)
  - 📦 Items left indicator (if set)

---

## 🛠️ Admin Panel Flash Sales Setup

### Location
Navigate to the **Admin Dashboard** → **Store Settings** → **⚡ Flash Sales**

### How to Create a Flash Sale

#### Step 1: Select a Product
- Click the product dropdown (`Select a product...`)
- Choose the product you want to put on flash sale

#### Step 2: Set Discount Percentage
- Enter the discount percentage (0-100%)
- Example: Enter `20` for 20% off
- The discounted price will automatically calculate on the customer side

#### Step 3: Set Items Left (Optional)
- Enter the number of items available at the discounted price
- Example: `50` means only 50 items can be sold at this discount
- Customers will see "📦 50 left" indicator
- Leave empty or 0 if unlimited

#### Step 4: Set End Time
- Click the date/time picker
- Select when the flash sale should end
- The timer will display countdown until the earliest end time
- Customers will see the countdown on the flash sales page

#### Step 5: Add the Flash Sale
- Click the **Add** button
- The flash sale is now live and visible to customers

### Example Scenario

```
Product: Samsung Galaxy A13
Discount: 25%
Items Left: 100
End Time: 2026-06-28 at 18:00

Result on customer side:
- Price: ~UGX 405,000 (was 540,000)
- Badge: "-25%"
- Indicator: "📦 100 left"
- Timer: Counts down to 18:00
```

---

## 🔄 Managing Existing Flash Sales

### View All Active Flash Sales
- All active flash sales are listed in the **⚡ Flash Sales** section
- Each shows:
  - Product name
  - Discount percentage
  - Items left
  - End time

### Update a Flash Sale
- Select the same product and click **Add** again with new values
- The previous flash sale for that product will be replaced

### Remove a Flash Sale
- Click the **Remove** button next to the product
- The product will no longer appear on the flash sales page
- Discount will be removed from the product

---

## ⏱️ Timer Management

### Store-Wide Discount Timer (Optional)
In **Store Settings** → **🔥 Discount Timer**, you can set a general store-wide timer that displays separately from flash sales.

### Flash Sale Individual Timers
- Each flash sale has its own end time
- The flash sales page shows the **earliest end time** in the header
- When one flash sale expires, the timer adjusts to the next earliest
- Expired flash sales are automatically hidden

---

## 💡 Best Practices

### Pricing Strategy
1. **Calculate Discount Properly**
   - Original price: UGX 100,000
   - 20% discount = UGX 80,000 (not entered as final price)

2. **Set Realistic Items Left**
   - Creates urgency without being misleading
   - Example: 50-100 items for popular products
   - Example: 20-30 items for niche products

3. **Timing Strategy**
   - Peak hours: 6 PM - 10 PM (evening shopping)
   - Weekends: Extended flash sales
   - Duration: 2-6 hours for regular flash sales
   - Minimum: 1 hour flash sales
   - Maximum: 24 hours for "Daily Deals"

### Examples

**Quick Flash Sale (High Urgency)**
- Duration: 2 hours
- Discount: 30-40%
- Items: 10-20

**Daily Deal (Moderate Urgency)**
- Duration: 6 hours
- Discount: 15-25%
- Items: 50-100

**Weekly Special (Low Urgency)**
- Duration: 24 hours
- Discount: 10-20%
- Items: Unlimited

---

## 🐛 Troubleshooting

### Flash Sales Not Showing
1. Check if products are added to the store
2. Verify discount % is set (0-100)
3. Ensure end time is in the future
4. Refresh the flash sales page

### Timer Not Updating
- The timer updates every second automatically
- If stuck, refresh the page
- Check browser console for errors

### Discount Not Applied
1. Verify discount % was entered
2. Check if product exists
3. The system updates `discount_percent` field automatically

### Items Left Not Showing
- Enter a number greater than 0
- Leave empty or 0 for unlimited
- Refresh page to see changes

---

## 📱 Customer Navigation

### Access Flash Sales
1. Home page → Click "Flash Sales" in navigation
2. Direct link: `/public/flash-sales.html`
3. Card click → Goes to product detail page

### What They See
- All products with active flash sales
- Real-time countdown timer
- Discounted prices
- Original prices for comparison
- Item availability

---

## 🚀 Advanced Features

### API Integration
Flash sales are stored in Firebase Firestore:
```
Database: config/store
Field: flashSales (array)

Structure:
{
  productId: "product_id",
  discountPercent: 25,
  itemsLeft: 100,
  endTime: 1719586800000  // Timestamp
}
```

### Real-Time Updates
- Changes appear immediately on customer pages
- No refresh needed for timer updates
- Firestore listeners auto-sync data

---

## ✅ Checklist Before Going Live

- [ ] Selected products are popular/fast-moving
- [ ] Discount is competitive but profitable
- [ ] Items left number is realistic
- [ ] End time is set to future
- [ ] Tested on customer-facing page
- [ ] Verified discounted prices are correct
- [ ] Checked timer counts down correctly

---

## 📞 Support

If you encounter any issues:
1. Check browser console (F12) for errors
2. Verify Firebase connection
3. Refresh the admin page
4. Try a different product
5. Check product data in database

---

**Last Updated**: June 28, 2026
**Version**: 1.0
