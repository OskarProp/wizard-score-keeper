# Custom Domain Setup: wizscore.org with AWS Amplify

This guide will help you connect your **wizscore.org** domain from IONOS to your AWS Amplify app.

## Overview

You'll need to:
1. Add the custom domain in AWS Amplify
2. Get DNS records from AWS Amplify
3. Configure DNS records in IONOS
4. Wait for SSL certificate validation and DNS propagation

---

## Step 1: Add Custom Domain in AWS Amplify

1. **Open AWS Amplify Console**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Select your **wizard-score-keeper** app

2. **Navigate to Domain Management**
   - In the left sidebar, click **"Domain management"**
   - Click **"Add domain"** button

3. **Enter Your Domain**
   - Enter: `wizscore.org`
   - Click **"Configure domain"**

4. **Configure Subdomains**
   - AWS will suggest configurations. Recommended setup:
     - ✅ `wizscore.org` (root domain)
     - ✅ `www.wizscore.org` (www subdomain)
   - Click **"Save"**

5. **Copy DNS Records**
   - AWS will provide DNS records that look like this:
     ```
     Type: CNAME
     Name: _<random-string>.wizscore.org
     Value: _<random-string>.acm-validations.aws.
     
     Type: CNAME
     Name: www
     Value: <branch-name>.<app-id>.amplifyapp.com
     
     Type: ANAME/ALIAS (or A record)
     Name: @
     Value: <branch-name>.<app-id>.amplifyapp.com
     ```
   - **Keep this page open** - you'll need these values for IONOS

---

## Step 2: Configure DNS in IONOS

### Option A: Using IONOS DNS Management (Recommended)

1. **Log into IONOS**
   - Go to [IONOS Login](https://www.ionos.com/login)
   - Navigate to **Domains & SSL**

2. **Select Your Domain**
   - Click on **wizscore.org**
   - Go to **DNS Settings** or **Manage DNS**

3. **Add SSL Verification CNAME Record**
   - Click **"Add Record"**
   - Type: `CNAME`
   - Hostname: `_<random-string>` (from AWS, without the domain)
   - Points to: `_<random-string>.acm-validations.aws.`
   - TTL: `3600` (or default)
   - Save

4. **Add WWW Subdomain CNAME Record**
   - Click **"Add Record"**
   - Type: `CNAME`
   - Hostname: `www`
   - Points to: `<branch-name>.<app-id>.amplifyapp.com` (from AWS)
   - TTL: `3600`
   - Save

5. **Add Root Domain Record**
   
   **If IONOS supports ANAME/ALIAS records:**
   - Type: `ANAME` or `ALIAS`
   - Hostname: `@` (or leave blank for root)
   - Points to: `<branch-name>.<app-id>.amplifyapp.com`
   - Save

   **If IONOS only supports A records:**
   - You'll need to use AWS Amplify's IP addresses
   - In AWS Amplify, look for the IP addresses provided
   - Add multiple A records pointing to those IPs
   
   **Alternative (if ANAME not supported):**
   - Use a CNAME for root by setting up a redirect from `wizscore.org` to `www.wizscore.org` in IONOS settings

### Option B: Using AWS Route 53 (Advanced)

If IONOS doesn't support ANAME/ALIAS records well, you can migrate DNS to AWS Route 53:

1. **Create Hosted Zone in Route 53**
   - Go to [Route 53 Console](https://console.aws.amazon.com/route53/)
   - Create hosted zone for `wizscore.org`
   - Note the nameservers (e.g., `ns-123.awsdns-12.com`)

2. **Update Nameservers in IONOS**
   - In IONOS domain settings
   - Change nameservers to AWS Route 53 nameservers
   - This can take 24-48 hours to propagate

3. **Configure DNS in Route 53**
   - AWS Amplify can automatically configure Route 53 records
   - Much easier for ALIAS records

---

## Step 3: Wait for Verification

1. **SSL Certificate Validation**
   - AWS will automatically request an SSL certificate
   - This requires the CNAME validation record to be active
   - Usually takes **5-30 minutes** after DNS propagation

2. **DNS Propagation**
   - DNS changes can take **15 minutes to 48 hours**
   - Typically completes within **1-2 hours**

3. **Check Status in AWS Amplify**
   - Go back to AWS Amplify Console
   - Domain management section
   - Status should change from:
     - "Pending verification" → "Pending deployment" → "Available"

---

## Step 4: Verify Your Domain

Once AWS shows "Available":

1. **Test Your Domain**
   - Visit: `https://wizscore.org`
   - Visit: `https://www.wizscore.org`
   - Both should load your WizScore app with SSL (🔒)

2. **Check SSL Certificate**
   - Click the padlock icon in browser
   - Should show "Certificate valid"
   - Issued by Amazon

---

## Troubleshooting

### Domain Not Working After 24 Hours

1. **Check DNS Propagation**
   - Use [DNS Checker](https://dnschecker.org/)
   - Enter `wizscore.org`
   - Verify CNAME records are visible globally

2. **Verify DNS Records in IONOS**
   - Double-check all records match AWS exactly
   - Ensure no typos in hostnames or values
   - Check for conflicting records (old A records, etc.)

3. **Check AWS Amplify Status**
   - Look for error messages in Domain management
   - Common issues:
     - SSL validation failed → CNAME record incorrect
     - DNS not configured → A/CNAME records missing

### SSL Certificate Issues

- Ensure the validation CNAME record is correct
- Wait at least 30 minutes after adding DNS records
- Check AWS Certificate Manager for status

### Root Domain Not Working

- If IONOS doesn't support ANAME/ALIAS:
  - Set up a redirect from `wizscore.org` → `www.wizscore.org`
  - Or migrate DNS to Route 53

---

## Quick Reference: DNS Records

Replace `<app-id>` and `<branch-name>` with your actual values from AWS Amplify:

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| CNAME | `_<validation-string>` | `_<validation-string>.acm-validations.aws.` | SSL Certificate Validation |
| CNAME | `www` | `main.<app-id>.amplifyapp.com` | WWW subdomain |
| ANAME/ALIAS | `@` | `main.<app-id>.amplifyapp.com` | Root domain |

---

## Need Help?

- **AWS Amplify Docs**: [Custom Domains](https://docs.aws.amazon.com/amplify/latest/userguide/custom-domains.html)
- **IONOS Support**: [DNS Settings Help](https://www.ionos.com/help/domains/)
- **DNS Propagation Checker**: [https://dnschecker.org/](https://dnschecker.org/)

---

**Estimated Total Time**: 1-2 hours (mostly waiting for DNS propagation)
