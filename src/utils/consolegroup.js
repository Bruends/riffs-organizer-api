const consoleGroup = (title, logsArray) => {
  console.group(title);
  if (logsArray)
    logsArray.forEach((log) => {
      console.log(log);
    });
};

module.exports = consoleGroup;
