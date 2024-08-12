export const formatISOToDate = (ISO: string) => {
  return new Date(ISO).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const onlyIn = (env: typeof process.env.NODE_ENV, fn: Function) => {
  if (process.env.NODE_ENV === env) {
    return fn();
  }
  return null;
};

export const isDeployedProduction = () => {
  // https://vercel.com/docs/projects/environment-variables/system-environment-variables
  return !!process.env.VERCEL_PROJECT_PRODUCTION_URL;
}

export const getBaseURL = () => {
  console.log({
    vercelUrl : process.env.VERCEL_URL,
  })
  const inProd = isDeployedProduction();
  return inProd
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
};