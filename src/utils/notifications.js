/**************************************************************************************************
 * Notification Utility Module:
 * This module exports a 'notify' object that provides methods for displaying toast notifications
 * with different styles (success, error, info, and warning) using React Toastify.
 **************************************************************************************************/

import { toast } from "react-toastify" // Import the toast function from React Toastify

/*********************************** Base Style Definition ***********************************/
/*
 * Define a base style string to be applied to all toast notifications.
 * This style ensures that notifications have a consistent appearance with white text,
 * a medium font weight, rounded corners, shadow, and appropriate padding and tracking.
 */
const baseStyle =
  "text-white font-medium rounded-lg shadow-lg px-4 py-3 text-sm tracking-wide"

/*********************************** Notify Object ***********************************/
/*
 * The 'notify' object provides four methods corresponding to different types of notifications:
 * - success: for positive actions
 * - error: for error messages
 * - info: for informational messages
 * - warning: for cautionary messages
 *
 * Each method accepts a message and an optional 'options' object. The options allow additional
 * configuration for the toast, which are merged with the default settings for each notification type.
 */
export const notify = {
  /*
   * Display a success notification.
   * Uses a green background and a checkmark icon.
   */
  success: (msg, options = {}) =>
    toast.success(msg, {
      className: `${baseStyle} bg-green-600`, // Combine base style with success-specific background color
      icon: "✅", // Success icon
      ...options, // Merge any additional options provided
    }),

  /*
   * Display an error notification.
   * Uses a red background and a cross icon.
   */
  error: (msg, options = {}) =>
    toast.error(msg, {
      className: `${baseStyle} bg-red-600`, // Combine base style with error-specific background color
      icon: "❌", // Error icon
      ...options, // Merge any additional options provided
    }),

  /*
   * Display an informational notification.
   * Uses a blue background and an information icon.
   */
  info: (msg, options = {}) =>
    toast.info(msg, {
      className: `${baseStyle} bg-blue-600`, // Combine base style with info-specific background color
      icon: "ℹ️", // Information icon
      ...options, // Merge any additional options provided
    }),

  /*
   * Display a warning notification.
   * Uses a yellow background and a warning icon.
   */
  warning: (msg, options = {}) =>
    toast.warning(msg, {
      className: `${baseStyle} bg-yellow-600`, // Combine base style with warning-specific background color
      icon: "⚠️", // Warning icon
      ...options, // Merge any additional options provided
    }),
}
