export type CollectionResponseBody = {
  status: string;
  data: (
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { flyHeight: number; angelusSpin: boolean };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            flipbookAnimationGold: string[];
            flipbookAnimationSpeed: number;
            flipbookAnimation: string[];
          };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { ballBounceHeight: number };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          hideSerial: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { hybridFly: boolean };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { balloon: boolean };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          tradable: boolean;
          animations: { balloon: boolean };
          indexObtainable: boolean;
          hideExists: boolean;
          huge: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          ugc: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          hideSerial: boolean;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { flyHeightChange: number };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            flyHeightChange: number;
            swerve: boolean;
            swerveMaxAngle: number;
            flyHeight: number;
            swerveAggression: number;
          };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          evolved: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          evolved: boolean;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            replacementPool: number[][];
            jelly: boolean;
            replacements: {
              dst: {};
              isUnique: boolean;
              title: string;
              desc: string;
            }[];
          };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            colorVariants: {
              Chance: number;
              Magnitude: number;
              Title: string;
              Color: {};
              Id: number;
              Name: string;
              IsUnique: boolean;
              Desc: string;
            }[];
          };
          huge: boolean;
          name: string;
          fly: boolean;
          preventGolden: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          preventGolden: boolean;
          huge: boolean;
          name: string;
          animations: {
            colorVariants: {
              Chance: number;
              Magnitude: number;
              Title: string;
              Color: {};
              Id: number;
              Name: string;
              IsUnique: boolean;
              Desc: string;
            }[];
          };
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { balloon: boolean };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          preventGolden: boolean;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          preventGolden: boolean;
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            swerveAggression: number;
            swerve: boolean;
            swerveMaxAngle: number;
          };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { flyHeight: number; flyHeightChange: number };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { angelusSpin: boolean };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            fadeFrames: {
              instant: boolean;
              duration: number;
              iconThumbnail: string;
              textureName: string;
            }[];
            idleActionAnimations: (string | number)[][];
            customAnimations: boolean;
          };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          indexObtainable: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          animations: {
            balloon: boolean;
            ridingGravity: number;
            ridingCameraOffset: {};
            ridingJumpPower: number;
          };
          indexObtainable: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          indexObtainable: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          animations: {
            ridingGravity: number;
            ridingCameraOffset: {};
            swerveMaxAngle: number;
            flyHeight: number;
            spin: boolean;
            swerve: boolean;
          };
          indexObtainable: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          tradable: boolean;
          hideExists: boolean;
          indexObtainable: boolean;
          name: string;
          indexDesc: string;
          ugc: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          animations: {
            flyHeight: number;
            flyHeightChange: number;
            ridingCameraOffset: {};
            ridingTransparency: number;
          };
          indexObtainable: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          animations: { ridingCameraOffset: {}; boneFlyingAnimation: string };
          indexObtainable: boolean;
          flyingTitanic: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          animations: {
            balloon: boolean;
            balloonSpeed: number;
            balloonScale: {};
          };
          indexObtainable: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          animations: { ridingCameraOffset: {} };
          indexObtainable: boolean;
          name: string;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          animations: {
            replacementPool: number[][];
            jelly: boolean;
            replacements: {
              dst: {};
              isUnique: boolean;
              title: string;
              desc: string;
            }[];
          };
          indexObtainable: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          animations: {
            fadeFrames: {
              instant: boolean;
              duration: number;
              iconThumbnail: string;
              textureName: string;
            }[];
            idleActionAnimations: (string | number)[][];
            customAnimations: boolean;
          };
          indexObtainable: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          fly: boolean;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          name: string;
          exclusiveLevel: number;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          exclusiveLevel: number;
          goldenThumbnail: string;
          name: string;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          power: number;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { angelusSpin: boolean };
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          fly: boolean;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          fromZoneNumber: number;
          name: string;
          cachedPower: number[];
          overrideZoneNumber: number;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          power: number;
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          thumbnail: string;
          fly: boolean;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          exclusiveLevel: number;
          goldenThumbnail: string;
          animations: { angelusSpin: boolean };
          name: string;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          exclusiveLevel: number;
          goldenThumbnail: string;
          name: string;
          hideSerial: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          hidden: boolean;
          cachedPower: number[];
          name: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          hidden: boolean;
          cachedPower: number[];
          name: string;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          hidden: boolean;
          cachedPower: number[];
          name: string;
          fromZoneNumber: number;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          hidden: boolean;
          name: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          hidden: boolean;
          name: string;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          exclusiveLevel: number;
          goldenThumbnail: string;
          name: string;
          hideSerial: boolean;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          exclusiveLevel: number;
          goldenThumbnail: string;
          animations: { hybridFly: boolean };
          name: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { hybridFly: boolean };
          name: string;
          exclusiveLevel: number;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          hidden: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          hidden: boolean;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          exclusiveLevel: number;
          goldenThumbnail: string;
          animations: { balloon: boolean };
          name: string;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          name: string;
          exclusiveLevel: number;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { flyHeightChange: number };
          name: string;
          exclusiveLevel: number;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { jelly: boolean };
          name: string;
          exclusiveLevel: number;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { ballBounceHeight: number };
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { christmasLights: boolean };
          fromWorldNumber: number;
          hidden: boolean;
          cachedPower: number[];
          name: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          name: string;
          goldenThumbnail: string;
          animations: {
            flyHeight: number;
            flyHeightChange: number;
            flySpeed: number;
          };
          fromWorldNumber: number;
          fromZoneNumber: number;
          thumbnail: string;
          cachedPower: number[];
          fly: boolean;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          exclusiveLevel: number;
          goldenThumbnail: string;
          animations: {
            flipbookAnimationGold: string[];
            flipbookAnimationSpeed: number;
            flipbookAnimation: string[];
          };
          name: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            flyHeightChange: number;
            swerve: boolean;
            swerveMaxAngle: number;
            flyHeight: number;
            swerveAggression: number;
          };
          name: string;
          exclusiveLevel: number;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { balloon: boolean };
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          exclusiveLevel: number;
          goldenThumbnail: string;
          name: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          indexObtainable: boolean;
          name: string;
          exclusiveLevel: number;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          exclusiveLevel: number;
          goldenThumbnail: string;
          animations: {
            fadeFrames: {
              instant: boolean;
              duration: number;
              iconThumbnail: string;
              textureName: string;
            }[];
            idleActionAnimations: (string | number)[][];
            customAnimations: boolean;
          };
          name: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          name: string;
          goldenThumbnail: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            vertexColorAnim: { Time: number; Value: {} }[];
            vertexColorAnimSpeed: number;
          };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            replacementPool: number[][];
            jelly: boolean;
            replacements: {
              dst: {};
              isUnique: boolean;
              title: string;
              desc: string;
            }[];
          };
          indexObtainable: boolean;
          huge: boolean;
          name: string;
          indexDesc: string;
          hideExists: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          titanic: boolean;
          goldenThumbnail: string;
          animations: {
            replacementPool: number[][];
            jelly: boolean;
            replacements: {
              dst: {};
              isUnique: boolean;
              title: string;
              desc: string;
            }[];
          };
          indexObtainable: boolean;
          flyingTitanic: boolean;
          name: string;
          hideExists: boolean;
          fly: boolean;
          indexDesc: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          name: string;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          isFromLastZone: boolean;
          fromWorldNumber: number;
          fromZoneNumber: number;
          thumbnail: string;
          cachedPower: number[];
          name: string;
          fly: boolean;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { jelly: boolean };
          name: string;
          exclusiveLevel: number;
          hideExists: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: { jelly: boolean };
          exclusiveLevel: number;
          name: string;
          hideExists: boolean;
          fly: boolean;
          thumbnail: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            vertexColorAnim: { Time: number; Value: {} }[];
            vertexColorAnimSpeed: number;
          };
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          isFromLastZone: boolean;
          name: string;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            vertexColorAnim: { Time: number; Value: {} }[];
            vertexColorAnimSpeed: number;
          };
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          fly: boolean;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
    | {
        configName: string;
        category: string;
        configData: {
          goldenThumbnail: string;
          animations: {
            balloon: boolean;
            vertexColorAnimSpeed: number;
            vertexColorAnim: { Time: number; Value: {} }[];
          };
          fromWorldNumber: number;
          fromZoneNumber: number;
          cachedPower: number[];
          name: string;
          thumbnail: string;
          fromEgg: string;
        };
        collection: string;
      }
  )[];
};
