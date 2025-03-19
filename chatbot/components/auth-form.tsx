import Form from 'next/form';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Eye, EyeOff } from 'lucide-react';

export function AuthForm({
                           action,
                           children,
                           defaultEmail = '',
                         }: {
  action: NonNullable<
      string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
      <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
        <div className="flex flex-col gap-2">
          <Label
              htmlFor="email"
              className="text-zinc-600 font-normal dark:text-zinc-400"
          >
            Email Address
          </Label>

          <Input
              id="email"
              name="email"
              className="bg-muted text-md md:text-sm"
              type="email"
              placeholder="user@acme.com"
              autoComplete="email"
              required
              autoFocus
              defaultValue={defaultEmail}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
              htmlFor="password"
              className="text-zinc-600 font-normal dark:text-zinc-400"
          >
            Password
          </Label>

          <div className="relative">
            <Input
                id="password"
                name="password"
                className="bg-muted text-md md:text-sm pr-10"
                type={showPassword ? "text" : "password"}
                required
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                  <EyeOff size={20} />
              ) : (
                  <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {children}
      </Form>
  );
}