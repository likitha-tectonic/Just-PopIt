# OAuth Fix – Just-PopIt 2.0

Follow these steps **in order**. Use the same tunnel URL everywhere.

---

## Step 1: Use the Just-PopIt 2.0 app config

In your project folder, run:

```bash
cd /Users/jas.billing/Documents/shopify-apps/Just-PopIt-1
```

```bash
npx shopify app config link
```

- When asked **"Which app would you like to link to?"**, choose **Just-PopIt 2.0** (or the app that matches `shopify.app.just-popit-20.toml`).
- If it says "This project has already been linked", that’s fine. Continue.

---

## Step 2: Start dev and copy your tunnel URL

```bash
npm run dev
```

In the terminal output, find a line like:

- `Preview URL: https://xxxxx.trycloudflare.com`  
  or  
- `App URL: https://xxxxx.trycloudflare.com`

**Copy that full URL** (e.g. `https://abc123xyz.trycloudflare.com`).  
Call it **YOUR_TUNNEL_URL** in the next steps.

Leave `npm run dev` running.

---

## Step 3: Set URLs in Shopify Partners (exact match)

1. Open: **https://partners.shopify.com**
2. Go to **Apps** → **Just-PopIt 2.0** (your new app).
3. Click **App setup** in the left sidebar.
4. Set these **exactly** (replace with your real tunnel URL):

   **App URL**

   ```
   https://YOUR_TUNNEL_URL.trycloudflare.com
   ```

   (No slash at the end.)

   **Allowed redirection URL(s)**  
   Add **both** of these (one per line or as two entries):

   ```
   https://YOUR_TUNNEL_URL.trycloudflare.com/auth/callback
   https://YOUR_TUNNEL_URL.trycloudflare.com/api/auth/callback
   ```

   Example if your tunnel is `resume-painting-net-quote.trycloudflare.com`:

   - App URL: `https://resume-painting-net-quote.trycloudflare.com`
   - Redirect 1: `https://resume-painting-net-quote.trycloudflare.com/auth/callback`
   - Redirect 2: `https://resume-painting-net-quote.trycloudflare.com/api/auth/callback`

5. Click **Save**.

---

## Step 4: Uninstall the app from your dev store (clean install)

1. Open your dev store admin:  
   `https://admin.shopify.com/store/platonic-labellife-dev/settings/apps`
2. Under **Apps and sales channels**, find **Just-PopIt 2.0**.
3. Click the app → **Uninstall** (or **Delete**).
4. Confirm.

---

## Step 5: Install the app again

1. In the terminal where `npm run dev` is running, look for a line like:
   - **"Preview your app"** or **"Open your app"** with a link.
2. Click that link, **or** go to:
   ```
   https://admin.shopify.com/store/platonic-labellife-dev/apps/just-popit-2-0
   ```
   (Use the exact app handle shown in Partners.)
3. When asked, click **Install** / **Allow**.
4. You should be redirected into the app (e.g. Pop-ups dashboard).

---

## Step 6: If it still fails – try in Incognito

1. Close all tabs for your dev store admin.
2. Open a **new Incognito/Private** window.
3. Go to:  
   `https://admin.shopify.com/store/platonic-labellife-dev/apps`
4. Click **Just-PopIt 2.0** to open the app.
5. If you see a login page, enter:  
   `platonic-labellife-dev.myshopify.com`  
   then click **Log in**.

---

## Checklist

- [ ] `shopify app config link` → linked to **Just-PopIt 2.0**
- [ ] `npm run dev` running and tunnel URL copied
- [ ] Partners: **App URL** = `https://YOUR_TUNNEL.trycloudflare.com` (no trailing slash)
- [ ] Partners: **Both** redirect URLs added (`/auth/callback` and `/api/auth/callback`)
- [ ] App **uninstalled** from dev store, then **reinstalled**
- [ ] Tried in **Incognito** if needed

---

## Common mistakes

- **Trailing slash** – App URL must be `https://xxx.trycloudflare.com` **not** `https://xxx.trycloudflare.com/`
- **Old tunnel** – If you restarted `npm run dev`, the URL changes; update Partners and use the **new** URL
- **Wrong app** – Ensure you’re editing **Just-PopIt 2.0** in Partners and installing that same app in the store
