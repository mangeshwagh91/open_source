# 🗄️ MongoDB Setup Guide for Windows

This guide will help you install and configure MongoDB on Windows for your Open Source Project.

## 📥 Option 1: Install MongoDB Community Server (Recommended)

### Step 1: Download MongoDB
1. Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Select:
   - Version: Latest (7.0 or higher)
   - Platform: Windows
   - Package: MSI
3. Click "Download"

### Step 2: Install MongoDB
1. Run the downloaded MSI installer
2. Choose "Complete" installation
3. **Important:** Check "Install MongoDB as a Service"
4. Keep the default data directory: `C:\Program Files\MongoDB\Server\7.0\data`
5. Keep the default log directory: `C:\Program Files\MongoDB\Server\7.0\log`
6. Complete the installation

### Step 3: Verify Installation
Open PowerShell or Command Prompt and run:
```powershell
mongod --version
```

You should see the MongoDB version information.

### Step 4: Start MongoDB Service
MongoDB should start automatically as a Windows service. To verify:
```powershell
# Check if MongoDB service is running
Get-Service MongoDB

# If it's not running, start it:
Start-Service MongoDB

# To make it start automatically on system boot:
Set-Service MongoDB -StartupType Automatic
```

### Step 5: Test MongoDB Connection
1. Open PowerShell
2. Connect to MongoDB:
```powershell
mongosh
```
3. You should see the MongoDB shell. Type `exit` to quit.

---

## 📥 Option 2: Use MongoDB Atlas (Cloud Database)

If you prefer not to install MongoDB locally, you can use MongoDB Atlas (free tier available):

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (choose Free tier)

### Step 2: Configure Database Access
1. In Atlas dashboard, go to "Database Access"
2. Add a new database user with password
3. Remember these credentials!

### Step 3: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Confirm

### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`

### Step 5: Update Backend .env
Replace the MONGODB_URI in your `backend/.env` file:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/opensource_db?retryWrites=true&w=majority
```

---

## 🔧 Alternative: Docker (For Advanced Users)

If you have Docker installed:

```bash
# Pull MongoDB image
docker pull mongodb/mongodb-community-server:latest

# Run MongoDB container
docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:latest

# Verify it's running
docker ps
```

---

## ✅ Verify Your Setup

### Test 1: Check MongoDB is Running
```powershell
# For local installation
Get-Service MongoDB

# Should show Status as "Running"
```

### Test 2: Connect with mongosh
```powershell
mongosh
```

### Test 3: Test from Backend
1. Make sure MongoDB is running
2. Start your backend:
   ```bash
   cd backend
   npm run dev
   ```
3. You should see: `MongoDB Connected: localhost` or similar message

### Test 4: Seed the Database
```bash
cd backend
npm run seed
```

You should see:
```
Cleared existing data
Database seeded successfully!
```

---

## 🐛 Troubleshooting

### Problem: "mongod: command not found"
**Solution:** Add MongoDB to your PATH:
1. Open System Environment Variables
2. Edit PATH variable
3. Add: `C:\Program Files\MongoDB\Server\7.0\bin`
4. Restart PowerShell

### Problem: "MongoNetworkError: connect ECONNREFUSED"
**Solutions:**
1. Check if MongoDB service is running:
   ```powershell
   Get-Service MongoDB
   ```
2. Start the service:
   ```powershell
   Start-Service MongoDB
   ```
3. If service doesn't exist, you may need to reinstall MongoDB

### Problem: MongoDB Service Won't Start
**Solutions:**
1. Check if port 27017 is already in use
2. Check MongoDB log files at: `C:\Program Files\MongoDB\Server\7.0\log\mongod.log`
3. Try starting manually:
   ```powershell
   "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\Program Files\MongoDB\Server\7.0\data"
   ```

### Problem: Access Denied Errors
**Solution:** Run PowerShell or Command Prompt as Administrator

---

## 📚 Useful MongoDB Commands

### mongosh Commands
```javascript
// Show all databases
show dbs

// Use/create database
use opensource_db

// Show collections
show collections

// View certificates
db.certificates.find()

// View leaderboard
db.leaderboards.find()

// Count documents
db.certificates.countDocuments()

// Delete a collection
db.certificates.drop()

// Exit mongosh
exit
```

---

## 🎯 Next Steps

After MongoDB is set up:

1. ✅ Start MongoDB service
2. ✅ Start backend server: `cd backend && npm run dev`
3. ✅ Seed the database: `cd backend && npm run seed`
4. ✅ Start frontend: `cd client && npm run dev`
5. ✅ Visit http://localhost:8080

---

## 📞 Need Help?

If you're still having issues:
1. Check MongoDB logs
2. Ensure no firewall is blocking port 27017
3. Try using MongoDB Atlas instead of local installation
4. Check the main SETUP_GUIDE.md for more information

---

## 🌟 Quick Reference

**Default MongoDB Port:** 27017
**Database Name:** opensource_db
**Collections:**
- certificates
- leaderboards
- contacts
- projects
- roadmaps

**Important Directories:**
- Data: `C:\Program Files\MongoDB\Server\7.0\data`
- Logs: `C:\Program Files\MongoDB\Server\7.0\log`
- Binaries: `C:\Program Files\MongoDB\Server\7.0\bin`
