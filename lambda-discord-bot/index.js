const nacl = require('tweetnacl');

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


      // Handle /foo Command
    if (body.data.name == 'list_ec2') {
        return JSON.stringify({  // Note the absence of statusCode
        "type": 4,  // This type stands for answer with invocation shown
        "data": { "content": "bar" }
        })
    }


    return {
        statusCode: 404  // If no handler implemented for Discord's request
    }
};
