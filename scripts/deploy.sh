echo "Processing deploy.sh"
# set env variables
source './_secrets/aws_secret.env'
# set s3 bucket as env variable
S3_BUCKET=nautilusdev.com
# set the default region for aws
aws configure set default.region us-west-1
# set aws_access_key id
aws configure set aws_access_key_id $ACCESS_KEY_ID
# set aws_secret_access_key
aws configure set aws_secret_access_key $SECRET_ACCESS_KEY
# sync release build to s3 buckets
aws s3 sync ./release s3://$S3_BUCKET/release --exclude ".icon-set/*" --exclude "linux-unpacked/*" --exclude "mac/*" --exclude "win-unpacked/*" --cache-control max-age=10