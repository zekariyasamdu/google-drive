import LoginForm from "~/components/forms/login";
import AuthUiWrapper from "~/components/auth-ui-wrapper";
export const dynamic = "force-static";

const Page = () => {
  return (
    <AuthUiWrapper>
      <LoginForm />
    </AuthUiWrapper>
  );
};

export default Page;
