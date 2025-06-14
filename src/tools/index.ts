import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { backupTools } from './backup.tool.js';
import { configTools } from './config.tool.js';
import { customDomainTools } from './customDomain.tool.js';
import { databaseTools } from './database.tool.js';
import { deploymentTools } from './deployment.tool.js';
import { domainTools } from './domain.tool.js';
import { environmentTools } from './environment.tool.js';
import { gitHubTools } from './github.tool.js';
import { logsTools } from './logs.tool.js';
import { monitoringTools } from './monitoring.tool.js';
import { networkingTools } from './networking.tool.js';
import { pluginTools } from './plugin.tool.js';
import { projectTools } from './project.tool.js';
import { resourceTools } from './resource.tool.js';
import { securityTools } from './security.tool.js';
import { serviceTools } from './service.tool.js';
import { tcpProxyTools } from './tcpProxy.tool.js';
import { teamTools } from './team.tool.js';
import { templateTools } from './template.tool.js';
import { toolFilterTools } from './tool-filter.tool.js';
import { usageTools } from './usage.tool.js';
import { variableTools } from './variable.tool.js';
import { volumeTools } from './volume.tool.js';
import { webhookTools } from './webhook.tool.js';

import { Tool } from '@/utils/tools.js';
import { initializeToolFilter, shouldIncludeTool } from '@/utils/tool-filter.js';

export function registerAllTools(server: McpServer) {
  // Initialize tool filtering from environment variables
  const filterConfig = initializeToolFilter();
  
  // Collect all tools
  const allTools = [
    ...backupTools,
    ...configTools,
    ...customDomainTools,
    ...databaseTools,
    ...deploymentTools,
    ...domainTools,
    ...environmentTools,
    ...gitHubTools,
    ...logsTools,
    ...monitoringTools,
    ...networkingTools,
    ...pluginTools,
    ...projectTools,
    ...resourceTools,
    ...securityTools,
    ...serviceTools,
    ...tcpProxyTools,
    ...teamTools,
    ...templateTools,
    ...toolFilterTools,
    ...usageTools,
    ...variableTools,
    ...volumeTools,
    ...webhookTools,
  ] as Tool[];

  // Filter tools based on configuration
  const filteredTools = allTools.filter((tool) => {
    const toolName = tool[0]; // Tool name is the first element in the tuple
    return shouldIncludeTool(toolName, filterConfig);
  });

  // Log registration statistics
  console.error(`Registering ${filteredTools.length}/${allTools.length} tools with MCP server`);

  // Register each filtered tool with the server
  filteredTools.forEach((tool) => {
    server.tool(
      ...tool
    );
  });
} 