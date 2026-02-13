"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function AuthButtons() {
    return (
        <div className="flex gap-4">
            <SignedOut>
                <SignInButton mode="modal">
                    <Button>Sign In</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
}
