import { execSync } from "child_process";
import log from "./src/common/utils/logger";

type CommandTypeProps = "generate" | "run" | "revert";

const typeorm = () => {
  const commandType = process.argv[2] as CommandTypeProps;
  const migrationName = process.argv[3];
  let command = "";

  if (!commandType) {
    log.error("Please provide the command type (generate or run)");
    process.exit(1);
  }
  console.log(migrationName);

  if (commandType === "generate" && !migrationName) {
    log.error("Please provide a migration name");
    process.exit(1);
  }

  if (commandType === "generate") {
    command = `npm run typeorm migration:generate -- -d src/common/db/typeorm.config.ts src/common/db/migrations/${migrationName}`;
  } else if(commandType==="run") {
    command = `npm run typeorm migration:run -- -d src/common/db/typeorm.config.ts`;
  } else if(commandType==="revert"){
    command =  `npm run typeorm migration:revert -- -d src/common/db/typeorm.config.ts`
  }

  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    log.error("Error executing migrations command");
    process.exit(1);
  }
};

typeorm();
