# Demo of Opensea API Rate Limiting Problems

## Running the test

The following sample uses an API spec'd at 10 requests per second.

We are sending requests at a rate of less than 5 requests per second
and are being heavily rate-limited.

```sh
% pnpm start
[2023-05-04T21:24:23.224Z] Sending Opensea request
[2023-05-04T21:24:23.446Z] Sending Opensea request
[2023-05-04T21:24:23.650Z] Sending Opensea request
[2023-05-04T21:24:23.854Z] Sending Opensea request
[2023-05-04T21:24:24.060Z] Sending Opensea request
[2023-05-04T21:24:24.265Z] Sending Opensea request
[2023-05-04T21:24:24.469Z] Sending Opensea request
[2023-05-04T21:24:24.672Z] Sending Opensea request
[2023-05-04T21:24:24.878Z] Sending Opensea request
[2023-05-04T21:24:25.083Z] Sending Opensea request
[2023-05-04T21:24:25.286Z] Sending Opensea request
[2023-05-04T21:24:25.494Z] Sending Opensea request
[2023-05-04T21:24:25.699Z] Sending Opensea request
[2023-05-04T21:24:25.904Z] Sending Opensea request
[2023-05-04T21:24:26.109Z] Sending Opensea request
[2023-05-04T21:24:26.312Z] Sending Opensea request
[2023-05-04T21:24:26.519Z] Sending Opensea request
[2023-05-04T21:24:26.724Z] Sending Opensea request
[2023-05-04T21:24:26.930Z] Sending Opensea request
[2023-05-04T21:24:27.135Z] Sending Opensea request
[2023-05-04T21:24:27.338Z] Sending Opensea request
[2023-05-04T21:24:27.545Z] Sending Opensea request
[2023-05-04T21:24:27.754Z] Sending Opensea request
[2023-05-04T21:24:27.960Z] Sending Opensea request
[2023-05-04T21:24:28.164Z] Sending Opensea request
[2023-05-04T21:24:28.323Z] Opensea request failed, status=429, retry-after=0
[2023-05-04T21:24:28.366Z] Sending Opensea request
[2023-05-04T21:24:28.387Z] Opensea request failed, status=429, retry-after=180
[2023-05-04T21:24:28.568Z] Sending Opensea request
[2023-05-04T21:24:28.595Z] Opensea request failed, status=429, retry-after=180
[2023-05-04T21:24:28.772Z] Sending Opensea request
[2023-05-04T21:24:28.799Z] Opensea request failed, status=429, retry-after=60
[2023-05-04T21:24:28.975Z] Sending Opensea request
[2023-05-04T21:24:28.999Z] Opensea request failed, status=429, retry-after=59
[2023-05-04T21:24:29.179Z] Sending Opensea request
[2023-05-04T21:24:29.230Z] Opensea request failed, status=429, retry-after=59
[2023-05-04T21:24:29.383Z] Sending Opensea request
[2023-05-04T21:24:29.401Z] Opensea request failed, status=429, retry-after=59
[2023-05-04T21:24:29.588Z] Sending Opensea request
[2023-05-04T21:24:29.618Z] Opensea request failed, status=429, retry-after=59
[2023-05-04T21:24:29.791Z] Sending Opensea request
[2023-05-04T21:24:29.823Z] Opensea request failed, status=429, retry-after=59
[2023-05-04T21:24:29.995Z] Sending Opensea request
[2023-05-04T21:24:30.025Z] Opensea request failed, status=429, retry-after=58
[2023-05-04T21:24:30.199Z] Sending Opensea request
[2023-05-04T21:24:30.218Z] Opensea request failed, status=429, retry-after=58
```
