// A new template instance mounts on every navigation, replaying the fade.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
