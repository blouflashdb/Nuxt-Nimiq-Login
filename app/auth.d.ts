// auth.d.ts
declare module '#auth-utils' {
  interface User {
    address: string
  }

  interface UserSession {
    challenge: string
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {}
