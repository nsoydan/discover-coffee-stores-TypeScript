

export const isEmpty = (obj:any) => {
  return obj && Object.keys(obj).length === 0;
};

export const fetcher = (...args:any[]) => fetch(...args).then((res) => res.json());
