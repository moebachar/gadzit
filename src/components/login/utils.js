export function getFirebaseErrorMessage(errorCode) {
  const firebaseErrorMessages = {
    "Firebase: Error (auth/user-not-found).": "User not found",
    "Firebase: Error (auth/wrong-password).": "Incorrect password",
    // Add more Firebase error messages as needed
  };

  const defaultMessage = "An error occurred. Please try again later.";

  return firebaseErrorMessages[errorCode] || defaultMessage;
}
