Here is a comprehensive, high-fidelity description of the dashboard interface, structured specifically for an AI model (like Mimo v2.5) to understand the layout, styling, components, and content for a Next.js reconstruction.

### **1. Global Design System & Theme**
*   **Theme:** Dark Mode (Deep Slate/Charcoal).
*   **Background Color:** The main canvas is a very dark blue-grey, approximately `#13151A`. The outer margin is a slightly lighter dark blue `#1E222D`.
*   **Card Backgrounds:** All panels/cards use a slightly lighter dark grey/blue, approximately `#1E212B` or `#252836`, with subtle rounded corners (border-radius approx `16px` or `20px`).
*   **Typography:** Sans-serif font (likely Inter or Roboto). Text is primarily White (`#FFFFFF`) for headings/values and Light Grey (`#9CA3AF`) for labels/subtitles.
*   **Language:** The interface uses a mix of **English** and **Bengali (Bangla)**.
*   **Accents:**
    *   **Positive/Success:** Bright Green (`#00E396` or `#10B981`).
    *   **Negative/Danger:** Red (`#EF4444`).
    *   **Primary Brand/Highlight:** A gradient of Indigo to Violet (`#4F46E5` to `#7C3aed`).

---

### **2. Layout Structure (Grid)**
The dashboard follows a complex grid layout:
*   **Top Bar:** Full width navigation.
*   **Header Row:** Greeting and primary actions.
*   **Main Content Area:** Split into a **Left Column (approx 70% width)** and a **Right Sidebar (approx 30% width)**.
    *   **Left Column:** Contains three small crypto cards (top), a large weekly chart card (middle), and a transaction table (bottom).
    *   **Right Sidebar:** Contains the "Crypto List" card (top) and the "Balance/Swap" card (bottom).

---

### **3. Component Breakdown**

#### **A. Top Navigation Bar**
*   **Style:** Floating pill-shaped container, dark grey background.
*   **Left:** Logo icon (white circle with a smiley face).
*   **Center:** Navigation pills.
    *   "Courses" (Grey text).
    *   **"Dashboard"** (Active state: White background, Black text, bold).
    *   "Schedule" (Grey text).
    *   "Support" (Grey text).
*   **Right:** Three circular icons/buttons.
    *   Settings (Gear icon).
    *   Notifications (Bell icon).
    *   User Profile (Circular avatar image of a man).

#### **B. Header Section**
*   **Title:** "Shubho sokal, William!" (Bengali for "Good morning, William!"). Large, bold, white text.
*   **Subtitle:** "Ajkor update dekhe nin" (Bengali for "See today's update"). Grey text.
*   **Action Button:** "+ New payment" (Dark grey pill button, white text).

#### **C. Filter & Search Bar**
*   **Left Side:**
    *   "Filter" button (Icon + Text).
    *   "Last month" dropdown (Chevron down icon).
    *   "Export" button (Document icon + Text).
*   **Right Side:**
    *   Search input: "Search" placeholder with magnifying glass icon.
    *   More options: Vertical three-dot icon.

#### **D. Top Row: Crypto Ticker Cards (3 Cards)**
Each card has a dark background, rounded corners, and a mini-chart.
1.  **Bitcoin (BTC):**
    *   Header: Bitcoin Icon (grey) + "Bitcoin (BTC)".
    *   Price: **$42.50** (Large white).
    *   Change: **+6.2%** (Green).
    *   Timestamp: "• 56 second ago" (Grey, small).
    *   Chart: Line chart with a purple line and dark fill. Tooltip shows "$42.50".
2.  **Ethereum (ETH):**
    *   Header: ETH Icon + "Ethereum (ETH)".
    *   Price: **$56.20**. Change: **+5.9%**.
    *   Chart: Bar chart (grey vertical bars). Tooltip shows "$56.20".
3.  **Solana (SOL):**
    *   Header: Solana Icon + "Solana (SOL)".
    *   Price: **$82.25**. Change: **+3.9%**.
    *   Chart: Histogram/Progress style. White block on left, vertical lines. Label "20.16$".

#### **E. Right Sidebar: "Crypto talika" (Crypto List)**
*   **Header:** "Crypto talika" (Bengali for "Crypto List") + Share icon.
*   **List Item 1 (Expanded/Active - BTC):**
    *   Row: BTC Icon, "BTC", **$42,850** (White), **+6.2%** (Green), Up Arrow icon (White circle background).
    *   Details (indented):
        *   "Trading volume:": **$38.2B**
        *   "Market capitalization:": **$820B**
        *   "Market dominance:": **47.3%**
*   **List Item 2 (BNB):** Icon, "BNB", **$320.50**, **+5.6%**, Down Chevron.
*   **List Item 3 (ETH):** Icon, "ETH", **$3,250**, **+8.7%**, Down Chevron.
*   **List Item 4 (ADA):** Icon, "ADA", **$0.64**, **+7.1%**, Down Chevron.
*   **Footer Button:** "Aro dekhun" (Bengali for "See more"). Background is a **Purple-to-Blue gradient**. Arrow icon on the right.

#### **F. Middle Large Card: "Ei saptaher ay" (Weekly Income)**
*   **Header:** "Ei saptaher ay" (Bengali for "This week's income").
*   **Button:** "Bistarito deakhun" (Bengali for "See details") with an arrow icon.
*   **Main Stat:** **+4.2%** (Huge white text).
*   **Subtext:** "Ei saptaher ay got saptaher thake 2.6% beshi" (Bengali: "This week's income is 2.6% more than last week").
*   **Chart (Bar/Line Hybrid):**
    *   X-Axis Labels: S, M, T, W, T, F, S (Days of week) inside rounded pill shapes.
    *   Visuals: Thin vertical grey lines with dots on top for most days.
    *   **Highlight (Wednesday - W):** A large, thick, rounded capsule shape filled with a **vertical gradient (Dark Blue to Purple)**.
    *   Tooltip above Wednesday: **$165.20** (White pill, black text).

#### **G. Bottom Left Card: "Len-den itihash" (Transaction History)**
*   **Header:** "Len-den itihash" (Bengali for "Transaction History").
*   **Controls:**
    *   Search input: "Khujun..." (Bengali for "Search...").
    *   Date Picker: Calendar icon + "15 Feb, 2026" + Filter icon.
*   **Table:**
    *   **Headers:** Crypto Coin, Purchase Date, Last Price, Quantity, 7 Days Market, 24H Change.
    *   **Row 1:**
        *   Coin: Bitcoin Icon + "Bitcoin".
        *   Date: "12 Dec 2024".
        *   Price: "56,064.00".
        *   Qty: "23.8750100000".
        *   Market: Green squiggly line chart.
        *   Change: Green arrow up + "+5.04%".
    *   **Row 2 (Partially visible):**
        *   Coin: USD Coin Icon + "USD Coin".
        *   Date: "10 Dec 2024".
        *   Price: "61160.00".
        *   Qty: "24.3554590000".
        *   Market: Red squiggly line chart.
        *   Change: Red arrow down + "-2.92%".

#### **H. Bottom Right Card: Balance & Swap**
*   **Header:** Icon (Up/Down arrows) + "Apnar balance" (Bengali for "Your balance").
*   **Main Stat:** **$24,320.37** (Huge white text, right-aligned).
*   **Swap Widget (Inner Card):** Darker grey background (`#2A2D38`).
    *   **Row 1:** "Apni bikri korchen" (Bengali: "You are selling"). Dropdown: BTC Icon + "BTC" + Chevron.
    *   **Row 2:** "Apni pachhen" (Bengali: "You are buying"). Dropdown: USDT Icon (T symbol) + "USDT" + Chevron.

---

### **4. Implementation Notes for Next.js**
*   **CSS Framework:** Tailwind CSS is ideal here. Use `bg-slate-900` for background, `bg-slate-800` for cards.
*   **Icons:** Use `lucide-react` or `heroicons`.
*   **Charts:** Use `recharts` or `chart.js`. The charts are stylized (custom tooltips, gradients).
*   **Gradients:** The "Aro dekhun" button and the Wednesday bar chart need `bg-gradient-to-b from-indigo-600 to-violet-600`.
*   **Fonts:** Ensure a font that supports Bengali characters (like 'Hind Siliguri' or standard system sans-serif) is loaded.