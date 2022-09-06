/* פונקציה שמקבלת  את res 
שזה המידה ששולח יחד עם הסטטוס והודעה שישלח למשתמש 
יחד עם הjson  
ובסוף סוגרת את הבקשה */

const serverResponse = (res, status = 200, message = '') => res.status(status).json(message).end();

module.exports = serverResponse;