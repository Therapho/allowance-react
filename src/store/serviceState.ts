export enum ServiceState {Idle , Loading, Succeeded, Failed};

export type serviceState<T> = {
    data: T|null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
  }