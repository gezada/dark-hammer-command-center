
import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  ExternalLink, 
  User, 
  Globe, 
  Settings as SettingsIcon, 
  LogOut, 
  Moon, 
  Sun, 
  Key 
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type Language = "en" | "pt" | "es";
type ThemeMode = "dark" | "light";

export default function SettingsPage() {
  const { youtubeApiKey, setYoutubeApiKey, userName, setUserName, sidebarCollapsed, theme, setTheme } = useStore();
  const [apiKey, setApiKey] = useState(youtubeApiKey || "");
  const [name, setName] = useState(userName || "");
  const [email, setEmail] = useState("user@example.com"); // Example email
  const [language, setLanguage] = useState<Language>("en");
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(theme as ThemeMode || "dark");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  
  const handleSaveApiKey = () => {
    setYoutubeApiKey(apiKey);
    toast.success("YouTube API key saved successfully!");
  };
  
  const handleUpdateProfile = () => {
    setUserName(name);
    toast.success("Profile updated successfully!");
  };

  const handleSignOut = () => {
    toast.success("You have been signed out");
    // In a real app, this would handle authentication signout
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    setCurrentTheme(newTheme);
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast.success(`Language changed to ${getLanguageName(newLanguage)}`);
  };

  const getLanguageName = (langCode: Language) => {
    switch (langCode) {
      case "en": return "English";
      case "pt": return "Português";
      case "es": return "Español";
      default: return "English";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
          <Skeleton className="h-8 w-36 mb-2" />
          <Skeleton className="h-4 w-64 mb-8" />

          <div className="max-w-4xl">
            <Skeleton className="h-10 w-96 mb-6" />
            
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-60" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-32" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[60px]' : 'ml-[240px]'}`}>
        <div className="space-y-1 mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your Dark Hammer application settings
          </p>
        </div>
        
        <div className="max-w-4xl">
          <Tabs defaultValue="api" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Key className="h-4 w-4" /> API Integration
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Account
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" /> Preferences
              </TabsTrigger>
            </TabsList>
            
            {/* API Integration Tab */}
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>YouTube API Configuration</CardTitle>
                  <CardDescription>
                    Configure your YouTube API key to enable YouTube data integration
                    <a 
                      href="https://console.developers.google.com/apis/credentials" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary ml-1 hover:underline"
                    >
                      Get one here <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">YouTube API Key</Label>
                    <Input
                      id="api-key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your YouTube API key"
                      type="password"
                      className="font-mono"
                    />
                    <p className="text-sm text-muted-foreground">
                      Your API key will be stored securely and used only for accessing the YouTube Data API.
                    </p>
                  </div>
                  <Button onClick={handleSaveApiKey}>Save API Key</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your personal information and account settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
                      <AvatarFallback>{name ? name[0]?.toUpperCase() : "U"}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-4 flex-1">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email"
                          disabled
                        />
                        <p className="text-xs text-muted-foreground">
                          Email cannot be changed. Contact support for assistance.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                    <Button onClick={handleUpdateProfile}>Update Profile</Button>
                    <Button variant="destructive" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Application Preferences</CardTitle>
                  <CardDescription>
                    Customize your Dark Hammer experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Toggle */}
                  <div className="space-y-3">
                    <Label>Theme</Label>
                    <div className="flex gap-3">
                      <Button
                        variant={currentTheme === "light" ? "default" : "outline"}
                        className="flex-1 sm:flex-none"
                        onClick={() => handleThemeChange("light")}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={currentTheme === "dark" ? "default" : "outline"}
                        className="flex-1 sm:flex-none"
                        onClick={() => handleThemeChange("dark")}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                    </div>
                  </div>
                  
                  {/* Language Selector */}
                  <div className="space-y-3">
                    <Label htmlFor="language">Language</Label>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Select value={language} onValueChange={(val) => handleLanguageChange(val as Language)}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
