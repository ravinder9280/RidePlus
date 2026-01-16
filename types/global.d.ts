export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboarded?: boolean; // or "onboardingComplete" if you prefer Clerk’s example
    };
  }
}
