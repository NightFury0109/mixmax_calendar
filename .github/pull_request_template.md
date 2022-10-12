#### Changes Made

#### Instructions to deploy
After merging this PR into `main` you'll need to manually "deploy" it to S3:

1. Merge this PR
2. Pull the `main` branch locally
3. Run `npm pack`
4. Upload file `mixmaxhq-code-challenge-meeting-times-1.0.0.tgz` to S3 at <https://s3.console.aws.amazon.com/s3/buckets/mixmax-miscellaneous-public?region=us-east-1&tab=objects>

That's it. Since you're replacing the existing file in S3, you do not need to update the link in the email sent to candidates.
