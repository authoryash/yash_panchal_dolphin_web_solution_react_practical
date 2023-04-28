import axios from "axios";
import { APP_CONST } from "../Constants/app.constants";

const Axios = axios.create({ baseURL: APP_CONST.BASE_URL });

export default Axios;
