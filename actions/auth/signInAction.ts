type ISignInProps = {
  setEmail: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void;
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
  setSuccess: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void;
  setError: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void;
  signInWith: any;
  isSuccess: boolean;
  data: any;
  registerFn: Function;
  signInFn: Function;
  router: any;
};

export const SignInWithEmailAction = async ({
  setEmail,
  setLoading,
  setSuccess,
  setError,
  signInWith,
  isSuccess,
  data,
  registerFn,
  signInFn,
  router,
}: ISignInProps) => {
  setLoading(true);
  setSuccess("");
  setError("");
  try {
    const signInWithEmail = await signInWith();
    if (signInWithEmail?.user.email) {
      const userData = {
        email: signInWithEmail.user.email,
        name: signInWithEmail.user.displayName,
        isVerified: signInWithEmail.user.emailVerified,
        photoUrl: signInWithEmail.user.photoURL,
        phoneNumber: signInWithEmail.user.phoneNumber,
      };
      setEmail(signInWithEmail?.user.email);

      // user data save in database
      if (isSuccess) {
        if (data.success) {
          const register: any = await registerFn(userData);
          const data: any = { ...register.data };

          if (data?.success) {
            setLoading(false);
          } else {
            let errorMessage = data?.message || "An error occurred";
            // Check if there are individual error messages
            if (data?.errorMessages) {
              // Format the individual error message
              const individualErrorMessage = data?.errorMessages?.map(
                (error: { path: string; message: string }) =>
                  `${error.path}: ${error.message} \n`
              );
              errorMessage = `${errorMessage}: \n ${individualErrorMessage}`;
            }
            setError(errorMessage);
            setLoading(false);
          }
        }
      }

      //sign in
      const res: any = await signInFn({ email: signInWithEmail.user.email });
      const LoginData: any = { ...res.data };
      if (LoginData?.success) {
        setSuccess(LoginData?.message);
        setLoading(false);
        router.push("/");
      } else {
        let errorMessage = LoginData?.message || "An error occurred";
        // Check if there are individual error messages
        if (LoginData?.errorMessages) {
          // Format the individual error message
          const individualErrorMessage = LoginData?.errorMessages?.map(
            (error: { path: string; message: string }) =>
              `${error.path}: ${error.message} \n`
          );
          errorMessage = `${errorMessage}: \n ${individualErrorMessage}`;
        }
        setError(errorMessage);
        setLoading(false);
      }
    } else {
      console.log("sssssssssssssssss", signInWithEmail);
      setLoading(false);
      setError("soothing went wrong!");
    }
  } catch (error: any) {
    throw setError(error?.message);
  }
};
