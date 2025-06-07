# 🚀 CricHattric Deployment Guide for Hostinger

This guide will help you deploy CricHattric to Hostinger using Git.

## 📋 Prerequisites

1. **Hostinger Account** with Node.js hosting support
2. **Git Repository** (GitHub, GitLab, etc.)
3. **CricAPI.com API Key** (get from https://cricapi.com)
4. **Domain Name** (optional, can use Hostinger subdomain)

## 🔧 Step 1: Prepare Your Repository

1. **Clone/Download** this repository
2. **Update Environment Variables**:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Edit `.env.local` and add your CricAPI.com API key:
   \`\`\`env
   CRICKET_API_KEY=your_actual_cricapi_key_here
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   \`\`\`

3. **Test Locally** (optional but recommended):
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

## 🌐 Step 2: Hostinger Setup

### A. Create Node.js Application

1. **Login to Hostinger Control Panel**
2. **Go to** "Website" → "Manage"
3. **Select** "Node.js App" or "Create Application"
4. **Choose**:
   - **Node.js Version**: 18.x or higher
   - **Application Root**: `/public_html` (or your domain folder)
   - **Startup File**: `server.js`

### B. Configure Git Deployment

1. **In Hostinger Control Panel**:
   - Go to "Git" section
   - Click "Create Repository" or "Connect Repository"
   
2. **Add Repository URL**:
   \`\`\`
   https://github.com/your-username/your-repo-name.git
   \`\`\`

3. **Set Branch**: `main` (or your default branch)

4. **Enable Auto-deployment** (recommended)

## ⚙️ Step 3: Environment Configuration

### A. Set Environment Variables in Hostinger

1. **Go to** "Node.js App" → "Environment Variables"
2. **Add these variables**:
   \`\`\`
   NODE_ENV=production
   PORT=3000
   CRICKET_API_KEY=your_actual_cricapi_key_here
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   \`\`\`

### B. Configure Package.json Scripts

The `package.json` is already configured with the correct scripts:
- `npm run build` - Builds the application
- `npm start` - Starts the production server
- `npm run deploy` - Builds and exports (if needed)

## 🚀 Step 4: Deploy

### Method 1: Git Auto-Deploy (Recommended)

1. **Push to Repository**:
   \`\`\`bash
   git add .
   git commit -m "Deploy CricHattric to Hostinger"
   git push origin main
   \`\`\`

2. **Hostinger will automatically**:
   - Pull the latest code
   - Run `npm install`
   - Run `npm run build`
   - Start the application

### Method 2: Manual Upload

1. **Build the project locally**:
   \`\`\`bash
   npm run build
   \`\`\`

2. **Upload files** via File Manager:
   - Upload all files except `node_modules/`
   - Hostinger will run `npm install` automatically

## 🔍 Step 5: Verify Deployment

1. **Check Application Status**:
   - Go to Hostinger Control Panel → Node.js App
   - Status should show "Running"

2. **Test Your Website**:
   - Visit your domain
   - Check live scores page: `/live-scores`
   - Verify API is working (should show real cricket data)

3. **Check Logs** (if issues):
   - Hostinger Control Panel → Node.js App → Logs
   - Look for any error messages

## 🐛 Troubleshooting

### Common Issues:

1. **"Application not starting"**:
   - Check Node.js version (should be 18.x+)
   - Verify `server.js` is in root directory
   - Check environment variables

2. **"API not working"**:
   - Verify `CRICKET_API_KEY` is set correctly
   - Check API key is valid at cricapi.com
   - Look at browser console for errors

3. **"Build failed"**:
   - Check `package.json` dependencies
   - Ensure all files are uploaded
   - Check Hostinger build logs

4. **"404 errors"**:
   - Verify `.htaccess` file is uploaded
   - Check Apache mod_rewrite is enabled
   - Ensure trailing slashes in URLs

### Debug Commands:

\`\`\`bash
# Check if app is running
curl https://your-domain.com

# Check API endpoint
curl https://your-domain.com/api/cricket-data?type=live-matches

# Check logs in Hostinger
tail -f logs/app.log
\`\`\`

## 🔧 Advanced Configuration

### Custom Domain Setup:

1. **Point Domain to Hostinger**:
   - Update nameservers to Hostinger's
   - Or add A record pointing to Hostinger IP

2. **SSL Certificate**:
   - Hostinger provides free SSL
   - Enable in Control Panel → SSL

### Performance Optimization:

1. **Enable Gzip** (already configured in `.htaccess`)
2. **Set Cache Headers** (already configured)
3. **Optimize Images** (already configured in `next.config.mjs`)

## 📊 Monitoring

### Check Application Health:

1. **Hostinger Metrics**:
   - CPU usage
   - Memory usage
   - Request count

2. **Application Logs**:
   - Error logs
   - Access logs
   - Cricket API response logs

### Performance Tips:

1. **Monitor API Usage**:
   - CricAPI.com has rate limits
   - Check usage in CricAPI dashboard

2. **Cache Strategy**:
   - Static files cached for 1 year
   - API responses cached appropriately

## 🎉 Success!

Your CricHattric website should now be live on Hostinger with:

- ✅ Real-time cricket scores
- ✅ Responsive design
- ✅ Fast loading times
- ✅ SSL security
- ✅ Automatic deployments

Visit your domain and enjoy your explosive cricket website! 🏏

## 📞 Support

If you encounter issues:

1. **Check Hostinger Documentation**
2. **Contact Hostinger Support**
3. **Check GitHub Issues** in the repository
4. **Review application logs** in Hostinger Control Panel

---

**Made with ❤️ by DMcoder75 for cricket fans worldwide** 🏏
