import { useState } from 'react';
import { createGStore } from 'create-gstore';
import { jwtDecode } from 'jwt-decode';
import { storage } from '../lib/storage';
import { api } from '../api/instance';

type Session = {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

const SESSION_KEY = 'session';

let refreshTokenPromise: Promise<string | null> | null = null;

export const useSession = createGStore(() => {
  const [session, setSession] = useState<Session | null>(() =>
    storage.get<Session>(SESSION_KEY),
  );
  const [remember, setRemember] = useState(false);

  const login = (session: Session, remember: boolean) => {
    remember && storage.set(SESSION_KEY, session);
    setSession(session);
    setRemember(remember);
  };

  const logout = () => {
    !remember && storage.remove(SESSION_KEY);
    setSession(null);
  };

  const refreshToken = async (): Promise<string | null> => {
    if (!session) {
      return null;
    }
    const { iat } = jwtDecode(session.accessToken);

    if (!iat) {
      return null;
    }

    if (iat < Date.now() / 1000 + 1) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = api
          .post<{ accessToken: string; refreshToken: string }>(
            '/auth/refresh',
            { refreshToken: session.refreshToken },
          )
          .then((r) => {
            return r.data;
          })
          .then((tokens) => {
            if (tokens) {
              login({ ...session, ...tokens }, remember);
              return tokens.accessToken;
            } else {
              logout();
              return null;
            }
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }
      const newToken = await refreshTokenPromise;
      return newToken;
    } else {
      return session.accessToken;
    }
  };

  return { login, logout, session, refreshToken };
});
