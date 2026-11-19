import { ViewTransition } from 'react';

// Un template est remonté à chaque navigation : la page sortante s'efface
// pendant que la nouvelle monte en fondu (styles dans globals.css).
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
