import { apiClient } from "./api-client";
import { transactionRoutes } from "./routes/transaction";
import { authRoutes } from "./routes/auth";

export const api = {
  auth: authRoutes(apiClient),
  transaction: transactionRoutes(apiClient),
};
