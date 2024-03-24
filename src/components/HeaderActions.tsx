import { Button } from "@/components/ui/button";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";

type HeaderActionsProps = {
  isLoggedIn: boolean;
  avatarUrl?: string;
  userInitials?: string;
};

export function HeaderActions({
  isLoggedIn,
  avatarUrl,
  userInitials,
}: HeaderActionsProps) {
  return (
    <>
      <Button className="h-9" size="sm" variant="outline" asChild>
        {isLoggedIn ? (
          <a href="/logout">Log out</a>
        ) : (
          <a href="/login">Log in</a>
        )}
      </Button>
      {isLoggedIn && (
        <Avatar>
          <AvatarImage src={avatarUrl} alt="avatar" />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      )}
    </>
  );
}
