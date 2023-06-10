import { toast } from "react-toastify";

export const sucess_toast = (message, position) => {
  toast.success(message, {
    position: position ? position : "bottom-right",
  });
};
export const error_toast = (message, position) => {
  toast.error(message, {
    position: position ? position : "bottom-right",
  });
};
export const warn_toast = (message, position) => {
  toast.warn(message, {
    position: position ? position : "bottom-right",
  });
};
export const info_toast = (message, position) => {
  toast.info(message, {
    position: position ? position : "bottom-right",
  });
};

// toast("Custom Style Notification with css class!", {
//   position: toast.POSITION.BOTTOM_RIGHT,
//   className: "foo-bar",
// });