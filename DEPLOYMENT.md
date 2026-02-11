# AWS Deployment Guide - Wizard Arcane

This guide covers two recommended methods for deploying your Wizard Arcane scorekeeper to AWS.

## Option 1: AWS Amplify (Recommended - Easiest)

AWS Amplify is the simplest option with automatic CI/CD from Git.

### Prerequisites
- AWS Account
- Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Push your code to a Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy via AWS Amplify Console**:
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Connect your Git repository
   - Configure build settings:
     - Build command: `npm run build`
     - Output directory: `dist`
   - Click "Save and deploy"

3. **Amplify will automatically**:
   - Build your app on every push
   - Provide a custom domain (e.g., `https://main.xxxxx.amplifyapp.com`)
   - Handle SSL certificates
   - Set up CDN distribution

### Custom Domain (Optional)
- In Amplify Console → Domain management
- Add your custom domain and follow DNS verification steps

---

## Option 2: S3 + CloudFront (More Control)

For more control over infrastructure and lower costs at scale.

### Prerequisites
- AWS Account
- AWS CLI installed and configured

### Steps

#### 1. Build your application
```bash
npm run build
```

#### 2. Create an S3 bucket
```bash
# Replace 'wizard-arcane-app' with your unique bucket name
aws s3 mb s3://wizard-arcane-app --region us-east-1
```

#### 3. Configure bucket for static website hosting
```bash
aws s3 website s3://wizard-arcane-app \
  --index-document index.html \
  --error-document index.html
```

#### 4. Upload your build files
```bash
aws s3 sync dist/ s3://wizard-arcane-app --delete
```

#### 5. Set bucket policy for public access
Create a file `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::wizard-arcane-app/*"
    }
  ]
}
```

Apply the policy:
```bash
aws s3api put-bucket-policy \
  --bucket wizard-arcane-app \
  --policy file://bucket-policy.json
```

#### 6. Create CloudFront distribution (for HTTPS and CDN)
- Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
- Create distribution
- Origin domain: Select your S3 bucket
- Viewer protocol policy: "Redirect HTTP to HTTPS"
- Default root object: `index.html`
- Error pages: Add custom error response for 404 → `/index.html` (for client-side routing)

#### 7. Access your app
Your app will be available at the CloudFront domain (e.g., `https://d111111abcdef8.cloudfront.net`)

### Updates
To deploy updates:
```bash
npm run build
aws s3 sync dist/ s3://wizard-arcane-app --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## Cost Comparison

### AWS Amplify
- **Free tier**: 1000 build minutes/month, 15 GB served/month
- **After free tier**: ~$0.01 per build minute, ~$0.15/GB served
- **Best for**: Continuous deployment, automatic builds

### S3 + CloudFront
- **S3**: ~$0.023/GB storage, ~$0.09/GB transfer
- **CloudFront**: ~$0.085/GB (first 10TB)
- **Best for**: Lower cost at scale, more control

---

## Recommended: AWS Amplify

For your use case, **AWS Amplify** is recommended because:
- ✅ Zero configuration
- ✅ Automatic deployments on Git push
- ✅ Free SSL certificate
- ✅ Built-in CDN
- ✅ Preview deployments for branches
- ✅ Free tier covers most small projects

Simply push to Git and let Amplify handle the rest!
