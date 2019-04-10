const AWS = require('aws-sdk');

const query_Data_promise = (datelist) => {
    var ddb = new AWS.DynamoDB.DocumentClient({region:'us-west-2'});
    var keyArr = [];
    var tempData = {};
    for(var i=datelist.length-1; i >=0; i--){
      tempData = {
        "date": parseInt(datelist[i])
      };
      keyArr.push(tempData);
    }

    console.log(keyArr);

    var params2 = {
      RequestItems: {
        'Stock_futures_TW': {
          Keys: keyArr,
        },
      }
    }
    return new Promise((resolve, reject) => {
       ddb.batchGet(params2, function(err, data) {
         if(err) {
            reject(err);
         } else {
            data["Responses"]["Stock_futures_TW"].sort((a, b) => parseFloat(a.date) - parseFloat(b.date));
            resolve(data);
         }
       });
    });
}

module.exports = {
    queryData : async(date) => {
        var data = await query_Data_promise(date);
        return data;
    }
    
}