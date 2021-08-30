const consoleGroup = (title, logsArray) => {
  console.group(title)
  if (logsArray)
    logsArray.forEach((log) => {
      console.log(log)
    })
  console.groupEnd()
}

module.exports = consoleGroup
