import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { SsoConnect, SsoPb, CommonPb } from "@snsoft/sso-grpc-web";
import { BASE_API_URL } from "./constants";
const transport = createGrpcWebTransport({
  baseUrl: BASE_API_URL,
});

const client = createPromiseClient(SsoConnect.SsoService, transport);

export type GrpcReqFieldOptional =
  | "runtime"
  | "typeName"
  | "fields"
  | "fromBinary"
  | "fromJson"
  | "fromJsonString"
  | "equals"
  | "clone"
  | "toBinary"
  | "toJson"
  | "toJsonString"
  | "getType";

export const signIn = async (username: string, password: string) => {
    const requestOptions: Omit<
      SsoPb.SignInReq,
      GrpcReqFieldOptional
    > = {
      username,
      password,
    };

    try {
        console.log("grpc requestOptions signIn = ", requestOptions);
        const res = await client.signIn(requestOptions);

        console.log("res grpc signIn = ", res);
        return res.token;
    } catch (error) {
        console.error("Error fetching data in signIn:", error);
    }
};

export const signOut = async (token: string) => {
  const requestOptions: Omit<SsoPb.SignOutReq, GrpcReqFieldOptional> = {
    token,
  };

  try {
    console.log("grpc requestOptions signOut = ", requestOptions);
    const res = await client.signOut(requestOptions);

    console.log("res grpc signOut = ", res);
    return res.status === CommonPb.StatusCode.STATUS_SUCCESS;
  } catch (error) {
    console.error("Error fetching data in signOut:", error);
  }
};

export const refreshToken = async (token: string) => {
  const requestOptions: Omit<SsoPb.RefreshTokenReq, GrpcReqFieldOptional> = {
    token,
  };

  try {
    console.log("grpc requestOptions refreshToken = ", requestOptions);
    const res = await client.refreshToken(requestOptions);

    console.log("res grpc refreshToken = ", res);
    return res.token;
  } catch (error) {
    console.error("Error fetching data in refreshToken:", error);
  }
};