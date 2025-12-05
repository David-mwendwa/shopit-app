import { toast } from 'react-toastify';

export const showAlert = (type, message) => {
  const options = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    default:
      toast(message, options);
  }
};

export const showError = (message) => showAlert('error', message);
export const showSuccess = (message) => showAlert('success', message);
export const showInfo = (message) => showAlert('info', message);
export const showWarning = (message) => showAlert('warning', message);
