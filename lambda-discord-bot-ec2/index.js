const axios = require('axios').default;

exports.data = {
  name: 'list_ec2',
  type: 1,
  description: 'replies with bar ;/'
}

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
    console.log(body)
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
