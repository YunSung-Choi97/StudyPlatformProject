module.exports = getNow = () => {
  const temp_now = new Date();
  const now = `${temp_now.getFullYear()}-${(temp_now.getMonth() + 1).toString().padStart(2, '0')}-${temp_now.getDate().toString().padStart(2, '0')} ${temp_now.getHours().toString().padStart(2, '0')}:${temp_now.getMinutes().toString().padStart(2, '0')}:${temp_now.getSeconds().toString().padStart(2, '0')}`;
  return now;
};