import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const StoreUserInfo = ({
  accessToken,
  deviceIdentifier,
}: {
  accessToken: String;
  deviceIdentifier: number;
}) => {
  setToLocalStorage("accessToken", accessToken as string);
  setToLocalStorage("deviceIdentifier", deviceIdentifier);
};

export const RemoveUserInfo = () => {
  removeFromLocalStorage("accessToken");
  removeFromLocalStorage("deviceIdentifier");
};

export const StoreOtpInfo = ({ token }: { token: string }) => {
  setToLocalStorage("otpToken", token);
};
export const GetInfoFromStorage = async (key: string) => {
  getFromLocalStorage(key);
};
