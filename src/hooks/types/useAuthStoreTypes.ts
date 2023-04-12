export interface IDataResult {
  data: {
    ok: boolean;
    name: string;
    uid: string;
    token: string;
  };
}

export interface IRenewToken {
  data: {
    ok: boolean;
    uid: string;
    name: string;
    token: string;
  };
}
