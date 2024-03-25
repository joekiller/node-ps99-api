export type RAPResponseBody = {
  status: string;
  data: (
    | {
        category: string;
        configData: { id: string; pt: number };
        value: number;
      }
    | {
        category: string;
        configData: { id: string };
        value: number;
      }
    | {
        category: string;
        configData: { id: string; sh: boolean };
        value: number;
      }
    | {
        category: string;
        configData: { id: string; pt: number; sh: boolean };
        value: number;
      }
    | {
        category: string;
        configData: { id: string; tn: number };
        value: number;
      }
  )[];
};
