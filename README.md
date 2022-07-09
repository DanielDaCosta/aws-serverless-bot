# aws-serverless-bot


# Lambda

Run the following code to update your lambda function:
- ```cd lambda-discord-bot```
- ```zip -r lambda-discord-bot.zip .```
- ```aws lambda update-function-code --function-name lambda-discord-bot --zip-file fileb://lambda-discord-bot.zip --region us-east-1```
