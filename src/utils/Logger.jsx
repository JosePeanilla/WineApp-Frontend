/**************************************************************************************************
 * Logger Class:
 * Provides a simple logging mechanism that formats log messages with a timestamp, filename,
 * and log level. Utilizes Moment.js to generate formatted timestamps.
 **************************************************************************************************/

import moment from "moment" // Import Moment.js for date-time formatting

export class Logger {
  /*********************************** Constructor ***********************************/
  /*
   * Initializes a new instance of the Logger class.
   * @param {string} filePath - The full path of the file from which the Logger is instantiated.
   *                            The file name is extracted from this path for log identification.
   */
  constructor(filePath) {
    // Extract the file name from the provided file path (supports Windows-style paths)
    this.fileName = filePath.split("\\").pop()
  }

  /*********************************** Private Methods ***********************************/

  /*
   * Generates a formatted date-time string using Moment.js.
   * @returns {string} - A string representing the current date and time in 'YYYY/MM/DD HH:mm:ss' format.
   */
  #getFormattedDateTime() {
    return moment().format('YYYY/MM/DD HH:mm:ss')
  }

  /*
   * Constructs the log prefix with timestamp, filename, and log level.
   * @param {string} level - The log level (e.g., "info", "debug", "warn", "error").
   * @returns {string} - A formatted string that prefixes the log message.
   */
  #getFormattedLogStart(level) {
    const formattedDateTime = this.#getFormattedDateTime()
    const formattedFileName = this.fileName
    const formattedLevel = level.toUpperCase()
    return `[${formattedDateTime}][${formattedFileName}][${formattedLevel}]`
  }

  /*
   * Logs a message at the specified log level.
   * Formats the log message with a timestamp, filename, and log level. It also appends additional
   * parameters to the message if provided.
   * @param {string} level - The log level (default is "info").
   * @param {string} message - The main log message.
   * @param {...any} additionalParams - Optional additional parameters to include in the log.
   */
  #log(level = "info", message, ...additionalParams) {
    const formattedLogStart = this.#getFormattedLogStart(level)
    // Append a newline to the message if there are additional parameters for clearer output.
    const formattedMessage = additionalParams ? `${message}\n` : message
    // Log the message using the corresponding console method based on the log level.
    switch (level) {
      case "debug":
        console.debug(formattedLogStart, formattedMessage, ...additionalParams)
        break
      case "info":
        console.info(formattedLogStart, formattedMessage, ...additionalParams)
        break
      case "warn":
        console.warn(formattedLogStart, formattedMessage, ...additionalParams)
        break
      case "error":
        console.error(formattedLogStart, formattedMessage, ...additionalParams)
        break
      default:
        console.error(formattedLogStart, formattedMessage, ...additionalParams)
        break
    }
  }

  /*********************************** Public Logging Methods ***********************************/

  /*
   * Logs a message at the debug level.
   * @param {string} message - The debug message.
   * @param {...any} additionalParams - Optional additional parameters for the log.
   */
  debug(message, ...additionalParams) {
    this.#log("debug", message, ...additionalParams)
  }

  /*
   * Logs a message at the info level.
   * @param {string} message - The informational message.
   * @param {...any} additionalParams - Optional additional parameters for the log.
   */
  info(message, ...additionalParams) {
    this.#log("info", message, ...additionalParams)
  }

  /*
   * Logs a message at the warn level.
   * @param {string} message - The warning message.
   * @param {...any} additionalParams - Optional additional parameters for the log.
   */
  warn(message, ...additionalParams) {
    this.#log("warn", message, ...additionalParams)
  }

  /*
   * Logs a message at the error level.
   * @param {string} message - The error message.
   * @param {...any} additionalParams - Optional additional parameters for the log.
   */
  error(message, ...additionalParams) {
    this.#log("error", message, ...additionalParams)
  }
}
