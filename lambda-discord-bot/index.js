const nacl = require('tweetnacl');
const AWS = require('aws-sdk');


var ec2 = new AWS.EC2({apiVersion: '2016-11-15', region: 'us-east-1'});

exports.handler = async (event) => {
    
    // Discord #1 Req: Your endpoint must be set up to properly handle signature
    // headers--more on that in Security and Authorization
    
    const PUBLIC_KEY = process.env.PUBLIC_KEY; // Developer Portal Public Key
    
    const signature = event.headers['x-signature-ed25519'];
    const timestamp = event.headers['x-signature-timestamp'];
    const strBody = event.body; // should be string, for successful sign
    
    const isVerified = nacl.sign.detached.verify(
        Buffer.from(timestamp + strBody),
        Buffer.from(signature, 'hex'),
        Buffer.from(PUBLIC_KEY, 'hex')
    );
    
    if (!isVerified) {
            return {
                statusCode: 401,
                body: JSON.stringify('invalid request signature'),
            };
    }

    
    // Discord #1 Req: Your endpoint must be prepared to ACK a PING message
    const body = JSON.parse(strBody);
    if (body.type == 1) {
        return {
            statusCode: 200,
            body: JSON.stringify({ "type": 1 }),
        };
    }

    // Handle /list_ec2 Command
    if (body.data.name == 'list_ec2') {
        var params = {
          Filters: [
            {
              Name: 'instance-state-name',
              Values: ['running']
            }]
        };
    
        let ec2_data = await ec2.describeInstances(params).promise()
        // Retrieving Instance Name based on Tag:Name or InstanceId
        var arrInstanceNames = ec2_data.Reservations.map(
          instanceObj => {
            var instanceName = instanceObj.Instances[0].Tags.filter(_ => _.Key == 'Name')[0]
            return typeof(instanceName) === 'undefined' ? instanceObj.Instances[0].InstanceId : instanceName 
          });
        let discordOuput = arrInstanceNames.map(
          instanceName => {
            if (typeof(instanceName) == 'object')
            {
              return instanceName.Value
            }
            else
              return instanceName
        });           // successful response
        
        // console.log(`Aqui: ${discordOuput.toString()[0]}`)
        // return setTimeout(function() {
        return JSON.stringify({  // Note the absence of statusCode
          "type": 4,  // This type stands for answer with invocation shown
          "data": { "content": 'Ok' }
        })
    }

    // Handle /sopt_ec2 Command
    if (body.data.name == 'stop_ec2') {
      let instanceName = body.data.options[0].value
      var params = {
        Filters: [
          {
            Name: 'tag:Name',
            Values: [instanceName]
          }]
      };
      
      let ec2_data = await ec2.describeInstances(params).promise()
      // Retrieving Instance Name based on Tag:Name
      var discordOuput
      if (ec2_data.Reservations.length == 0)  
        discordOuput = 'EC2 not found'
      else
        var instanceId = ec2_data.Reservations[0].Instances[0].InstanceId
        params = {
          InstanceIds: [
            instanceId
        ]}
        await ec2.stopInstances(params).promise()
        discordOuput = 'Stopped'
      return JSON.stringify({  // Note the absence of statusCode
        "type": 4,  // This type stands for answer with invocation shown
        "data": { "content":  `${discordOuput}`}
      })
      // return {
      //       statusCode: 200,
      //       body: JSON.stringify({ "type": 1 }),
      // };
    }

    return {
        statusCode: 404  // If no handler implemented for Discord's request
    }
};
