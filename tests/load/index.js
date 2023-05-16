import http from "k6/http";
import { check, sleep } from "k6";

// export const options = {
//   thresholds: {
//     http_req_failed: ["rate<0.01"], // http errors should be less than 1%
//     http_req_duration: ["p(95)<200"], // 95% of requests should be below 200ms
//   },
// };

export default function () {
  const res = http.get("http://localhost:4000/api/health");
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}
