#!/bin/bash
BUCKET_NAME=layers.us
REGION=us-west-2

# Create the bucket
aws s3 mb s3://$BUCKET_NAME/ --region $REGION
# Add the ‘website’ configuration and bucket policy
aws s3 website s3://$BUCKET_NAME/ --index-document index.html --error-document index.html
cat aws/s3-bucket-policy.json | sed 's/BUCKET_NAME/'$BUCKET_NAME'/' > /tmp/s3-bucket-policy.json
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/s3-bucket-policy.json

#Build the project and sync it up to the bucket
if npm run build -- --prod ./; then
  aws s3 sync ./dist/ s3://$BUCKET_NAME/
else
  echo "Build failed! - not uploading"
fi
