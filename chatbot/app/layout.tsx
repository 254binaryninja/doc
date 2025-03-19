import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { SiteHeader } from "@/components/site-header";
import { auth } from './(auth)/auth';
import { isUserAdmin } from '@/lib/db/queries';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Mental Health Chatbot',
  description: 'A confidential AI mental health support chatbot designed to provide emotional support and resources. Not a replacement for professional mental healthcare.',
  keywords: 'mental health support, emotional wellbeing, mental health chat, crisis resources',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  authors: [{ name: 'Mental Health Support Team' }],
  openGraph: {
    title: 'Mental Health Chatbot',
    description: 'Confidential mental health support chat. Available 24/7 for emotional support.',
    type: 'website',
    siteName: 'Mental Health Chatbot'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true
  }
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

// Calming theme colors suitable for mental health applications
const LIGHT_THEME_COLOR = 'hsl(194, 20%, 95%)'; // Soft, calming blue-tinted white
const DARK_THEME_COLOR = 'hsl(220, 20%, 10%)';  // Gentle dark blue
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('data-purpose', 'mental-health-theme');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.id ? await isUserAdmin(session.user.id) : false;

  return (
      <html
          lang="en"
          suppressHydrationWarning
          className="mental-health-interface"
      >
      <head>
        <script
            dangerouslySetInnerHTML={{
              __html: THEME_COLOR_SCRIPT,
            }}
        />
        <meta name="application-name" content="Mental Health Chatbot" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content={LIGHT_THEME_COLOR} />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="disclaimer" content="This chatbot is not a substitute for professional mental health care" />
        <meta name="crisis-support" content="In case of emergency, call 988 or your local emergency services" />
      </head>
      <body className="antialiased mental-health-theme">
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <SiteHeader isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
        <Toaster
            position="top-center"
            toastOptions={{
              duration: 5000,
              className: 'mental-health-toast',
            }}
        />
        <main className="mental-health-content">
          {children}
        </main>
        <footer className="text-center p-4 text-sm text-gray-600 dark:text-gray-400">
          <p>This is an AI chatbot and not a substitute for professional mental health care.</p>
          <p>Crisis Support: 988 - Available 24/7</p>
        </footer>
      </ThemeProvider>
      </body>
      </html>
  );
}