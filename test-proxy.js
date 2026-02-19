/* eslint-disable @typescript-eslint/no-require-imports */
const http = require("http");

const data = JSON.stringify({
  email: "demouser@example.com",
  password: "password123",
});

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/api/proxy/auth/login",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

console.log(
  `Sending POST request to http://${options.hostname}:${options.port}${options.path}`,
);

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

  let responseData = "";
  res.setEncoding("utf8");
  res.on("data", (chunk) => {
    responseData += chunk;
  });

  res.on("end", () => {
    console.log("BODY:", responseData);
  });
});

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
