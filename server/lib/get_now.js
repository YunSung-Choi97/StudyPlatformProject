module.exports = getNow = () => {
  var temp_now = new Date();
  var now = `${temp_now.getFullYear()}-${(temp_now.getMonth()+1).toString().padStart(2, '0')}-${temp_now.getDate().toString().padStart(2, '0')} ${temp_now.getHours().toString().padStart(2, '0')}:${temp_now.getMinutes().toString().padStart(2, '0')}`;
  return now;
};