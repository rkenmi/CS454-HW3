var fs = require('fs');
var superagent = require('superagent');
var tasksCompleted = 0;

module.exports.run = function(flags) {
  var fileApp = new FileApp(flags);
  fileApp.init();
};

function FileApp(flags) {
  this.fcns = [];
  this.flags = flags;
  console.log(this.flags);
}

FileApp.prototype.init = function() {
  this.fact();
};

FileApp.prototype.fact = function () {
  var flags = this.flags;
  var fcns = this.fcns;
  var task = function() {
    return function(opt){
      var number, type, url = 'http://numbersapi.com/';
      switch(opt){
        case 1 : {
          type = 'math';
          if(flags[type]){
            number = flags[type];
            url = 'http://numbersapi.com/' + number + '/' + type + '?json';
          }
          break;
        }
        case 2 : {
          type = 'trivia';
          if(flags[type]){
            number = flags[type];
            url = 'http://numbersapi.com/' + number + '/' + type + '?json';
          }
          break;
        }
        case 3 : {
          type = 'date';
          if(flags[type] && typeof flags.date === 'string'){
            var tempStr = flags.date;
            var month = tempStr.substring(0, 2);
            var day = tempStr.substring(3, 5);
            url = 'http://numbersapi.com/' + month + '/' + day + '/' + 'date' + '?json';
          }
          break;
        }
        case 4 : {
          type = 'date';
          if(flags[type] && typeof flags.date === 'number'){
            type = 'year';
            var year = flags.date;
            url = 'http://numbersapi.com/' + year + '/' + 'year' + '?json';
            break;
          }
        }
        default: type = 'unknown';
          break;
      }
        retrieveData(url, type, flags);
    }
  }(flags);



  function retrieveData(url, type, flags){
    superagent.get(url)
      .end(function (err, response) {
        if(err){
          console.log('Error: ', err);
          throw err;
        }
        else{
          if (flags.save && response.body.text){
            if (!flags.saveData)
              flags.saveData = {};
            flags.saveData[type] = response.body.text;
          }
        }
        tasksCompleted++;
        if (tasksComplete()){
          flags.saveData['saved'] = new Date();
          writeData(flags.saveData);
        }
      });
  }

  function writeData(newObj) {
    fs.readFile('facts.json', 'utf8', function(err, data) {
      if (err){
        // Create new save
        //newData.push( JSON.stringify(obj, null, 4) );
        var newData = [];
        newData.push(newObj);
        fs.writeFile('facts.json', JSON.stringify(newData, null, 4), function (err){
          if (err) throw err;
          console.log('Created new file facts.json');
        });
      }
      else{
        // Load save, append
        data = JSON.parse(data);
        data.push(newObj);
        //console.log(typeof data);


        fs.writeFile('facts.json', JSON.stringify(data, null, 4), function (err){
          if (err) throw err;
          console.log('Appended to facts.json');
        });


      }
    });
  }

  function tasksComplete() {
    if (fcns.length == tasksCompleted) return true;
    else return false;
  }

  for(var i = 1; i < 5; i++){
    fcns.push(task);
  }

  for(var i = 1; i < 5; i++)
    fcns[i-1](i);
  /*
  fs.readFile('facts.json', 'utf8', function(err, data) {
    if (err){
      // Create new save
      fs.writeFile('facts.json', response.body.text)
    }
    else{
      // Load save, append

    }
  });
  */
}

FileApp.prototype.save = function () {
  fs.readFile('facts.json', 'utf8', function(err, data) {
    if (err){
      // Create new save
    }
    else{
      // Load save, append

    }
  });
}
