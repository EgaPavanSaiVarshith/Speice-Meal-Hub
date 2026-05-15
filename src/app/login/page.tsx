'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { LogIn, UserPlus } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const displayName = name || email.split('@')[0];
    login(displayName, email);

    toast({
      title: isRegistering ? 'Account Created!' : 'Welcome Back!',
      description: `Logged in as ${displayName}`,
    });

    router.push('/');
  };

  return (
    <div className="container mx-auto py-20 px-4 flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-2xl border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline font-bold">
            {isRegistering ? 'Join SpiceMeal' : 'Welcome Back'}
          </CardTitle>
          <CardDescription>
            {isRegistering 
              ? 'Create an account to start ordering your favorite meals.' 
              : 'Login to access your orders and special offers.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {!isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>
            )}
            <Button type="submit" className="w-full rounded-full h-12 text-lg font-bold">
              {isRegistering ? <><UserPlus className="mr-2 h-5 w-5" /> Sign Up</> : <><LogIn className="mr-2 h-5 w-5" /> Login</>}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t pt-6 bg-muted/30">
          <p className="text-sm text-muted-foreground">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-primary font-bold hover:underline"
            >
              {isRegistering ? 'Login here' : 'Sign up now'}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
