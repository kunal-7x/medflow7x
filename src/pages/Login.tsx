import { useState } from 'react';
import { useAuth, AppRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Zap, AlertCircle, Eye, ArrowRight, Shield, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const { signIn, signUp, continueAsVisitor } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupRole, setSignupRole] = useState<AppRole>('doctor');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) { setError('Please fill in all fields'); return; }
    setLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setLoading(false);
    if (error) setError(error);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!signupEmail || !signupPassword || !signupName) { setError('Please fill in all fields'); return; }
    if (signupPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    const { error } = await signUp(signupEmail, signupPassword, signupName, signupRole);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      toast({ title: 'Account created', description: 'Please check your email to verify your account before signing in.' });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/[0.04] blur-[80px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow rotate-3 hover:rotate-0 transition-transform duration-500">
            <Zap className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient-gold tracking-tight">MedFlow</h1>
            <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-medium">Hospital Management</p>
          </div>
        </div>

        {/* Visitor Quick Access */}
        <button
          onClick={continueAsVisitor}
          className="w-full group mb-6 relative"
        >
          <div className="apple-glass p-4 flex items-center gap-4 hover:border-primary/30 transition-all duration-300 cursor-pointer group-hover:shadow-glow">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">Continue as Visitor</p>
              <p className="text-xs text-muted-foreground">Explore all features instantly — no sign-up needed</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border/60" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">or sign in</span>
          <div className="flex-1 h-px bg-border/60" />
        </div>

        <Card className="border-border/30 glass-card">
          <Tabs defaultValue="login">
            <div className="px-6 pt-5 pb-0">
              <TabsList className="w-full bg-muted/50">
                <TabsTrigger value="login" className="flex-1 data-[state=active]:bg-background/80">
                  <UserCheck className="w-3.5 h-3.5 mr-1.5" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex-1 data-[state=active]:bg-background/80">
                  <Shield className="w-3.5 h-3.5 mr-1.5" />
                  Create Account
                </TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="pt-5 px-6 pb-6">
              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <TabsContent value="login" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="login-email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      placeholder="doctor@medflow.com"
                      disabled={loading}
                      className="h-11 bg-muted/30 border-border/40 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="login-password" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={loading}
                      className="h-11 bg-muted/30 border-border/40 focus:border-primary/50"
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 font-semibold text-sm" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-0">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-name" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</Label>
                    <Input
                      id="signup-name"
                      value={signupName}
                      onChange={e => setSignupName(e.target.value)}
                      placeholder="Dr. John Smith"
                      disabled={loading}
                      className="h-11 bg-muted/30 border-border/40 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupEmail}
                      onChange={e => setSignupEmail(e.target.value)}
                      placeholder="doctor@medflow.com"
                      disabled={loading}
                      className="h-11 bg-muted/30 border-border/40 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupPassword}
                      onChange={e => setSignupPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      disabled={loading}
                      className="h-11 bg-muted/30 border-border/40 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-role" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</Label>
                    <Select value={signupRole} onValueChange={v => setSignupRole(v as AppRole)}>
                      <SelectTrigger className="h-11 bg-muted/30 border-border/40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="receptionist">Receptionist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full h-11 font-semibold text-sm" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          Secure access · HIPAA compliant · 256-bit encryption
        </p>
      </div>
    </div>
  );
}
