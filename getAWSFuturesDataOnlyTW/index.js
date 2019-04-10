var DB = require('./DynamoDB');

var getDaysArray = function(s,e) {for(var a=[],d=s;d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
exports.handler = async (event, context, callback) => {
  var date1 = (event.date1).toString().substr(0,4) +"-" + (event.date1).toString().substr(4,2) + "-" +  (event.date1).toString().substr(6,2);
  var date2 = (event.date2).toString().substr(0,4) +"-" + (event.date2).toString().substr(4,2) + "-" +  (event.date2).toString().substr(6,2);
  var daylist = getDaysArray(new Date(date1),new Date(date2));
  var tempDateArr, tempYear, tempMonth, tempDay;
  for(var i = 0; i < daylist.length ; i++) {
    tempDateArr = (daylist[i].toLocaleDateString()).split('-');
    tempYear = tempDateArr[0];
    if(tempDateArr[1].length == 1) {
      tempMonth = "0" + tempDateArr[1];
    }else {
      tempMonth = tempDateArr[1];
    }

    if(tempDateArr[2].length == 1) {
      tempDay = "0" + tempDateArr[2];
    }else {
      tempDay = tempDateArr[2];
    }
    daylist[i] = tempYear + tempMonth + tempDay;
  }

  //console.log(daylist);
  data = await dataQuery(daylist);

  const response = {
      data,
  };
  return response;
};

async function dataQuery(date) {
    var data = await DB.queryData(date);
    var params = {};
    return data;
}

/*
(async() => {
  await handler('20190201','20190409');
})()
*/
