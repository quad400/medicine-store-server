import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  redact: ["DATABASE_URL"],
});

export default log;
