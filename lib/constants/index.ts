export const APP_NAME = "Okaz";
export const APP_DESCRIPTION =
  "Your one-stop shop for incredible deals on everything you love.";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 6;
export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery"];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "PayPal";
export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 2;
export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["admin", "user"];
