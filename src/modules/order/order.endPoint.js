import { roles } from "../../middleware/auth.js"



export const endPoint ={


  create : [roles.User],
  cancelOrder : [roles.User],
  updateUserStatusByAdmin : [roles.Admin],
  getAllOrders: [roles.Admin] // Example role; adjust as per your authorization setup


}