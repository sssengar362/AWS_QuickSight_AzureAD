import {
  QuickSightClient,
  GetDashboardEmbedUrlCommand,
  EmbeddingIdentityType,
} from "@aws-sdk/client-quicksight";

// Initialize QuickSight client
const quickSight = new QuickSightClient({
  region: process.env.AWS_REGION, // Your AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const getQuickSightEmbedUrl = async (
  awsRoleArn: string
): Promise<string> => {
  const params = {
    AwsAccountId: process.env.AWS_ACCOUNT_ID!, // Your AWS account ID
    DashboardId: process.env.AWS_DASHBOARD_ID!, // Your QuickSight dashboard ID
    IdentityType: EmbeddingIdentityType.IAM, // Use the enum value here
    SessionLifetimeInMinutes: 60,
    UserArn: awsRoleArn,
    ResetDisabled: true,
    UndoRedoDisabled: true,
  };

  try {
    const command = new GetDashboardEmbedUrlCommand(params);
    const response = await quickSight.send(command);
    return response.EmbedUrl!;
  } catch (error) {
    console.error("Error getting embed URL", error);
    throw error;
  }
};
