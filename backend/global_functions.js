to = function (promise) {//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
  console.log("inside global fun");
  
  return promise
    .then(data => {
      return [null, data];
    }).catch(err =>
      [pe(err)]
    );
}
module.exports.to = to

pe = require('parse-error');//parses error so you can read error message and handle them accordingly

TE = function (err_message, log) { // TE stands for Throw Error
  if (log === true) {
    console.error(err_message);
  }

  throw new Error(err_message);
}

ReE = function (res, err, code) { // Error Web Response
  if (typeof err == 'object' && typeof err.message != 'undefined') {
    err = err.message;
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json({ success: false, error: err });
}
module.exports.ReE = ReE

ReS = function (res, data, code) { // Success Web Response
  let send_data = { success: true };

  if (typeof data == 'object') {
    send_data = Object.assign(data, send_data);//merge the objects
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json(send_data)
};
module.exports.ReS = ReS

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});



