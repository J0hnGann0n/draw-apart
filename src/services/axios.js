import axios from 'axios'
import toast from './toast'

axios.interceptors.response.use(
  function (response) { return response },
  function (error) {
    // Allow global error handling to be disabled by adding { errorHandle: false } to the request payloada
    if (Object.prototype.hasOwnProperty.call(error, "errorHandle") && error.config.errorHandle === false) {
      return Promise.reject(error);
    }

    if (error.response) {
      if (error.response.status == 500) { toast.error("The server just shat the bed!") }
      else if (error.response.status == 403) { toast.error("Thou shalt not pass!") }
      else { toast.error(error.response.data.message) }
    }

  }
);

export default axios