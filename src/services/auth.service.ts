import { AxiosError, AxiosInstance } from "axios";
import {
  REGISTER_USER_URI,
  LOGIN_URI,
  API_DOMAIN,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
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
  resetPassword(email: string): Promise<string>;
  updatePassword(
    email: string,
    token: string,
    newPassword: string
  ): Promise<string>;
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

      return payload?.data?.message as string;
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
        user: User.fromJson(response?.data?.user),
        token: response?.data?.token as string,
        message: response?.data?.message as string,
      };
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(error.response.data.message, {
        fields: [error.response.data.message],
      });
    }
  }

  async resetPassword(email: string): Promise<string> {
    try {
      const response = await this._httpClient.post(
        API_DOMAIN + RESET_PASSWORD,
        {
          email,
        }
      );
      return response?.data?.message;
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }

  async updatePassword(
    email: string,
    token: string,
    newPassword: string
  ): Promise<string> {
    try {
      const response = await this._httpClient.put(
        API_DOMAIN + UPDATE_PASSWORD,
        {
          email,
          token,
          new_password: newPassword,
        }
      );
      return response?.data?.message;
    } catch (error: any | Error | AxiosError) {
      throw new ResponseError(
        error.response.data.message,
        error.response.data.errors
      );
    }
  }
}
