import api from './client';

export interface BotActionRequest {
  accountId?: string;
  tileId?: string;
  resourceType?: 'wood' | 'food' | 'iron';
}

export interface BotActionResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const startBot = async (accountId?: string): Promise<BotActionResponse> => {
  return api.post<BotActionResponse>('/bot/start', { accountId });
};

export const stopBot = async (accountId?: string): Promise<BotActionResponse> => {
  return api.post<BotActionResponse>('/bot/stop', { accountId });
};

export const startAllBots = async (): Promise<BotActionResponse> => {
  return startBot();
};

export const stopAllBots = async (): Promise<BotActionResponse> => {
  return stopBot();
};

export const harvestResource = async (
  accountId: string,
  tileId: string,
  resourceType: 'wood' | 'food' | 'iron'
): Promise<BotActionResponse> => {
  return api.post<BotActionResponse>('/bot/harvest', {
    accountId,
    tileId,
    resourceType,
  });
};

export const trainTroops = async (accountId: string): Promise<BotActionResponse> => {
  return api.post<BotActionResponse>('/bot/train', { accountId });
};

export const upgradeBuilding = async (accountId: string): Promise<BotActionResponse> => {
  return api.post<BotActionResponse>('/bot/upgrade', { accountId });
};

// Placeholder function for custom game request integration
export const collectResourceFromGame = async (
  accountToken: string,
  tileId: string
): Promise<BotActionResponse> => {
  // This is a placeholder for custom game request integration
  // In production, this would make actual game API calls
  console.log(`Collecting resource from tile ${tileId} using token ${accountToken}`);
  
  return api.post<BotActionResponse>('/bot/harvest', {
    accountToken,
    tileId,
  });
};
