# Email Configuration Setup Guide

## Gmail Setup Instructions

To use Gmail for sending password reset emails:

### Step 1: Enable 2-Step Verification
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Under "Signing in to Google", select **2-Step Verification**
4. Follow the steps to enable it

### Step 2: Generate App Password
1. After enabling 2-Step Verification, go back to Security settings
2. Under "Signing in to Google", select **App passwords**
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Enter name: **CodeFest Server**
6. Click **Generate**
7. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

### Step 3: Update .env File
Open `server/.env` and update:
```
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

Replace:
- `your-actual-email@gmail.com` with your Gmail address
- `xxxx xxxx xxxx xxxx` with the app password you generated

### Step 4: Restart Server
After updating the .env file, restart your server:
```bash
cd server
npm start
```

## Testing the Email

1. Go to the forgot password page
2. Enter a registered email address
3. Click "Send Reset Code"
4. Check your email inbox for the reset code

## Alternative Email Providers

### Outlook/Hotmail
```javascript
service: 'outlook'
```

### Yahoo
```javascript
service: 'yahoo'
```

### Custom SMTP
```javascript
host: 'smtp.your-provider.com',
port: 587,
secure: false,
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD
}
```

## Troubleshooting

### "Email could not be sent"
- Check EMAIL_USER and EMAIL_PASSWORD are correct in .env
- Verify 2-Step Verification is enabled
- Ensure App Password is generated correctly
- Check server console for detailed error messages

### "Invalid credentials"
- Make sure you're using an App Password, not your regular password
- Remove any spaces from the app password

### Gmail blocking sign-in
- Enable "Less secure app access" (not recommended) OR
- Use App Passwords (recommended - requires 2-Step Verification)

## Security Notes

⚠️ **Important:**
- Never commit .env file to version control
- Keep your app password secure
- Use environment variables in production
- Consider using a dedicated email service like SendGrid or AWS SES for production
