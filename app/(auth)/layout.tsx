import { ThemeProvider } from "@/components/theme-provider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="h-full flex items-center justify-center dark:bg-[#020817]">
        {children}
      </div>
    </ThemeProvider>
  );
};

export default AuthLayout;
