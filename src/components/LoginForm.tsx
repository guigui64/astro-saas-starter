/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/S1gnFY4MyAt
 */
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="p-6 flex flex-col items-center space-y-6">
        <CardHeader className="text-center space-y-2">
          <div className="text-xl font-bold">
            Sign in to {import.meta.env.APP_NAME}
          </div>
          <div className="text-md font-thin leading-none">
            Please sign in to continue
          </div>
        </CardHeader>
        <div className="space-y-4 w-full">
          <Button
            className="w-full flex items-center justify-center"
            color="gray"
            variant="outline"
            asChild
          >
            <a href="/login/github">
              <img className="w-4 h-4 mr-2.5" src="/github.svg" alt="GitHub" />
              Sign in with GitHub
            </a>
          </Button>
          <Button
            className="w-full flex items-center justify-center"
            color="gray"
            variant="outline"
            asChild
          >
            <a href="/login/google">
              <img className="w-4 h-4 mr-2.5" src="/google.svg" alt="Google" />
              Sign in with Google
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
