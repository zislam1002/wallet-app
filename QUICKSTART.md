# Lykos Wallet - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Start the Backend (Terminal 1)

```bash
cd backend
npm run dev
```

✅ You should see:

```
🚀 Lykos Wallet Backend Server
📡 Server running on port 3000
⚠️  Mode: MOCK (No real blockchain operations)
```

### Step 2: Start the Frontend (Terminal 2)

```bash
cd frontend
npx expo start
```

✅ You should see an Expo QR code

### Step 3: Choose Your Platform

- Press **`i`** for iOS Simulator
- Press **`a`** for Android Emulator
- Scan QR code with Expo Go app for physical device

## 🎨 What You'll See

### Welcome Screen

- Beautiful Lykos branding
- 3 social login options
- Feature highlights
- "Create New Wallet" button

### Try It Out

1. Tap "Continue with Email"
2. Enter any email and password (it's mocked!)
3. You'll see the main app with:
   - Your portfolio balance
   - 3 wallet cards (ETH, BTC, Polygon)
   - Quick actions (Send, Receive, Swap, Bridge)
   - Recent transaction history

### Features Working Now

✅ Authentication flow  
✅ Theme switching (light/dark)  
✅ Portfolio overview  
✅ Wallet cards  
✅ Transaction list  
✅ Navigation between screens  
✅ Backend API (all endpoints)

### Features Coming Soon

⏳ Send/Receive flows  
⏳ Swap interface  
⏳ Bridge interface  
⏳ Security center  
⏳ Settings screen  
⏳ Rewards screen

## 🧪 Test the API

### Health Check

```bash
curl http://localhost:3000/health
```

### Mock Login

```bash
curl -X POST http://localhost:3000/auth/social-login \
  -H "Content-Type: application/json" \
  -d '{"provider":"email","email":"test@lykos.com"}'
```

### Get Wallets

```bash
curl http://localhost:3000/wallets \
  -H "x-user-id: default_user"
```

## 🎯 Next Steps

1. **Explore the app** - Navigate through all screens
2. **Check the code** - See how it's structured
3. **Read DEVELOPMENT.md** - Understand the architecture
4. **Read STATUS.md** - See what's implemented
5. **Build remaining screens** - Follow the patterns

## 🐛 Troubleshooting

### Backend won't start

```bash
cd backend
npm install
npm run dev
```

### Frontend won't start

```bash
cd frontend
npm install
npx expo start --clear
```

### Can't see changes

```bash
# In Expo, press 'r' to reload
# Or shake device and tap "Reload"
```

## 📚 Documentation

- **README.md** - Project overview
- **DEVELOPMENT.md** - Full architecture guide
- **STATUS.md** - Current implementation status
- **QUICKSTART.md** - This file!

## 💡 Pro Tips

1. **Backend restarts automatically** when you save files
2. **Frontend hot-reloads** - just save and see changes
3. **Use Expo DevTools** - inspect, debug, test
4. **Check console logs** - both terminal windows
5. **TypeScript helps** - use autocomplete in VS Code

## 🎨 Customize

Want to change the theme colors?
➡️ Edit `/frontend/src/theme/colors.ts`

Want to add a new endpoint?
➡️ Add to `/backend/src/controllers/` and `/backend/src/routes/`

Want to add a new screen?
➡️ Copy pattern from `/frontend/src/screens/home/HomeScreen.tsx`

## 🔥 Hot Tips

### Terminal Shortcuts

- `Ctrl+C` - Stop server
- `r` (in Expo) - Reload app
- `m` (in Expo) - Toggle menu
- `j` (in Expo) - Open debugger

### VS Code Extensions

- ESLint
- Prettier
- React Native Tools
- TypeScript and JavaScript Grammar

### Expo Commands

```bash
npx expo start --clear    # Clear cache
npx expo start --ios      # Auto-launch iOS
npx expo start --android  # Auto-launch Android
npx expo start --web      # Run in web browser
```

## 🎉 You're All Set!

The app is running and ready to explore. Check out the beautiful iOS-inspired design, navigate through the screens, and see how everything works together.

**Enjoy building with Lykos Wallet! 🚀**

---

**Need help?** Check STATUS.md for what's implemented or DEVELOPMENT.md for detailed guides.
