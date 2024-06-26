const dynamoose = require('dynamoose');
// make a schema 
const schema = new dynamoose.Schema({id: String, name: String, age: Number})
// make model
const peopleModel = dynamoose.model('people', schema);

exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: null,
    body: null,
  };
  console.log(event.pathParameters, 'PATH PARAM');
    let parsedBody = JSON.parse(event.body);
  try {
    const id = event.pathParameters?.id;
    let results;
    
    results = await peopleModel.update({id}, parsedBody);
  
    response.statusCode = 200;
    response.body = JSON.stringify(results);
  } catch (e) {
    // if not successful in getting from table, will send back status 500 and error message
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }

  return response;
};