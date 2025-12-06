# Jenkins Email Configuration Guide

## Step 1: Configure Extended Email Plugin

1. **Go to Jenkins Dashboard** → **Manage Jenkins** → **Configure System**

2. **Scroll to "Extended E-mail Notification" section**

3. **Configure SMTP Server:**
   - SMTP server: `smtp.gmail.com`
   - SMTP Port: `465` (for SSL) or `587` (for TLS)
   - Click "Advanced..."
   - Check "Use SMTP Authentication"
   - User Name: Your Gmail address (e.g., `your-email@gmail.com`)
   - Password: Your Gmail App Password (NOT your regular password)
   - Check "Use SSL" (if port 465) or "Use TLS" (if port 587)

4. **Default Recipients:**
   - Leave blank (pipeline will specify recipients)

5. **Default Content Type:** `text/plain`

6. **Default Subject:** `$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!`

7. **Default Content:**
   ```
   $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:
   
   Check console output at $BUILD_URL to view the results.
   ```

## Step 2: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Select **Security** from left panel
3. Enable **2-Step Verification** if not already enabled
4. Search for "App passwords" or go to: https://myaccount.google.com/apppasswords
5. Select app: **Mail**
6. Select device: **Other (Custom name)** → Type: "Jenkins"
7. Click **Generate**
8. Copy the 16-character password (remove spaces)
9. Use this password in Jenkins SMTP configuration

## Step 3: Test Email Configuration

1. In Jenkins **Configure System**, scroll to **Extended E-mail Notification**
2. Click **Test configuration by sending test e-mail**
3. Enter your test email address
4. Click **Test configuration**
5. Check if you receive the test email

## Step 4: Alternative - Use System Admin Email

1. In Jenkins **Configure System**, scroll to **Jenkins Location**
2. Set **System Admin e-mail address:** `jenkins@yourdomain.com`
3. This will be used as the "From" address

## Step 5: Install Email Extension Plugin (if not installed)

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@16.170.235.37

# Install plugin via Jenkins CLI (optional)
java -jar jenkins-cli.jar -s http://localhost:8080/ install-plugin email-ext
```

Or install via UI:
- Dashboard → Manage Jenkins → Manage Plugins → Available
- Search for "Email Extension Plugin"
- Check the box and click "Install without restart"

## Gmail SMTP Settings (Quick Reference)

| Setting | Value |
|---------|-------|
| SMTP Server | smtp.gmail.com |
| SMTP Port | 465 (SSL) or 587 (TLS) |
| Username | your-email@gmail.com |
| Password | Your 16-char App Password |
| Use SSL | Yes (if port 465) |
| Use TLS | Yes (if port 587) |

## Troubleshooting

### Email not sending?

1. **Check Jenkins Console Output:**
   ```
   Look for lines like:
   "📧 Sending email to: user@email.com"
   "✅ Email sent successfully"
   or
   "⚠️ Failed to send email"
   ```

2. **Verify SMTP credentials:**
   - Ensure App Password is correct (no spaces)
   - Test with Gmail directly

3. **Check Jenkins logs:**
   ```bash
   sudo tail -f /var/lib/jenkins/logs/jenkins.log
   ```

4. **Test SMTP connection from EC2:**
   ```bash
   # Install telnet
   sudo apt-get install telnet
   
   # Test SMTP connection
   telnet smtp.gmail.com 587
   ```

5. **Check firewall rules:**
   - Ensure outbound port 587 or 465 is open on EC2 security group

### Still not working?

Use alternative approach in Jenkinsfile:
```groovy
// Simple mail command
sh """
    echo "${emailBody}" | mail -s "Build #${env.BUILD_NUMBER} Results" ${committer}
"""
```

This requires `mailutils` installed on EC2:
```bash
sudo apt-get install mailutils
```

## Verify Current Email Configuration

Check what email will be sent by looking at Jenkins console output after build completes. It will show:
- 📧 Recipient email address
- 📧 Email subject
- 📧 Success/failure message
