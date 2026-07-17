#!/usr/bin/env node
import { loadConfig } from "./config.js";
import { startServer } from "./server.js";
import { Logger } from "./utils/logger.js";
const config = loadConfig();
const logger = new Logger(config.logLevel);
startServer(config).catch((error) => {
    logger.log("error", "mcp_server_start_failed", { error: error instanceof Error ? error.message : String(error) });
    process.exit(1);
});
//# sourceMappingURL=index.js.map