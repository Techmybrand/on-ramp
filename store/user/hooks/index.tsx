import { AppState } from "@/store";
import { useSelector } from "react-redux";
import { UserState } from "../reducer";

export function useUserData(): UserState {
    const user = useSelector<AppState, AppState['user']>((state) => state.user)
    return user
  }