import * as dotenv from "dotenv";

dotenv.config();

// Get api key from env var
const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;

// Configurable rate limit
const RATE_LIMIT_RPS = parseInt(process.env.RATE_LIMIT_RPS || 5, 10);
const REQUEST_INTERVAL_MS = 1_000 / RATE_LIMIT_RPS;

function getOpenseaEventsUrl(occurredBefore) {
  return (
    "https://api.opensea.io/api/v1/events?" +
    new URLSearchParams({
      event_type: "created",
      limit: 200,
      occurred_before: new Date(occurredBefore).toISOString(),
    }).toString()
  );
}

var requestIndex = 0;

async function fetchOpenseaEventsBefore(occurredBefore) {
  let thisRequest = requestIndex++;
  console.log(
    `[${new Date().toISOString()}] Sending Opensea request ${thisRequest}`
  );
  const response = await fetch(getOpenseaEventsUrl(occurredBefore), {
    headers: { "X-API-KEY": OPENSEA_API_KEY },
  });

  const status = response.status;
  const retryAfter = response.headers.get("Retry-After") ?? 0;
  if (response.status !== 200) {
    console.log(
      `[${new Date().toISOString()}] Opensea request ${thisRequest} failed, ` +
        `status=${status}, retry-after=${retryAfter}`
    );
    return parseInt(retryAfter, 10);
  } else {
    console.log(
      `[${new Date().toISOString()}] Opensea request ${thisRequest} success`
    );
  }
}

async function main() {
  const startTime = Date.now();

  console.log(
    `Opensea apiKey ${OPENSEA_API_KEY}, RPS ${RATE_LIMIT_RPS}, INTERVAL_MS ${REQUEST_INTERVAL_MS}`
  );
  for (let i = 0; ; i++) {
    // specify a different occurred_before value for each request
    // so that each response has a different batch of events
    fetchOpenseaEventsBefore(startTime - i * 10_000);

    // wait to avoid exceeding rate limit
    await new Promise((resolve) => {
      setTimeout(resolve, REQUEST_INTERVAL_MS);
    });
  }
  process.exit(0);
}
main();
