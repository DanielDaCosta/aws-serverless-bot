const axios = require('axios').default;
const AWS = require('aws-sdk');


var ec2 = new AWS.EC2({apiVersion: '2016-11-15', region: 'us-east-1'});


// exports.data = {
//   name: 'list_ec2',
//   type: 1,
//   description: 'replies with bar ;/'
// }

exports.handler = async (event) => {
    // // TODO implement
    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify('Hello from Lambda!'),
    // };
    // return response;

    let response = {
        "content": "Hello from Lambda!"
    }

    const body = JSON.parse(event.Records[0].Sns.Message)
    // console.log(body)

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
        let discordOuputStr = arrInstanceNames.map(
          instanceName => {
            if (typeof(instanceName) == 'object')
            {
              return instanceName.Value
            }
            else
              return instanceName
        });           // successful response
        
        response = {"content": discordOuputStr.join('\n')}
        
        // console.log(`Aqui: ${discordOuput.toString()[0]}`)
        // return setTimeout(function() {
        // return JSON.stringify({  // Note the absence of statusCode
        //   "type": 4,  // This type stands for answer with invocation shown
        //   "data": { "content": 'Ok' }
        // })
    }
    console.log(response)




    // const response = await action(body)
    let response2 = await axios.patch(`https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}/messages/@original`, response)
    console.log(response2)
      // .then(function (response) {
      //   console.log("@@@@@@@@After Then@@@@@");
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
};
