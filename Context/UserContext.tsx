import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  Dispatch as _Dispatch,
  SetStateAction,
} from "react";
import Cookies from "universal-cookie";
import { UseCookie } from "../Hooks/UseCookie";
import { AuthMe } from "../Services/lib/Auth";

const Cookie = new Cookies();
const loginInterval = 60 * 14;

type UserProviderProps = { children: React.ReactNode };
type State = {
  token: string | undefined;
  refresh_token: string | undefined;
};
type Action = {
  type: "login" | "login-passive" | "logout";
  state?: State;
};
type Dispatch = (action: Action) => void;

interface UserContextInterface {
  state: State;
  dispatcher: Dispatch;
  get_token: () => string | undefined;
  isLoading: boolean;
}

const UserContext = createContext<UserContextInterface | undefined>(undefined);

function UserReducer(state: State, action: Action) {
  switch (action.type) {
    case "login": {
      Cookie.set("refresh_token", action.state?.refresh_token, {
        path: "/",
        maxAge: 23 * 3600,
      });
      return {
        token: action.state?.token,
        refresh_token: action.state?.refresh_token,
      };
    }
    case "login-passive": {
      return {
        token: action.state?.token,
        refresh_token: action.state?.refresh_token,
      };
    }
    case "logout": {
      console.log("end ym bolood bnaa");
      Cookie.remove("refresh_token", {
        path: "/",
      });
      return { token: undefined, refresh_token: undefined };
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(UserReducer, {
    token: undefined,
    refresh_token: undefined,
  });
  const intervalRef = useRef<NodeJS.Timeout>(null as unknown as NodeJS.Timeout);
  const [isLoading, setLoading] = useState(false);

  const { getItem: getToken } = UseCookie({
    name: "refresh_token",
  });

  const get_token = () => {
    return state.token;
  };

  const RefreshToken = async (
    token: string,
    setLoading?: _Dispatch<SetStateAction<boolean>> | undefined
  ) => {
    try {
      const { accessToken, refreshToken }: any = await AuthMe(token);

      dispatch({
        type: "login-passive",
        state: {
          token: accessToken,
          refresh_token: refreshToken,
        },
      });
      if (setLoading) setLoading(false);
    } catch (error) {
      if (setLoading) setLoading(false);
    }
  };

  const dispatcher = (action: Action) => {
    if (action.type === "login") {
      if (action.state?.token)
        intervalRef.current = setInterval(() => {
          const token = getToken();
          RefreshToken(token);
        }, 1000 * loginInterval);
    } else if (action.type === "logout") {
      clearInterval(intervalRef.current);
    }
    dispatch(action);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setLoading(true);
      RefreshToken(token, setLoading);
      intervalRef.current = setInterval(() => {
        RefreshToken(token);
      }, 1000 * loginInterval);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const value = { state, dispatcher, get_token, isLoading };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
