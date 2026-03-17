# Skill: API & Data Fetching (Vertical Slice)

## 1. Service Pattern (Data Access Layer)

- **Trigger:** Writing logic to communicate with external APIs (Plain async functions).
- **Rules:**
  - Base URL: Use `import.meta.env.PUBLIC_<NAME>_API`.
  - Auth: Use native `fetch` with `credentials: 'include'`.
  - Error Handling: Check `response.ok` and throw typed errors.
- **Blueprint Placeholder:**

```ts
import { type MeResponse, type UserResponse, type LoginPayload, type RegisterPayload } from '../types';

const apiUrl = import.meta.env.PUBLIC_AUTH_API;

if (!apiUrl) {
  throw new Error('PUBLIC_AUTH_API environment variable is not configured');
}

export const fetchMe = async (): Promise<MeResponse> => {
  const response = await fetch(`${apiUrl}/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Unauthorized');
    }
    throw new Error(`Failed to fetch auth status: ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchUser = async (): Promise<UserResponse> => {
  const response = await fetch(`${apiUrl}/user`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  return response.json();
};

```

## 2. Query Factory Pattern (State Management)

- **Trigger:** Defining TanStack Query options or mutations.
- **Rules:**
  - Use `queryOptions()` and `mutationOptions()`.
  - Hierarchical Keys: `['feature', 'entity', 'scope']`.
- **Blueprint Placeholder:**

```ts
import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { fetchMe, fetchUser, login, register, logout } from '../services/authService';
import type { LoginPayload, RegisterPayload } from '../types';

export const authQueries = {
  all: () => ['auth'] as const,
  me: () =>
    queryOptions({
      queryKey: [...authQueries.all(), 'me'] as const,
      queryFn: fetchMe,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: false,
    }),
} as const;

export const userQueries = {
  all: () => ['user'] as const,
  current: () =>
    queryOptions({
      queryKey: [...userQueries.all(), 'current'] as const,
      queryFn: fetchUser,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    }),
} as const;
```

## 3. Hook Pattern (React Glue)

- **Trigger:** Consuming queries/mutations for UI components.
- **Rules:**
  - Keep hooks "thin" (glue between React Query and components).
  - Return `{ data, isPending, isError }`.
- **Blueprint Placeholder:**

```ts
import { useQuery } from '@tanstack/react-query';
import { userQueries } from './queries/authQueries';

export const useUser = () => {
  const { data, isPending, isError } = useQuery(userQueries.current());

  return {
    isError,
    isPending,
    data: data ? {
      userName: data.userName,
      profileDescription: data.profileDescription,
      avatarUrl: data.avatarUrl,
    } : undefined,
  };
};
```
