export default async function authorize(req) {
  const { headers } = req;
  const { host } = headers;
  if (host.includes("localhost") || host.includes("vercel")) {
    return true;
  }
  if (host.includes("rapidapi")) {
    if (!headers["X-RapidAPI-Key"] || !headers["X-RapidAPI-Host"]) {
      return false;
    }
  }
  return false;
}
