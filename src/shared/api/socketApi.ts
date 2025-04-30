import io, {Socket} from "socket.io-client";
import { getCookie } from '@/shared/lib/utils/cookieUtils'

class SocketIoApi {
  static socket: null | Socket  = null;
  static  createConnection() {
    const accessToken = getCookie('accessToken')
    if (!accessToken) {
      console.error("No access token found. Socket connection aborted.");
      return;
    }

    const queryParams = {
      query: { accessToken }
    };
    this.socket = io('https://inctagram.work', queryParams);

    this.socket.on("connect", () => {
      console.log("ws:connect - Socket connected successfully")
    })
    this.socket.on("disconnect", (reason) => {
      console.log(`ws:disconnect - Socket disconnected: ${reason}`);
    })
    // for debugging
    this.socket.onAny((event, ...args) => {
      console.log(`WS Event: ${event}`, args);
    });
  }
  static disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default SocketIoApi

