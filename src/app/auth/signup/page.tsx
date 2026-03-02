import AuthUiWrapper from "~/components/auth-ui-wrapper";
import SignupForm from "~/components/forms/signup";

const Page = () => {
  return (
    <AuthUiWrapper>
      <SignupForm />
    </AuthUiWrapper>
  );
};

export default Page;
