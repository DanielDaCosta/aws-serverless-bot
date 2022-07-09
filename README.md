# aws-serverless-bot


# Discord
## Create Command
Run `register.js`  file to create the following slash commands: 
- list_ec2: List all EC2 on RUNNING state
- stop_ec2: Stop the provided EC2 name

## List Command
Run `get-commands.js` to get a list of all the created commands. A helpful command for finding out the commands IDs.

Output example: 
```bash
[
  {
    id: 'COMMAND_ID',
    application_id: 'YOUR_APPLICATION_ID',
    version: '995450447986962475',
    default_permission: true,
    default_member_permissions: null,
    type: 1,
    name: 'list_ec2',
    description: 'replies with bar ;/',
    guild_id: 'YOUR_GUILD_ID'
  },
  {
    id: 'COMMAND_ID',
    application_id: 'YOUR_APPLICATION_ID',
    version: '995455491415216159',
    default_permission: true,
    default_member_permissions: null,
    type: 1,
    name: 'stop_ec2',
    description: 'Stop EC2 instances',
    guild_id: 'YOUR_GUILD_ID',
    options: [ [Object] ]
  }
]
```
## Delete Command
Run `delete-commands.js` to delete a specif command, it takes as input the command ID.

Change COMMAND_ID variable before running it.

# Lambda

Run the following code to update your lambda function:
- ```cd lambda-discord-bot```
- ```zip -r lambda-discord-bot.zip .```
- ```aws lambda update-function-code --function-name lambda-discord-bot --zip-file fileb://lambda-discord-bot.zip --region us-east-1```
