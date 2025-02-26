import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Vite + React + TS',
    description: 'My App',
  }
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
<html lang="en">
  <body>
    <div id="root">{children}</div>
    {/* <script>
      if (localStorage.getItem("theme") === 'dark') {
        document.documentElement.classList.add("dark")
      }
      {localStorage.getItem("theme") === 'dark' && document.documentElement.classList.add("dark")}
    </script> */}
    {/* <script type="module" src="/src/main.tsx"></script> */}
    {/* <script src="https://open.spotify.com/embed/iframe-api/v1" async></script> */}
  </body>
</html>
    )
  }
  