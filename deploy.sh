#!/bin/bash
# Force Vercel deployment

echo "🚀 Triggering Vercel deployment..."

# Method 1: Use deploy hook
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_rhRfyDKVo8wOHt15WN9z9vIkVJSC/V2QV4As6dV

echo ""
echo "✅ Deployment triggered!"
echo "Check your Vercel dashboard for build status."

