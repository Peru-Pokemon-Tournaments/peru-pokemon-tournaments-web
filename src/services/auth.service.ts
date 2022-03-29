import { AxiosError, AxiosInstance } from "axios";
import {
  REGISTER_USER_URI,
  LOGIN_URI,
  API_DOMAIN,
} from "@/config/services-uri.config";
import { ResponseError } from "./interfaces/reponse-error";
import { User } from "@/models/user.model";

export interface AuthService {
  registerUser({
    firstName,
    lastName,
    name,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    password: string;
  }): Promise<string>;
  login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string; message: string }>;
}

export class ApiAuthService implements AuthService {
  constructor(private _httpClient: AxiosInstance) {}

  async registerUser({
    firstName,
    lastName,
    name,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    password: string;
  }): Promise<string> {
    try {
      const payload = await this._httpClient.post(
        API_DOMAIN + REGISTER_USER_URI,
        {
          first_name: firstName,
          last_name: lastName,
          name,
          email,
          password,
        }
      );

      return payload?.data?.data?.message as string;
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string; message: string }> {
    try {
      const response = await this._httpClient.post(API_DOMAIN + LOGIN_URI, {
        email,
        password,
      });
      return {
        user: User.fromJson(response?.data?.data?.user),
        token: response?.data?.data?.token as string,
        message: response?.data?.data?.message as string,
      };
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(error.response.data.message, {
        fields: [error.response.data.message],
      });
    }
  }
}
