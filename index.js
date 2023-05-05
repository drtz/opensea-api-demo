import * as dotenv from "dotenv";

dotenv.config();

const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;
const RATE_LIMIT_RPS = 5;

const processStartTimeMillis = Date.now();

const openseaEventsUrl = "https://api.opensea.io/api/v1/events?" +
  new URLSearchParams({
    event_type: "created",
    limit: 200,
  }).toString();

function timeout(timeoutMillis) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeoutMillis);
  });
}

async function fetchOpenseaEventsBefore(occurredBefore) {
  console.log(`[${new Date().toISOString()}] Sending Opensea request`);
  const response = await fetch(
    openseaEventsUrl + "&occurred_before=" +
      new Date(occurredBefore).toISOString(),
    {
      headers: {
        "X-API-KEY": OPENSEA_API_KEY,
      },
    }
  );

  const status = response.status;
  const retryAfter = response.headers.get("Retry-After") ?? 0;
  if (response.status !== 200) {
    console.log(`[${new Date().toISOString()}] Opensea request failed, ` +
      `status=${status}, retry-after=${retryAfter}`);
  }
}

(async () => {
  const startTime = Date.now();

  for (let i = 0; i < 1000000; i++) {
    fetchOpenseaEventsBefore(startTime - i * 10000);
    await timeout(1000 / RATE_LIMIT_RPS);
  }
  process.exit(0);
})();

