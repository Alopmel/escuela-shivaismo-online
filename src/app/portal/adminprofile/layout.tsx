
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex align-middle">
        {children}  
    </div>
  );
}