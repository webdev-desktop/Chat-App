import { apiFetch } from "./api.js";

export default async function loginUser(credentials) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
