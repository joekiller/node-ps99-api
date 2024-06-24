import { CollectionData } from "./collection-data";

export type SecretRoomData = CollectionData<
  "SecretRooms",
  SecretRoomConfigData
>;

export type SecretRoomConfigData = {
  UnlockAnimation: unknown;
  InstanceId: string;
  CloseDoor: unknown;
  RequiredZone: string;
  DisplayName: string;
};
