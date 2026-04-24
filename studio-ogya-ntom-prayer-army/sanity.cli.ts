import { defineCliConfig } from "sanity/cli";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const deploymentAppId = process.env.SANITY_DEPLOYMENT_APP_ID;

export default defineCliConfig({
  api: {
    projectId: getRequiredEnv("SANITY_STUDIO_PROJECT_ID"),
    dataset: getRequiredEnv("SANITY_STUDIO_DATASET"),
  },
  studioHost: getRequiredEnv("SANITY_DEPLOY_HOST"),
  ...(deploymentAppId
    ? {
        deployment: {
          appId: deploymentAppId,
        },
      }
    : {}),
});
