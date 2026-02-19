import { apiClient } from "./api-client";
import { transactionRoutes } from "./routes/transaction";
import { authRoutes } from "./routes/auth";
import { paymentTypeRoutes } from "./routes/paymentType";

export const api = {
  auth: authRoutes(apiClient),
  transaction: transactionRoutes(apiClient),
  paymentType: paymentTypeRoutes(apiClient),
};
